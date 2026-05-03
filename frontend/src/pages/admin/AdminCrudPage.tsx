import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { fadeInUp } from '../../lib/animations';

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface AdminCrudPageProps<T extends { id: number }> {
  title: string;
  subtitle: string;
  columns: Column<T>[];
  data: T[];
  renderForm?: (item: T | null, onClose: () => void) => React.ReactNode;
  renderFilters?: () => React.ReactNode;
  searchKeys?: (keyof T)[];
}

export default function AdminCrudPage<T extends { id: number }>({
  title,
  subtitle,
  columns,
  data,
  renderForm,
  renderFilters,
  searchKeys = [],
}: AdminCrudPageProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<T | null>(null);
  const [adding, setAdding] = useState(false);
  const perPage = 10;

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    return data.filter((item) =>
      searchKeys.some((key) => {
        const val = item[key];
        return typeof val === 'string' && val.includes(search);
      })
    );
  }, [data, search, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>{title}</h1>
          <p style={{ color: '#8A96A8', fontSize: '0.85rem' }}>{subtitle}</p>
        </div>
        {renderForm && (
          <button onClick={() => setAdding(true)} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem',
            background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
            border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-primary-dark)',
            fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'var(--font-primary)',
          }}>
            <Plus size={16} />
            إضافة جديد
          </button>
        )}
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Search size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#8A96A8' }} />
          <input
            type="text" placeholder="بحث..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{
              width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontSize: '0.9rem',
              fontFamily: 'var(--font-primary)', outline: 'none',
            }}
          />
        </div>
        {renderFilters?.()}
      </div>

      {/* Table */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
        <div className="table-wrapper">
          <table className="table" style={{ color: '#E2E8F0' }}>
            <thead>
              <tr>
                <th style={{ color: '#8A96A8' }}>#</th>
                {columns.map((col) => <th key={col.key} style={{ color: '#8A96A8' }}>{col.label}</th>)}
                {renderForm && <th style={{ color: '#8A96A8' }}>إجراءات</th>}
              </tr>
            </thead>
            <tbody>
              {paged.map((item, idx) => (
                <tr key={item.id}>
                  <td style={{ color: '#8A96A8' }}>{(page - 1) * perPage + idx + 1}</td>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                  {renderForm && (
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => setEditing(item)} style={{ background: 'rgba(74,144,217,0.2)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.4rem', cursor: 'pointer', color: '#4A90D9' }}>
                          <Edit2 size={14} />
                        </button>
                        <button style={{ background: 'rgba(239,68,68,0.2)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.4rem', cursor: 'pointer', color: '#F87171' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {paged.length === 0 && (
                <tr><td colSpan={columns.length + 2} style={{ textAlign: 'center', padding: '3rem', color: '#8A96A8' }}>لا توجد بيانات</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-sm)', padding: '0.4rem', cursor: 'pointer', color: '#E2E8F0' }}>
            <ChevronRight size={16} />
          </button>
          <span style={{ color: '#8A96A8', fontSize: '0.85rem' }}>صفحة {page} من {totalPages}</span>
          <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-sm)', padding: '0.4rem', cursor: 'pointer', color: '#E2E8F0' }}>
            <ChevronLeft size={16} />
          </button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {(adding || editing) && renderForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
            onClick={() => { setAdding(false); setEditing(null); }}
          >
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              style={{ background: '#0D1F33', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 'var(--radius-xl)', padding: '2rem', maxWidth: 550, width: '100%', maxHeight: '80vh', overflow: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{editing ? 'تعديل' : 'إضافة جديد'}</h2>
                <button onClick={() => { setAdding(false); setEditing(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A96A8' }}>
                  <X size={20} />
                </button>
              </div>
              {renderForm(editing, () => { setAdding(false); setEditing(null); })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
