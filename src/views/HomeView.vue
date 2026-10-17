<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { allArticles } from '../stores/articles'
import ArticleCard from '../components/ArticleCard.vue'

const route = useRoute()
const { t } = useI18n()
const list = computed(() => {
  const c = route.query.category
  return c ? allArticles.value.filter((a) => a.categoryId === c) : allArticles.value
})
</script>

<template>
  <div class="space-y-3 p-4">
    <ArticleCard v-for="a in list" :key="a.id" :article="a" />
    <p v-if="!list.length" class="py-16 text-center text-muted">{{ t('empty') }}</p>
  </div>
</template>
