import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { fadeInUp } from '../lib/animations';
import PageHeader from '../components/shared/PageHeader';

const STEPS = ['البيانات الشخصية', 'نوع الطلب', 'الوضع الاقتصادي', 'المراجعة والإرسال'];

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', idNumber: '',
    type: '',
    income: '', familySize: '',
    notes: '',
  });

  if (submitted) {
    return (
      <>
        <PageHeader title="تم إرسال طلبك" />
        <section style={{ padding: '5rem 0', textAlign: 'center', background: 'var(--color-bg-primary)' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <Check size={48} color="var(--color-primary-dark)" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1rem' }}>تم استلام طلبك بنجاح</h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto' }}>سيتم مراجعة طلبك والتواصل معك خلال 7 أيام عمل.</p>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="تقديم طلب مساعدة" subtitle="قدم طلبك وسنسعى لمساعدتك بإذن الله" />
      <section style={{ padding: '3rem 0 5rem', background: 'var(--color-bg-primary)' }}>
        <div className="container" style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, right: 40, left: 40, height: 3, background: 'rgba(0,0,0,0.08)', borderRadius: 99 }}>
              <div style={{ height: '100%', width: `${(step / (STEPS.length - 1)) * 100}%`, background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))', borderRadius: 99, transition: 'width 0.4s' }} />
            </div>
            {STEPS.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: i <= step ? 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))' : '#fff', color: i <= step ? 'var(--color-primary-dark)' : 'var(--color-text-muted)', fontWeight: 700, fontSize: '0.85rem', border: i <= step ? 'none' : '2px solid rgba(0,0,0,0.1)', margin: '0 auto 0.5rem' }}>
                  {i < step ? <Check size={16} /> : i + 1}
                </div>
                <div style={{ fontSize: '0.7rem', color: i <= step ? 'var(--color-gold-dark)' : 'var(--color-text-muted)', fontWeight: i === step ? 700 : 400 }}>{s}</div>
              </div>
            ))}
          </div>

          <motion.div key={step} variants={fadeInUp} initial="hidden" animate="visible" style={{ background: '#fff', padding: '2rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}>
            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>البيانات الشخصية</h3>
                <input className="input" placeholder="الاسم الكامل" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="input" placeholder="رقم الهوية" value={form.idNumber} onChange={(e) => setForm({ ...form, idNumber: e.target.value })} />
                <input className="input" placeholder="رقم الهاتف" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            )}
            {step === 1 && (
              <div>
                <h3 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem' }}>نوع الطلب</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {['كفالة يتيم', 'مساعدة أسرة', 'دعم طبي', 'دعم تعليمي'].map((t) => (
                    <div key={t} onClick={() => setForm({ ...form, type: t })} style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: form.type === t ? '2px solid var(--color-gold)' : '2px solid rgba(0,0,0,0.06)', background: form.type === t ? 'var(--color-gold-muted)' : '#fff', cursor: 'pointer', textAlign: 'center', fontWeight: 600, transition: 'all 0.2s' }}>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>الوضع الاقتصادي</h3>
                <input className="input" placeholder="الدخل الشهري (ريال)" type="number" value={form.income} onChange={(e) => setForm({ ...form, income: e.target.value })} />
                <input className="input" placeholder="عدد أفراد الأسرة" type="number" value={form.familySize} onChange={(e) => setForm({ ...form, familySize: e.target.value })} />
                <textarea className="textarea" placeholder="ملاحظات إضافية..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
            )}
            {step === 3 && (
              <div>
                <h3 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem' }}>مراجعة البيانات</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    ['الاسم', form.name],
                    ['الهاتف', form.phone],
                    ['نوع الطلب', form.type],
                    ['الدخل الشهري', form.income ? `${form.income} ريال` : '-'],
                    ['عدد الأفراد', form.familySize || '-'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{k}</span>
                      <b style={{ fontSize: '0.9rem' }}>{v}</b>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            {step > 0 ? <button onClick={() => setStep(step - 1)} className="btn btn-ghost"><ChevronRight size={16} /> السابق</button> : <div />}
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(step + 1)} className="btn btn-primary">التالي <ChevronLeft size={16} /></button>
            ) : (
              <button onClick={() => setSubmitted(true)} className="btn btn-gold"><Send size={16} /> إرسال الطلب</button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
