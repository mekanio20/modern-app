<script setup>
import { useI18n } from 'vue-i18n'
defineEmits(['open-sidebar'])
const { t } = useI18n()
const item = 'flex flex-1 flex-col items-center gap-0.5 py-2 text-xs text-muted'
</script>

<template>
  <nav class="flex border-t border-line bg-card text-card-text pb-[env(safe-area-inset-bottom)]">
    <button :class="item" @click="$emit('open-sidebar')">
      <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h16" stroke-linecap="round"/></svg>
      {{ t('categories') }}
    </button>
    <router-link to="/" :class="item" active-class="!text-accent">
      <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" stroke-linejoin="round"/></svg>
      {{ t('home') }}
    </router-link>
    <router-link to="/menu" :class="item" active-class="!text-accent">
      <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>
      {{ t('menu') }}
    </router-link>
  </nav>
</template>
