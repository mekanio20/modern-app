<script setup>
import { useI18n } from 'vue-i18n'
import { settings, DEFAULT_LOGO } from '../stores/settings'
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col items-center gap-3 p-8 text-center">
    <img :src="settings.logo || DEFAULT_LOGO" class="h-24 w-24 rounded-2xl object-cover shadow" alt="" />
    <h2 class="text-2xl font-bold">{{ settings.appName }}</h2>
    <p class="text-sm text-muted">{{ t('version') }} 1.0.0</p>
  </div>
</template>
