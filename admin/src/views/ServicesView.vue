<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <h2 style="font-size:16px">الخدمات ({{ services.length }})</h2>
      <button class="btn btn-primary" @click="openForm(null)">+ إضافة</button>
    </div>
    <div v-if="msg" :class="['alert', msg.type==='ok'?'alert-success':'alert-error']">{{ msg.text }}</div>

    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الاسم (عربي)</th><th>Name (EN)</th><th>الكود</th><th>النوع</th><th></th></tr></thead>
          <tbody>
            <tr v-for="s in services" :key="s.id">
              <td>{{ s.name_ar }}</td>
              <td style="direction:ltr;text-align:start">{{ s.name_en }}</td>
              <td><code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:12px">{{ s.code }}</code></td>
              <td><span :class="['badge', s.type==='condition'?'badge-gold':'badge-green']">{{ s.type==='condition'?'حالة':'علاج' }}</span></td>
              <td style="display:flex;gap:6px">
                <button class="btn btn-primary btn-sm" @click="openForm(s)">تعديل</button>
                <button class="btn btn-danger btn-sm" @click="del(s)">حذف</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="form" class="modal-backdrop" @click.self="form=null">
      <div class="modal-box">
        <h3>{{ form.id ? 'تعديل' : 'إضافة' }}</h3>
        <div class="form-row">
          <div class="form-group"><label class="form-label">الاسم (عربي)</label><input v-model="form.name_ar" class="form-control" /></div>
          <div class="form-group"><label class="form-label">Name (English)</label><input v-model="form.name_en" class="form-control" style="direction:ltr" /></div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">الكود (بالإنجليزية)</label>
            <input v-model="form.code" class="form-control" style="direction:ltr" placeholder="e.g. ADD" />
          </div>
          <div class="form-group">
            <label class="form-label">النوع</label>
            <select v-model="form.type" class="form-control">
              <option value="condition">حالة (Condition)</option>
              <option value="therapy">علاج (Therapy)</option>
            </select>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:4px">
          <button class="btn btn-primary" :disabled="saving" @click="save">{{ saving ? '...' : 'حفظ' }}</button>
          <button class="btn btn-ghost" @click="form=null">إلغاء</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const services = ref([]), form = ref(null), saving = ref(false), msg = ref(null)

onMounted(load)
async function load() { const r = await api.getServices(); services.value = r.data }

function openForm(s) { form.value = s ? { ...s } : { name_ar:'', name_en:'', code:'', type:'condition', sort_order:99 } }

async function save() {
  saving.value = true
  try {
    if (form.value.id) await api.updateService(form.value.id, form.value)
    else await api.createService(form.value)
    form.value = null; await load()
    msg.value = { type:'ok', text:'تم الحفظ' }; setTimeout(() => msg.value=null, 3000)
  } catch { msg.value = { type:'err', text:'حدث خطأ' } }
  finally { saving.value = false }
}

async function del(s) {
  if (!confirm(`حذف "${s.name_ar}"؟`)) return
  await api.deleteService(s.id); await load()
}
</script>

<style scoped>
.modal-backdrop { position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:100 }
.modal-box { background:#fff;border-radius:16px;padding:32px;width:560px;max-width:95vw;max-height:90vh;overflow-y:auto }
.modal-box h3 { font-size:18px;margin-bottom:20px }
</style>
