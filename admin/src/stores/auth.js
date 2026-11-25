import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null, token: localStorage.getItem('admin_token') || null }),
  getters: { isLoggedIn: s => !!s.token },
  actions: {
    async login(email, password) {
      const r = await api.login(email, password)
      this.token = r.data.token
      this.user  = r.data.user
      localStorage.setItem('admin_token', this.token)
    },
    async logout() {
      try { await api.logout() } catch {}
      this.token = null; this.user = null
      localStorage.removeItem('admin_token')
    },
    async fetchMe() {
      const r = await api.me()
      this.user = r.data
    },
  },
})
