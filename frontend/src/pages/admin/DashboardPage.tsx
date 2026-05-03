import { motion } from 'framer-motion';
import { Heart, FolderOpen, Users, FileText, TrendingUp, TrendingDown } from 'lucide-react';
import CountUp from 'react-countup';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { fadeInUp, staggerContainer } from '../../lib/animations';

const KPI = [
  { label: 'إجمالي التبرعات', value: 1200000, icon: <Heart size={20} />, color: '#C9A84C', trend: '+12%', up: true },
  { label: 'المشاريع النشطة', value: 15, icon: <FolderOpen size={20} />, color: '#4A90D9', trend: '+3', up: true },
  { label: 'المستفيدين', value: 2400, icon: <Users size={20} />, color: '#2D7D46', trend: '+120', up: true },
  { label: 'طلبات جديدة', value: 28, icon: <FileText size={20} />, color: '#E67E22', trend: '+5', up: true },
];

const MONTHLY_DATA = [
  { month: 'يناير', donations: 85000, expenses: 72000 },
  { month: 'فبراير', donations: 92000, expenses: 68000 },
  { month: 'مارس', donations: 78000, expenses: 80000 },
  { month: 'أبريل', donations: 115000, expenses: 95000 },
  { month: 'مايو', donations: 105000, expenses: 88000 },
  { month: 'يونيو', donations: 130000, expenses: 110000 },
];

const PIE_DATA = [
  { name: 'كفالة', value: 45 },
  { name: 'إغاثة', value: 20 },
  { name: 'تعليم', value: 15 },
  { name: 'صحة', value: 12 },
  { name: 'إداري', value: 8 },
];
const COLORS = ['#C9A84C', '#1A3A5C', '#2D7D46', '#4A90D9', '#8A96A8'];

const RECENT = [
  { name: 'أحمد محمد', amount: 50000, project: 'كفالة أيتام', date: 'منذ ساعة' },
  { name: 'فاطمة علي', amount: 25000, project: 'سلة رمضان', date: 'منذ 3 ساعات' },
  { name: 'متبرع مجهول', amount: 100000, project: 'عام', date: 'منذ 5 ساعات' },
  { name: 'خالد سعيد', amount: 15000, project: 'مشروع العلاج', date: 'أمس' },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>لوحة التحكم</h1>
      <p style={{ color: '#8A96A8', marginBottom: '2rem', fontSize: '0.9rem' }}>مرحباً بك في نظام إدارة مؤسسة اليتامى الخيرية</p>

      {/* KPI Cards */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}
      >
        {KPI.map((k, i) => (
          <motion.div key={i} variants={fadeInUp}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(201,168,76,0.1)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: `${k.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: k.color }}>
                {k.icon}
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: k.up ? '#2D7D46' : '#E53E3E', fontWeight: 600 }}>
                {k.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {k.trend}
              </span>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fff', marginBottom: '0.25rem' }}>
              <CountUp end={k.value} duration={1.5} separator="," />
            </div>
            <div style={{ fontSize: '0.85rem', color: '#8A96A8' }}>{k.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: 'var(--radius-xl)', padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>التبرعات والمصروفات</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={MONTHLY_DATA}>
              <XAxis dataKey="month" tick={{ fill: '#8A96A8', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: '#8A96A8', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#0D1F33', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8, color: '#fff' }} />
              <Bar dataKey="donations" fill="#C9A84C" name="التبرعات" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#4A90D9" name="المصروفات" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: 'var(--radius-xl)', padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>توزيع المصروفات</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                {PIE_DATA.map((_e, index) => <Cell key={index} fill={COLORS[index]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0D1F33', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8, color: '#fff' }} />
              <Legend wrapperStyle={{ color: '#8A96A8' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Donations */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: 'var(--radius-xl)', padding: '1.5rem' }}>
        <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>آخر التبرعات</h3>
        <div className="table-wrapper">
          <table className="table" style={{ color: '#E2E8F0' }}>
            <thead>
              <tr>
                <th style={{ color: '#8A96A8' }}>المتبرع</th>
                <th style={{ color: '#8A96A8' }}>المبلغ</th>
                <th style={{ color: '#8A96A8' }}>المشروع</th>
                <th style={{ color: '#8A96A8' }}>الوقت</th>
              </tr>
            </thead>
            <tbody>
              {RECENT.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{r.name}</td>
                  <td style={{ color: 'var(--color-gold)' }}>{r.amount.toLocaleString()} ريال</td>
                  <td>{r.project}</td>
                  <td style={{ color: '#8A96A8', fontSize: '0.85rem' }}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
