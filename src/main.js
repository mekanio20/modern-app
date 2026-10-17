import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { i18n } from './i18n'
import { settings, loadSettings, bindSettingsToDocument } from './stores/settings'
import { loadArticles } from './stores/articles'
import { loadCategories } from './stores/categories'

async function bootstrap() {
  await Promise.all([loadSettings(), loadArticles(), loadCategories()])
  i18n.global.locale.value = settings.lang
  bindSettingsToDocument()
  createApp(App).use(router).use(i18n).mount('#app')
}
bootstrap()
