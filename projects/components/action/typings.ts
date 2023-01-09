import { Action } from "./action";

type StringWithAutocomplete<T> = T | (string & Record<never, never>);
export type ActionSize = StringWithAutocomplete<"xs" | "sm" | "md" | "lg" | "xl" | "xxl">;

interface ActionOptions {
  /**
   * the size of the menu
   */
  size?: ActionSize;
  /**
   * the css class of the menu
   */
  style?: string;
  /**
   * whether to automatically change the visualisation of the menu and
   * it's children when resizing the browser window
   */
  autoAdjust?: boolean;
  /**
   * if `autoAdjust` is true, this property defines the size of the browser
   * window at which the menu size can be adjusted
   */
  autoAdjustBreakpoint?: ActionSize;
  /**
   * whether the menu elements are right-aligned
   */
  rightAligned?: boolean;
}

export interface ActionButtonsOptions extends ActionOptions {
  items: Action[] | Action;
}

export interface ActionItemOptions extends ActionOptions {
  /**
   * the `Action` object representing the menu
   */
  item: Action;
  /**
  * if true, the menu elements will have `nav-link` css class,
  * otherwise, they are set to `dropdown-item`
  */
  inMenu: boolean;
}

export interface DropdownMenuOptions {
  /**
   * the `Action` object representing the menu
   */
  item: Action;
  /**
   * whether the menu elements are right-aligned
   */
  rightAligned?: boolean;
  /**
   * the css class of the menu when it is shown
   */
  showMenuClass: string;
  /**
   * text of the section displayed above the `Action` element
   */
  header?: string;
}