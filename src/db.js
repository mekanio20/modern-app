import { openDB } from 'idb'

let dbPromise
export const getDB = () =>
  (dbPromise ??= openDB('modern-app', 1, {
    upgrade(db) {
      db.createObjectStore('articles', { keyPath: 'id' })
      db.createObjectStore('categories', { keyPath: 'id' })
      db.createObjectStore('settings') // key-value (dış anahtar)
    },
  }))
