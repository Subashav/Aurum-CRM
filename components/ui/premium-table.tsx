"use client";

import { useState } from 'react';
import { cn } from '@/lib/cn';

type Column = {
  key: string;
  title: string;
  width?: string;
  render?: (row: any) => React.ReactNode;
  editable?: boolean;
  editor?: 'text' | 'select' | 'date';
  options?: string[];
};

type Props = {
  columns: Column[];
  data: any[];
  onUpdate?: (id: string, updates: Record<string, any>) => void;
};

export function PremiumTable({ columns, data, onUpdate }: Props) {
  const [editing, setEditing] = useState<{ id: string; key: string } | null>(null);
  const [draft, setDraft] = useState<string>('');

  const startEdit = (id: string, key: string, value: string) => {
    setEditing({ id, key });
    setDraft(value ?? '');
  };

  const cancelEdit = () => {
    setEditing(null);
    setDraft('');
  };

  const saveEdit = (id: string, key: string) => {
    if (onUpdate) onUpdate(id, { [key]: draft });
    cancelEdit();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full w-full text-left">
        <thead className="sticky top-0 z-10" style={{ backgroundColor: 'var(--panel)', borderBottom: '1px solid var(--border)' }}>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={cn('px-4 py-3 text-xs font-medium text-muted uppercase tracking-[0.14em]')} style={{ width: col.width }}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? data.map((row) => (
            <tr key={row.id} className="group border-t border-white/[0.03] hover:bg-white/[0.02] transition-colors">
              {columns.map((col) => {
                const value = row[col.key];
                const inEdit = editing && editing.id === row.id && editing.key === col.key;

                return (
                  <td key={col.key} className="px-4 py-4 align-middle text-sm" style={{ color: 'var(--fg-color)' }}>
                    {inEdit ? (
                      <div className="flex items-center gap-2">
                        {col.editor === 'select' && col.options ? (
                          <select 
                            value={draft} 
                            onChange={(e) => setDraft(e.target.value)} 
                            className="bg-black border border-white/20 rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-500"
                          >
                            {col.options.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        ) : (
                          <input 
                            className="bg-black border border-white/20 rounded px-2 py-1 text-xs focus:outline-none focus:border-amber-500" 
                            value={draft} 
                            onChange={(e) => setDraft(e.target.value)} 
                            onKeyDown={(e) => e.key === 'Enter' && saveEdit(row.id, col.key)}
                          />
                        )}
                        <button className="text-[10px] font-bold uppercase text-amber-500" onClick={() => saveEdit(row.id, col.key)}>Save</button>
                      </div>
                    ) : col.render ? (
                      col.render(row)
                    ) : (
                      <div onDoubleClick={() => col.editable && startEdit(row.id, col.key, value)} className={cn(col.editable && "cursor-pointer hover:text-amber-300 transition-colors")}>
                        {value ?? '-'}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          )) : (
            <tr>
              <td colSpan={columns.length} className="py-20 text-center">
                <div className="flex flex-col items-center justify-center opacity-20">
                  <svg className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-sm font-medium tracking-widest uppercase">No records found</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PremiumTable;
