import { Component, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { Results } from '@sinequa/core/web-services';
import { AbstractFacet } from '@sinequa/components/facet';
import { AppService } from '@sinequa/core/app-utils';
import { Options, VisNetworkService } from 'ngx-vis';
import { DataSet } from "vis-data/peer/esm/vis-data";
import { Node, Edge, NetworkDataset, NetworkProvider } from './network-models';


export const defaultOptions: Options = {
    physics: {
        barnesHut: {
            damping: 0.5,
            springLength: 100
        }
    },
    height: '500px'
};


export interface VisEvent {
    nodes: string[];
    edges: string[];
    event: any;
    items: any[];
    pointer: any;
}

@Component({
    selector: 'sq-network',
    template: `
<div *ngIf="data"
    [visNetwork]="name" 
    [visNetworkData]="data" 
    [visNetworkOptions]="options"
    (initialized)="networkInitialized()">
</div>
`
})
export class NetworkComponent extends AbstractFacet implements OnChanges, OnDestroy {

    /** Name of the network - should be unique within the app */
    @Input() name = "Network";

    /** Input results - used to produce a OnChange event when  */
    @Input() results: Results;
    
    @Input() providers: NetworkProvider[];

    /** General Vis options passed to the network (https://visjs.github.io/vis-network/docs/network/) */
    @Input() options: Options = defaultOptions;
    
    @Output() nodeClicked = new EventEmitter<Node>();
    @Output() edgeClicked = new EventEmitter<Edge>();
    
    readonly data = {
        nodes: new DataSet<Node>(),
        edges: new DataSet<Edge>(),
    };

    providersSubscription: Subscription;

    constructor(
        public networkService: VisNetworkService,
        public appService: AppService) {
        super();

        // Notify providers when a node is clicked (this may trigger new data, or a node mutation)
        this.nodeClicked.subscribe(node => {
            this.providers.forEach(p => p.onNodeClicked(node));
        });
        
    }

    ngOnChanges(changes: SimpleChanges) {

        if(changes['results'] || changes['providers']) {

            this.data.nodes.clear();
            this.data.edges.clear();

            if(this.providersSubscription){
                this.providersSubscription.unsubscribe();
            }

            this.providersSubscription = combineLatest(
                this.providers.map(p => p.getProvider())
            ).subscribe(datasets => 
                this.mergeDatasets(datasets.filter(d => !!d) as NetworkDataset[])
            );

            this.providers.forEach(p => p.getData())
            
        }

    }

    mergeDatasets(datasets: NetworkDataset[]) {
        const dataset = datasets.reduce((prev, cur) => prev.merge(cur));
        
        // Notify providers that nodes were inserted (which could trigger an update of the data)
        this.providers.forEach(p => p.onDatasetsMerged(dataset));

        // TODO: Post process the dataset somehow to adjust visibility (or other properties)
        dataset.updateDatasets(this.data.nodes, this.data.edges);

        // Notify providers that nodes were inserted (which could trigger an update of the data)
        this.providers.forEach(p => p.onNodesInserted(this.data.nodes.get()));
    }



    // Misc

    networkInitialized() {
        // now we can use the service to register on events
        this.networkService.on(this.name, 'click');
        
        this.networkService.click.subscribe((eventData: any[]) => {
            if (eventData[0] === this.name) {
                const event = eventData[1] as VisEvent;
                console.log(event);
                if(event.event.type === "tap") {

                    if(event.edges.length === 1 && event.nodes.length === 0) {
                        this.edgeClicked.next(this.data.edges.get(event.edges[0]) as Edge);
                        this.nodeClicked.next();
                    }
                    else {
                        this.edgeClicked.next();
                        if(event.nodes.length === 1) {
                            this.nodeClicked.next(this.data.nodes.get(event.nodes[0]) as Node);
                        }
                        else {
                            this.nodeClicked.next();
                        }
                    }

                }
                else {
                    this.nodeClicked.next();
                    this.edgeClicked.next();
                }
                
            }
        });
    }

    ngOnDestroy() {
        this.networkService.off(this.name, 'click');
        if(this.providersSubscription){
            this.providersSubscription.unsubscribe();
        }
    }

}
