import AdminCrudPage from './AdminCrudPage';
import type { Column } from './AdminCrudPage';

interface DonationRow { id: number; donorName: string; amount: number; project: string; status: string; date: string; }

const DATA: DonationRow[] = [
  { id: 1, donorName: 'أحمد محمد', amount: 50000, project: 'كفالة أيتام', status: 'completed', date: '2025-04-01' },
  { id: 2, donorName: 'فاطمة علي', amount: 25000, project: 'سلة رمضان', status: 'completed', date: '2025-03-28' },
  { id: 3, donorName: 'متبرع مجهول', amount: 100000, project: 'عام', status: 'completed', date: '2025-03-25' },
  { id: 4, donorName: 'خالد سعيد', amount: 15000, project: 'مشروع العلاج', status: 'pending', date: '2025-03-20' },
  { id: 5, donorName: 'سارة أحمد', amount: 30000, project: 'تعليم', status: 'completed', date: '2025-03-15' },
];

const COLUMNS: Column<DonationRow>[] = [
  { key: 'donorName', label: 'المتبرع' },
  { key: 'amount', label: 'المبلغ', render: (r) => <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>{r.amount.toLocaleString()} ريال</span> },
  { key: 'project', label: 'المشروع' },
  { key: 'status', label: 'الحالة', render: (r) => <span className={`badge ${r.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>{r.status === 'completed' ? 'مكتمل' : 'معلق'}</span> },
  { key: 'date', label: 'التاريخ' },
];

export default function DonationsAdminPage() {
  return <AdminCrudPage title="التبرعات" subtitle="إدارة التبرعات والمدفوعات" columns={COLUMNS} data={DATA} searchKeys={['donorName', 'project']} />;
}
