<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-logo">
        <h1>Recovery Journey</h1>
        <p>لوحة التحكم</p>
      </div>
      <form @submit.prevent="submit">
        <div v-if="error" class="alert alert-error">{{ error }}</div>
        <div class="form-group">
          <label class="form-label">البريد الإلكتروني</label>
          <input v-model="email" type="email" class="form-control" required placeholder="admin@recoveryjourney.eg" />
        </div>
        <div class="form-group">
          <label class="form-label">كلمة المرور</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>
        <button class="btn btn-primary" style="width:100%;justify-content:center;padding:12px" :disabled="loading">
          {{ loading ? 'جارٍ الدخول...' : 'تسجيل الدخول' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const email = ref(''), password = ref(''), loading = ref(false), error = ref('')

async function submit() {
  loading.value = true; error.value = ''
  try {
    await auth.login(email.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = e.response?.data?.message || 'بيانات الدخول غير صحيحة'
  } finally { loading.value = false }
}
</script>

<style scoped>
.login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--navy-deep); }
.login-box { background: #fff; border-radius: 16px; padding: 40px; width: 400px; max-width: 95vw; }
.login-logo { text-align: center; margin-bottom: 32px; }
.login-logo h1 { font-size: 22px; color: var(--navy); }
.login-logo p { font-size: 14px; color: var(--gold); font-weight: 700; margin-top: 4px; }
</style>
