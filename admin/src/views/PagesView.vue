<template>
  <div>
    <div v-if="!editing">
      <div class="card">
        <div class="table-wrap">
          <table>
            <thead><tr><th>الصفحة</th><th>Slug</th><th></th></tr></thead>
            <tbody>
              <tr v-for="p in pages" :key="p.slug">
                <td><strong>{{ p.title_ar || p.slug }}</strong><br><small style="opacity:.55">{{ p.title_en }}</small></td>
                <td><code>{{ p.slug }}</code></td>
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

        <div class="form-group">
          <label class="form-label">{{ tab==='ar' ? 'عنوان تبويب المتصفح (عربي)' : 'Browser tab title (English)' }}</label>
          <input v-model="editing[`title_${tab}`]" class="form-control" :dir="dir" />
        </div>
        <div class="form-group">
          <label class="form-label">{{ tab==='ar' ? 'وصف الصفحة في محركات البحث (عربي)' : 'Search description (English)' }}</label>
          <textarea v-model="editing[`meta_desc_${tab}`]" class="form-control" rows="2" :dir="dir" />
        </div>

        <h3 style="font-size:15px;margin:24px 0 4px">نصوص الصفحة</h3>
        <p style="font-size:13px;opacity:.6;margin-bottom:16px">لإرجاع النص الأصلي امسح الخانة ثم احفظ.</p>
        <div v-for="(f, n) in fields[editing.slug]" :key="`${tab}-${f.key}`" class="form-group">
          <label class="form-label">نص {{ n + 1 }}</label>
          <textarea
            :value="editing[`content_${tab}`][f.key] ?? f[tab]"
            @input="editing[`content_${tab}`][f.key] = $event.target.value"
            class="form-control" :dir="dir" :rows="f[tab].length > 90 ? 3 : 1" />
        </div>

        <button class="btn btn-primary" :disabled="saving" @click="save">{{ saving ? 'جارٍ الحفظ...' : 'حفظ التغييرات' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import fields from '../pageFields.json'

const pages = ref([])
const editing = ref(null)
const tab = ref('ar')
const saving = ref(false), saved = ref(false), saveErr = ref('')

onMounted(async () => {
  const slugs = ['home','about','services','detox','team','journey','family','faq','contact']
  const { data } = await api.getPages()
  pages.value = data.sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug))
})

const dir = computed(() => tab.value === 'ar' ? 'rtl' : 'ltr')

function edit(p) {
  // PHP returns an empty object as []
  const content = c => Array.isArray(c) ? {} : { ...c }
  editing.value = { ...p, content_ar: content(p.content_ar), content_en: content(p.content_en) }
  tab.value = 'ar'; saved.value = false; saveErr.value = ''
}

function overrides(lang) {
  const defaults = Object.fromEntries(fields[editing.value.slug].map(f => [f.key, f[lang]]))
  return Object.fromEntries(Object.entries(editing.value[`content_${lang}`])
    .filter(([k, v]) => v?.trim() && v !== defaults[k]))
}

async function save() {
  saving.value = true; saved.value = false; saveErr.value = ''
  try {
    const { data } = await api.updatePage(editing.value.slug, { ...editing.value, content_ar: overrides('ar'), content_en: overrides('en') })
    Object.assign(pages.value.find(p => p.slug === data.slug), data)
    const current = tab.value
    edit(data); tab.value = current
    saved.value = true
    setTimeout(() => saved.value = false, 3000)
  } catch (e) { saveErr.value = e.response?.data?.message || 'خطأ في الحفظ' }
  finally { saving.value = false }
}
</script>
