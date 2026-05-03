import { motion } from 'framer-motion';
import { FileDown, PieChart, BarChart2, TrendingUp } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell, Legend } from 'recharts';
import { fadeInUp, staggerContainer } from '../lib/animations';
import PageHeader from '../components/shared/PageHeader';

const MONTHLY = [
  { month: 'يناير', income: 85000, expenses: 72000 },
  { month: 'فبراير', income: 92000, expenses: 68000 },
  { month: 'مارس', income: 78000, expenses: 80000 },
  { month: 'أبريل', income: 115000, expenses: 95000 },
  { month: 'مايو', income: 105000, expenses: 88000 },
  { month: 'يونيو', income: 130000, expenses: 110000 },
];

const DISTRIBUTION = [
  { name: 'كفالة أيتام', value: 45 },
  { name: 'إغاثة', value: 20 },
  { name: 'تعليم', value: 15 },
  { name: 'صحة', value: 12 },
  { name: 'إداري', value: 8 },
];

const COLORS = ['#1A3A5C', '#C9A84C', '#2D7D46', '#4A90D9', '#8A96A8'];

const REPORTS = [
  { title: 'التقرير المالي السنوي 2024', type: 'مالي', date: '2024-12-31' },
  { title: 'تقرير الأثر — نصف سنوي', type: 'أثر', date: '2024-06-30' },
  { title: 'تقرير حملة رمضان 2024', type: 'حملات', date: '2024-04-15' },
  { title: 'التقرير المالي السنوي 2023', type: 'مالي', date: '2023-12-31' },
];

export default function TransparencyPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <>
      <PageHeader title="الشفافية" subtitle="نؤمن بأن الشفافية أساس الثقة — إليكم تقاريرنا المالية" />

      {/* Stats */}
      <section ref={ref} style={{ padding: '4rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { icon: <TrendingUp size={24} />, value: 1200000, label: 'إجمالي الإيرادات (ريال)' },
              { icon: <BarChart2 size={24} />, value: 1050000, label: 'إجمالي المصروفات (ريال)' },
              { icon: <PieChart size={24} />, value: 92, label: '% للمستفيدين مباشرة', suffix: '%' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                style={{ textAlign: 'center', padding: '2rem', background: 'var(--color-bg-primary)', borderRadius: 'var(--radius-xl)' }}
              >
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.75rem' }}>{s.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                  {inView && <CountUp end={s.value} duration={2} separator="," suffix={s.suffix || ''} />}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts */}
      <section style={{ padding: '4rem 0', background: 'var(--color-bg-primary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ background: '#fff', padding: '2rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}
          >
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>الإيرادات والمصروفات الشهرية</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={MONTHLY}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="income" fill="var(--color-gold)" name="الإيرادات" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="var(--color-primary)" name="المصروفات" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ background: '#fff', padding: '2rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}
          >
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>توزيع المصروفات</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RPieChart>
                <Pie data={DISTRIBUTION} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                  {DISTRIBUTION.map((_entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RPieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* Reports */}
      <section style={{ padding: '4rem 0', background: '#fff' }}>
        <div className="container">
          <h2 className="section-title">التقارير المنشورة</h2>
          <div className="section-divider" />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}
          >
            {REPORTS.map((r, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }}
                style={{ background: 'var(--color-bg-primary)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              >
                <span className="badge badge-info">{r.type}</span>
                <h4 style={{ fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1.5 }}>{r.title}</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{r.date}</span>
                <button className="btn btn-outline" style={{ marginTop: 'auto', fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                  <FileDown size={14} />
                  تحميل التقرير
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
