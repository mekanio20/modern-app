<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { COLOR_SECTIONS } from '../themes'
import { settings, currentTheme, saveCustomTheme } from '../stores/settings'
import ThemePreview from '../components/ThemePreview.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const editing = settings.customThemes.find((th) => th.id === route.params.id)
if (route.params.id && !editing) router.replace('/themes')

// Yeni temada başlangıç olarak şu an aktif temanın renkleri kopyalanır.
const colors = ref({ ...(editing?.colors ?? currentTheme().colors) })
const name = ref(editing?.name ?? '')

async function save() {
  await saveCustomTheme({ id: editing?.id, name: name.value.trim() || t('newTheme'), colors: colors.value })
  router.replace('/themes')
}
</script>

<template>
  <form class="space-y-4 p-4 pb-8" @submit.prevent="save">
    <ThemePreview :colors="colors" big />

    <div>
      <label class="mb-1 block text-sm font-medium text-muted" for="tname">{{ t('themeName') }}</label>
      <input id="tname" v-model="name" maxlength="30"
        class="w-full rounded-xl border border-line bg-card px-3 py-2.5 text-card-text outline-none focus:border-accent" />
    </div>

    <section v-for="sec in COLOR_SECTIONS" :key="sec.title"
      class="space-y-2 rounded-xl border border-line bg-card p-3 text-card-text">
      <h2 class="text-sm font-semibold">{{ t(sec.title) }}</h2>
      <label v-for="[key, label] in sec.fields" :key="key" class="flex items-center justify-between gap-3">
        <span class="text-sm text-muted">{{ t(label) }}</span>
        <span class="flex items-center gap-2">
          <code class="text-xs text-muted">{{ colors[key] }}</code>
          <input type="color" v-model="colors[key]" class="h-9 w-12 cursor-pointer rounded border border-line bg-transparent p-0.5" />
        </span>
      </label>
    </section>

    <button class="w-full rounded-xl bg-accent py-3 font-semibold text-accent-text active:opacity-80">{{ t('save') }}</button>
  </form>
</template>
