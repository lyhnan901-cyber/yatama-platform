import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = 'لا توجد بيانات',
  message = 'لم يتم العثور على نتائج',
  icon,
}: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      textAlign: 'center',
      color: 'var(--color-text-muted)',
    }}>
      <div style={{ marginBottom: '1rem', opacity: 0.5 }}>
        {icon || <Inbox size={64} />}
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.95rem' }}>{message}</p>
    </div>
  );
}
