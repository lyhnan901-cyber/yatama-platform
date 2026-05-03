import AdminCrudPage from './AdminCrudPage';
import type { Column } from './AdminCrudPage';

interface Row { id: number; title: string; category: string; status: string; date: string; }
const DATA: Row[] = [
  { id: 1, title: 'عنصر 1', category: 'عام', status: 'منشور', date: '2025-04-01' },
  { id: 2, title: 'عنصر 2', category: 'عام', status: 'مسودة', date: '2025-03-28' },
  { id: 3, title: 'عنصر 3', category: 'مميز', status: 'منشور', date: '2025-03-25' },
];
const COLS: Column<Row>[] = [
  { key: 'title', label: 'العنوان' },
  { key: 'category', label: 'التصنيف', render: (r) => <span className="badge badge-gold">{r.category}</span> },
  { key: 'status', label: 'الحالة', render: (r) => <span className={`badge ${r.status === 'منشور' ? 'badge-success' : 'badge-warning'}`}>{r.status}</span> },
  { key: 'date', label: 'التاريخ' },
];

export default function AdminStoriesPage() {
  return <AdminCrudPage title="قصص النجاح" subtitle="إدارة القصص" columns={COLS} data={DATA} searchKeys={['title', 'category']}
    renderForm={(item, onClose) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input defaultValue={item?.title || ''} placeholder="العنوان" style={{ width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
        <textarea placeholder="المحتوى" rows={4} style={{ width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)', resize: 'vertical' }} />
        <button onClick={onClose} style={{ padding: '0.7rem', background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-primary-dark)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-primary)' }}>حفظ</button>
      </div>
    )} />;
}
