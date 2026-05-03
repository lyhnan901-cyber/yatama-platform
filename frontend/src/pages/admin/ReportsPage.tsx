import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';

const FINANCIAL = [
  { month: 'يناير', income: 85000, expenses: 72000 },
  { month: 'فبراير', income: 92000, expenses: 68000 },
  { month: 'مارس', income: 78000, expenses: 80000 },
  { month: 'أبريل', income: 115000, expenses: 95000 },
  { month: 'مايو', income: 105000, expenses: 88000 },
  { month: 'يونيو', income: 130000, expenses: 110000 },
];

const PIE = [
  { name: 'كفالة', value: 45 },
  { name: 'إغاثة', value: 20 },
  { name: 'تعليم', value: 15 },
  { name: 'صحة', value: 12 },
  { name: 'إداري', value: 8 },
];
const COLORS = ['#C9A84C', '#1A3A5C', '#2D7D46', '#4A90D9', '#8A96A8'];

const TABS = ['مالي', 'المشاريع', 'المستفيدين', 'التبرعات'];

export default function ReportsPage() {
  const [tab, setTab] = useState('مالي');
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>التقارير</h1>
      <p style={{ color: '#8A96A8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>تقارير مالية ومشاريع وإحصائيات</p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', border: 'none',
            background: tab === t ? 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))' : 'rgba(255,255,255,0.05)',
            color: tab === t ? 'var(--color-primary-dark)' : '#8A96A8', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'var(--font-primary)',
          }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.25rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: 'var(--radius-xl)', padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>الإيرادات والمصروفات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={FINANCIAL}>
              <XAxis dataKey="month" tick={{ fill: '#8A96A8', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: '#8A96A8', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#0D1F33', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8, color: '#fff' }} />
              <Bar dataKey="income" fill="#C9A84C" name="الإيرادات" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#4A90D9" name="المصروفات" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: 'var(--radius-xl)', padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>توزيع المصروفات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={PIE} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                {PIE.map((_e, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0D1F33', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8, color: '#fff' }} />
              <Legend wrapperStyle={{ color: '#8A96A8' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
