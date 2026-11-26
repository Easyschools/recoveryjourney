<template>
  <div>
    <div v-if="!editing">
      <div class="card">
        <div class="table-wrap">
          <table>
            <thead><tr><th>الصفحة</th><th>Slug</th><th>حالة النشر</th><th></th></tr></thead>
            <tbody>
              <tr v-for="p in pages" :key="p.slug">
                <td><strong>{{ p.title_ar || p.slug }}</strong><br><small style="opacity:.55">{{ p.title_en }}</small></td>
                <td><code>{{ p.slug }}</code></td>
                <td><span :class="['badge', p.is_published ? 'badge-green' : 'badge-gray']">{{ p.is_published ? 'منشور' : 'مسودة' }}</span></td>
                <td><button class="btn btn-primary btn-sm" @click="edit(p)">تعديل</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-else>
      <div style="display:flex;gap:12px;align-items:center;margin-bottom:20px">
        <button class="btn btn-ghost btn-sm" @click="editing=null">← رجوع</button>
        <h2 style="font-size:16px">تعديل: {{ editing.slug }}</h2>
      </div>
      <div v-if="saved" class="alert alert-success">تم الحفظ بنجاح ✓</div>
      <div v-if="saveErr" class="alert alert-error">{{ saveErr }}</div>

      <div class="card">
        <div class="lang-tabs">
          <div :class="['lang-tab', tab==='ar'?'active':'']" @click="tab='ar'">العربية</div>
          <div :class="['lang-tab', tab==='en'?'active':'']" @click="tab='en'">English</div>
        </div>

        <template v-if="tab==='ar'">
          <div class="form-group"><label class="form-label">عنوان الصفحة (عربي)</label><input v-model="editing.title_ar" class="form-control" /></div>
          <div class="form-group"><label class="form-label">وصف SEO (عربي)</label><textarea v-model="editing.meta_desc_ar" class="form-control" rows="2" /></div>
          <div class="form-group"><label class="form-label">المحتوى JSON (عربي)</label><textarea v-model="contentArStr" class="form-control" rows="12" style="font-family:monospace;font-size:12px" /></div>
        </template>
        <template v-else>
          <div class="form-group"><label class="form-label">Page Title (English)</label><input v-model="editing.title_en" class="form-control" /></div>
          <div class="form-group"><label class="form-label">SEO Description (English)</label><textarea v-model="editing.meta_desc_en" class="form-control" rows="2" /></div>
          <div class="form-group"><label class="form-label">Content JSON (English)</label><textarea v-model="contentEnStr" class="form-control" rows="12" style="font-family:monospace;font-size:12px" /></div>
        </template>

        <div class="form-group">
          <label style="display:flex;gap:8px;align-items:center;cursor:pointer">
            <input type="checkbox" v-model="editing.is_published" /> منشور
          </label>
        </div>
        <button class="btn btn-primary" :disabled="saving" @click="save">{{ saving ? 'جارٍ الحفظ...' : 'حفظ التغييرات' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'

const pages = ref([])
const editing = ref(null)
const tab = ref('ar')
const saving = ref(false), saved = ref(false), saveErr = ref('')

onMounted(async () => {
  const slugs = ['home','about','services','detox','team','journey','family','faq','contact']
  const { data } = await api.getPages()
  pages.value = data.sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug))
})

function edit(p) { editing.value = { ...p }; tab.value = 'ar'; saved.value = false; saveErr.value = '' }

const contentArStr = computed({
  get: () => JSON.stringify(editing.value?.content_ar ?? {}, null, 2),
  set: v => { try { editing.value.content_ar = JSON.parse(v) } catch {} },
})
const contentEnStr = computed({
  get: () => JSON.stringify(editing.value?.content_en ?? {}, null, 2),
  set: v => { try { editing.value.content_en = JSON.parse(v) } catch {} },
})

async function save() {
  saving.value = true; saved.value = false; saveErr.value = ''
  try {
    const { data } = await api.updatePage(editing.value.slug, editing.value)
    Object.assign(pages.value.find(p => p.slug === data.slug), data)
    saved.value = true
    setTimeout(() => saved.value = false, 3000)
  } catch (e) { saveErr.value = e.response?.data?.message || 'خطأ في الحفظ' }
  finally { saving.value = false }
}
</script>
