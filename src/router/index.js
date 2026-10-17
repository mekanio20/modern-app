import { createRouter, createWebHashHistory } from 'vue-router'

// Hash history: Capacitor (file/https://localhost) ile sorunsuz çalışır.
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue'), meta: { tabs: true } },
    { path: '/menu', name: 'menu', component: () => import('../views/MenuView.vue'), meta: { tabs: true, titleKey: 'menu' } },
    { path: '/themes', name: 'themes', component: () => import('../views/ThemesView.vue'), meta: { titleKey: 'themes' } },
    { path: '/themes/new', name: 'theme-new', component: () => import('../views/ThemeEditorView.vue'), meta: { titleKey: 'newTheme' } },
    { path: '/themes/:id/edit', name: 'theme-edit', component: () => import('../views/ThemeEditorView.vue'), meta: { titleKey: 'editTheme' } },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), meta: { titleKey: 'about' } },
    { path: '/article/new', name: 'article-new', component: () => import('../views/ArticleFormView.vue'), meta: { titleKey: 'newArticle' } },
    { path: '/article/:id', name: 'article', component: () => import('../views/ArticleView.vue'), meta: { titleKey: 'home' } },
    { path: '/article/:id/edit', name: 'article-edit', component: () => import('../views/ArticleFormView.vue'), meta: { titleKey: 'editArticle' } },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
