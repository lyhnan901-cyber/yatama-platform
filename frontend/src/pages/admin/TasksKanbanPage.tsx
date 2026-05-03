import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, GripVertical, Clock, AlertTriangle, Flag, CheckCircle, X } from 'lucide-react';
import { TASK_STATUSES, PRIORITY_COLORS } from '../../lib/constants';

interface Task {
  id: number;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: string;
  assignee?: string;
  dueDate?: string;
}

const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'توزيع السلال الغذائية — صنعاء', priority: 'high', status: 'todo', assignee: 'أحمد محمد', dueDate: '2025-05-10' },
  { id: 2, title: 'زيارة ميدانية — عدن', priority: 'medium', status: 'todo', assignee: 'خالد يحيى' },
  { id: 3, title: 'إعداد تقرير الشفافية', priority: 'high', status: 'in_progress', assignee: 'سارة أحمد', dueDate: '2025-05-15' },
  { id: 4, title: 'تحديث بيانات المستفيدين', priority: 'medium', status: 'in_progress', assignee: 'فاطمة علي' },
  { id: 5, title: 'مراجعة طلبات الكفالة', priority: 'low', status: 'review', assignee: 'عبدالرحمن' },
  { id: 6, title: 'حملة التوعية الإلكترونية', priority: 'urgent', status: 'review', assignee: 'نورة حسن', dueDate: '2025-05-05' },
  { id: 7, title: 'توثيق قصص النجاح', priority: 'medium', status: 'completed', assignee: 'محمد سالم' },
  { id: 8, title: 'إرسال تقرير المتبرعين', priority: 'low', status: 'completed', assignee: 'أمل خالد' },
];

const PRIORITY_ICONS: Record<string, React.ReactNode> = {
  low: <Flag size={12} />,
  medium: <Clock size={12} />,
  high: <AlertTriangle size={12} />,
  urgent: <AlertTriangle size={12} />,
};

const PRIORITY_LABELS: Record<string, string> = {
  low: 'منخفض',
  medium: 'متوسط',
  high: 'عالي',
  urgent: 'عاجل',
};

export default function TasksKanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [dragging, setDragging] = useState<number | null>(null);

  const getColumnTasks = useCallback((status: string) => tasks.filter((t) => t.status === status), [tasks]);

  const handleDragStart = (taskId: number) => setDragging(taskId);

  const handleDrop = (newStatus: string) => {
    if (dragging === null) return;
    setTasks((prev) => prev.map((t) => t.id === dragging ? { ...t, status: newStatus } : t));
    setDragging(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>لوحة المهام</h1>
          <p style={{ color: '#8A96A8', fontSize: '0.85rem' }}>إدارة المهام بنظام Kanban</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', overflowX: 'auto' }}>
        {TASK_STATUSES.map((col) => (
          <div
            key={col.value}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col.value)}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(201,168,76,0.08)',
              borderRadius: 'var(--radius-xl)',
              padding: '1rem',
              minHeight: 400,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{col.label}</span>
                <span style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)', padding: '0.1rem 0.5rem', fontSize: '0.75rem', color: '#8A96A8' }}>
                  {getColumnTasks(col.value).length}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {getColumnTasks(col.value).map((task) => (
                <motion.div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  whileHover={{ y: -2 }}
                  layout
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem',
                    cursor: 'grab',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.5 }}>{task.title}</h4>
                    <GripVertical size={14} style={{ color: '#8A96A8', flexShrink: 0 }} />
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      background: `${PRIORITY_COLORS[task.priority]}20`,
                      color: PRIORITY_COLORS[task.priority],
                    }}>
                      {PRIORITY_ICONS[task.priority]}
                      {PRIORITY_LABELS[task.priority]}
                    </span>
                  </div>

                  {task.assignee && (
                    <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                        {task.assignee.charAt(0)}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#8A96A8' }}>{task.assignee}</span>
                    </div>
                  )}

                  {task.dueDate && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#8A96A8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={10} /> {task.dueDate}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
