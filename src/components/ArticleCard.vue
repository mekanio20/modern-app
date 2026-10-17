<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { localized } from '../stores/articles'
import { categories } from '../stores/categories'
import { htmlToText } from '../utils/image'

const props = defineProps({ article: { type: Object, required: true } })
const { locale } = useI18n()
const title = computed(() => localized(props.article.title, locale.value))
const excerpt = computed(() => htmlToText(localized(props.article.content, locale.value)))
const categoryName = computed(() =>
  props.article.category
    ? localized(props.article.category, locale.value)
    : categories.value.find((c) => c.id === props.article.categoryId)?.name || '',
)
</script>

<template>
  <router-link :to="{ name: 'article', params: { id: article.id } }"
    class="flex gap-3 overflow-hidden rounded-xl border border-line bg-card text-card-text p-3 shadow-sm active:scale-[0.99]">
    <img v-if="article.image" :src="article.image" class="h-20 w-20 shrink-0 rounded-lg object-cover" alt="" />
    <div class="min-w-0 flex-1">
      <span v-if="categoryName" class="mb-1 inline-block rounded-full bg-soft px-2 py-0.5 text-xs text-accent">{{ categoryName }}</span>
      <h3 class="truncate font-semibold">{{ title }}</h3>
      <p class="line-clamp-2 text-sm text-muted">{{ excerpt }}</p>
    </div>
  </router-link>
</template>
