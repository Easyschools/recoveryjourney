<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <h2 style="font-size:16px">الأسئلة الشائعة ({{ faqs.length }})</h2>
      <button class="btn btn-primary" @click="openForm(null)">+ إضافة سؤال</button>
    </div>
    <div v-if="msg" :class="['alert', msg.type==='ok'?'alert-success':'alert-error']">{{ msg.text }}</div>

    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>السؤال (عربي)</th><th>Question (EN)</th><th>حالة</th><th></th></tr></thead>
          <tbody>
            <tr v-for="f in faqs" :key="f.id">
              <td><span class="drag-handle">⠿</span> {{ f.sort_order }}</td>
              <td>{{ f.question_ar }}</td>
              <td style="direction:ltr;text-align:start">{{ f.question_en }}</td>
              <td><span :class="['badge', f.is_active ? 'badge-green' : 'badge-gray']">{{ f.is_active ? 'نشط' : 'مخفي' }}</span></td>
              <td style="display:flex;gap:6px">
                <button class="btn btn-primary btn-sm" @click="openForm(f)">تعديل</button>
                <button class="btn btn-danger btn-sm" @click="del(f)">حذف</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="form" class="modal-backdrop" @click.self="form=null">
      <div class="modal-box">
        <h3>{{ form.id ? 'تعديل السؤال' : 'سؤال جديد' }}</h3>
        <div class="lang-tabs"><div :class="['lang-tab',tab==='ar'?'active':'']" @click="tab='ar'">العربية</div><div :class="['lang-tab',tab==='en'?'active':'']" @click="tab='en'">English</div></div>
        <template v-if="tab==='ar'">
          <div class="form-group"><label class="form-label">السؤال (عربي)</label><input v-model="form.question_ar" class="form-control" /></div>
          <div class="form-group"><label class="form-label">الإجابة (عربي)</label><textarea v-model="form.answer_ar" class="form-control" rows="4" /></div>
        </template>
        <template v-else>
          <div class="form-group"><label class="form-label">Question (English)</label><input v-model="form.question_en" class="form-control" style="direction:ltr" /></div>
          <div class="form-group"><label class="form-label">Answer (English)</label><textarea v-model="form.answer_en" class="form-control" rows="4" style="direction:ltr" /></div>
        </template>
        <div class="form-group"><label style="display:flex;gap:8px;align-items:center;cursor:pointer"><input type="checkbox" v-model="form.is_active" /> نشط</label></div>
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

const faqs = ref([]), form = ref(null), tab = ref('ar'), saving = ref(false), msg = ref(null)

onMounted(load)
async function load() { const r = await api.getFaqs(); faqs.value = r.data }

function openForm(f) {
  form.value = f ? { ...f } : { question_ar:'', answer_ar:'', question_en:'', answer_en:'', is_active:true }
  tab.value = 'ar'
}

async function save() {
  saving.value = true
  try {
    if (form.value.id) await api.updateFaq(form.value.id, form.value)
    else await api.createFaq(form.value)
    form.value = null; await load()
    msg.value = { type:'ok', text:'تم الحفظ' }; setTimeout(() => msg.value=null, 3000)
  } catch { msg.value = { type:'err', text:'حدث خطأ' } }
  finally { saving.value = false }
}

async function del(f) {
  if (!confirm(`حذف: "${f.question_ar}"؟`)) return
  await api.deleteFaq(f.id); await load()
}
</script>

<style scoped>
.modal-backdrop { position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:100 }
.modal-box { background:#fff;border-radius:16px;padding:32px;width:560px;max-width:95vw;max-height:90vh;overflow-y:auto }
.modal-box h3 { font-size:18px;margin-bottom:20px }
</style>
