<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getArticle, deleteArticle, localized } from '../stores/articles'
import { categories } from '../stores/categories'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const article = computed(() => getArticle(route.params.id))
const categoryName = computed(() => {
  const a = article.value
  if (!a) return ''
  return a.category ? localized(a.category, locale.value) : categories.value.find((c) => c.id === a.categoryId)?.name || ''
})

async function remove() {
  if (!confirm(t('confirmDelete'))) return
  await deleteArticle(article.value.id)
  router.replace('/')
}
</script>

<template>
  <p v-if="!article" class="p-16 text-center text-muted">{{ t('notFound') }}</p>
  <article v-else class="pb-8">
    <img v-if="article.image" :src="article.image" class="max-h-72 w-full object-cover" alt="" />
    <div class="space-y-3 p-4">
      <span v-if="categoryName" class="inline-block rounded-full bg-soft px-2 py-0.5 text-xs text-accent">{{ categoryName }}</span>
      <h2 class="text-2xl font-bold">{{ localized(article.title, locale) }}</h2>
      <div class="rich" v-html="localized(article.content, locale)" />
      <!-- Hazır (kod tarafındaki) makaleler değiştirilemez -->
      <div v-if="!article.builtin" class="flex gap-2 pt-4">
        <router-link :to="{ name: 'article-edit', params: { id: article.id } }" class="flex-1 rounded-lg bg-accent py-2.5 text-center font-medium text-accent-text">{{ t('edit') }}</router-link>
        <button class="flex-1 rounded-lg bg-red-600 py-2.5 font-medium text-white" @click="remove">{{ t('delete') }}</button>
      </div>
    </div>
  </article>
</template>
