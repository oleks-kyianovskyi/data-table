import { ColumnFormatting, SavedView } from './types';

export const formatValue = (value: any, format?: ColumnFormatting) => {
  if (value == null) return '-';

  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    case 'percent':;
      return `${(value * 100).toFixed(2)}%`;
    default:
      return value;
  }
};


const STORAGE_KEY = 'data-table-saved-views';

export const getSavedViews = (): SavedView[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveView = (view: SavedView) => {
  const existing = getSavedViews();
  const updated = [...existing.filter(v => v.name !== view.name), view];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const deleteView = (name: string) => {
  const existing = getSavedViews().filter(v => v.name !== name);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};