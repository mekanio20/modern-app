import { ref } from 'vue'
import { getDB } from '../db'
import { uid } from '../utils/image'
import { loadArticles } from './articles'

export const categories = ref([])

export async function loadCategories() {
  const list = await (await getDB()).getAll('categories')
  categories.value = list.sort((a, b) => a.createdAt - b.createdAt)
}

export async function addCategory(name) {
  name = name.trim()
  if (!name) return
  await (await getDB()).put('categories', { id: uid(), name, createdAt: Date.now() })
  await loadCategories()
}

// Kategori silinince o kategorideki makaleler "kategorisiz" olur.
export async function removeCategory(id) {
  const db = await getDB()
  const tx = db.transaction(['categories', 'articles'], 'readwrite')
  tx.objectStore('categories').delete(id)
  const arts = tx.objectStore('articles')
  for (const a of await arts.getAll()) {
    if (a.categoryId === id) arts.put({ ...a, categoryId: null })
  }
  await tx.done
  await Promise.all([loadCategories(), loadArticles()])
}
