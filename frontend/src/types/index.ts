export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  role: Role;
  createdAt: string;
}

export interface Role {
  id: number;
  name: string;
  slug: string;
  permissions?: RolePermission[];
}

export interface Permission {
  id: number;
  name: string;
  slug: string;
}

export interface RolePermission {
  id: number;
  roleId: number;
  permissionId: number;
  permission: Permission;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  goalAmount: number;
  currentAmount: number;
  status: 'active' | 'completed' | 'draft';
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export interface Donor {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  totalDonated: number;
  isAnonymous: boolean;
}

export interface Donation {
  id: number;
  donorId: number;
  projectId?: number;
  amount: number;
  currency: string;
  type: 'one_time' | 'monthly';
  paymentMethod: string;
  receiptNumber: string;
  status: 'pending' | 'completed' | 'failed';
  notes?: string;
  donatedAt: string;
  donor?: Donor;
  project?: Project;
}

export interface Orphan {
  id: number;
  fullName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  healthStatus: string;
  educationLevel: string;
  sponsorshipStatus: string;
  imageUrl?: string;
  familyId?: number;
  family?: Family;
}

export interface Family {
  id: number;
  headName: string;
  phone?: string;
  address?: string;
  governorate?: string;
  membersCount: number;
  monthlyIncome: number;
  status: string;
}

export interface Employee {
  id: number;
  userId: number;
  position: string;
  department: string;
  salary: number;
  hireDate: string;
  contractType: string;
  isActive: boolean;
  user?: User;
}

export interface Volunteer {
  id: number;
  userId: number;
  skills: string;
  availability: string;
  totalHours: number;
  isActive: boolean;
  joinedDate: string;
  user?: User;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  projectId?: number;
  assignedTo?: number;
  assignedBy?: number;
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location?: string;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  assignee?: User;
}

export interface OnlineApplication {
  id: number;
  applicantName: string;
  phone: string;
  applicationType: string;
  description: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  adminNotes?: string;
  createdAt: string;
}

export interface Story {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  category?: string;
  isPublished: boolean;
  createdAt: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  category?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
}

export interface Partner {
  id: number;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  category?: string;
  isActive: boolean;
}

export interface TransparencyReport {
  id: number;
  title: string;
  year: number;
  reportType?: string;
  fileUrl?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface DashboardStats {
  totalDonations: number;
  activeProjects: number;
  totalBeneficiaries: number;
  pendingApplications: number;
  monthlyDonations: { month: string; amount: number }[];
  projectDistribution: { name: string; value: number }[];
  recentDonations: Donation[];
  recentApplications: OnlineApplication[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: PaginationMeta;
}
