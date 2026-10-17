<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { presetThemes } from '../themes'
import { settings, setSetting, deleteCustomTheme } from '../stores/settings'
import ThemePreview from '../components/ThemePreview.vue'

const { t } = useI18n()
const router = useRouter()

async function remove(theme) {
  if (confirm(t('confirmDelete'))) await deleteCustomTheme(theme.id)
}
const tile = (id) => [
  'block w-full rounded-xl border-2 bg-card p-2 text-left text-card-text shadow-sm',
  settings.theme === id ? 'border-accent' : 'border-line',
]
</script>

<template>
  <div class="space-y-5 p-4">
    <section>
      <h2 class="mb-2 text-sm font-medium text-muted">{{ t('presetThemes') }}</h2>
      <div class="grid grid-cols-3 gap-3">
        <button v-for="th in presetThemes" :key="th.id" :class="tile(th.id)" @click="setSetting('theme', th.id)">
          <ThemePreview :colors="th.colors" />
          <div class="mt-1.5 truncate text-center text-sm font-medium">{{ settings.theme === th.id ? '✓ ' : '' }}{{ t(th.nameKey) }}</div>
        </button>
      </div>
    </section>

    <section>
      <h2 class="mb-2 text-sm font-medium text-muted">{{ t('myThemes') }}</h2>
      <div class="grid grid-cols-2 gap-3">
        <div v-for="th in settings.customThemes" :key="th.id" :class="tile(th.id)">
          <button class="block w-full" @click="setSetting('theme', th.id)">
            <ThemePreview :colors="th.colors" />
            <div class="mt-1.5 truncate text-center text-sm font-medium">{{ settings.theme === th.id ? '✓ ' : '' }}{{ th.name }}</div>
          </button>
          <div class="mt-1 flex gap-1">
            <button class="flex-1 rounded-md bg-soft py-1 text-sm" @click="router.push({ name: 'theme-edit', params: { id: th.id } })">{{ t('edit') }}</button>
            <button class="flex-1 rounded-md bg-soft py-1 text-sm text-red-500" @click="remove(th)">{{ t('delete') }}</button>
          </div>
        </div>
        <router-link to="/themes/new"
          class="flex min-h-32 items-center justify-center rounded-xl border-2 border-dashed border-line text-muted">
          + {{ t('newTheme') }}
        </router-link>
      </div>
    </section>
  </div>
</template>
