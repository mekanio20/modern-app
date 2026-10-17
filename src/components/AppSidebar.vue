<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { categories, addCategory, removeCategory } from '../stores/categories'
import { settings, DEFAULT_LOGO } from '../stores/settings'

const open = defineModel({ type: Boolean })
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const newName = ref('')
const active = computed(() => (route.name === 'home' ? route.query.category || '' : null))

function select(id) {
  router.push(id ? { name: 'home', query: { category: id } } : { name: 'home' })
  open.value = false
}
async function add() {
  await addCategory(newName.value)
  newName.value = ''
}
async function remove(c) {
  if (!confirm(t('confirmDeleteCategory'))) return
  await removeCategory(c.id)
  if (route.query.category === c.id) select('')
}
const row = 'flex items-center rounded-lg px-3 py-2.5'
</script>

<template>
  <Transition
    enter-active-class="transition-opacity" leave-active-class="transition-opacity"
    enter-from-class="opacity-0" leave-to-class="opacity-0"
  >
    <div v-if="open" class="fixed inset-0 z-40 bg-black/50" @click="open = false" />
  </Transition>
  <Transition
    enter-active-class="transition-transform" leave-active-class="transition-transform"
    enter-from-class="-translate-x-full" leave-to-class="-translate-x-full"
  >
    <aside v-if="open" class="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85%] flex-col bg-card text-card-text pt-[env(safe-area-inset-top)] shadow-xl">
      <div class="flex items-center gap-3 border-b border-line p-4">
        <img :src="settings.logo || DEFAULT_LOGO" class="h-10 w-10 rounded-xl object-cover" alt="" />
        <span class="truncate text-lg font-semibold">{{ settings.appName }}</span>
      </div>

      <h2 class="px-4 pb-1 pt-4 text-xs font-semibold uppercase tracking-wide text-muted">{{ t('categories') }}</h2>
      <ul class="flex-1 space-y-1 overflow-y-auto px-2">
        <li>
          <button :class="[row, 'w-full', active === '' ? 'bg-soft font-semibold text-accent' : '']" @click="select('')">
            {{ t('all') }}
          </button>
        </li>
        <li v-for="c in categories" :key="c.id" :class="[row, 'gap-1', active === c.id ? 'bg-soft font-semibold text-accent' : '']">
          <button class="flex-1 truncate text-left" @click="select(c.id)">{{ c.name }}</button>
          <button class="rounded-full p-1.5 text-red-500 active:bg-red-100" @click="remove(c)" :aria-label="t('delete')">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>
          </button>
        </li>
      </ul>

      <form class="flex gap-2 border-t border-line p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]" @submit.prevent="add">
        <input v-model="newName" :placeholder="t('newCategory')" maxlength="40"
          class="min-w-0 flex-1 rounded-lg border border-line bg-transparent px-3 py-2 outline-none focus:border-accent" />
        <button class="rounded-lg bg-accent px-4 text-xl text-accent-text active:opacity-80" :aria-label="t('add')">+</button>
      </form>
    </aside>
  </Transition>
</template>
