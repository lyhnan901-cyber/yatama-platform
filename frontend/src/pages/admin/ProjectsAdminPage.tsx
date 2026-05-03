import AdminCrudPage from './AdminCrudPage';
import type { Column } from './AdminCrudPage';

interface ProjectRow { id: number; title: string; category: string; goalAmount: number; currentAmount: number; status: string; }

const DATA: ProjectRow[] = [
  { id: 1, title: 'كفالة 100 يتيم في صنعاء', category: 'كفالة', goalAmount: 500000, currentAmount: 350000, status: 'active' },
  { id: 2, title: 'سلة رمضان الغذائية', category: 'إغاثة', goalAmount: 200000, currentAmount: 180000, status: 'active' },
  { id: 3, title: 'مشروع العلاج والدواء', category: 'صحة', goalAmount: 300000, currentAmount: 120000, status: 'active' },
  { id: 4, title: 'الحقيبة المدرسية', category: 'تعليم', goalAmount: 150000, currentAmount: 95000, status: 'active' },
  { id: 5, title: 'إغاثة عدن', category: 'إغاثة', goalAmount: 400000, currentAmount: 400000, status: 'completed' },
];

const COLUMNS: Column<ProjectRow>[] = [
  { key: 'title', label: 'العنوان' },
  { key: 'category', label: 'التصنيف', render: (r) => <span className="badge badge-gold">{r.category}</span> },
  { key: 'goalAmount', label: 'المطلوب', render: (r) => <>{r.goalAmount.toLocaleString()} ريال</> },
  { key: 'currentAmount', label: 'تم جمعه', render: (r) => <span style={{ color: 'var(--color-gold)' }}>{r.currentAmount.toLocaleString()} ريال</span> },
  { key: 'status', label: 'الحالة', render: (r) => <span className={`badge ${r.status === 'active' ? 'badge-success' : 'badge-info'}`}>{r.status === 'active' ? 'نشط' : 'مكتمل'}</span> },
];

export default function ProjectsAdminPage() {
  return (
    <AdminCrudPage
      title="المشاريع"
      subtitle="إدارة المشاريع الخيرية"
      columns={COLUMNS}
      data={DATA}
      searchKeys={['title', 'category']}
      renderForm={(item, onClose) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input defaultValue={item?.title || ''} placeholder="عنوان المشروع" style={{ width: '100%', padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
          <input defaultValue={item?.goalAmount || ''} placeholder="المبلغ المطلوب" type="number" style={{ width: '100%', padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
          <textarea placeholder="وصف المشروع" rows={4} style={{ width: '100%', padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)', resize: 'vertical' }} />
          <button onClick={onClose} style={{ padding: '0.7rem', background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-primary-dark)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-primary)' }}>
            {item ? 'حفظ التعديلات' : 'إضافة المشروع'}
          </button>
        </div>
      )}
    />
  );
}
