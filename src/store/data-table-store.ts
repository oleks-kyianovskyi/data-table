import { create } from 'zustand';

type Row = Record<string, any>;

interface DataTableStore {
  rows: Row[];
  setRows: (rows: Row[]) => void;
  updateRow: (id: string | number, updated: Row) => void;
  getRowById: (id: string | number) => Row | undefined;
}

export const useDataTableStore = create<DataTableStore>((set, get) => ({
  rows: [],
  setRows: (rows) => set({ rows }),
  updateRow: (id, updated) => {
    const newRows = get().rows.map((row) =>
      row.id === id ? { ...row, ...updated } : row
    );
    set({ rows: newRows });
  },
  getRowById: (id) => get().rows.find(row => row.id === id),
}));