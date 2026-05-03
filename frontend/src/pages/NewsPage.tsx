import { motion } from 'framer-motion';
import { Calendar, ArrowLeft } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../lib/animations';
import PageHeader from '../components/shared/PageHeader';

const NEWS = [
  { id: 1, title: 'إطلاق حملة رمضان 2025', content: 'أعلنت المؤسسة عن إطلاق حملة رمضان لهذا العام بهدف توزيع 2000 سلة غذائية على الأسر المحتاجة في مختلف المحافظات.', date: '2025-02-15', category: 'حملات', featured: true },
  { id: 2, title: 'توقيع شراكة مع منظمة اليونيسف', content: 'وقعت المؤسسة مذكرة تفاهم مع منظمة اليونيسف لدعم برامج تعليم الأيتام في اليمن.', date: '2025-01-20', category: 'شراكات', featured: true },
  { id: 3, title: 'افتتاح مركز تدريب مهني', content: 'افتتحت المؤسسة مركزاً جديداً للتدريب المهني يستهدف شباب الأيتام لتأهيلهم لسوق العمل.', date: '2025-01-10', category: 'مشاريع', featured: false },
  { id: 4, title: 'حفل تكريم المتفوقين', content: 'أقامت المؤسسة حفل تكريم للطلاب المتفوقين من أيتام المؤسسة الذين حققوا نتائج مميزة.', date: '2024-12-20', category: 'أنشطة', featured: false },
  { id: 5, title: 'تقرير الشفافية السنوي', content: 'نشرت المؤسسة تقريرها المالي السنوي الذي يوضح تفاصيل الإيرادات والمصروفات للعام 2024.', date: '2024-12-31', category: 'تقارير', featured: false },
];

export default function NewsPage() {
  const featured = NEWS.filter((n) => n.featured);
  const others = NEWS.filter((n) => !n.featured);

  return (
    <>
      <PageHeader title="الأخبار" subtitle="آخر أخبار وأنشطة مؤسسة اليتامى الخيرية" />

      {/* Featured */}
      <section style={{ padding: '3rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {featured.map((n) => (
              <motion.article key={n.id} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -4 }}
                style={{ background: 'var(--color-bg-primary)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}
              >
                <div style={{ height: 220, background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '4rem' }}>📰</span>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span className="badge badge-gold">{n.category}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      <Calendar size={12} /> {n.date}
                    </span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-primary)', lineHeight: 1.5, marginBottom: '0.5rem' }}>{n.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{n.content}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All News */}
      <section style={{ padding: '3rem 0 5rem', background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}
          >
            {others.map((n) => (
              <motion.article key={n.id} variants={fadeInUp} whileHover={{ y: -4 }}
                style={{ background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span className="badge badge-info">{n.category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={12} /> {n.date}
                  </span>
                </div>
                <h4 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem', lineHeight: 1.5 }}>{n.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{n.content}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
