import { Validator } from "@sinequa/core/validation";

export module JsonInfo {
  export interface Entry {
      type: string;
      path: string;
      valueType: string;
      label: string;
      list?: string;
      pattern?: string;
      min?: number | Date;
      max?: number | Date;
      validators?: Validator[];
  }

  export enum InputType {
      Entry = 'JsonEntryInput',
      Range = 'JsonRangeInput',
      MultiEntry = 'JsonMultiEntryInput',
  }

  export enum ValueType {
      String = 'String',
      Int = 'Int',
      Number = 'Number',
      Date = 'Date',
      Bool = 'Bool',
  }

  export interface EntryInput extends Entry {
      type: InputType.Entry;
  }

  export interface RangeInput extends Entry {
      type: InputType.Range;
  }

  export interface MultiEntryInput extends Entry {
      type: InputType.MultiEntry;
      distinct?: boolean;
      nbVisibleLines?: number;
  }
}