import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Check, Clock } from 'lucide-react';
import { fadeInUp } from '../lib/animations';
import PageHeader from '../components/shared/PageHeader';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  if (submitted) {
    return (
      <>
        <PageHeader title="تم إرسال رسالتك" />
        <section style={{ padding: '5rem 0', textAlign: 'center', background: 'var(--color-bg-primary)' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <Check size={48} color="var(--color-primary-dark)" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1rem' }}>شكراً لتواصلك</h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto' }}>تم استلام رسالتك وسنرد عليك في أقرب وقت.</p>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="تواصل معنا" subtitle="نرحب باستفساراتكم واقتراحاتكم" />
      <section style={{ padding: '3rem 0 5rem', background: 'var(--color-bg-primary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ background: '#fff', padding: '2.5rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '2rem' }}>أرسل لنا رسالة</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input className="input" placeholder="الاسم الكامل" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="input" placeholder="البريد الإلكتروني" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="input" placeholder="الموضوع" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              <textarea className="textarea" placeholder="رسالتك..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <button onClick={() => setSubmitted(true)} className="btn btn-gold" style={{ width: '100%', padding: '0.875rem', justifyContent: 'center' }}>
                <Send size={16} />
                إرسال الرسالة
              </button>
            </div>
          </motion.div>

          <div>
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              {[
                { icon: <MapPin size={20} />, title: 'العنوان', text: 'صنعاء، اليمن — شارع الزبيري' },
                { icon: <Phone size={20} />, title: 'الهاتف', text: '+967 1 234 567' },
                { icon: <Mail size={20} />, title: 'البريد الإلكتروني', text: 'info@yatama-charity.org' },
                { icon: <Clock size={20} />, title: 'ساعات العمل', text: 'السبت — الخميس: 8:00 ص — 4:00 م' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--color-gold-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-dark)', flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>{c.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{c.text}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
