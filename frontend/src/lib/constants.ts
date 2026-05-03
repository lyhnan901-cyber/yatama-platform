export const SITE_NAME = 'مؤسسة اليتامى الخيرية';
export const SITE_DESCRIPTION = 'نسعى لرعاية الأيتام والأسر المتعففة في اليمن';

export const NAV_LINKS = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '/about' },
  { label: 'المشاريع', href: '/projects' },
  { label: 'الشفافية', href: '/transparency' },
  { label: 'قصص النجاح', href: '/stories' },
  { label: 'الأخبار', href: '/news' },
  { label: 'التطوع', href: '/volunteer' },
  { label: 'اتصل بنا', href: '/contact' },
];

export const ADMIN_MENU = [
  { key: 'dashboard', label: 'لوحة التحكم', icon: 'BarChart2', href: '/admin/dashboard' },
  { key: 'projects', label: 'المشاريع', icon: 'FolderOpen', href: '/admin/projects' },
  { key: 'donations', label: 'التبرعات', icon: 'Heart', href: '/admin/donations' },
  { key: 'applications', label: 'الطلبات', icon: 'FileText', href: '/admin/applications' },
  { key: 'beneficiaries', label: 'المستفيدون', icon: 'Users', href: '/admin/beneficiaries' },
  { key: 'employees', label: 'الموظفون', icon: 'Briefcase', href: '/admin/employees' },
  { key: 'volunteers', label: 'المتطوعون', icon: 'HandHeart', href: '/admin/volunteers' },
  { key: 'tasks', label: 'المهام', icon: 'CheckSquare', href: '/admin/tasks' },
  { key: 'reports', label: 'التقارير', icon: 'PieChart', href: '/admin/reports' },
  { key: 'divider-cms', label: 'إدارة المحتوى', icon: '', href: '', divider: true },
  { key: 'cms-news', label: 'الأخبار', icon: 'Newspaper', href: '/admin/news' },
  { key: 'cms-stories', label: 'القصص', icon: 'BookOpen', href: '/admin/stories' },
  { key: 'cms-partners', label: 'الشركاء', icon: 'Handshake', href: '/admin/partners' },
  { key: 'cms-transparency', label: 'الشفافية', icon: 'FileBarChart', href: '/admin/transparency' },
  { key: 'divider-settings', label: 'الإعدادات', icon: '', href: '', divider: true },
  { key: 'users', label: 'المستخدمون', icon: 'UserCog', href: '/admin/users' },
  { key: 'roles', label: 'الأدوار', icon: 'Shield', href: '/admin/roles' },
  { key: 'permissions', label: 'الصلاحيات', icon: 'Lock', href: '/admin/permissions' },
];

export const PROJECT_CATEGORIES = [
  { value: 'all', label: 'الكل' },
  { value: 'sponsorship', label: 'كفالة أيتام' },
  { value: 'relief', label: 'إغاثة' },
  { value: 'education', label: 'تعليم' },
  { value: 'medical', label: 'صحة' },
  { value: 'ramadan', label: 'رمضانية' },
];

export const DONATION_AMOUNTS = [1000, 5000, 10000, 50000];

export const TASK_STATUSES = [
  { value: 'todo', label: 'جديدة', color: '#3B82F6' },
  { value: 'in_progress', label: 'قيد التنفيذ', color: '#F59E0B' },
  { value: 'review', label: 'للمراجعة', color: '#8B5CF6' },
  { value: 'completed', label: 'مكتملة', color: '#10B981' },
];

export const PRIORITY_COLORS: Record<string, string> = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
  urgent: '#DC2626',
};
