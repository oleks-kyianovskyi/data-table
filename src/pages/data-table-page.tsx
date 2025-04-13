import React, { useEffect, useState } from 'react';
import { FilterLogic, FilterState } from "../components/FilterPanel/types.ts";
import { data, schema } from "../data/mock-data.ts";
import { SavedView } from "../components/DataTable/types.ts";
import { useDataTableStore } from "../store/data-table-store.ts";
import { getSavedViews, saveView } from "../components/DataTable/utils.ts";
import { useFilteredData } from "../hooks/use-filtered-data.ts";
import DataTable from "../components/DataTable/DataTable.tsx";
import RowEditor from "../components/DataTable/RowEditor.tsx";
import FilterPanel from "../components/FilterPanel/FilterPanel.tsx";
import './DataTablePage.css';
import ThemeToggle from "../components/ThemeToggle/ThemeToggle.tsx";

const DEFAULT_FILTERS = {};
const DEFAULT_LOGIC = FilterLogic.And;

const DataTablePage = () => {
  const [filters, setFilters] = useState<FilterState>({});
  const [logic, setLogic] = useState<FilterLogic>(FilterLogic.And);
  const [schemaState, setSchemaState] = useState(schema); // for dynamic layout
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [views, setViews] = useState<SavedView[]>([]);
  const [viewName, setViewName] = useState('');

  const { rows, setRows, getRowById, updateRow } = useDataTableStore();

  useEffect(() => {
    setRows(data);
    setViews(getSavedViews());
  }, []);

  const handleSaveView = () => {
    if (!viewName.trim()) return;

    const newView: SavedView = {
      name: viewName,
      filters,
      logic,
      schema: schemaState,
    };

    saveView(newView);
    setViews(getSavedViews());
    setViewName('');
  };

  const handleLoadView = (view: SavedView) => {
    setFilters(view.filters);
    setLogic(view.logic);
    setSchemaState(view.schema);
  };

  const filtered = useFilteredData(rows, filters, schemaState, logic);

  return (
    <div className="data-table-page">
      <h2>Data Table with Views</h2>
      <ThemeToggle>Change theme</ThemeToggle>
      <div className="data-table-controls">
        <input
          placeholder="View name"
          value={viewName}
          onChange={(e) => setViewName(e.target.value)}
        />
        <button onClick={handleSaveView}>Save View</button>

        <select onChange={(e) => {
          const selected = views.find(v => v.name === e.target.value);
          if (selected) handleLoadView(selected);
        }}>
          <option value="">Load View</option>
          {views.map(view => (
            <option key={view.name} value={view.name}>{view.name}</option>
          ))}
        </select>

        <button onClick={() => setFilters({})}>Clear Filters</button>
        <button
          onClick={() => {
            setFilters(DEFAULT_FILTERS);
            setLogic(DEFAULT_LOGIC);
            setSchemaState(schema);
          }}
        >
          Reset to Default
        </button>
      </div>

      <FilterPanel
        schema={schemaState}
        filters={filters}
        onChange={setFilters}
        logic={logic}
        onLogicChange={setLogic}
      />
      <DataTable
        schema={schemaState}
        data={filtered}
        onRowClick={(row) => setSelectedId(row.id)}
      />
      <RowEditor
        schema={schemaState}
        data={selectedId != null ? getRowById(selectedId) ?? null : null}
        onClose={() => setSelectedId(null)}
        onSave={(updatedRow) => updateRow(updatedRow.id, updatedRow)}
      />
    </div>
  );
};

export default DataTablePage;