export enum FilterLogic {
  And = 'AND',
  Or = 'OR',
}

export interface FilterState {
  [key: string]: any;
}