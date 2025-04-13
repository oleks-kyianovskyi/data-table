import { ColumnSchema } from '../DataTable/types.ts';
import { FilterState, FilterLogic } from './types';
import { FilterType } from '../../types/global.ts';

export const applyFilters = (
  data: Record<string, any>[],
  filters: FilterState,
  schema: ColumnSchema[],
  logic: FilterLogic
) => {
  const activeConditions: ((row: Record<string, any>) => boolean)[] = [];

  schema.forEach(col => {
    const filterValue = filters[col.key];

    const isInactive =
      filterValue === null ||
      filterValue === undefined ||
      (Array.isArray(filterValue) && filterValue.length === 0);

    if (isInactive) return;

    let condition: (row: Record<string, any>) => boolean;

    switch (col.type) {
      case FilterType.Text:
        condition = (row) =>
          String(row[col.key] ?? '')
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        break;

      case FilterType.Number:
        condition = (row) =>
          (filterValue.min == null || row[col.key] >= filterValue.min) &&
          (filterValue.max == null || row[col.key] <= filterValue.max);
        break;

      case FilterType.Date:
        condition = (row) => {
          const val = new Date(row[col.key]).getTime();
          const from = filterValue.from != null ? new Date(filterValue.from).getTime() : -Infinity;
          const to = filterValue.to != null ? new Date(filterValue.to).getTime() : Infinity;
          return val >= from && val <= to;
        };
        break;

      case FilterType.Enum:
        condition = (row) => row[col.key] === filterValue;
        break;

      default:
        condition = () => true;
        break;
    }

    activeConditions.push(condition);
  });

  return data.filter(row => {
    if (activeConditions.length === 0) return true;

    return logic === FilterLogic.And
      ? activeConditions.every(fn => fn(row))
      : activeConditions.some(fn => fn(row));
  });
};