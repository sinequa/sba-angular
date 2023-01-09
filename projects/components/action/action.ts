import {Type} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {MessageParams} from "@sinequa/core/intl";
import { Placement } from "@sinequa/components/utils";

export abstract class IAction {
    /**
     * internal name of the `Action`
     */
    name?: string;
    /**
     * the display text of the `Action`
     */
    text?: string;
    /**
     * when set, `Action` element is a link <a> tag, otherwise it's a button tag
     */
    href?: string;
    target?: string;
    /**
     * icon class name displayed before the `Action` text
     */
    icon?: string;
    /**
     * additional css styles to add
     */
    styles?: string | string[] | Set<string> | { [klass: string]: any };
    /**
     * icon class name displayed after the `Action` text
     */
    iconAfter?: string;
    /**
     * when true, `Action` is displayed as a menu separator
     */
    separator?: boolean;
    /**
     * The children are scrollable
     */
    scrollable?: boolean;
    /**
     * A separate item whose children are scrollable "in place"
     */
    scrollGroup?: boolean;
    /**
     * embedded component dynamically loaded
     */
    component?: Type<any>;
    /**
     * component's inputs. Work with `component`
     */
    componentInputs?: any;
    /**
     * any additional informations
     */
    data?: any;
    /**
     * tooltip's text
     */
    title?: string;
    /**
     * tooltip placement, when undefined default is"bottom"
     */
    titlePlacement?: Placement;
    /**
     * tooltip fallback placement(s)
     */
    fallbackPlacements?: Placement | Placement[];
    /**
     * when true, the display of the `Action` will start with a check icon
     */
    selected?: boolean;
    /**
     * when true, the `Action` is grayed out
     */
    disabled?: boolean;
    /**
     *  when true, the `Action` is not shown
     */
    hidden?: boolean;
    /**
     * A dropdown with only one child is flattened to show only the child at the top level
     */
    flattenable?: boolean;
    /**
     * i18n - passed to sqMessage in (eg) action-item-content
     * work with the `text` property
     */
    messageParams?: MessageParams;
    /**
     * when true, display the `title` property as a dropdown header before children elements
     */
    headerGroup?: boolean;

    action?: (item: Action, event: UIEvent) => void;
    toggle?: (item: Action, open: boolean) => void;
    updater?: (item: Action) => void;
    init?: (item: Action) => void;
    destroy?: (item: Action) => void;

    /**
     * children `Action` elements. Used with nested menus
     */
    children?: Action[];
}

export class Action extends IAction {

    constructor(options: IAction) {
        super();
        Utils.extend(this, options);
    }

    get hasChildren(): boolean {
        return !!this.children && (this.children.length > 0);
    }

    get showSelected(): boolean {
        return typeof this.selected !== 'undefined';
    }

    update(): void {
        if (this.updater) {
            this.updater(this);
        }
        if (this.children) {
            for (const child of this.children) {
                child.update();
            }
        }
    }
}

/**
 * Creating a new Action object with the separator property set to true.
 **/
export const ActionSeparator = new Action({ separator: true });
