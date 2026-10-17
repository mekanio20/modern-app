<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { settings, setSetting, currentTheme, DEFAULT_LOGO } from '../stores/settings'
import { fileToDataUrl } from '../utils/image'

const { t, locale } = useI18n()
const name = ref(settings.appName)
const theme = computed(currentTheme)

const saveName = () => setSetting('appName', name.value.trim() || 'Modern App')
async function pickLogo(e) {
  const file = e.target.files[0]
  if (file) await setSetting('logo', await fileToDataUrl(file, { max: 256, type: 'image/png' }))
  e.target.value = ''
}
function setLang(l) {
  locale.value = l
  setSetting('lang', l)
}
const card = 'space-y-3 rounded-xl border border-line bg-card text-card-text p-4 shadow-sm'
const seg = (on) => ['flex-1 rounded-lg py-2 text-sm font-medium', on ? 'bg-accent text-accent-text' : 'bg-soft']
</script>

<template>
  <div class="space-y-4 p-4">
    <section :class="card">
      <label class="block text-sm font-medium text-muted">{{ t('appNameLabel') }}</label>
      <input v-model="name" maxlength="30" @change="saveName" @blur="saveName"
        class="w-full rounded-lg border border-line bg-transparent px-3 py-2.5 outline-none focus:border-accent" />

      <div class="flex items-center gap-3">
        <img :src="settings.logo || DEFAULT_LOGO" class="h-14 w-14 rounded-xl object-cover" alt="" />
        <div class="flex flex-1 flex-wrap gap-2">
          <label class="cursor-pointer rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-text">
            {{ t('changeLogo') }}<input type="file" accept="image/*" class="hidden" @change="pickLogo" />
          </label>
          <button v-if="settings.logo" class="rounded-lg bg-soft px-3 py-2 text-sm" @click="setSetting('logo', null)">{{ t('resetLogo') }}</button>
        </div>
      </div>
    </section>

    <section :class="card">
      <h2 class="text-sm font-medium text-muted">{{ t('language') }}</h2>
      <div class="flex gap-2">
        <button :class="seg(settings.lang === 'tk')" @click="setLang('tk')">Türkmençe</button>
        <button :class="seg(settings.lang === 'ru')" @click="setLang('ru')">Русский</button>
      </div>
    </section>

    <router-link to="/themes" :class="[card, 'flex items-center justify-between']">
      <span>{{ t('themes') }}</span>
      <span class="flex items-center gap-2 text-muted">
        {{ theme.name || t(theme.nameKey) }}
        <span class="h-5 w-5 rounded-full border border-line" :style="{ background: theme.colors.headerBg }" />
        ›
      </span>
    </router-link>

    <router-link to="/about" :class="[card, 'flex items-center justify-between']">
      {{ t('about') }} <span class="text-muted">›</span>
    </router-link>
  </div>
</template>
