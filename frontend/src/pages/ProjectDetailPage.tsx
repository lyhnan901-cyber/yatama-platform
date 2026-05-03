import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, Calendar, ArrowRight } from 'lucide-react';
import CountUp from 'react-countup';
import { fadeInUp } from '../lib/animations';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = {
    id: Number(id),
    title: 'كفالة 100 يتيم في صنعاء',
    description: 'مشروع شامل لكفالة الأيتام في العاصمة صنعاء يتضمن الدعم التعليمي والصحي والمعيشي لمائة يتيم من أسر متعففة. يهدف المشروع إلى توفير بيئة آمنة ومستقرة للأيتام وتمكينهم من تحقيق أحلامهم.',
    category: 'sponsorship',
    goalAmount: 500000,
    currentAmount: 350000,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
  };

  const percent = Math.round((project.currentAmount / project.goalAmount) * 100);

  return (
    <>
      {/* Hero */}
      <section style={{
        position: 'relative',
        minHeight: 400,
        display: 'flex',
        alignItems: 'flex-end',
        background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)',
        paddingBottom: '3rem',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(201,168,76,0.1) 0%, transparent 60%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/projects" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
            <ArrowRight size={14} />
            العودة للمشاريع
          </Link>
          <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem',
          }}>
            {project.title}
          </motion.h1>
          <span className="badge badge-gold" style={{ fontSize: '0.85rem' }}>كفالة أيتام</span>
        </div>
      </section>

      <section style={{ padding: '3rem 0 5rem', background: 'var(--color-bg-primary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
          {/* Main Content */}
          <div>
            <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem' }}>
              <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>تفاصيل المشروع</h2>
              <p style={{ lineHeight: 2, color: 'var(--color-text-secondary)' }}>{project.description}</p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  <Calendar size={16} />
                  بدأ: {project.startDate}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  <Calendar size={16} />
                  ينتهي: {project.endDate}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Donation */}
          <div style={{ position: 'sticky', top: '5rem', alignSelf: 'start' }}>
            <div style={{
              background: '#fff',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-md)',
              border: '2px solid var(--color-gold-muted)',
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-gold-dark)' }}>
                  <CountUp end={project.currentAmount} duration={2} separator="," enableScrollSpy scrollSpyOnce />
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  تم جمعها من {project.goalAmount.toLocaleString()} ريال
                </div>
              </div>

              <div className="progress-bar" style={{ height: 12, marginBottom: '0.5rem' }}>
                <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gold-dark)', marginBottom: '1.5rem' }}>
                {percent}%
              </div>

              <Link to="/donate" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1.05rem', borderRadius: 'var(--radius-md)' }}>
                <Heart size={18} />
                تبرع لهذا المشروع
              </Link>

              <button style={{
                width: '100%',
                marginTop: '0.75rem',
                padding: '0.75rem',
                background: 'none',
                border: '2px solid rgba(0,0,0,0.1)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-primary)',
              }}>
                <Share2 size={16} />
                مشاركة المشروع
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
