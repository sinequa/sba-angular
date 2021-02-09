import {Injectable, ViewContainerRef, ComponentRef, Type, ComponentFactory, ComponentFactoryResolver, ApplicationRef,
    Injector, SimpleChanges, SimpleChange, EventEmitter} from "@angular/core";
import {Subscription} from "rxjs";
import {Utils, MapOf} from "@sinequa/core/base";

/**
 * Describes the options that can be passed to [LoadComponentService.loadComponent]{@link LoadComponentService#loadComponent}
 */
export interface LoadComponentOptions {
    /**
     * The type of the component to load
     */
    component: Type<any>;
    /**
     * The initial values for the component's `@Input` decorated properties
     */
    inputs?: MapOf<any>;
    /**
     * The handlers for the component's `@Output` decorated events
     */
    outputs?: MapOf<any>;
    /**
     * The index at which to insert the loaded component's host view into the container.
     * If not specified, appends the new view as the last entry.
     * See [ViewContainerRef.createComponent]{@link https://angular.io/api/core/ViewContainerRef#createComponent}
     */
    index?: number;
}

/**
 * Describes the object returned by [LoadComponentService.loadComponent]{@link LoadComponentService#loadComponent}
 */
export interface LoadedComponent {
    /**
     * The loaded component instance
     */
    componentRef: ComponentRef<any>;
    /**
     * The subscriptions made to the component's output events
     */
    subscriptions?: Subscription;
}

/**
 * This service provides methods to dynamically load and unload an angular component from its type.
 * The component's initial inputs and outputs are respected and the first call to the component's
 * `ngOnChanges` method is made.
 * Changes to the inputs and outputs can be made by calling {@link #bindComponent} which will call
 * the component's `ngOnChanges` method again
 */
@Injectable({
    providedIn: "root"
})
export class LoadComponentService {

    // A cache of resolved component factories
    private factories = new Map<Type<any>, ComponentFactory<any>>();

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private applicationRef: ApplicationRef) {
    }

    private _bindComponent(options: LoadComponentOptions, loadedComponent: LoadedComponent, initialLoad: boolean) {
        if (!initialLoad) {
            this.unbindComponent(loadedComponent);
        }
        const ngOnChanges: (changes: SimpleChanges) => void = loadedComponent.componentRef.instance.ngOnChanges;
        let simpleChanges: SimpleChanges | undefined;
        const makeSimpleChanges = Utils.isFunction(ngOnChanges) && !!options.inputs;
        if (!!options.inputs) {
            // Assign inputs and generate SimpleChanges if required
            Object.keys(options.inputs).forEach(name => {
                if (makeSimpleChanges) {
                    const previousValue = initialLoad ? undefined : loadedComponent.componentRef.instance[name];
                    const currentValue = options.inputs![name];
                    if (initialLoad || currentValue !== previousValue) {
                        if (!simpleChanges) {
                            simpleChanges = {};
                        }
                        simpleChanges[name] = new SimpleChange(previousValue, currentValue, initialLoad);
                    }
                }
                loadedComponent.componentRef.instance[name] = options.inputs![name];
            });
        }
        if (!!options.outputs) {
            Object.keys(options.outputs).forEach(name => {
                const eventEmitter: EventEmitter<any> = loadedComponent.componentRef.instance[name];
                if (eventEmitter) {
                    const subscription = eventEmitter.subscribe(options.outputs![name]);
                    if (!loadedComponent.subscriptions) {
                        loadedComponent.subscriptions = subscription;
                    }
                    else {
                        loadedComponent.subscriptions.add(subscription);
                    }
                }
            });
        }
        if (simpleChanges) {
            ngOnChanges.call(loadedComponent.componentRef.instance, simpleChanges);
        }
    }

    /**
     * Bind a component's input and output properties according to the passed options. Generate a
     * call to the component's `ngOnChanges` method if the inputs have changed since the last call.
     * If the component has been previously bound it is first unbound by calling {@link #unbindComponent}
     * which will unsubscribe the component's outputs
     *
     * @param options Specify the inputs and outputs for the component
     * @param loadedComponent A component loaded by {@link #loadComponent}
     */
    public bindComponent(options: LoadComponentOptions, loadedComponent: LoadedComponent) {
        return this._bindComponent(options, loadedComponent, false);
    }

    /**
     * Unbind a previously bound dynamically loaded component. Subscriptions to the component's
     * outputs are unsubscribed
     *
     * @param loadedComponent A component loaded by {@link #loadComponent}
     */
    unbindComponent(loadedComponent: LoadedComponent) {
        if (!!loadedComponent.subscriptions) {
            loadedComponent.subscriptions.unsubscribe();
            loadedComponent.subscriptions = undefined;
        }
    }

    /**
     * Dynamically load a component from its type. The component's inputs and outputs will be initialized
     * by calling {@link #bindComponent}.
     *
     * @param options The options containing the component to load and its inputs and outputs
     * @param viewContainerRef Specifies where the loaded component should be attached. If not specified then the
     * loaded component is inserted before the application component
     * @param injector Overrides the injector to use as the parent for the component. By default this will be
     * the injector held on the `viewContainerRef`
     */
    loadComponent<T>(options: LoadComponentOptions, viewContainerRef?: ViewContainerRef, injector?: Injector): LoadedComponent {
        let componentRef: ComponentRef<T>;
        let factory = this.factories.get(options.component);
        if (!factory) {
            factory = this.componentFactoryResolver.resolveComponentFactory(options.component);
        }
        if (!viewContainerRef) {
            const appElement: Element = this.applicationRef.components[0].location.nativeElement;
            const injector1 = this.applicationRef.components[0].injector;
            componentRef = factory.create(injector1, [[appElement]]);
            this.applicationRef.attachView(componentRef.hostView);
            if (appElement.parentElement) {
                appElement.parentElement.insertBefore(componentRef.location.nativeElement, appElement.nextSibling);
            }
        }
        else {
            if (!injector) {
                injector = viewContainerRef.injector;
            }
            const index = !Utils.isEmpty(options.index) ? options.index : undefined;
            componentRef = viewContainerRef.createComponent(factory, index, injector, []);
        }
        const loadedComponent: LoadedComponent = {
            componentRef
        };
        this._bindComponent(options, loadedComponent, true);
        loadedComponent.componentRef.changeDetectorRef.detectChanges();
        return loadedComponent;
    }

    /**
     * Unload a dynamically loaded component. It is unbound prior to being destroyed
     *
     * @param component A loaded component
     */
    unloadComponent(component: LoadedComponent) {
        if (!!component) {
            this.unbindComponent(component);
            component.componentRef.destroy();
        }
    }
}
