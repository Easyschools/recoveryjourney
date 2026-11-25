import axios from 'axios'

const http = axios.create({ baseURL: '/api' })

http.interceptors.request.use(cfg => {
  const token = localStorage.getItem('admin_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

http.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('admin_token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default {
  login: (email, password) => http.post('/admin/login', { email, password }),
  logout: () => http.post('/admin/logout'),
  me: () => http.get('/admin/me'),

  // Pages
  getPages: () => http.get('/admin/pages'),
  getPage: slug => http.get(`/pages/${slug}`),
  updatePage: (slug, data) => http.put(`/admin/pages/${slug}`, data),

  // FAQs
  getFaqs: () => http.get('/faqs'),
  createFaq: data => http.post('/admin/faqs', data),
  updateFaq: (id, data) => http.put(`/admin/faqs/${id}`, data),
  deleteFaq: id => http.delete(`/admin/faqs/${id}`),
  reorderFaqs: ids => http.post('/admin/faqs/reorder', { ids }),

  // Team
  getTeam: () => http.get('/team'),
  createMember: formData => http.post('/admin/team', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateMember: (id, formData) => http.post(`/admin/team/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteMember: id => http.delete(`/admin/team/${id}`),

  // Services
  getServices: () => http.get('/services'),
  createService: data => http.post('/admin/services', data),
  updateService: (id, data) => http.put(`/admin/services/${id}`, data),
  deleteService: id => http.delete(`/admin/services/${id}`),

  // Settings
  getSettings: () => http.get('/settings'),
  updateSettings: data => http.put('/admin/settings', data),

  // Contact submissions
  getSubmissions: () => http.get('/admin/contact'),
  markRead: id => http.patch(`/admin/contact/${id}/read`),
  deleteSubmission: id => http.delete(`/admin/contact/${id}`),
}
