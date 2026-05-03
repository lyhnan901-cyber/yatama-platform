import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check, CreditCard, Building2, Banknote, ChevronLeft, ChevronRight } from 'lucide-react';
import { fadeInUp } from '../lib/animations';
import { DONATION_AMOUNTS } from '../lib/constants';
import PageHeader from '../components/shared/PageHeader';

const STEPS = ['اختر المشروع', 'المبلغ', 'بياناتك', 'طريقة الدفع'];

const PROJECTS = [
  { id: 1, title: 'كفالة أيتام صنعاء', category: 'كفالة' },
  { id: 2, title: 'سلة رمضان', category: 'إغاثة' },
  { id: 3, title: 'مشروع العلاج', category: 'صحة' },
  { id: 0, title: 'حيث الحاجة أشد (عام)', category: 'عام' },
];

export default function DonatePage() {
  const [step, setStep] = useState(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', anonymous: false });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = customAmount ? Number(customAmount) : amount;

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <>
        <PageHeader title="شكراً لتبرعك" />
        <section style={{ padding: '5rem 0', textAlign: 'center', background: 'var(--color-bg-primary)' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.6 }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <Check size={48} color="var(--color-primary-dark)" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1rem' }}>جزاك الله خيراً</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: 500, margin: '0 auto 2rem' }}>
              تم استلام تبرعك بنجاح بمبلغ {finalAmount?.toLocaleString()} ريال. سنرسل لك إيصالاً على بريدك الإلكتروني.
            </p>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="تبرع الآن" subtitle="ساهم في صنع الفرق — كل ريال يصنع ابتسامة" />

      <section style={{ padding: '3rem 0 5rem', background: 'var(--color-bg-primary)' }}>
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, right: 40, left: 40, height: 3, background: 'rgba(0,0,0,0.08)', borderRadius: 99 }}>
              <div style={{ height: '100%', width: `${(step / (STEPS.length - 1)) * 100}%`, background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))', borderRadius: 99, transition: 'width 0.4s' }} />
            </div>
            {STEPS.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i <= step ? 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))' : '#fff',
                  color: i <= step ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                  fontWeight: 700, fontSize: '0.85rem', border: i <= step ? 'none' : '2px solid rgba(0,0,0,0.1)',
                  margin: '0 auto 0.5rem',
                }}>
                  {i < step ? <Check size={16} /> : i + 1}
                </div>
                <div style={{ fontSize: '0.75rem', color: i <= step ? 'var(--color-gold-dark)' : 'var(--color-text-muted)', fontWeight: i === step ? 700 : 400 }}>{s}</div>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} variants={fadeInUp} initial="hidden" animate="visible" exit="hidden">
              {/* Step 0: Choose Project */}
              {step === 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                  {PROJECTS.map((p) => (
                    <motion.div
                      key={p.id}
                      whileHover={{ y: -4 }}
                      onClick={() => setSelectedProject(p.id)}
                      style={{
                        padding: '1.5rem',
                        background: selectedProject === p.id ? 'linear-gradient(135deg, var(--color-gold-muted), #fff)' : '#fff',
                        border: selectedProject === p.id ? '2px solid var(--color-gold)' : '2px solid rgba(0,0,0,0.06)',
                        borderRadius: 'var(--radius-xl)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      {selectedProject === p.id && <Check size={20} style={{ color: 'var(--color-gold-dark)', marginBottom: '0.5rem' }} />}
                      <h4 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>{p.title}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{p.category}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Step 1: Amount */}
              {step === 1 && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    {DONATION_AMOUNTS.map((a) => (
                      <button
                        key={a}
                        onClick={() => { setAmount(a); setCustomAmount(''); }}
                        style={{
                          padding: '1rem 2rem',
                          borderRadius: 'var(--radius-lg)',
                          border: amount === a ? '2px solid var(--color-gold)' : '2px solid rgba(0,0,0,0.08)',
                          background: amount === a ? 'var(--color-gold-muted)' : '#fff',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          color: 'var(--color-primary-dark)',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-primary)',
                        }}
                      >
                        {a.toLocaleString()} ريال
                      </button>
                    ))}
                  </div>
                  <div style={{ maxWidth: 300, margin: '0 auto' }}>
                    <input
                      type="number"
                      placeholder="مبلغ مخصص..."
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setAmount(null); }}
                      className="input"
                      style={{ textAlign: 'center', fontSize: '1.1rem' }}
                    />
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={isMonthly} onChange={(e) => setIsMonthly(e.target.checked)} style={{ width: 18, height: 18, accentColor: 'var(--color-gold)' }} />
                    <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>تبرع شهري متكرر</span>
                  </label>
                </div>
              )}

              {/* Step 2: Form */}
              {step === 2 && (
                <div style={{ maxWidth: 500, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.anonymous} onChange={(e) => setForm({ ...form, anonymous: e.target.checked })} style={{ width: 18, height: 18, accentColor: 'var(--color-gold)' }} />
                    <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>تبرع بسرية (بدون ذكر الاسم)</span>
                  </label>
                  {!form.anonymous && (
                    <input className="input" placeholder="الاسم الكامل" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  )}
                  <input className="input" placeholder="البريد الإلكتروني" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <input className="input" placeholder="رقم الهاتف" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div style={{ maxWidth: 500, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { value: 'card', icon: <CreditCard size={20} />, label: 'بطاقة ائتمان' },
                    { value: 'bank', icon: <Building2 size={20} />, label: 'تحويل بنكي' },
                    { value: 'cash', icon: <Banknote size={20} />, label: 'دفع نقدي' },
                  ].map((m) => (
                    <div
                      key={m.value}
                      onClick={() => setPaymentMethod(m.value)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1.25rem 1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        border: paymentMethod === m.value ? '2px solid var(--color-gold)' : '2px solid rgba(0,0,0,0.08)',
                        background: paymentMethod === m.value ? 'var(--color-gold-muted)' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ color: 'var(--color-gold-dark)' }}>{m.icon}</div>
                      <span style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>{m.label}</span>
                    </div>
                  ))}

                  <div style={{ background: 'var(--color-bg-subtle)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginTop: '1rem' }}>
                    <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>ملخص التبرع</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>المبلغ:</span>
                      <b>{finalAmount?.toLocaleString()} ريال</b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>النوع:</span>
                      <b>{isMonthly ? 'شهري' : 'مرة واحدة'}</b>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="btn btn-ghost">
                <ChevronRight size={16} />
                السابق
              </button>
            ) : <div />}
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(step + 1)} className="btn btn-primary">
                التالي
                <ChevronLeft size={16} />
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn btn-gold" style={{ padding: '0.75rem 2.5rem' }}>
                <Heart size={16} />
                أتمم التبرع
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
