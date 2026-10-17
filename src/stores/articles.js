import { ref, computed } from 'vue'
import { getDB } from '../db'
import { builtinArticles } from '../data/builtinArticles'
import { uid } from '../utils/image'

const userArticles = ref([])

export async function loadArticles() {
  const list = await (await getDB()).getAll('articles')
  userArticles.value = list.sort((a, b) => b.createdAt - a.createdAt)
}

// Kullanıcı makaleleri (yeni → eski) + koddaki hazır makaleler
export const allArticles = computed(() => [...userArticles.value, ...builtinArticles])

export const getArticle = (id) => allArticles.value.find((a) => a.id === id)

export async function saveArticle({ id, title, content, image, categoryId }) {
  const old = id && userArticles.value.find((a) => a.id === id)
  const article = {
    id: id || uid(),
    title,
    content,
    image: image || null,
    categoryId: categoryId || null,
    createdAt: old?.createdAt ?? Date.now(),
    updatedAt: Date.now(),
  }
  await (await getDB()).put('articles', article)
  await loadArticles()
  return article.id
}

export async function deleteArticle(id) {
  await (await getDB()).delete('articles', id)
  await loadArticles()
}

// Hazır makaleler { tk, ru } olabilir; düz string de olabilir.
export const localized = (v, lang) => (typeof v === 'string' ? v : (v?.[lang] ?? v?.tk ?? ''))
