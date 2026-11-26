<template>
  <div class="admin-layout" dir="rtl">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <h2>Recovery Journey</h2>
        <p>لوحة التحكم</p>
      </div>
      <nav class="sidebar-nav">
        <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="nav-item" active-class="active">
          <span class="nav-icon">{{ item.icon }}</span>
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="sidebar-footer">
        <button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center" @click="logout">تسجيل الخروج</button>
      </div>
    </aside>
    <!-- Main -->
    <div class="main-area">
      <header class="topbar">
        <h1>{{ currentTitle }}</h1>
        <div class="topbar-actions">
          <a :href="siteUrl" target="_blank" class="btn btn-ghost btn-sm">عرض الموقع ↗</a>
        </div>
      </header>
      <main class="page-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const siteUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:4200'
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const nav = [
  { to: '/pages', icon: '📄', label: 'المحتوى (الصفحات)' },
  { to: '/faqs', icon: '❓', label: 'الأسئلة الشائعة' },
  { to: '/team', icon: '👥', label: 'الفريق' },
  { to: '/images', icon: '🖼️', label: 'صور الموقع' },
  { to: '/services', icon: '🩺', label: 'الخدمات والعلاجات' },
  { to: '/settings', icon: '⚙️', label: 'الإعدادات العامة' },
  { to: '/submissions', icon: '📬', label: 'رسائل التواصل' },
]
const titles = { '/pages': 'المحتوى', '/faqs': 'الأسئلة الشائعة', '/team': 'الفريق', '/services': 'الخدمات', '/images': 'صور الموقع', '/settings': 'الإعدادات', '/submissions': 'رسائل التواصل' }
const currentTitle = computed(() => titles[route.path] || 'لوحة التحكم')

async function logout() {
  await auth.logout()
  router.push('/login')
}
</script>
