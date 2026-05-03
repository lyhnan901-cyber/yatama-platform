import { motion } from 'framer-motion';
import { Heart, Eye, Target, Users, HeartHandshake, Shield, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeInUp, staggerContainer } from '../lib/animations';
import PageHeader from '../components/shared/PageHeader';

const VALUES = [
  { icon: <Shield size={28} />, title: 'الشفافية', desc: 'نشر التقارير المالية الدورية لكل المتبرعين والجمهور' },
  { icon: <Heart size={28} />, title: 'الرحمة', desc: 'التعامل مع المستفيدين بكل حب ورفق واحترام' },
  { icon: <Award size={28} />, title: 'الأمانة', desc: 'إيصال التبرعات كاملة لمستحقيها دون أي خصم' },
  { icon: <Users size={28} />, title: 'الشراكة', desc: 'بناء شراكات فاعلة مع المؤسسات والأفراد' },
  { icon: <BookOpen size={28} />, title: 'التعليم', desc: 'الاستثمار في تعليم الأيتام كأساس لمستقبلهم' },
  { icon: <HeartHandshake size={28} />, title: 'التمكين', desc: 'تمكين الأسر لتصبح مستقلة ومنتجة' },
];

const TIMELINE = [
  { year: '2013', title: 'التأسيس', desc: 'تأسيس المؤسسة بمبادرة من مجموعة من المحسنين في صنعاء' },
  { year: '2015', title: 'التوسع الأول', desc: 'توسيع نطاق العمل ليشمل 5 محافظات يمنية' },
  { year: '2018', title: 'مشروع الكفالة', desc: 'إطلاق برنامج كفالة الأيتام الشامل بنجاح' },
  { year: '2021', title: 'الشراكات الدولية', desc: 'عقد شراكات مع منظمات دولية لتوسيع الدعم' },
  { year: '2024', title: 'التحول الرقمي', desc: 'إطلاق المنصة الإلكترونية المتكاملة للمؤسسة' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="من نحن" subtitle="تعرف على مؤسسة اليتامى الخيرية ورسالتنا وقيمنا" />

      {/* Mission & Vision */}
      <section style={{ padding: '5rem 0', background: 'var(--color-bg-primary)' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          <motion.div
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
              color: '#fff',
              padding: '3rem 2rem',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center',
            }}
          >
            <Eye size={40} style={{ color: 'var(--color-gold)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>رؤيتنا</h3>
            <p style={{ lineHeight: 1.9, opacity: 0.9 }}>
              أن نكون المؤسسة الرائدة في رعاية الأيتام والأسر المتعففة في اليمن، ونموذجاً يحتذى به في العمل الإنساني الشفاف.
            </p>
          </motion.div>
          <motion.div
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{
              background: '#fff',
              padding: '3rem 2rem',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)',
              border: '2px solid var(--color-gold-muted)',
            }}
          >
            <Target size={40} style={{ color: 'var(--color-gold)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1rem' }}>رسالتنا</h3>
            <p style={{ lineHeight: 1.9, color: 'var(--color-text-secondary)' }}>
              توفير الرعاية الشاملة للأيتام والأسر المحتاجة من خلال برامج تعليمية وصحية ومعيشية مستدامة، بشفافية وأمانة.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <h2 className="section-title">مسيرتنا</h2>
          <div className="section-divider" />
          <div style={{ position: 'relative', maxWidth: 700, margin: '3rem auto 0' }}>
            <div style={{
              position: 'absolute',
              right: 20,
              top: 0,
              bottom: 0,
              width: 3,
              background: 'linear-gradient(to bottom, var(--color-gold), var(--color-gold-light))',
              borderRadius: 99,
            }} />
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '2.5rem',
                  position: 'relative',
                }}
              >
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.7rem',
                  color: 'var(--color-primary-dark)',
                  flexShrink: 0,
                  zIndex: 1,
                }}>
                  {item.year}
                </div>
                <div style={{
                  background: 'var(--color-bg-primary)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  flex: 1,
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <h4 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '5rem 0', background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <h2 className="section-title">قيمنا</h2>
          <div className="section-divider" />
          <p className="section-subtitle">القيم الأساسية التي توجه عملنا وتشكل هويتنا</p>

          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                style={{
                  background: '#fff',
                  padding: '2rem',
                  borderRadius: 'var(--radius-xl)',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-gold-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: 'var(--color-gold-dark)',
                }}>
                  {v.icon}
                </div>
                <h4 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                  {v.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
            انضم إلينا كمتطوع
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', maxWidth: 500, margin: '0 auto 2rem' }}>
            نرحب بمساهمتك في خدمة الأيتام والمحتاجين
          </p>
          <Link to="/volunteer" className="btn btn-gold" style={{ padding: '0.875rem 2.5rem', borderRadius: 'var(--radius-full)' }}>
            <HeartHandshake size={18} />
            سجل كمتطوع
          </Link>
        </div>
      </section>
    </>
  );
}
