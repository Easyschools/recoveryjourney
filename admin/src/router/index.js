import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', component: () => import('../views/LoginView.vue'), meta: { public: true } },
  {
    path: '/',
    component: () => import('../views/LayoutView.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/pages' },
      { path: 'pages', component: () => import('../views/PagesView.vue') },
      { path: 'faqs', component: () => import('../views/FaqsView.vue') },
      { path: 'team', component: () => import('../views/TeamView.vue') },
      { path: 'services', component: () => import('../views/ServicesView.vue') },
      { path: 'settings', component: () => import('../views/SettingsView.vue') },
      { path: 'submissions', component: () => import('../views/SubmissionsView.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({ history: createWebHistory('/'), routes })

router.beforeEach(to => {
  const token = localStorage.getItem('admin_token')
  if (!to.meta.public && !token) return '/login'
  if (to.meta.public && token) return '/'
})

export default router
