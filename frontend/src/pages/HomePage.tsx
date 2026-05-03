import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Heart, Users, FolderOpen, HeartHandshake, ChevronDown, ArrowLeft, Shield, BookOpen, Home as HomeIcon, Stethoscope } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView as useIntersectionView } from 'react-intersection-observer';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, orbAnimation } from '../lib/animations';
import ProjectCard from '../components/shared/ProjectCard';
import type { Project } from '../types';

const HERO_STATS = [
  { value: 2400, label: 'يتيم مستفيد', icon: <Users size={20} /> },
  { value: 120, label: 'مشروع منجز', icon: <FolderOpen size={20} /> },
  { value: 500, label: 'متبرع كريم', icon: <HeartHandshake size={20} /> },
];

const FEATURES = [
  { icon: <Shield size={24} />, title: 'شفافية كاملة', desc: 'تقارير مالية دورية منشورة للجمهور' },
  { icon: <HomeIcon size={24} />, title: 'رعاية شاملة', desc: 'كفالة تعليمية وصحية ومعيشية' },
  { icon: <BookOpen size={24} />, title: 'تعليم مستمر', desc: 'دعم تعليمي من المرحلة الأساسية حتى الجامعية' },
  { icon: <Stethoscope size={24} />, title: 'رعاية صحية', desc: 'علاج وتأمين صحي للأيتام والأسر' },
];

const MOCK_PROJECTS: Project[] = [
  { id: 1, title: 'كفالة 100 يتيم في صنعاء', description: 'مشروع لكفالة الأيتام في العاصمة صنعاء يشمل التعليم والصحة والمعيشة', category: 'sponsorship', goalAmount: 500000, currentAmount: 350000, status: 'active', createdAt: '' },
  { id: 2, title: 'سلة رمضان الغذائية', description: 'توزيع سلال غذائية على الأسر المحتاجة خلال شهر رمضان المبارك', category: 'ramadan', goalAmount: 200000, currentAmount: 180000, status: 'active', createdAt: '' },
  { id: 3, title: 'مشروع العلاج والدواء', description: 'توفير العلاج والأدوية اللازمة للأيتام والأسر المتعففة', category: 'medical', goalAmount: 300000, currentAmount: 120000, status: 'active', createdAt: '' },
];

const MAIN_STATS = [
  { value: 1200000, label: 'إجمالي التبرعات (ريال)', suffix: '' },
  { value: 2400, label: 'يتيم مستفيد', suffix: '+' },
  { value: 15, label: 'مشروع نشط', suffix: '' },
  { value: 100, label: 'متطوع فعال', suffix: '+' },
];

export default function HomePage() {
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: '-100px' });
  const [statsRef, statsInView] = useIntersectionView({ triggerOnce: true, threshold: 0.3 });

  return (
    <>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(26,58,92,0.85) 100%)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(10,22,40,0.88) 0%, rgba(26,58,92,0.75) 100%)',
          zIndex: 1,
        }} />

        {/* Floating orbs */}
        {[
          { top: '10%', right: '15%', size: 300 },
          { top: '60%', right: '70%', size: 200 },
          { top: '30%', right: '80%', size: 150 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            variants={orbAnimation}
            animate="animate"
            style={{
              position: 'absolute',
              top: orb.top,
              right: orb.right,
              width: orb.size,
              height: orb.size,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
              zIndex: 2,
            }}
          />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '2rem 0' }}>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.2,
              marginBottom: '0.5rem',
            }}
          >
            نحيي الأمل في قلوب الأيتام
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, delay: 0.6 }}
            style={{
              height: 3,
              background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
              margin: '1rem auto',
              borderRadius: 99,
              boxShadow: '0 0 20px rgba(201,168,76,0.5)',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255,255,255,0.85)',
              maxWidth: 700,
              margin: '0 auto 2.5rem',
              lineHeight: 1.8,
            }}
          >
            مؤسسة اليتامى الخيرية تعمل بشفافية وأمانة لتوفير الرعاية الشاملة للأيتام والأسر المتعففة في اليمن
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/donate" className="btn btn-gold" style={{ padding: '0.875rem 2.5rem', fontSize: '1.1rem', borderRadius: 'var(--radius-full)' }}>
              <Heart size={18} />
              تبرع الآن
            </Link>
            <Link to="/about" className="btn btn-outline" style={{ padding: '0.875rem 2.5rem', fontSize: '1.1rem', borderRadius: 'var(--radius-full)' }}>
              تعرف علينا
            </Link>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '3rem',
              marginTop: '4rem',
              flexWrap: 'wrap',
            }}
          >
            {HERO_STATS.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>
                  <CountUp end={stat.value} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Arrow */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ marginTop: '3rem', color: 'rgba(255,255,255,0.4)' }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
      <section ref={aboutRef} style={{ padding: '6rem 0', background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={aboutInView ? 'visible' : 'hidden'}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <motion.div variants={fadeInRight}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.25rem',
                fontWeight: 800,
                color: 'var(--color-primary)',
                marginBottom: '0.5rem',
              }}>
                من نحن
              </h2>
              <div style={{
                width: 60,
                height: 3,
                background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
                borderRadius: 99,
                marginBottom: '1.5rem',
              }} />
              <p style={{
                color: 'var(--color-text-secondary)',
                lineHeight: 1.9,
                marginBottom: '2rem',
                fontSize: '1.05rem',
              }}>
                مؤسسة اليتامى الخيرية مؤسسة إنسانية يمنية تأسست بهدف رعاية الأيتام والأسر المتعففة. نسعى لتقديم الدعم الشامل الذي يضمن حياة كريمة لكل يتيم ومحتاج.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {FEATURES.map((f, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      background: '#fff',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'all 0.3s',
                    }}
                  >
                    <div style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: 2 }}>{f.icon}</div>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                        {f.title}
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link to="/about" className="btn btn-ghost" style={{ marginTop: '2rem' }}>
                اقرأ المزيد عنا
                <ArrowLeft size={16} />
              </Link>
            </motion.div>

            <motion.div variants={fadeInLeft} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}>
              {[
                { value: '13+', label: 'سنة خبرة', bg: 'var(--color-primary)' },
                { value: '2400+', label: 'يتيم مكفول', bg: 'var(--color-gold-dark)' },
                { value: '120+', label: 'مشروع مكتمل', bg: 'var(--color-primary-light)' },
                { value: '95%', label: 'نسبة الوصول', bg: 'var(--color-gold)' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: s.bg,
                  color: '#fff',
                  padding: '2rem 1.5rem',
                  borderRadius: 'var(--radius-xl)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.25rem' }}>{s.value}</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <h2 className="section-title">مشاريعنا المميزة</h2>
          <div className="section-divider" />
          <p className="section-subtitle">ساهم في دعم مشاريعنا الخيرية التي تصنع الفرق في حياة الأيتام والمحتاجين</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
          }}>
            {MOCK_PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/projects" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '0.75rem 2rem' }}>
              عرض جميع المشاريع
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Stats Section */}
      <section ref={statsRef} style={{
        padding: '5rem 0',
        background: 'var(--color-bg-dark)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(201,168,76,0.05) 0%, transparent 50%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            textAlign: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '0.5rem',
          }}>
            إنجازاتنا بالأرقام
          </h2>
          <div className="section-divider" style={{ marginBottom: '3rem' }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
          }}>
            {MAIN_STATS.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 900,
                  color: 'var(--color-gold)',
                  fontFamily: 'var(--font-display)',
                }}>
                  {statsInView && (
                    <CountUp end={stat.value} duration={2.5} separator="," suffix={stat.suffix} />
                  )}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
        textAlign: 'center',
      }}>
        <div className="container">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
              ساهم في صنع الفرق اليوم
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto 2rem' }}>
              تبرعك مهما كان بسيطاً يصنع فرقاً كبيراً في حياة يتيم أو أسرة محتاجة
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/donate" className="btn btn-gold" style={{ padding: '1rem 3rem', fontSize: '1.1rem', borderRadius: 'var(--radius-full)' }}>
                <Heart size={18} />
                تبرع الآن
              </Link>
              <Link to="/volunteer" className="btn btn-outline" style={{ padding: '1rem 3rem', fontSize: '1.1rem', borderRadius: 'var(--radius-full)' }}>
                تطوع معنا
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
