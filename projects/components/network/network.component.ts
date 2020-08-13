import { Component, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';

import { Results } from '@sinequa/core/web-services';
import { AppService } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { UserPreferences } from '@sinequa/components/user-settings';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import { SearchService } from '@sinequa/components/search';

import { Options, VisNetworkService } from 'ngx-vis';
import { DataSet } from "vis-data/peer/esm/vis-data";

import { Node, Edge, NetworkDataset, NetworkProvider, NetworkContext } from './network-models';
import { IntlService } from '@sinequa/core/intl';

/**
 * Default options of the Vis.js network.
 * See: https://visjs.github.io/vis-network/docs/network/
 */
export const defaultOptions: Options = {
    height: '500px',
    interaction: {
        navigationButtons: true // For the buttons to be displayed, it is necessary to import the stylesheet "~vis-network/dist/vis-network.min.css"
    }
};

/**
 * Structure of the events emitted by the Vis.js network
 */
export interface VisEvent {
    nodes: string[];
    edges: string[];
    event: any;
    items: any[];
    pointer: any;
}

@Component({
    selector: 'sq-network',
    templateUrl: './network.component.html'
})
export class NetworkComponent extends AbstractFacet implements OnChanges, OnDestroy {

    /** Name of the network - should be unique within the app */
    @Input() name = "Network";

    /** Input results - used to produce a OnChange event when  */
    @Input() results: Results;
    
    @Input() providers: NetworkProvider[];

    /** General Vis options passed to the network (https://visjs.github.io/vis-network/docs/network/) */
    @Input() options: Options = defaultOptions;
    optionsPrefs: Options;
    
    @Output() nodeClicked = new EventEmitter<Node>();
    @Output() edgeClicked = new EventEmitter<Edge>();
  
    // Settings form
    form: FormGroup;

    // State
    _networkInitialized: boolean;
    _selectedNode?: Node;
    _selectedEdge?: Edge;

    // Actions
    _actions: Action[] = [];
    refreshAction: Action;
    clearFilters: Action;

    // Info cards
    @ContentChild("nodeTpl", {static: false}) nodeTpl: TemplateRef<any>;
    @ContentChild("edgeTpl", {static: false}) edgeTpl: TemplateRef<any>;
    
    readonly context: NetworkContext;

    providersSubscription: Subscription;

    constructor(
        public networkService: VisNetworkService,
        public searchService: SearchService,
        public appService: AppService,
        public intlService: IntlService,
        public formBuilder: FormBuilder,
        public prefs: UserPreferences
    ) {
        super();

        // Notify providers when a node is clicked (this may trigger new data, or a node mutation)
        this.nodeClicked.subscribe((node?: Node) => {
            this.providers.forEach(p => p.onNodeClicked(node));
        });
        
        // Notify providers when a node is clicked (this may trigger new data, or a node mutation)
        this.edgeClicked.subscribe((edge?: Edge) => {
            this.providers.forEach(p => p.onEdgeClicked(edge));
        });

        // Refresh the network
        this.refreshAction = new Action({
            icon: "fas fa-sync-alt",
            title: "msg#network.actions.refresh",
            action: () => {
                this.updateData();
                this.updateActions();
            }
        });
        
        // Clear the current filters
        this.clearFilters = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.clearSelects",
            action: () => {
                this.searchService.query.removeSelect(this.name);
                this.searchService.search();
            }
        });

        this.context = {
            name: this.name,
            nodes: new DataSet<Node>(),
            edges: new DataSet<Edge>(),
            searchService: searchService,
            appService: appService,
            networkService: networkService,
            intlService: intlService,
            select: (node?: Node, edge?: Edge) => this.select(node, edge),
        };
    }

    ngOnChanges(changes: SimpleChanges) {

        if(changes['results'] || changes['providers']) {
            // Update the context
            this.context.name = this.name;

            // Update selections
            this.selectEdge();
            this.selectNode();

            // Update options from the preferences
            this.updateOptions();

            // Update data from the providers (async)
            this.updateData();

            // Update the actions of the facet
            this.updateActions();
        }

    }

    /**
     * Resets the nodes and edges, create a new listener for the providers and
     * call getData() on these providers to refresh the data
     */
    protected updateData() {
        
        this.context.nodes.clear();
        this.context.edges.clear();

        if(this.providersSubscription){
            this.providersSubscription.unsubscribe();
        }

        this.providersSubscription = combineLatest(
            this.providers.map(p => p.getProvider())
        ).subscribe(datasets => 
            this.mergeDatasets(datasets.filter(d => !!d) as NetworkDataset[])
        );

        this.providers.forEach(p => p.getData(this.context));
    }

    /**
     * Take in the datasets produced by each provider and merges them into
     * a single one
     * @param datasets 
     */
    protected mergeDatasets(datasets: NetworkDataset[]) {
        const dataset = datasets.reduce((prev, cur) => prev.merge(cur), new NetworkDataset());
        
        // Notify providers that nodes were inserted (which could trigger an update of the data)
        this.providers.forEach(p => p.onDatasetsMerged(dataset));

        // TODO: Post process the dataset somehow to adjust visibility (or other properties)
        dataset.updateDatasets(this.context.nodes, this.context.edges);

        // Notify providers that nodes were inserted (which could trigger an update of the data)
        this.providers.forEach(p => p.onNodesInserted(this.context.nodes.get()));

        this.updateActions();
    }

    get actions(): Action[] {
        return this._actions;
    }

    /**
     * Updates the actions displayed in the facet frame (_action variable).
     * Actions may come from this component or from its providers
     */
    protected updateActions() {
        this._actions = [];

        // Clear the active filters
        if(this.searchService.breadcrumbs && !!this.searchService.breadcrumbs.findSelect(this.name)) {
            this._actions.push(this.clearFilters);
        }

        // Selected node actions
        if(this._selectedNode) {
            this.providers.forEach(p => {
                const actions = p.getNodeActions(this._selectedNode!);
                if(actions.length){
                    this._actions = this._actions.concat(actions);
                }
            });
        }

        // Selected edge actions
        if(this._selectedEdge) {
            this.providers.forEach(p => {
                const actions = p.getEdgeActions(this._selectedEdge!);
                if(actions.length){
                    this._actions = this._actions.concat(actions);
                }
            });
        }

        // Actions specific to each provider
        const providersActionList = new Action({
            icon: "fas fa-tasks",
            title: "msg#network.actions.providers",
            children: []
        });
        this.providers.forEach(p => {
            const providerActions = new Action({
                text: this.intlService.formatMessage(p.name),
                title: this.intlService.formatMessage(p.name)
            });
            providerActions.children = p.getProviderActions();
            providersActionList.children.push(providerActions);
        });
        this._actions.push(providersActionList);

        // Action to refresh the network
        this._actions.push(this.refreshAction);

    }


    // Event handling

    /**
     * Called from the template by ngx-vis, when the network is initialized,
     * and the NetworkService can be used.
     */
    networkInitialized() {
        this._networkInitialized = true;

        // now we can use the service to register on events
        this.networkService.on(this.name, 'click');
        
        this.networkService.click.subscribe((eventData: any[]) => this.onNetworkClick(eventData));

        this.networkService.setOptions(this.name, this.optionsPrefs);
    }

    /**
     * Method called when a node or edge in the network is clicked.
     * The method generates appropriate nodeClicked and edgeClicked events,
     * and updates the state of _selectedEdge and _selectedNode.
     * @param eventData 
     */
    protected onNetworkClick(eventData: any[]) {
        if (eventData[0] === this.name) {
            const event = eventData[1] as VisEvent;

            if(event.event.type === "tap") {

                if(event.edges.length === 1 && event.nodes.length === 0) {
                    this.selectEdge(this.context.edges.get(event.edges[0]) as Edge);
                    this.selectNode();
                }
                else {
                    this.selectEdge();
                    if(event.nodes.length === 1) {
                        this.selectNode(this.context.nodes.get(event.nodes[0]) as Node);
                    }
                    else {
                        this.selectNode();
                    }
                }

            }
            else {
                this.selectNode();
                this.selectEdge();
            }
                        
            this.updateActions();
        }
    }

    select(node?: Node, edge?: Edge) {
        this.selectNode(node);
        this.selectEdge(edge);
        this.updateActions();
    }

    selectNode(node?: Node) {
        this._selectedNode = node;
        this.nodeClicked.next(node);
    }

    selectEdge(edge?: Edge) {
        this._selectedEdge = edge;
        this.edgeClicked.next();
    }

    ngOnDestroy() {
        this.networkService.off(this.name, 'click');
        if(this.providersSubscription){
            this.providersSubscription.unsubscribe();
        }
    }


    // Settings
    
    /**
     * Sets the options values either to the user preferences (stored in user settings)
     * or the default values.
     */
    updateOptions() {
        this.optionsPrefs = Utils.copy(this.options);
        if(!this.optionsPrefs.physics){
            this.optionsPrefs.physics = {};
        }
        if(!this.optionsPrefs.physics.barnesHut){
            this.optionsPrefs.physics.barnesHut = {};
        }
        this.optionsPrefs.physics.barnesHut.springLength = this.springLengthPref;
        this.optionsPrefs.physics.barnesHut.springConstant = this.springConstantPref / 100;
        this.optionsPrefs.physics.barnesHut.damping = this.dampingPref / 100;
        this.optionsPrefs.physics.barnesHut.gravitationalConstant = -this.repulsionPref;
        this.optionsPrefs.physics.barnesHut.centralGravity = this.gravityPref / 10;

        if(this._networkInitialized) {
            this.networkService.setOptions(this.name, this.optionsPrefs);
        }
    }

    /**
     * Method from the AbstractFacet interface called when the settings
     * panel is opened or closed
     * @param opened whether settings are opened or closed
     */
    onOpenSettings(opened: boolean){
        if(opened) {
            const springLengthControl = new FormControl(this.springLengthPref);
            const springConstantControl = new FormControl(this.springConstantPref);
            const dampingControl = new FormControl(this.dampingPref);
            const repulsionControl = new FormControl(this.repulsionPref);
            const gravityControl = new FormControl(this.gravityPref);

            this.form = this.formBuilder.group({
                springLength: springLengthControl,
                springConstant: springConstantControl,
                damping: dampingControl,
                repulsion: repulsionControl,
                gravity: gravityControl
            });

            this.form.valueChanges.subscribe(_ => {
                this.prefs.set(this.name+'-spring-length', springLengthControl.value, true);
                this.prefs.set(this.name+'-spring-constant', springConstantControl.value, true);
                this.prefs.set(this.name+'-damping', dampingControl.value, true);
                this.prefs.set(this.name+'-repulsion', repulsionControl.value, true);
                this.prefs.set(this.name+'-gravity', gravityControl.value, true);
                this.debounceSync();
            });
        }
        else {
            this.updateOptions();
            this.updateData();
        }
    }

    // Debounce syncing to avoid many calls to the user settings web service
    debounceSync = Utils.debounce(() => {
        this.prefs.sync();
    }, 1000);

    /**
     * This method resets all the user preferences and rebuilds the settings form,
     * so that the values displayed are up-to-date
     */
    setDefaults() {
        this.prefs.delete(this.name+'-spring-length', true);
        this.prefs.delete(this.name+'-spring-constant',true);
        this.prefs.delete(this.name+'-damping', true);
        this.prefs.delete(this.name+'-repulsion', true);
        this.prefs.delete(this.name+'-gravity', true);
        this.prefs.sync();
        this.onOpenSettings(true);
    }

    // Accessor method for each of the settings.
    // Return either the saved user preference or the default value.

    get springLengthPref(): number {
        return this.prefs.get(this.name+'-spring-length') || 100;
    }
    
    get springConstantPref(): number {
        return this.prefs.get(this.name+'-spring-constant') || 4;
    }
    
    get dampingPref(): number {
        return this.prefs.get(this.name+'-damping') || 50;
    }

    get repulsionPref(): number {
        return this.prefs.get(this.name+'-repulsion') || 2000;
    }

    get gravityPref(): number {
        return this.prefs.get(this.name+'-gravity') || 3;
    }
}
