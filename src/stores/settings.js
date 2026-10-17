import { reactive, watchEffect } from 'vue'
import { getDB } from '../db'
import { findTheme, themeVars, isDark } from '../themes'
import { uid } from '../utils/image'

export const DEFAULT_LOGO = '/logo.svg'

export const settings = reactive({
  appName: 'Modern App',
  logo: null, // null => varsayılan logo
  lang: 'tk',
  customThemes: [], // kullanıcının oluşturduğu temalar: { id, name, colors }
  theme: window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
})

export async function loadSettings() {
  const db = await getDB()
  for (const key of Object.keys(settings)) {
    const v = await db.get('settings', key)
    if (v !== undefined) settings[key] = v
  }
}

export async function setSetting(key, value) {
  settings[key] = value
  // reactive Proxy IndexedDB'ye doğrudan yazılamaz
  await (await getDB()).put('settings', JSON.parse(JSON.stringify(value)), key)
}

export const currentTheme = () => findTheme(settings.theme, settings.customThemes)

export async function saveCustomTheme({ id, name, colors }) {
  id ||= 'custom-' + uid()
  const list = settings.customThemes.filter((t) => t.id !== id)
  await setSetting('customThemes', [...list, { id, name, colors: { ...colors } }])
  await setSetting('theme', id)
  return id
}

export async function deleteCustomTheme(id) {
  await setSetting('customThemes', settings.customThemes.filter((t) => t.id !== id))
  if (settings.theme === id) await setSetting('theme', 'light')
}

export function bindSettingsToDocument() {
  watchEffect(() => {
    const theme = currentTheme()
    const root = document.documentElement
    for (const [k, v] of Object.entries(themeVars(theme.colors))) root.style.setProperty(k, v)
    root.style.colorScheme = isDark(theme.colors.pageBg) ? 'dark' : 'light'
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', theme.colors.headerBg)
    document.documentElement.lang = settings.lang
    document.title = settings.appName
  })
}
