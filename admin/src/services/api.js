import axios from 'axios'

const http = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { Accept: 'application/json' },
})

http.interceptors.request.use(cfg => {
  const token = localStorage.getItem('admin_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

http.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401 && err.config?.url !== '/admin/login') {
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
  updatePage: (slug, data) => http.put(`/admin/pages/${slug}`, data),

  // FAQs
  getFaqs: () => http.get('/admin/faqs'),
  createFaq: data => http.post('/admin/faqs', data),
  updateFaq: (id, data) => http.put(`/admin/faqs/${id}`, data),
  deleteFaq: id => http.delete(`/admin/faqs/${id}`),
  reorderFaqs: ids => http.post('/admin/faqs/reorder', { ids }),

  // Team
  getTeam: () => http.get('/admin/team'),
  createMember: formData => http.post('/admin/team', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateMember: (id, formData) => http.post(`/admin/team/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteMember: id => http.delete(`/admin/team/${id}`),

  // Services
  getServices: () => http.get('/admin/services'),
  createService: data => http.post('/admin/services', data),
  updateService: (id, data) => http.put(`/admin/services/${id}`, data),
  deleteService: id => http.delete(`/admin/services/${id}`),

  // Site photos
  getImages: () => http.get('/images'),
  uploadImage: (slot, formData) => http.post(`/admin/images/${slot}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteImage: slot => http.delete(`/admin/images/${slot}`),

  // Settings
  getSettings: () => http.get('/admin/settings'),
  updateSettings: settings => http.put('/admin/settings', { settings }),

  // Contact submissions
  getSubmissions: page => http.get('/admin/contacts', { params: { page } }),
  markRead: id => http.put(`/admin/contacts/${id}/read`),
  deleteSubmission: id => http.delete(`/admin/contacts/${id}`),
}
