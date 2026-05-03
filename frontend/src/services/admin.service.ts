import api from './api';

const crudService = (base: string) => ({
  getAll: (params?: Record<string, string | number>) =>
    api.get(base, { params }).then((r) => r.data),
  getById: (id: number) => api.get(`${base}/${id}`).then((r) => r.data),
  create: (data: Record<string, unknown>) =>
    api.post(base, data).then((r) => r.data),
  update: (id: number, data: Record<string, unknown>) =>
    api.put(`${base}/${id}`, data).then((r) => r.data),
  delete: (id: number) => api.delete(`${base}/${id}`).then((r) => r.data),
});

export const usersService = crudService('/users');
export const beneficiariesService = {
  orphans: crudService('/beneficiaries/orphans'),
  families: crudService('/beneficiaries/families'),
};
export const employeesService = crudService('/employees');
export const volunteersService = crudService('/volunteers');
export const tasksService = {
  ...crudService('/tasks'),
  updateStatus: (id: number, status: string) =>
    api.patch(`/tasks/${id}/status`, { status }).then((r) => r.data),
};
export const applicationsService = {
  ...crudService('/applications'),
  updateStatus: (id: number, status: string, notes?: string) =>
    api.patch(`/applications/${id}/status`, { status, adminNotes: notes }).then((r) => r.data),
};
export const rolesService = crudService('/roles');
export const permissionsService = crudService('/permissions');
export const storiesService = crudService('/cms/stories');
export const newsService = crudService('/cms/news');
export const partnersService = crudService('/cms/partners');
export const transparencyService = crudService('/cms/transparency');
export const contactService = {
  send: (data: Record<string, unknown>) =>
    api.post('/contact', data).then((r) => r.data),
  getAll: (params?: Record<string, string | number>) =>
    api.get('/contact', { params }).then((r) => r.data),
};
export const reportsService = {
  financial: (params?: Record<string, string | number>) =>
    api.get('/finance/reports', { params }).then((r) => r.data),
};
export const publicService = {
  getStats: () => api.get('/public/stats').then((r) => r.data),
  getProjects: () => api.get('/public/projects').then((r) => r.data),
  getStories: () => api.get('/public/stories').then((r) => r.data),
  getNews: () => api.get('/public/news').then((r) => r.data),
  getPartners: () => api.get('/public/partners').then((r) => r.data),
  getTransparency: () => api.get('/public/transparency').then((r) => r.data),
};
