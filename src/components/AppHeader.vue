<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { settings, DEFAULT_LOGO } from '../stores/settings'

defineEmits(['open-sidebar'])
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const isHome = computed(() => route.name === 'home')
const title = computed(() => (route.meta.titleKey ? t(route.meta.titleKey) : ''))
const back = () => (window.history.state?.back ? router.back() : router.replace('/'))
</script>

<template>
  <header class="flex items-center gap-2 bg-head px-3 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] text-head-text shadow">
    <template v-if="isHome">
      <button class="rounded-full p-2 active:bg-head-text/20" @click="$emit('open-sidebar')" aria-label="categories">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/></svg>
      </button>
      <img :src="settings.logo || DEFAULT_LOGO" class="h-8 w-8 rounded-lg object-cover" alt="" />
      <h1 class="flex-1 truncate text-lg font-semibold">{{ settings.appName }}</h1>
      <router-link to="/article/new" class="flex items-center gap-1 rounded-full bg-head-text px-4 py-2 text-sm font-semibold text-head active:scale-95">
        <span class="text-lg leading-none">+</span> {{ t('add') }}
      </router-link>
    </template>
    <template v-else>
      <button class="rounded-full p-2 active:bg-head-text/20" @click="back" :aria-label="t('back')">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <h1 class="flex-1 truncate text-lg font-semibold">{{ title }}</h1>
    </template>
  </header>
</template>
