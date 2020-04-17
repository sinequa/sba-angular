import {Utils} from "@sinequa/core/base";
import {MessageParams} from "@sinequa/core/intl";

export interface IAction {
    name?: string;
    text?: string;
    href?: string;
    icon?: string;
    iconAfter?: string;
    separator?: boolean;
    scrollable?: boolean; // The children are scrollable
    scrollGroup?: boolean; // A separate item whose children are scrollable "in place"
    component?: Function;
    componentInputs?: any;
    data?: any;
    title?: string;
    selected?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    flattenable?: boolean; // A dropdown with only one child is flattened to show only the child at the top level
    messageParams?: MessageParams; // i18n - passed to sqMessage in (eg) action-item-content

    action?: (item: Action, event: UIEvent) => void;
    toggle?: (item: Action, open: boolean) => void;
    updater?: (item: Action) => void;
    init?: (item: Action) => void;
    destroy?: (item: Action) => void;

    children?: Action[];
}

export class Action implements IAction {
    name: string;
    text: string;
    href: string;
    icon: string; // css class
    iconAfter: string; // css class
    separator: boolean;
    scrollable: boolean;
    scrollGroup: boolean;
    component: Function;
    componentInputs: any;
    data: any;
    title: string;
    selected: boolean;
    disabled: boolean;
    hidden: boolean;
    flattenable: boolean;
    messageParams: MessageParams;
    action: (item: Action, event: UIEvent) => void;
    toggle: (item: Action, open: boolean) => void;
    updater: (item: Action) => void;
    init: (item: Action) => void;
    destroy: (item: Action) => void;

    children: Action[];

    constructor(options: IAction) {
        Utils.extend(this, options);
    }

    get hasChildren(): boolean {
        return this.children && (this.children.length > 0);
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