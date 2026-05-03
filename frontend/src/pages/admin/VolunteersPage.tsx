import AdminCrudPage from './AdminCrudPage';
import type { Column } from './AdminCrudPage';

interface Row { id: number; name: string; skills: string; hours: number; status: string; joined: string; }
const DATA: Row[] = [
  { id: 1, name: 'محمد سالم', skills: 'تصميم، تسويق', hours: 120, status: 'نشط', joined: '2024-01-15' },
  { id: 2, name: 'أمل خالد', skills: 'تعليم، إدارة', hours: 85, status: 'نشط', joined: '2024-03-20' },
  { id: 3, name: 'يوسف أحمد', skills: 'برمجة، تقنية', hours: 200, status: 'نشط', joined: '2023-09-01' },
  { id: 4, name: 'نورة حسن', skills: 'طبية، إسعافات', hours: 60, status: 'غير نشط', joined: '2024-06-10' },
];
const COLS: Column<Row>[] = [
  { key: 'name', label: 'الاسم' },
  { key: 'skills', label: 'المهارات' },
  { key: 'hours', label: 'الساعات', render: (r) => <span style={{ color: 'var(--color-gold)' }}>{r.hours} ساعة</span> },
  { key: 'status', label: 'الحالة', render: (r) => <span className={`badge ${r.status === 'نشط' ? 'badge-success' : 'badge-warning'}`}>{r.status}</span> },
  { key: 'joined', label: 'تاريخ الانضمام' },
];

export default function VolunteersPage() {
  return <AdminCrudPage title="المتطوعين" subtitle="إدارة المتطوعين وساعات التطوع" columns={COLS} data={DATA} searchKeys={['name', 'skills']}
    renderForm={(item, onClose) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input defaultValue={item?.name || ''} placeholder="الاسم" style={{ width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
        <input defaultValue={item?.skills || ''} placeholder="المهارات" style={{ width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
        <button onClick={onClose} style={{ padding: '0.7rem', background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-primary-dark)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-primary)' }}>حفظ</button>
      </div>
    )} />;
}
