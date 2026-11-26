<template>
  <div>
    <div v-if="saved" class="alert alert-success">تم الحفظ ✓</div>
    <div v-if="err" class="alert alert-error">{{ err }}</div>

    <div class="card">
      <h3 style="font-size:16px;margin-bottom:20px">معلومات التواصل</h3>
      <div class="form-row">
        <div class="form-group"><label class="form-label">رقم الهاتف</label><input v-model="s.phone" class="form-control" dir="ltr" /></div>
        <div class="form-group"><label class="form-label">رقم WhatsApp (بدون +)</label><input v-model="s.whatsapp" class="form-control" dir="ltr" /></div>
      </div>
      <div class="form-group"><label class="form-label">البريد الإلكتروني</label><input v-model="s.email" class="form-control" dir="ltr" /></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">العنوان (عربي)</label><input v-model="s.address_ar" class="form-control" /></div>
        <div class="form-group"><label class="form-label">Address (English)</label><input v-model="s.address_en" class="form-control" dir="ltr" /></div>
      </div>
      <div class="form-group"><label class="form-label">رابط Google Maps</label><input v-model="s.maps_url" class="form-control" dir="ltr" /></div>
    </div>

    <div class="card">
      <h3 style="font-size:16px;margin-bottom:20px">تتبع وتحليل (Tracking)</h3>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Google Analytics ID</label><input v-model="s.ga4_id" class="form-control" dir="ltr" placeholder="G-XXXXXXXXXX" /></div>
        <div class="form-group"><label class="form-label">Meta Pixel ID</label><input v-model="s.meta_pixel_id" class="form-control" dir="ltr" /></div>
      </div>
      <div class="form-group"><label class="form-label">TikTok Pixel ID</label><input v-model="s.tiktok_pixel_id" class="form-control" dir="ltr" /></div>
    </div>

    <div class="card">
      <h3 style="font-size:16px;margin-bottom:20px">SEO عام</h3>
      <div class="form-row">
        <div class="form-group"><label class="form-label">عنوان الموقع (عربي)</label><input v-model="s.site_title_ar" class="form-control" /></div>
        <div class="form-group"><label class="form-label">Site Title (English)</label><input v-model="s.site_title_en" class="form-control" dir="ltr" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">وصف الموقع (عربي)</label><textarea v-model="s.site_desc_ar" class="form-control" rows="2" /></div>
        <div class="form-group"><label class="form-label">Site Description (EN)</label><textarea v-model="s.site_desc_en" class="form-control" rows="2" dir="ltr" /></div>
      </div>
    </div>

    <div style="margin-top:20px">
      <button class="btn btn-primary" :disabled="saving" @click="save">{{ saving ? 'جارٍ الحفظ...' : 'حفظ جميع الإعدادات' }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const s = ref({}), saving = ref(false), saved = ref(false), err = ref('')

onMounted(async () => { const r = await api.getSettings(); s.value = r.data })

async function save() {
  saving.value = true; saved.value = false; err.value = ''
  try {
    await api.updateSettings(s.value)
    saved.value = true; setTimeout(() => saved.value = false, 3000)
  } catch (e) { err.value = e.response?.data?.message || 'خطأ' }
  finally { saving.value = false }
}
</script>
