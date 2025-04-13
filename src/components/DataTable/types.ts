import { FilterLogic, FilterState } from "../FilterPanel/types.ts";
import { FilterType } from "../../types/global.ts";

export type ColumnFormatting = 'currency' | 'percent';

export interface ColumnSchema {
  key: string;
  label: string;
  type: FilterType;
  sortable: boolean;
  hidden?: boolean;
  format?: ColumnFormatting;
  enumValues?: Record<string | number, string>;
}

export interface SavedView {
  name: string;
  filters: FilterState;
  logic: FilterLogic;
  schema: ColumnSchema[];
}