import api from './api';

export const donationsService = {
  getAll: (params?: Record<string, string | number>) =>
    api.get('/donations', { params }).then((r) => r.data),
  create: (data: Record<string, unknown>) =>
    api.post('/donations', data).then((r) => r.data),
  getById: (id: number) => api.get(`/donations/${id}`).then((r) => r.data),
};
