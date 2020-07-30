import {Component, Output, TemplateRef, EventEmitter, ViewChild} from "@angular/core";
import {Action} from "@sinequa/components/action";

/**
 * This interface should be implemented by facet components, which expose
 * a list of actions and event listeners
 */
@Component({
    template: ""
})
export abstract class AbstractFacet {

    /**
     * List of custom actions of this facet
     */
    public get actions(): Action[] { return []; }

    /**
     * Event emitter triggered when the list of action changes
     */
    @Output() public actionsChanged = new EventEmitter<Action[]>();

    /**
     * Template for the settings editor of this facet, if any
     */
    @ViewChild("settingsTpl", {static: true, read: TemplateRef}) public settingsTpl?: TemplateRef<any>;

    /**
     * Template for header of this facet, if any
     */
    @ViewChild("headerTpl", {static: true, read: TemplateRef}) public headerTpl?: TemplateRef<any>;

    /**
     * Template for a sub-header of this facet, if any. This appears below the header
     */
    @ViewChild("subHeaderTpl", {static: true, read: TemplateRef}) public subHeaderTpl?: TemplateRef<any>;

    /**
     * Template for footer of this facet, if any
     */
    @ViewChild("footerTpl", {static: true, read: TemplateRef}) public footerTpl?: TemplateRef<any>;

    /**
     * Method called when a facet is collapsed
     */
    public onCollapse(collapsed: boolean){}

    /**
     * Method called when a facet is resized via an action (not accounting for window resizing)
     */
    public onExpand(expanded: boolean){}

    /**
     * Method called when the settings of this facet are opened
     */
    public onOpenSettings(settingsOpened: boolean){}

    /**
     * Method enabling the facet component to be hidden (if, for example there is no data to display)
     */
    public isHidden(): boolean {
        return false;
    }

}