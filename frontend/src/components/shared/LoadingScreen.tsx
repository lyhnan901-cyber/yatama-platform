import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'var(--color-bg-primary)',
      gap: '1.5rem',
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 48,
          height: 48,
          border: '4px solid var(--color-bg-subtle)',
          borderTopColor: 'var(--color-gold)',
          borderRadius: '50%',
        }}
      />
      <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', fontWeight: 500 }}>
        جاري التحميل...
      </p>
    </div>
  );
}
