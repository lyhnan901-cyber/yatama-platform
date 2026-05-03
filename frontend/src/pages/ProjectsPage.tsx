import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid3X3, List } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../lib/animations';
import PageHeader from '../components/shared/PageHeader';
import ProjectCard from '../components/shared/ProjectCard';
import { PROJECT_CATEGORIES } from '../lib/constants';
import type { Project } from '../types';

const MOCK_PROJECTS: Project[] = [
  { id: 1, title: 'كفالة 100 يتيم في صنعاء', description: 'مشروع لكفالة الأيتام في العاصمة صنعاء يشمل التعليم والصحة والمعيشة', category: 'sponsorship', goalAmount: 500000, currentAmount: 350000, status: 'active', createdAt: '' },
  { id: 2, title: 'سلة رمضان الغذائية', description: 'توزيع سلال غذائية على الأسر المحتاجة خلال شهر رمضان المبارك', category: 'ramadan', goalAmount: 200000, currentAmount: 180000, status: 'active', createdAt: '' },
  { id: 3, title: 'مشروع العلاج والدواء', description: 'توفير العلاج والأدوية اللازمة للأيتام والأسر المتعففة', category: 'medical', goalAmount: 300000, currentAmount: 120000, status: 'active', createdAt: '' },
  { id: 4, title: 'مشروع الحقيبة المدرسية', description: 'توفير الحقائب والمستلزمات المدرسية لأيتام المؤسسة', category: 'education', goalAmount: 150000, currentAmount: 95000, status: 'active', createdAt: '' },
  { id: 5, title: 'إغاثة عاجلة — عدن', description: 'حملة إغاثية عاجلة لمساعدة المتضررين في محافظة عدن', category: 'relief', goalAmount: 400000, currentAmount: 400000, status: 'completed', createdAt: '' },
  { id: 6, title: 'كفالة أيتام تعز', description: 'مشروع لكفالة 50 يتيماً في محافظة تعز', category: 'sponsorship', goalAmount: 250000, currentAmount: 75000, status: 'active', createdAt: '' },
];

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = MOCK_PROJECTS.filter((p) => {
    const matchCat = category === 'all' || p.category === category;
    const matchSearch = p.title.includes(search) || p.description.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <>
      <PageHeader title="مشاريعنا" subtitle="اكتشف مشاريعنا الخيرية وساهم في دعمها" />

      <section style={{ padding: '3rem 0 5rem', background: 'var(--color-bg-primary)' }}>
        <div className="container">
          {/* Filters */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {PROJECT_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    background: category === cat.value
                      ? 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))'
                      : '#fff',
                    color: category === cat.value ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)',
                    fontWeight: category === cat.value ? 700 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                }} />
                <input
                  type="text"
                  placeholder="ابحث عن مشروع..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input"
                  style={{ paddingRight: '2.5rem', maxWidth: 280, fontSize: '0.9rem' }}
                />
              </div>
              <button
                onClick={() => setView('grid')}
                style={{ background: view === 'grid' ? 'var(--color-gold-muted)' : '#fff', border: 'none', borderRadius: 'var(--radius-sm)', padding: 8, cursor: 'pointer' }}
                aria-label="عرض شبكي"
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setView('list')}
                style={{ background: view === 'list' ? 'var(--color-gold-muted)' : '#fff', border: 'none', borderRadius: 'var(--radius-sm)', padding: 8, cursor: 'pointer' }}
                aria-label="عرض قائمة"
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{
              display: 'grid',
              gridTemplateColumns: view === 'grid'
                ? 'repeat(auto-fill, minmax(320px, 1fr))'
                : '1fr',
              gap: '2rem',
            }}
          >
            {filtered.map((project) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '1.1rem' }}>لم يتم العثور على مشاريع مطابقة</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
