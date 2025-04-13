import React, { useEffect, useState } from 'react';
import { ColumnSchema } from './types';
import './RowEditor.css';
import { FilterType } from "../../types/global.ts";

interface RowEditorProps {
  schema: ColumnSchema[];
  data: Record<string, any> | null;
  onClose: () => void;
  onSave: (updated: Record<string, any>) => void;
}

const RowEditor: React.FC<RowEditorProps> = ({ schema, data, onClose, onSave }) => {
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (data) {
      setFormState(data);
      setErrors({});
    }
  }, [data]);

  const handleChange = (key: string, value: any) => {
    setFormState(prev => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    schema.forEach(col => {
      if (!formState[col.key] && col.type !== FilterType.Number && col.type !== FilterType.Enum) {
        errs[col.key] = 'Required';
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSave(formState);
    onClose();
  };

  if (!data) return null;

  return (
    <div className="row-editor">
      <h3>Edit Row</h3>
      {schema.map(col => {
        if (col.hidden) return null;

        const val = formState[col.key];

        return (
          <div key={col.key} style={{ marginBottom: '1rem' }}>
            <label>{col.label}</label><br />
            {col.type === FilterType.Enum ? (
              <select
                value={val ?? ''}
                onChange={(e) => handleChange(col.key, Number(e.target.value))}
              >
                <option value="">-- Select --</option>
                {Object.entries(col.enumValues ?? {}).map(([v, label]) => (
                  <option key={v} value={v}>{label}</option>
                ))}
              </select>
            ) : col.type === FilterType.Date ? (
              <input
                type="date"
                value={val ?? ''}
                onChange={e => handleChange(col.key, e.target.value)}
              />
            ) : col.type === FilterType.Number ? (
              <input
                type="number"
                value={val ?? ''}
                onChange={e => handleChange(col.key, parseFloat(e.target.value))}
              />
            ) : (
              <input
                type="text"
                value={val ?? ''}
                onChange={e => handleChange(col.key, e.target.value)}
              />
            )}
            {errors[col.key] && (
              <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors[col.key]}</div>
            )}
          </div>
        );
      })}
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose} style={{ marginLeft: '0.5rem' }}>Cancel</button>
    </div>
  );
};

export default RowEditor;