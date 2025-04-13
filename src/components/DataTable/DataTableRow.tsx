import React from 'react';
import { ColumnSchema } from './types';
import { formatValue } from './utils';
import { FilterType } from "../../types/global.ts";

interface DataTableRowProps {
  row: Record<string, any>;
  schema: ColumnSchema[];
  onClick?: (row: Record<string, any>) => void;
  index: number;
  style: any;
}

const DataTableRow: React.FC<DataTableRowProps> = ({ row, schema, onClick, style, index }) => {
  return (
    <div
      className={`data-table-row ${index % 2 === 0 ? 'even' : 'odd'}`}
      style={{ ...style, cursor: onClick ? 'pointer' : 'default' }}
      onClick={() => onClick?.(row)}
    >
      {schema.map((col) => {
        if (col.hidden) return null;

        const raw = row[col.key];
        const display =
          col.type === FilterType.Enum && col.enumValues
            ? col.enumValues[raw] ?? raw
            : formatValue(raw, col.format);

        return (
          <div className="data-table-cell" key={col.key}>
            {display}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(DataTableRow);