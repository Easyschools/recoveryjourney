<template>
  <div>
    <p style="margin-bottom:16px;opacity:.7">صور JPG أو PNG أو WebP بحد أقصى 4 ميجابايت. الأفضل صور أفقية.</p>
    <div v-if="msg" :class="['alert', msg.type==='ok'?'alert-success':'alert-error']">{{ msg.text }}</div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px">
      <div v-for="slot in slots" :key="slot.key" class="card" style="margin:0">
        <strong>{{ slot.label }}</strong><br>
        <small style="opacity:.55">صفحة {{ slot.page }}</small>
        <div style="aspect-ratio:4/3;margin:12px 0;border-radius:10px;overflow:hidden;background:#eef0f4;display:flex;align-items:center;justify-content:center">
          <img v-if="images[slot.key]" :src="images[slot.key]" :alt="slot.label" style="width:100%;height:100%;object-fit:cover" />
          <span v-else style="opacity:.5;font-size:12px">لا توجد صورة</span>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <label class="btn btn-primary btn-sm" style="cursor:pointer">
            {{ busy === slot.key ? 'جارٍ الرفع...' : images[slot.key] ? 'تغيير الصورة' : 'رفع صورة' }}
            <input type="file" accept="image/jpeg,image/png,image/webp" hidden :disabled="!!busy" @change="upload(slot.key, $event)" />
          </label>
          <button v-if="images[slot.key]" class="btn btn-danger btn-sm" :disabled="!!busy" @click="remove(slot)">حذف</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const slots = [
  { key: 'home_facade', page: 'الرئيسية', label: 'الحديقة أو الواجهة' },
  { key: 'home_rooms', page: 'الرئيسية', label: 'الغرف أو المساحات الداخلية' },
  { key: 'about_facade', page: 'من نحن', label: 'واجهة المركز' },
  { key: 'about_rooms', page: 'من نحن', label: 'غرف الإقامة' },
  { key: 'about_sessions', page: 'من نحن', label: 'غرفة الجلسات' },
  { key: 'about_common', page: 'من نحن', label: 'المساحات المشتركة' },
  { key: 'detox_center', page: 'سحب السموم', label: 'مركز سحب السموم' },
  { key: 'family_session', page: 'للعائلة', label: 'جلسات الأسرة' },
]
const images = ref({}), busy = ref(''), msg = ref(null)

onMounted(() => run('load', () => api.getImages()))

async function run(key, request, success) {
  busy.value = key; msg.value = null
  try {
    images.value = (await request()).data
    if (success) msg.value = { type: 'ok', text: success }
  } catch (e) {
    msg.value = { type: 'err', text: e.response?.data?.message || 'حدث خطأ' }
  } finally { busy.value = '' }
}

function upload(key, event) {
  const file = event.target.files[0]
  event.target.value = ''
  if (!file) return
  const fd = new FormData()
  fd.append('image', file)
  run(key, () => api.uploadImage(key, fd), 'تم رفع الصورة')
}

function remove(slot) {
  if (confirm(`حذف صورة "${slot.label}"؟`)) run(slot.key, () => api.deleteImage(slot.key), 'تم حذف الصورة')
}
</script>
