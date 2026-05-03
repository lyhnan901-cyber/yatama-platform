import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import { NAV_LINKS } from '../../lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const isHome = location.pathname === '/';
  const bg = scrolled || !isHome
    ? 'rgba(255,255,255,0.95)'
    : 'transparent';
  const textColor = scrolled || !isHome ? 'var(--color-primary-dark)' : '#fff';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: bg,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 72,
        }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 900,
            color: textColor,
          }}>
            <span style={{ fontSize: '1.5rem' }}>🌙</span>
            مؤسسة اليتامى
          </Link>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}>
            <ul style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }} className="nav-desktop">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      style={{
                        color: isActive ? 'var(--color-gold)' : textColor,
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '0.95rem',
                        transition: 'color 0.2s',
                        position: 'relative',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link to="/donate" className="btn btn-gold" style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.9rem',
              borderRadius: 'var(--radius-full)',
            }}>
              <Heart size={16} />
              تبرع الآن
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-mobile-toggle"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: textColor,
                cursor: 'pointer',
                padding: 4,
              }}
              aria-label="القائمة"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '80%',
              maxWidth: 320,
              background: '#fff',
              zIndex: 1001,
              padding: '5rem 2rem 2rem',
              boxShadow: 'var(--shadow-xl)',
              overflowY: 'auto',
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)',
              }}
              aria-label="إغلاق"
            >
              <X size={24} />
            </button>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: location.pathname === link.href ? 700 : 500,
                      color: location.pathname === link.href ? 'var(--color-gold-dark)' : 'var(--color-text-primary)',
                      background: location.pathname === link.href ? 'var(--color-gold-muted)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/donate" className="btn btn-gold" style={{
              width: '100%',
              marginTop: '1.5rem',
              justifyContent: 'center',
            }}>
              <Heart size={16} />
              تبرع الآن
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
          }}
        />
      )}

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile-toggle { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}
