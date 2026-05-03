import { useState } from 'react';
import AdminCrudPage from './AdminCrudPage';
import type { Column } from './AdminCrudPage';

interface OrphanRow { id: number; fullName: string; age: number; gender: string; education: string; status: string; }
interface FamilyRow { id: number; headName: string; members: number; income: number; governorate: string; status: string; }

const ORPHANS: OrphanRow[] = [
  { id: 1, fullName: 'أحمد يحيى', age: 8, gender: 'ذكر', education: 'ابتدائي', status: 'مكفول' },
  { id: 2, fullName: 'سارة علي', age: 12, gender: 'أنثى', education: 'إعدادي', status: 'مكفول' },
  { id: 3, fullName: 'محمد خالد', age: 6, gender: 'ذكر', education: 'تمهيدي', status: 'بانتظار الكفالة' },
  { id: 4, fullName: 'فاطمة عمر', age: 15, gender: 'أنثى', education: 'ثانوي', status: 'مكفول' },
  { id: 5, fullName: 'عبدالله حسن', age: 10, gender: 'ذكر', education: 'ابتدائي', status: 'بانتظار الكفالة' },
];

const FAMILIES: FamilyRow[] = [
  { id: 1, headName: 'أم أحمد', members: 5, income: 30000, governorate: 'صنعاء', status: 'مسجلة' },
  { id: 2, headName: 'أم محمد', members: 7, income: 15000, governorate: 'عدن', status: 'مسجلة' },
  { id: 3, headName: 'أم خالد', members: 4, income: 25000, governorate: 'تعز', status: 'جديدة' },
];

const ORPHAN_COLS: Column<OrphanRow>[] = [
  { key: 'fullName', label: 'الاسم' },
  { key: 'age', label: 'العمر' },
  { key: 'gender', label: 'الجنس' },
  { key: 'education', label: 'المرحلة الدراسية' },
  { key: 'status', label: 'الحالة', render: (r) => <span className={`badge ${r.status === 'مكفول' ? 'badge-success' : 'badge-warning'}`}>{r.status}</span> },
];

const FAMILY_COLS: Column<FamilyRow>[] = [
  { key: 'headName', label: 'رب الأسرة' },
  { key: 'members', label: 'عدد الأفراد' },
  { key: 'income', label: 'الدخل الشهري', render: (r) => <>{r.income.toLocaleString()} ريال</> },
  { key: 'governorate', label: 'المحافظة' },
  { key: 'status', label: 'الحالة', render: (r) => <span className="badge badge-info">{r.status}</span> },
];

export default function BeneficiariesAdminPage() {
  const [tab, setTab] = useState<'orphans' | 'families'>('orphans');
  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {(['orphans', 'families'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', border: 'none',
            background: tab === t ? 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))' : 'rgba(255,255,255,0.05)',
            color: tab === t ? 'var(--color-primary-dark)' : '#8A96A8', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'var(--font-primary)',
          }}>
            {t === 'orphans' ? 'الأيتام' : 'الأسر'}
          </button>
        ))}
      </div>
      {tab === 'orphans' ? (
        <AdminCrudPage title="الأيتام" subtitle="إدارة بيانات الأيتام المستفيدين" columns={ORPHAN_COLS} data={ORPHANS} searchKeys={['fullName']}
          renderForm={(item, onClose) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input defaultValue={item?.fullName || ''} placeholder="الاسم" style={{ width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
              <button onClick={onClose} style={{ padding: '0.7rem', background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-primary-dark)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-primary)' }}>حفظ</button>
            </div>
          )}
        />
      ) : (
        <AdminCrudPage title="الأسر" subtitle="إدارة بيانات الأسر المستفيدة" columns={FAMILY_COLS} data={FAMILIES} searchKeys={['headName']}
          renderForm={(item, onClose) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input defaultValue={item?.headName || ''} placeholder="اسم رب الأسرة" style={{ width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: '#E2E8F0', fontFamily: 'var(--font-primary)' }} />
              <button onClick={onClose} style={{ padding: '0.7rem', background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-primary-dark)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-primary)' }}>حفظ</button>
            </div>
          )}
        />
      )}
    </div>
  );
}
