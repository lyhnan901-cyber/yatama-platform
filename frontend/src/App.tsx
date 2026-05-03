import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import LoadingScreen from './components/shared/LoadingScreen';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 5 * 60 * 1000 },
  },
});

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const DonatePage = lazy(() => import('./pages/DonatePage'));
const ApplyPage = lazy(() => import('./pages/ApplyPage'));
const StoriesPage = lazy(() => import('./pages/StoriesPage'));
const TransparencyPage = lazy(() => import('./pages/TransparencyPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const PartnersPage = lazy(() => import('./pages/PartnersPage'));
const VolunteersFrontPage = lazy(() => import('./pages/VolunteersFrontPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const ProjectsAdminPage = lazy(() => import('./pages/admin/ProjectsAdminPage'));
const DonationsAdminPage = lazy(() => import('./pages/admin/DonationsAdminPage'));
const ApplicationsAdminPage = lazy(() => import('./pages/admin/ApplicationsAdminPage'));
const BeneficiariesAdminPage = lazy(() => import('./pages/admin/BeneficiariesAdminPage'));
const EmployeesPage = lazy(() => import('./pages/admin/EmployeesPage'));
const VolunteersPage = lazy(() => import('./pages/admin/VolunteersPage'));
const TasksKanbanPage = lazy(() => import('./pages/admin/TasksKanbanPage'));
const ReportsPage = lazy(() => import('./pages/admin/ReportsPage'));
const AdminNewsPage = lazy(() => import('./pages/admin/AdminNewsPage'));
const AdminStoriesPage = lazy(() => import('./pages/admin/AdminStoriesPage'));
const AdminPartnersPage = lazy(() => import('./pages/admin/AdminPartnersPage'));
const AdminTransparencyPage = lazy(() => import('./pages/admin/AdminTransparencyPage'));
const UsersAdminPage = lazy(() => import('./pages/admin/UsersAdminPage'));
const RolesAdminPage = lazy(() => import('./pages/admin/RolesAdminPage'));
const PermissionsAdminPage = lazy(() => import('./pages/admin/PermissionsAdminPage'));

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:id" element={<ProjectDetailPage />} />
              <Route path="donate" element={<DonatePage />} />
              <Route path="apply" element={<ApplyPage />} />
              <Route path="stories" element={<StoriesPage />} />
              <Route path="transparency" element={<TransparencyPage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="partners" element={<PartnersPage />} />
              <Route path="volunteer" element={<VolunteersFrontPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Admin Login */}
            <Route path="admin/login" element={<LoginPage />} />

            {/* Admin Routes */}
            <Route path="admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="projects" element={<ProjectsAdminPage />} />
              <Route path="donations" element={<DonationsAdminPage />} />
              <Route path="applications" element={<ApplicationsAdminPage />} />
              <Route path="beneficiaries" element={<BeneficiariesAdminPage />} />
              <Route path="employees" element={<EmployeesPage />} />
              <Route path="volunteers" element={<VolunteersPage />} />
              <Route path="tasks" element={<TasksKanbanPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="news" element={<AdminNewsPage />} />
              <Route path="stories" element={<AdminStoriesPage />} />
              <Route path="partners" element={<AdminPartnersPage />} />
              <Route path="transparency" element={<AdminTransparencyPage />} />
              <Route path="users" element={<UsersAdminPage />} />
              <Route path="roles" element={<RolesAdminPage />} />
              <Route path="permissions" element={<PermissionsAdminPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
