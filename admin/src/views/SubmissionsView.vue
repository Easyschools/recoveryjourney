<template>
  <div>
    <h2 style="font-size:16px;margin-bottom:16px">رسائل التواصل ({{ submissions.length }})</h2>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الاسم</th><th>الهاتف</th><th>الاستشارة لـ</th><th>الرسالة</th><th>التاريخ</th><th>حالة</th><th></th></tr></thead>
          <tbody>
            <tr v-for="s in submissions" :key="s.id" :style="!s.is_read ? 'font-weight:700' : ''">
              <td>{{ s.name || '—' }}</td>
              <td dir="ltr">{{ s.phone }}</td>
              <td>{{ s.consultation_for }}</td>
              <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ s.message || '—' }}</td>
              <td style="font-size:12px;white-space:nowrap">{{ new Date(s.created_at).toLocaleDateString('ar-EG') }}</td>
              <td><span :class="['badge', s.is_read?'badge-gray':'badge-green']">{{ s.is_read ? 'مقروء' : 'جديد' }}</span></td>
              <td style="display:flex;gap:6px">
                <button v-if="!s.is_read" class="btn btn-ghost btn-sm" @click="markRead(s)">✓ قراءة</button>
                <button class="btn btn-danger btn-sm" @click="del(s)">حذف</button>
              </td>
            </tr>
            <tr v-if="submissions.length === 0"><td colspan="7" style="text-align:center;opacity:.5;padding:40px">لا توجد رسائل بعد</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const submissions = ref([])
onMounted(load)
async function load() { const r = await api.getSubmissions(); submissions.value = r.data }

async function markRead(s) { await api.markRead(s.id); s.is_read = true }
async function del(s) {
  if (!confirm('حذف هذه الرسالة؟')) return
  await api.deleteSubmission(s.id); await load()
}
</script>
