<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <h2 style="font-size:16px">أعضاء الفريق ({{ members.length }})</h2>
      <button class="btn btn-primary" @click="openForm(null)">+ إضافة عضو</button>
    </div>
    <div v-if="msg" :class="['alert', msg.type==='ok'?'alert-success':'alert-error']">{{ msg.text }}</div>

    <div class="card">
      <div class="members-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px">
        <div v-for="m in members" :key="m.id" class="member-card-admin">
          <div class="avatar" style="width:100%;aspect-ratio:1;border-radius:10px;overflow:hidden;margin-bottom:12px">
            <img v-if="m.photo_url" :src="m.photo_url" :alt="m.name_ar" style="width:100%;height:100%;object-fit:cover" />
            <span v-else style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:var(--navy);color:rgba(255,255,255,.3);font-size:12px">صورة</span>
          </div>
          <strong>{{ m.name_ar }}</strong><br>
          <small style="color:var(--gold)">{{ m.role_ar }}</small>
          <div style="display:flex;gap:8px;margin-top:10px">
            <button class="btn btn-primary btn-sm" @click="openForm(m)">تعديل</button>
            <button class="btn btn-danger btn-sm" @click="del(m)">حذف</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="form" class="modal-backdrop" @click.self="form=null">
      <div class="modal-box">
        <h3>{{ form.id ? 'تعديل عضو' : 'عضو جديد' }}</h3>
        <div class="lang-tabs"><div :class="['lang-tab',tab==='ar'?'active':'']" @click="tab='ar'">العربية</div><div :class="['lang-tab',tab==='en'?'active':'']" @click="tab='en'">English</div></div>
        <template v-if="tab==='ar'">
          <div class="form-group"><label class="form-label">الاسم (عربي)</label><input v-model="form.name_ar" class="form-control" /></div>
          <div class="form-group"><label class="form-label">المسمى الوظيفي (عربي)</label><input v-model="form.role_ar" class="form-control" /></div>
          <div class="form-group"><label class="form-label">نبذة (عربي)</label><textarea v-model="form.bio_ar" class="form-control" rows="3" /></div>
        </template>
        <template v-else>
          <div class="form-group"><label class="form-label">Name (English)</label><input v-model="form.name_en" class="form-control" style="direction:ltr" /></div>
          <div class="form-group"><label class="form-label">Role (English)</label><input v-model="form.role_en" class="form-control" style="direction:ltr" /></div>
          <div class="form-group"><label class="form-label">Bio (English)</label><textarea v-model="form.bio_en" class="form-control" rows="3" style="direction:ltr" /></div>
        </template>
        <div class="form-group">
          <label class="form-label">الصورة الشخصية</label>
          <input type="file" accept="image/*" @change="e => photoFile = e.target.files[0]" class="form-control" />
        </div>
        <div class="form-group"><label class="form-label">الترتيب</label><input v-model.number="form.sort_order" type="number" class="form-control" style="width:80px" /></div>
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

const members = ref([]), form = ref(null), photoFile = ref(null), tab = ref('ar'), saving = ref(false), msg = ref(null)

onMounted(load)
async function load() { const r = await api.getTeam(); members.value = r.data }

function openForm(m) {
  form.value = m ? { ...m } : { name_ar:'', name_en:'', role_ar:'', role_en:'', bio_ar:'', bio_en:'', sort_order:99, is_active:true }
  photoFile.value = null; tab.value = 'ar'
}

async function save() {
  saving.value = true
  const fd = new FormData()
  Object.entries(form.value).forEach(([k,v]) => v !== null && v !== undefined && fd.append(k, v))
  if (photoFile.value) fd.append('photo', photoFile.value)
  if (form.value.id) fd.append('_method', 'PUT')
  try {
    if (form.value.id) await api.updateMember(form.value.id, fd)
    else await api.createMember(fd)
    form.value = null; await load()
    msg.value = { type:'ok', text:'تم الحفظ' }; setTimeout(() => msg.value=null, 3000)
  } catch { msg.value = { type:'err', text:'حدث خطأ' } }
  finally { saving.value = false }
}

async function del(m) {
  if (!confirm(`حذف "${m.name_ar}"؟`)) return
  await api.deleteMember(m.id); await load()
}
</script>

<style scoped>
.modal-backdrop { position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:100 }
.modal-box { background:#fff;border-radius:16px;padding:32px;width:560px;max-width:95vw;max-height:90vh;overflow-y:auto }
.modal-box h3 { font-size:18px;margin-bottom:20px }
</style>
