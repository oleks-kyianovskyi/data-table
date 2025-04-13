import React from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { ColumnSchema } from './types';
import DataTableRow from './DataTableRow';
import './DataTable.css';

interface DataTableProps {
  schema: ColumnSchema[];
  data: Record<string, any>[];
  onRowClick?: (row: Record<string, any>) => void;
}

const DataTable: React.FC<DataTableProps> = ({ schema, data, onRowClick }) => {
  const visibleCols = schema.filter(col => !col.hidden);
  const rowHeight = 40;
  const listHeight = 600;

  const Row = ({ index, style }: ListChildComponentProps) => (
    <DataTableRow
      row={data[index]}
      index={index}
      schema={visibleCols}
      style={style}
      onClick={onRowClick}
    />
  );

  return (
    <div className="table-wrapper">
      <div className="data-table-header">
        {visibleCols.map(col => (
          <div className="data-table-header-cell" key={col.key}>
            {col.label}
          </div>
        ))}
      </div>
      <List
        height={listHeight}
        itemCount={data.length}
        itemSize={rowHeight}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default DataTable;