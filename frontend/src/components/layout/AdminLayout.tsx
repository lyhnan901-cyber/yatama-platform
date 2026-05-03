import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import Sidebar from './Sidebar';
import ScrollToTop from '../shared/ScrollToTop';
import { useAuthStore } from '../../store/auth.store';
import { ADMIN_MENU } from '../../lib/constants';

export default function AdminLayout() {
  const { isAuthenticated, user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-theme" style={{
      background: 'var(--admin-bg, #0A1628)',
      minHeight: '100vh',
      color: 'var(--admin-text, #E2E8F0)',
    }}>
      <ScrollToTop />
      <Sidebar
        items={ADMIN_MENU}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div style={{
        marginRight: collapsed ? 64 : 250,
        transition: 'margin-right 0.3s ease',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }} className="admin-main">
        {/* Top Header */}
        <header style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
          background: 'rgba(10,22,40,0.8)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setMobileOpen(true)}
              className="admin-menu-toggle"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: '#E2E8F0',
                cursor: 'pointer',
              }}
              aria-label="القائمة"
            >
              <Menu size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#8A96A8',
              cursor: 'pointer',
              position: 'relative',
              padding: 4,
            }} aria-label="الإشعارات">
              <Bell size={20} />
              <span style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 8,
                height: 8,
                background: 'var(--color-error)',
                borderRadius: '50%',
              }} />
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem',
                color: 'var(--color-primary-dark)',
              }}>
                {user?.fullName?.charAt(0) || 'م'}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }} className="admin-username">
                {user?.fullName || 'المشرف'}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '1.5rem' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .admin-main { margin-right: 0 !important; }
          .admin-menu-toggle { display: block !important; }
          .admin-username { display: none; }
        }
      `}</style>
    </div>
  );
}
