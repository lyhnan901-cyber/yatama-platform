import AdminCrudPage from './AdminCrudPage';
import type { Column } from './AdminCrudPage';

interface Row { id: number; name: string; slug: string; group: string; }
const DATA: Row[] = [
  { id: 1, name: 'عرض المشاريع', slug: 'projects.view', group: 'المشاريع' },
  { id: 2, name: 'إنشاء مشروع', slug: 'projects.create', group: 'المشاريع' },
  { id: 3, name: 'عرض التبرعات', slug: 'donations.view', group: 'التبرعات' },
  { id: 4, name: 'إدارة المستخدمين', slug: 'users.manage', group: 'المستخدمين' },
  { id: 5, name: 'عرض التقارير', slug: 'reports.view', group: 'التقارير' },
  { id: 6, name: 'إدارة الطلبات', slug: 'applications.manage', group: 'الطلبات' },
];
const COLS: Column<Row>[] = [
  { key: 'name', label: 'الصلاحية' },
  { key: 'slug', label: 'المعرف', render: (r) => <code style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: 4, fontSize: '0.8rem' }}>{r.slug}</code> },
  { key: 'group', label: 'المجموعة', render: (r) => <span className="badge badge-info">{r.group}</span> },
];

export default function PermissionsAdminPage() {
  return <AdminCrudPage title="الصلاحيات" subtitle="إدارة صلاحيات النظام" columns={COLS} data={DATA} searchKeys={['name', 'slug']}
    renderForm={(item, onClose) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input defaultValue={item?.name || ''} placeholder="اسم الصلاحية" style={{ width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
        <input defaultValue={item?.slug || ''} placeholder="المعرف (مثال: projects.view)" style={{ width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
        <button onClick={onClose} style={{ padding: '0.7rem', background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-primary-dark)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-primary)' }}>حفظ</button>
      </div>
    )} />;
}
