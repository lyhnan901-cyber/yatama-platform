import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cardHover } from '../../lib/animations';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const percent = project.goalAmount > 0
    ? Math.min(100, Math.round((project.currentAmount / project.goalAmount) * 100))
    : 0;

  const categoryLabels: Record<string, string> = {
    sponsorship: 'كفالة أيتام',
    relief: 'إغاثة',
    education: 'تعليم',
    medical: 'صحة',
    ramadan: 'رمضانية',
  };

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      style={{
        background: '#fff',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.06)',
        cursor: 'pointer',
      }}
    >
      <Link to={`/projects/${project.id}`} style={{ display: 'block' }}>
        <div style={{
          height: 200,
          background: project.imageUrl
            ? `url(${project.imageUrl}) center/cover`
            : 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
          }} />
          <span style={{
            position: 'absolute',
            top: 12,
            right: 12,
            padding: '0.25rem 0.75rem',
            background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
            color: 'var(--color-primary-dark)',
            fontSize: '0.75rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-full)',
          }}>
            {categoryLabels[project.category] || project.category}
          </span>
        </div>

        <div style={{ padding: '1.25rem' }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--color-primary-dark)',
            marginBottom: '0.5rem',
            lineHeight: 1.4,
          }}>
            {project.title}
          </h3>

          <p style={{
            fontSize: '0.85rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {project.description}
          </p>

          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.8rem',
              marginBottom: '0.5rem',
              color: 'var(--color-text-secondary)',
            }}>
              <span>تم جمع <b style={{ color: 'var(--color-gold-dark)' }}>{project.currentAmount.toLocaleString()}</b></span>
              <span>من <b>{project.goalAmount.toLocaleString()}</b></span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
            </div>
            <div style={{
              textAlign: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--color-gold-dark)',
              marginTop: '0.25rem',
            }}>
              {percent}%
            </div>
          </div>

          <button className="btn btn-gold" style={{
            width: '100%',
            padding: '0.6rem',
            fontSize: '0.9rem',
            borderRadius: 'var(--radius-md)',
          }}>
            <Heart size={14} />
            تبرع لهذا المشروع
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
