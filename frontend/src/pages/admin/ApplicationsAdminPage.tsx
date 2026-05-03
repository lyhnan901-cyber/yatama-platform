import { useState } from 'react';
import AdminCrudPage from './AdminCrudPage';
import type { Column } from './AdminCrudPage';

interface AppRow { id: number; name: string; phone: string; type: string; status: string; date: string; }

const DATA: AppRow[] = [
  { id: 1, name: 'عبدالله صالح', phone: '777123456', type: 'كفالة يتيم', status: 'pending', date: '2025-04-01' },
  { id: 2, name: 'مريم أحمد', phone: '771234567', type: 'دعم طبي', status: 'reviewing', date: '2025-03-28' },
  { id: 3, name: 'محمد علي', phone: '773456789', type: 'مساعدة أسرة', status: 'approved', date: '2025-03-25' },
  { id: 4, name: 'خديجة حسن', phone: '774567890', type: 'دعم تعليمي', status: 'rejected', date: '2025-03-20' },
  { id: 5, name: 'يوسف عمر', phone: '775678901', type: 'كفالة يتيم', status: 'pending', date: '2025-03-15' },
];

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  pending: { label: 'قيد الانتظار', cls: 'badge-warning' },
  reviewing: { label: 'قيد المراجعة', cls: 'badge-info' },
  approved: { label: 'مقبول', cls: 'badge-success' },
  rejected: { label: 'مرفوض', cls: 'badge-error' },
};

const COLUMNS: Column<AppRow>[] = [
  { key: 'name', label: 'مقدم الطلب' },
  { key: 'phone', label: 'الهاتف' },
  { key: 'type', label: 'نوع الطلب', render: (r) => <span className="badge badge-gold">{r.type}</span> },
  { key: 'status', label: 'الحالة', render: (r) => <span className={`badge ${STATUS_MAP[r.status].cls}`}>{STATUS_MAP[r.status].label}</span> },
  { key: 'date', label: 'التاريخ' },
];

export default function ApplicationsAdminPage() {
  return <AdminCrudPage title="طلبات المستفيدين" subtitle="إدارة طلبات المساعدة المقدمة" columns={COLUMNS} data={DATA} searchKeys={['name', 'type']} />;
}
