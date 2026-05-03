import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../lib/animations';
import PageHeader from '../components/shared/PageHeader';

const STORIES = [
  { id: 1, title: 'قصة اليتيم أحمد: من الحرمان إلى التفوق', content: 'كان أحمد يتيماً يعيش ظروفاً صعبة، لكن بفضل كفالة المؤسسة استطاع إكمال تعليمه والتفوق في المدرسة. اليوم أحمد طالب جامعي متفوق يحلم بأن يصبح طبيباً ليخدم مجتمعه.', imageUrl: '', category: 'تعليم' },
  { id: 2, title: 'أسرة العامري: بداية جديدة', content: 'بعد فقدان المعيل، واجهت أسرة العامري أوقاتاً عصيبة. تدخلت المؤسسة بتقديم الدعم الشامل وتمكين الأم من خلال مشروع صغير. اليوم الأسرة مستقلة ومنتجة.', imageUrl: '', category: 'تمكين' },
  { id: 3, title: 'حملة رمضان: ابتسامة على وجوه المحتاجين', content: 'خلال شهر رمضان المبارك، وصلت سلالنا الغذائية إلى أكثر من 500 أسرة في مختلف المحافظات، مما أسعد الكثير من العائلات المحتاجة.', imageUrl: '', category: 'إغاثة' },
  { id: 4, title: 'مشروع العلاج: حياة جديدة لطفلة', content: 'كانت الطفلة سارة تعاني من مرض مزمن ولم تستطع أسرتها تحمل تكاليف العلاج. وفرت المؤسسة العلاج اللازم، واليوم سارة طفلة صحية تمارس حياتها بشكل طبيعي.', imageUrl: '', category: 'صحة' },
  { id: 5, title: 'بناء مستقبل: تأهيل شباب الأيتام', content: 'من خلال برنامج التأهيل المهني، تم تدريب 50 شاباً من أيتام المؤسسة على مهن متنوعة، وحصل 30 منهم على فرص عمل.', imageUrl: '', category: 'تمكين' },
  { id: 6, title: 'كسوة العيد: فرحة في كل بيت', content: 'وزعنا كسوة العيد على أكثر من 1000 يتيم في مختلف المحافظات اليمنية، لتدخل الفرحة إلى قلوب صغيرة تستحق الابتسامة.', imageUrl: '', category: 'كفالة' },
];

export default function StoriesPage() {
  const [selected, setSelected] = useState<typeof STORIES[0] | null>(null);

  return (
    <>
      <PageHeader title="قصص نجاح" subtitle="قصص حقيقية تروي أثر تبرعاتكم في حياة المستفيدين" />
      <section style={{ padding: '3rem 0 5rem', background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <motion.div
            variants={staggerContainer} initial="hidden" animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}
          >
            {STORIES.map((story) => (
              <motion.div
                key={story.id} variants={fadeInUp} whileHover={{ y: -6 }}
                onClick={() => setSelected(story)}
                style={{
                  background: '#fff', borderRadius: 'var(--radius-xl)', overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)', cursor: 'pointer', transition: 'all 0.3s',
                }}
              >
                <div style={{ height: 180, background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '3rem' }}>📖</span>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>{story.category}</span>
                  <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-primary)', marginBottom: '0.5rem', lineHeight: 1.5 }}>{story.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{story.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              style={{ background: '#fff', borderRadius: 'var(--radius-xl)', maxWidth: 600, width: '100%', maxHeight: '80vh', overflow: 'auto', padding: '2rem' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span className="badge badge-gold">{selected.category}</span>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><X size={20} /></button>
              </div>
              <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-primary)', marginBottom: '1rem', lineHeight: 1.5 }}>{selected.title}</h2>
              <p style={{ lineHeight: 2, color: 'var(--color-text-secondary)' }}>{selected.content}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
