// Tema = 8 temel renk. Geri kalan renkler (soluk yazı, çizgi, yumuşak vurgu) bunlardan türetilir.
export const COLOR_SECTIONS = [
  { title: 'secHeader', fields: [['headerBg', 'colorBg'], ['headerText', 'colorText']] },
  { title: 'secPage', fields: [['pageBg', 'colorBg'], ['pageText', 'colorText']] },
  { title: 'secCards', fields: [['cardBg', 'colorBg'], ['cardText', 'colorText']] },
  { title: 'secAccent', fields: [['accent', 'colorButton'], ['accentText', 'colorButtonText']] },
]

export const presetThemes = [
  {
    id: 'light', nameKey: 'themeLight',
    colors: { headerBg: '#4a4f58', headerText: '#f3f4f5', pageBg: '#e7e8ea', pageText: '#2a2c31', cardBg: '#f3f4f5', cardText: '#2a2c31', accent: '#4a4f58', accentText: '#f3f4f5' },
  },
  {
    id: 'dark', nameKey: 'themeDark',
    colors: { headerBg: '#2a2c31', headerText: '#c9ccd1', pageBg: '#1d1e21', pageText: '#c9ccd1', cardBg: '#2a2c31', cardText: '#c9ccd1', accent: '#a9afb8', accentText: '#1d1e21' },
  },
  {
    id: 'sepia', nameKey: 'themeSepia',
    colors: { headerBg: '#6b5640', headerText: '#f4ecd8', pageBg: '#efe6d0', pageText: '#3b3024', cardBg: '#f6efdd', cardText: '#3b3024', accent: '#7a5c3e', accentText: '#f6efdd' },
  },
]

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
const hex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
// a rengine b rengini t oranında karıştırır
export const mix = (a, b, t) => {
  const x = rgb(a), y = rgb(b)
  return hex(x.map((v, i) => v * (1 - t) + y[i] * t))
}
export const isDark = (hexColor) => {
  const [r, g, b] = rgb(hexColor)
  return 0.299 * r + 0.587 * g + 0.114 * b < 128
}

export function findTheme(id, custom = []) {
  return [...presetThemes, ...custom].find((t) => t.id === id) || presetThemes[0]
}

// Tema renklerini CSS değişkenlerine çevirir (tailwind @theme bu değişkenleri okur).
export function themeVars(c) {
  return {
    '--c-head': c.headerBg,
    '--c-head-text': c.headerText,
    '--c-page': c.pageBg,
    '--c-page-text': c.pageText,
    '--c-card': c.cardBg,
    '--c-card-text': c.cardText,
    '--c-accent': c.accent,
    '--c-accent-text': c.accentText,
    '--c-muted': mix(c.cardText, c.cardBg, 0.4),
    '--c-line': mix(c.cardText, c.cardBg, 0.82),
    '--c-soft': mix(c.accent, c.cardBg, 0.82),
  }
}
