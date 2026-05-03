import api from './api';

export const projectsService = {
  getAll: (params?: Record<string, string | number>) =>
    api.get('/projects', { params }).then((r) => r.data),
  getPublic: () => api.get('/public/projects').then((r) => r.data),
  getById: (id: number) => api.get(`/projects/${id}`).then((r) => r.data),
  create: (data: FormData | Record<string, unknown>) =>
    api.post('/projects', data).then((r) => r.data),
  update: (id: number, data: FormData | Record<string, unknown>) =>
    api.put(`/projects/${id}`, data).then((r) => r.data),
  delete: (id: number) => api.delete(`/projects/${id}`).then((r) => r.data),
};
