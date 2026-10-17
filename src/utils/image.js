// Seçilen resmi küçültüp data URL olarak döndürür (IndexedDB'de saklamak için).
export async function fileToDataUrl(file, { max = 1024, type = 'image/jpeg', quality = 0.82 } = {}) {
  const bmp = await createImageBitmap(file)
  const scale = Math.min(1, max / Math.max(bmp.width, bmp.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bmp.width * scale)
  canvas.height = Math.round(bmp.height * scale)
  canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL(type, quality)
}

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7)

export function htmlToText(html = '') {
  const el = document.createElement('div')
  el.innerHTML = html
  return el.textContent.trim()
}
