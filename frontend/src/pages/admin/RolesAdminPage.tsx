import AdminCrudPage from './AdminCrudPage';
import type { Column } from './AdminCrudPage';

interface Row { id: number; name: string; slug: string; usersCount: number; }
const DATA: Row[] = [
  { id: 1, name: 'مشرف عام', slug: 'super_admin', usersCount: 1 },
  { id: 2, name: 'مدير', slug: 'admin', usersCount: 2 },
  { id: 3, name: 'محاسب', slug: 'accountant', usersCount: 1 },
  { id: 4, name: 'مسؤول ميداني', slug: 'field_officer', usersCount: 3 },
  { id: 5, name: 'مراسل', slug: 'reporter', usersCount: 2 },
  { id: 6, name: 'عارض', slug: 'viewer', usersCount: 5 },
];
const COLS: Column<Row>[] = [
  { key: 'name', label: 'اسم الدور' },
  { key: 'slug', label: 'المعرف', render: (r) => <code style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: 4, fontSize: '0.8rem' }}>{r.slug}</code> },
  { key: 'usersCount', label: 'عدد المستخدمين', render: (r) => <span className="badge badge-info">{r.usersCount}</span> },
];

export default function RolesAdminPage() {
  return <AdminCrudPage title="الأدوار" subtitle="إدارة أدوار المستخدمين والصلاحيات" columns={COLS} data={DATA} searchKeys={['name', 'slug']}
    renderForm={(item, onClose) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input defaultValue={item?.name || ''} placeholder="اسم الدور" style={{ width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
        <input defaultValue={item?.slug || ''} placeholder="المعرف (مثال: admin)" style={{ width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
        <button onClick={onClose} style={{ padding: '0.7rem', background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-primary-dark)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-primary)' }}>حفظ</button>
      </div>
    )} />;
}
