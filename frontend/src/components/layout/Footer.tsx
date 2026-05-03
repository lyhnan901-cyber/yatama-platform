import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-primary-dark)',
      color: 'rgba(255,255,255,0.8)',
      padding: '4rem 0 0',
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        paddingBottom: '3rem',
      }}>
        <div>
          <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🌙</span>
            مؤسسة اليتامى الخيرية
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            نسعى لرعاية الأيتام والأسر المتعففة في اليمن، ونعمل بشفافية وأمانة لإيصال الدعم لمستحقيه.
          </p>
          <Link to="/donate" className="btn btn-gold" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
            <Heart size={14} />
            تبرع الآن
          </Link>
        </div>

        <div>
          <h4 style={{ color: 'var(--color-gold)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
            روابط سريعة
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { label: 'من نحن', href: '/about' },
              { label: 'المشاريع', href: '/projects' },
              { label: 'الشفافية', href: '/transparency' },
              { label: 'قصص النجاح', href: '/stories' },
              { label: 'تقديم طلب', href: '/apply' },
              { label: 'التطوع', href: '/volunteer' },
            ].map((l) => (
              <li key={l.href}>
                <Link to={l.href} style={{ fontSize: '0.9rem', transition: 'color 0.2s' }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'var(--color-gold)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
            تواصل معنا
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <MapPin size={16} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
              صنعاء، اليمن
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <Phone size={16} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
              <span dir="ltr">+967 1 234 567</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <Mail size={16} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
              info@yatama-charity.org
            </li>
          </ul>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '1.5rem 0',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'rgba(255,255,255,0.5)',
      }}>
        <div className="container">
          © {new Date().getFullYear()} مؤسسة اليتامى الخيرية — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
