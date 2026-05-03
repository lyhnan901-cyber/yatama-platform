import AdminCrudPage from './AdminCrudPage';
import type { Column } from './AdminCrudPage';

interface Row { id: number; name: string; position: string; department: string; salary: number; status: string; }
const DATA: Row[] = [
  { id: 1, name: 'عبدالرحمن محمد', position: 'مدير البرامج', department: 'البرامج', salary: 150000, status: 'نشط' },
  { id: 2, name: 'سارة أحمد', position: 'محاسبة', department: 'المالية', salary: 100000, status: 'نشط' },
  { id: 3, name: 'خالد يحيى', position: 'مسؤول ميداني', department: 'الميدان', salary: 80000, status: 'نشط' },
  { id: 4, name: 'فاطمة علي', position: 'مسؤولة اتصالات', department: 'التسويق', salary: 90000, status: 'نشط' },
];
const COLS: Column<Row>[] = [
  { key: 'name', label: 'الاسم' },
  { key: 'position', label: 'المنصب' },
  { key: 'department', label: 'القسم', render: (r) => <span className="badge badge-info">{r.department}</span> },
  { key: 'salary', label: 'الراتب', render: (r) => <>{r.salary.toLocaleString()} ريال</> },
  { key: 'status', label: 'الحالة', render: (r) => <span className="badge badge-success">{r.status}</span> },
];

export default function EmployeesPage() {
  return <AdminCrudPage title="الموظفين" subtitle="إدارة بيانات الموظفين" columns={COLS} data={DATA} searchKeys={['name', 'position']}
    renderForm={(item, onClose) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input defaultValue={item?.name || ''} placeholder="الاسم" style={{ width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
        <input defaultValue={item?.position || ''} placeholder="المنصب" style={{ width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
        <button onClick={onClose} style={{ padding: '0.7rem', background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-primary-dark)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-primary)' }}>حفظ</button>
      </div>
    )} />;
}
