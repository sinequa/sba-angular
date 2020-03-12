import {Directive, Input, Output, OnChanges, OnDestroy, ViewContainerRef, ComponentRef, EventEmitter, Type} from "@angular/core";
import {LoadComponentService, LoadComponentOptions, LoadedComponent} from "./load-component.service";

/**
 * A directive that uses the {@link LoadComponentService} to dynamically load a component.
 * The loaded component's lifecycle is automatically managed with changes to the directive's
 * `options` reflected to the component by rebinding it using {@link LoadComponentService}
 */
@Directive({
    selector: "[sqLoadComponent]"
})
export class LoadComponentDirective implements OnChanges, OnDestroy {
    /**
     * Options for the loading of a component
     */
    @Input("sqLoadComponent") options: LoadComponentOptions;
    /**
     * Used to emit events when the component is created and destroyed
     */
    @Output("sqLoadComponent") eventEmitter = new EventEmitter<{componentRef: ComponentRef<Type<any>> | undefined}>();
    private loadedComponent: LoadedComponent;
    private currentComponent: Type<any>;

    constructor(
        private loadComponentService: LoadComponentService,
        private viewContainerRef: ViewContainerRef) {
    }

    /**
     * Handles any changes to the input `options`. On the first call the component is loaded
     * and bound. Subsequent changes to the `options` are handled by rebinding the component unless
     * the component type to load changes in which case the current component is unloaded before
     * loading the new component.
     *
     * The component is loaded using the `ViewContainerRef` associated with the directive
     */
    ngOnChanges() {
        if (this.loadedComponent) {
            if (this.currentComponent === this.options.component) {
                this.loadComponentService.bindComponent(this.options, this.loadedComponent);
                return;
            }
            this.loadComponentService.unbindComponent(this.loadedComponent);
            this.loadedComponent.componentRef.destroy();
            this.eventEmitter.emit({componentRef: undefined});
        }
        this.loadedComponent = this.loadComponentService.loadComponent(this.options, this.viewContainerRef);
        this.currentComponent = this.options.component;
        this.eventEmitter.emit({componentRef: !!this.loadedComponent ? this.loadedComponent.componentRef : undefined});
    }

    /**
     * Unbinds the loaded component. It is not destroyed here as angular will automatically destroy
     * the component at the same time as this directive is destroyed as they share the same `ViewContainerRef`
     */
    ngOnDestroy() {
        if (this.loadedComponent) {
            this.loadComponentService.unbindComponent(this.loadedComponent);
            this.eventEmitter.emit({componentRef: undefined});
        }
    }
}
