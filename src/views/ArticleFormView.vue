<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getArticle, saveArticle } from '../stores/articles'
import { categories } from '../stores/categories'
import { fileToDataUrl } from '../utils/image'
import RichEditor from '../components/RichEditor.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const existing = route.params.id ? getArticle(route.params.id) : null
// Hazır makaleler düzenlenemez
if (route.params.id && (!existing || existing.builtin)) router.replace('/')

const form = ref({
  title: existing?.title ?? '',
  content: existing?.content ?? '',
  image: existing?.image ?? null,
  categoryId: existing?.categoryId ?? '',
})
const error = ref('')
const saving = ref(false)

async function pickImage(e) {
  const file = e.target.files[0]
  if (file) form.value.image = await fileToDataUrl(file)
  e.target.value = ''
}
async function submit() {
  if (!form.value.title.trim()) return (error.value = t('titleRequired'))
  saving.value = true
  const id = await saveArticle({ id: existing?.id, ...form.value, title: form.value.title.trim() })
  router.replace({ name: 'article', params: { id } })
}
const label = 'mb-1 block text-sm font-medium text-muted'
const field = 'w-full rounded-xl border border-line bg-card text-card-text px-3 py-2.5 outline-none focus:border-accent'
</script>

<template>
  <form class="space-y-4 p-4 pb-8" @submit.prevent="submit">
    <div>
      <span :class="label">{{ t('image') }}</span>
      <div v-if="form.image" class="relative">
        <img :src="form.image" class="max-h-56 w-full rounded-xl object-cover" alt="" />
        <button type="button" class="absolute right-2 top-2 rounded-full bg-black/60 px-3 py-1 text-sm text-white" @click="form.image = null">{{ t('removeImage') }}</button>
      </div>
      <label v-else class="flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-line text-muted">
        {{ t('selectImage') }}
        <input type="file" accept="image/*" class="hidden" @change="pickImage" />
      </label>
    </div>

    <div>
      <label :class="label" for="title">{{ t('title') }}</label>
      <input id="title" v-model="form.title" :class="field" maxlength="150" />
      <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
    </div>

    <div>
      <label :class="label" for="cat">{{ t('category') }}</label>
      <select id="cat" v-model="form.categoryId" :class="field">
        <option value="">{{ t('noCategory') }}</option>
        <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>
    </div>

    <div>
      <span :class="label">{{ t('description') }}</span>
      <RichEditor v-model="form.content" />
    </div>

    <button :disabled="saving" class="w-full rounded-xl bg-accent py-3 font-semibold text-accent-text active:opacity-80 disabled:opacity-60">{{ t('save') }}</button>
  </form>
</template>
