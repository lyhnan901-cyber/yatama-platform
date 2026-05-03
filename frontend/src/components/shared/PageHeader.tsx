import { motion } from 'framer-motion';
import { fadeInUp } from '../../lib/animations';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section style={{
      background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 50%, var(--color-primary-light) 100%)',
      padding: '5rem 0 4rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 30% 50%, rgba(201,168,76,0.1) 0%, transparent 60%)',
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900,
            color: '#fff',
            marginBottom: '0.75rem',
          }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            height: 3,
            background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
            margin: '1.5rem auto 0',
            borderRadius: 99,
          }}
        />
      </div>
    </section>
  );
}
