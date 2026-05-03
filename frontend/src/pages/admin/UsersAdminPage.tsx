import AdminCrudPage from './AdminCrudPage';
import type { Column } from './AdminCrudPage';

interface Row { id: number; fullName: string; email: string; role: string; active: boolean; created: string; }
const DATA: Row[] = [
  { id: 1, fullName: 'المشرف العام', email: 'admin@yatama-charity.org', role: 'مشرف عام', active: true, created: '2024-01-01' },
  { id: 2, fullName: 'سارة أحمد', email: 'sara@yatama-charity.org', role: 'محاسب', active: true, created: '2024-02-15' },
  { id: 3, fullName: 'خالد يحيى', email: 'khaled@yatama-charity.org', role: 'مسؤول ميداني', active: true, created: '2024-03-20' },
];
const COLS: Column<Row>[] = [
  { key: 'fullName', label: 'الاسم' },
  { key: 'email', label: 'البريد' },
  { key: 'role', label: 'الدور', render: (r) => <span className="badge badge-gold">{r.role}</span> },
  { key: 'active', label: 'الحالة', render: (r) => <span className={`badge ${r.active ? 'badge-success' : 'badge-error'}`}>{r.active ? 'نشط' : 'معطل'}</span> },
  { key: 'created', label: 'تاريخ الإنشاء' },
];

export default function UsersAdminPage() {
  return <AdminCrudPage title="المستخدمين" subtitle="إدارة حسابات المستخدمين" columns={COLS} data={DATA} searchKeys={['fullName', 'email']}
    renderForm={(item, onClose) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input defaultValue={item?.fullName || ''} placeholder="الاسم الكامل" style={{ width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
        <input defaultValue={item?.email || ''} placeholder="البريد الإلكتروني" style={{ width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
        <button onClick={onClose} style={{ padding: '0.7rem', background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-primary-dark)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-primary)' }}>حفظ</button>
      </div>
    )} />;
}
