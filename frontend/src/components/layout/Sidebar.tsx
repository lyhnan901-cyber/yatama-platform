import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2, FolderOpen, Heart, FileText, Users, Briefcase,
  HeartHandshake, CheckSquare, PieChart, Newspaper, BookOpen, Share2,
  FileBarChart, UserCog, Shield, Lock, ChevronRight, ChevronLeft,
  LogOut, X,
} from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';

const iconMap: Record<string, React.ReactNode> = {
  BarChart2: <BarChart2 size={20} />,
  FolderOpen: <FolderOpen size={20} />,
  Heart: <Heart size={20} />,
  FileText: <FileText size={20} />,
  Users: <Users size={20} />,
  Briefcase: <Briefcase size={20} />,
  HandHeart: <HeartHandshake size={20} />,
  CheckSquare: <CheckSquare size={20} />,
  PieChart: <PieChart size={20} />,
  Newspaper: <Newspaper size={20} />,
  BookOpen: <BookOpen size={20} />,
  Handshake: <Share2 size={20} />,
  FileBarChart: <FileBarChart size={20} />,
  UserCog: <UserCog size={20} />,
  Shield: <Shield size={20} />,
  Lock: <Lock size={20} />,
};

interface MenuItem {
  key: string;
  label: string;
  icon: string;
  href: string;
  divider?: boolean;
}

interface SidebarProps {
  items: MenuItem[];
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ items, collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const sidebarContent = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--admin-sidebar, #0D1F33)',
      color: '#E2E8F0',
    }}>
      <div style={{
        padding: collapsed ? '1.25rem 0.75rem' : '1.25rem 1.5rem',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        minHeight: 64,
      }}>
        {!collapsed && (
          <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-gold)' }}>
            🌙 إدارة اليتامى
          </span>
        )}
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-gold)',
            cursor: 'pointer',
            padding: 4,
          }}
          aria-label="طي القائمة"
          className="sidebar-toggle-desktop"
        >
          {collapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
        <button
          onClick={onMobileClose}
          className="sidebar-close-mobile"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#E2E8F0',
            cursor: 'pointer',
          }}
          aria-label="إغلاق"
        >
          <X size={20} />
        </button>
      </div>

      <nav style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 0.5rem' }}>
        {items.map((item) => {
          if (item.divider) {
            return collapsed ? (
              <hr key={item.key} style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0.75rem 0' }} />
            ) : (
              <div key={item.key} style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'var(--color-gold)',
                textTransform: 'uppercase',
                padding: '1rem 1rem 0.5rem',
                letterSpacing: '0.05em',
              }}>
                {item.label}
              </div>
            );
          }

          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.key}
              to={item.href}
              onClick={onMobileClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: collapsed ? 0 : '0.75rem',
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '0.7rem' : '0.7rem 1rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: 2,
                color: isActive ? 'var(--color-primary-dark)' : '#CBD5E1',
                background: isActive
                  ? 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))'
                  : 'transparent',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.9rem',
                transition: 'all 0.2s',
              }}
              title={collapsed ? item.label : undefined}
            >
              <span style={{ flexShrink: 0 }}>{iconMap[item.icon]}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div style={{
        padding: collapsed ? '1rem 0.5rem' : '1rem 1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}>
        {!collapsed && user && (
          <div style={{ fontSize: '0.85rem', marginBottom: '0.75rem', color: '#8A96A8' }}>
            {user.fullName}
          </div>
        )}
        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: collapsed ? 0 : '0.5rem',
            justifyContent: collapsed ? 'center' : 'flex-start',
            width: '100%',
            padding: '0.6rem',
            background: 'rgba(239,68,68,0.15)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            color: '#F87171',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          title="تسجيل الخروج"
        >
          <LogOut size={18} />
          {!collapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="sidebar-desktop"
        style={{
          width: collapsed ? 64 : 250,
          height: '100vh',
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 100,
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 200,
              }}
            />
            <motion.aside
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="sidebar-mobile"
              style={{
                width: 280,
                height: '100vh',
                position: 'fixed',
                top: 0,
                right: 0,
                zIndex: 201,
              }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .sidebar-desktop { display: none !important; }
          .sidebar-toggle-desktop { display: none !important; }
          .sidebar-close-mobile { display: block !important; }
        }
        @media (min-width: 1025px) {
          .sidebar-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
