import { useMemo } from 'react';
import { ColumnSchema } from '../components/DataTable/types';
import { FilterState, FilterLogic } from '../components/FilterPanel/types';
import { applyFilters } from '../components/FilterPanel/utils';

export const useFilteredData = (
  data: Record<string, any>[],
  filters: FilterState,
  schema: ColumnSchema[],
  logic: FilterLogic
) => {
  return useMemo(() => applyFilters(data, filters, schema, logic), [data, filters, schema, logic]);
};