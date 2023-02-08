import { Action } from "@sinequa/components/action";

/**
 * This interface describes the properties of a widget that should
 * be persisted to restore the dashboard in the same state as it was
 * left.
 */
 export interface WidgetState {
  /** Type of widget to be displayed */
  type: string;
  /** x coordinate in the dashboard */
  x: number;
  /** y coordinate in the dashboard */
  y: number;
  /** width in the dashboard */
  cols: number;
  /** height in the dashboard */
  rows: number;
  /** Title of this widget */
  title?: string;

  /** Store other persistent properties */
  [key: string]: any;
}

/**
 * This interface describes the complete state of a widget.
 * This includes different types of state:
 * - Persistent state (WidgetState): this is the minimal and necessary
 * amount of information to store to reconstruct the dashboard.
 * - Volatile state (actions, width, height, maximized...): these properties
 * are managed by the sq-dashboard component during the life cycle of the component.
 * - Static configuration (icon, removable, maximizable...): these properties
 * do not need to be persisted as they are assumed to be constant and included in
 * the widget's definition once and for all.
 */
export interface Widget {
  /**
   * Contains the gridster coordinates in the dashboard.
   * It can be used to store other configuration needed to populate this widget and to persist its state.
   **/
  state: WidgetState;


  // Static configuration

  /** Icon class for this widget */
  icon?: string;

  /** Whether this widget can be removed */
  removable?: boolean;

  /** Whether this widget can be maximized */
  maximizable?: boolean;

  /** Whether this widget can be renamed */
  renamable?: boolean;


  // Volatile state

  /** Width of the widget */
  width?: number;

  /** Height of the widget */
  height?: number;

  /**
   * Actions to close/rename/maximize the widget
   */
  actions?: Action[];

  /**
   * Whether this widget is maximized
   */
  maximized?: boolean;

  /**
   * The state to restore when this widget minimized
   */
  stateMinimized?: {
    width: number;
    height: number;
    top: number;
  };

  /** Store other volative properties */
  [key: string]: any;
}


/**
 * An interface to define a type of widget that can be added to the dashboard. This basic information
 * is used to create a button to select a type of widget among a list.
 */
 export interface WidgetOption {
  type: string;
  icon: string;
  text: string;
  rows: number;
  cols: number;
  unique?: boolean;
  renamable?: boolean;
  maximizable?: boolean;
  removable?: boolean;
  state?: {};
  init?: (widget: Widget) => void;
}
