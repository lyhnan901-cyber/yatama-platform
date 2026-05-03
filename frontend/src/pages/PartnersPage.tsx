import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../lib/animations';
import PageHeader from '../components/shared/PageHeader';

const PARTNERS = [
  { id: 1, name: 'يونيسف', category: 'دولية', logoUrl: '' },
  { id: 2, name: 'الصليب الأحمر', category: 'دولية', logoUrl: '' },
  { id: 3, name: 'مؤسسة الخير', category: 'محلية', logoUrl: '' },
  { id: 4, name: 'بنك اليمن الدولي', category: 'قطاع خاص', logoUrl: '' },
  { id: 5, name: 'جمعية الإحسان', category: 'محلية', logoUrl: '' },
  { id: 6, name: 'شركة سبأ للاتصالات', category: 'قطاع خاص', logoUrl: '' },
  { id: 7, name: 'وزارة الشؤون الاجتماعية', category: 'حكومية', logoUrl: '' },
  { id: 8, name: 'برنامج الأغذية العالمي', category: 'دولية', logoUrl: '' },
];

const CATEGORIES = ['الكل', 'دولية', 'محلية', 'قطاع خاص', 'حكومية'];

export default function PartnersPage() {
  const [cat, setCat] = useState('الكل');
  const filtered = cat === 'الكل' ? PARTNERS : PARTNERS.filter((p) => p.category === cat);

  return (
    <>
      <PageHeader title="شركاؤنا" subtitle="نفتخر بشراكاتنا مع مؤسسات محلية ودولية" />
      <section style={{ padding: '3rem 0 5rem', background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: 'none',
                background: cat === c ? 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))' : '#fff',
                color: cat === c ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)',
                fontWeight: cat === c ? 700 : 500, fontSize: '0.85rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)',
              }}>
                {c}
              </button>
            ))}
          </div>
          <motion.div variants={staggerContainer} initial="hidden" animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}
          >
            {filtered.map((p) => (
              <motion.div key={p.id} variants={fadeInUp} whileHover={{ y: -6, boxShadow: 'var(--shadow-md)' }}
                style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '2rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)', transition: 'all 0.3s' }}
              >
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--color-gold-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem' }}>
                  🤝
                </div>
                <h4 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>{p.name}</h4>
                <span className="badge badge-info" style={{ fontSize: '0.75rem' }}>{p.category}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
