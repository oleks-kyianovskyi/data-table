import React from 'react';
import { ColumnSchema } from '../DataTable/types';
import { FilterState, FilterLogic } from './types';
import { FilterType } from "../../types/global.ts";
import './FilterPanel.css';

interface Props {
  schema: ColumnSchema[];
  filters: FilterState;
  onChange: (updated: FilterState) => void;
  logic: FilterLogic;
  onLogicChange: (logic: FilterLogic) => void;
}

const FilterPanel: React.FC<Props> = ({ schema, filters, onChange, logic, onLogicChange }) => {
  const handleUpdate = (key: string, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="filter-panel">
      <div className="filter-item">
        <label>Logic</label>
        <select value={logic} onChange={e => onLogicChange(e.target.value as FilterLogic)}>
          <option value={FilterLogic.And}>AND</option>
          <option value={FilterLogic.Or}>OR</option>
        </select>
      </div>

      {schema.map(col => {
        if (col.hidden) return null;

        const value = filters[col.key];

        switch (col.type) {
          case FilterType.Text:
            return (
              <div key={col.key} className="filter-item">
                <label>{col.label}</label>
                <input
                  type="text"
                  placeholder={`Search ${col.label}`}
                  value={value || ''}
                  onChange={e => handleUpdate(col.key, e.target.value)}
                />
              </div>
            );

          case FilterType.Number:
            return (
              <div key={col.key} className="filter-item">
                <label>{col.label}</label>
                <input
                  type="number"
                  placeholder="Min"
                  value={value?.min ?? ''}
                  onChange={e =>
                    handleUpdate(col.key, { ...value, min: parseFloat(e.target.value) || undefined })
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={value?.max ?? ''}
                  onChange={e =>
                    handleUpdate(col.key, { ...value, max: parseFloat(e.target.value) || undefined })
                  }
                />
              </div>
            );

          case FilterType.Date:
            return (
              <div key={col.key} className="filter-item">
                <label>{col.label}</label>
                <input
                  type="date"
                  value={value?.from ?? ''}
                  onChange={(e) =>
                    handleUpdate(col.key, {
                      ...value,
                      from: e.target.value || null,
                    })
                  }
                />
                <input
                  type="date"
                  value={value?.to ?? ''}
                  onChange={(e) =>
                    handleUpdate(col.key, {
                      ...value,
                      to: e.target.value || null,
                    })
                  }
                />
              </div>
            );

          case FilterType.Enum:
            return (
              <div key={col.key} className="filter-item">
                <label>{col.label}</label>
                <select
                  value={value ?? ''}
                  onChange={(e) => {
                    const selected = e.target.value;
                    const parsed = selected === '' ? null : selected;

                    handleUpdate(col.key, parsed);
                  }}
                >
                  <option value="">Any</option>
                  {Object.entries(col.enumValues ?? {}).map(([enumValue, enumLabel]) => (
                    <option key={enumValue} value={enumValue}>
                      {enumLabel}
                    </option>
                  ))}
                </select>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default FilterPanel;