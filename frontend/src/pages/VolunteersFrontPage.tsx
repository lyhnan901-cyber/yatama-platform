import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Clock, Award, Send, Check } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../lib/animations';
import PageHeader from '../components/shared/PageHeader';

const BENEFITS = [
  { icon: <Heart size={24} />, title: 'أجر وثواب', desc: 'أجر عظيم في خدمة الأيتام والمحتاجين' },
  { icon: <Users size={24} />, title: 'فريق عمل', desc: 'انضم لفريق من المتطوعين المتحمسين' },
  { icon: <Clock size={24} />, title: 'مرونة الوقت', desc: 'اختر الأوقات التي تناسبك للتطوع' },
  { icon: <Award size={24} />, title: 'شهادات تقدير', desc: 'شهادات خبرة وتقدير معتمدة' },
];

export default function VolunteersFrontPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', skills: '', availability: '' });

  if (submitted) {
    return (
      <>
        <PageHeader title="شكراً لتسجيلك" />
        <section style={{ padding: '5rem 0', textAlign: 'center', background: 'var(--color-bg-primary)' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <Check size={48} color="var(--color-primary-dark)" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1rem' }}>مرحباً بك في فريق التطوع</h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto' }}>تم تسجيل طلبك بنجاح. سنتواصل معك قريباً.</p>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="تطوع معنا" subtitle="كن جزءاً من التغيير — تطوعك يصنع الفرق" />

      {/* Benefits */}
      <section style={{ padding: '4rem 0', background: '#fff' }}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}
          >
            {BENEFITS.map((b, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }}
                style={{ textAlign: 'center', padding: '2rem 1.5rem', background: 'var(--color-bg-primary)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: 'var(--color-gold-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--color-gold-dark)' }}>{b.icon}</div>
                <h4 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>{b.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Registration Form */}
      <section style={{ padding: '4rem 0', background: 'var(--color-bg-primary)' }}>
        <div className="container" style={{ maxWidth: 600, margin: '0 auto' }}>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ background: '#fff', padding: '2.5rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem', textAlign: 'center' }}>سجل كمتطوع</h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))', margin: '0 auto 2rem', borderRadius: 99 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input className="input" placeholder="الاسم الكامل" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="input" placeholder="البريد الإلكتروني" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="input" placeholder="رقم الهاتف" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className="input" placeholder="المهارات (مثال: تصميم، تسويق، تعليم)" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
              <select className="input" value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })}>
                <option value="">اختر أوقات التطوع المناسبة...</option>
                <option value="morning">صباحي</option>
                <option value="evening">مسائي</option>
                <option value="weekend">عطلة نهاية الأسبوع</option>
                <option value="flexible">مرن</option>
              </select>
              <button onClick={() => setSubmitted(true)} className="btn btn-gold" style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', justifyContent: 'center' }}>
                <Send size={16} />
                سجل الآن
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
