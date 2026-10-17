<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle, Color, FontSize } from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'

const model = defineModel({ type: String, default: '' })
const { t } = useI18n()
const tick = ref(0) // toolbar durumunu (aktif B/I/U...) yenilemek için

const editor = useEditor({
  content: model.value,
  extensions: [
    StarterKit, // bold, italic, underline, strike, listeler, başlık, geri al/yinele
    TextStyle,
    Color,
    FontSize,
    Placeholder.configure({ placeholder: () => t('descPlaceholder') }),
  ],
  onUpdate: ({ editor }) => (model.value = editor.isEmpty ? '' : editor.getHTML()),
  onTransaction: () => tick.value++,
})
onBeforeUnmount(() => editor.value?.destroy())

const active = (name, attrs) => (tick.value, editor.value?.isActive(name, attrs))
const currentSize = () => (tick.value, editor.value?.getAttributes('textStyle').fontSize || '')
const currentColor = () => (tick.value, editor.value?.getAttributes('textStyle').color || '#000000')

const sizes = [
  { v: '14px', k: 'sizeSmall' },
  { v: '', k: 'sizeNormal' },
  { v: '20px', k: 'sizeLarge' },
  { v: '28px', k: 'sizeHuge' },
]
function setSize(e) {
  const v = e.target.value
  const chain = editor.value.chain().focus()
  v ? chain.setFontSize(v).run() : chain.unsetFontSize().run()
}
const run = (fn) => fn(editor.value.chain().focus()).run()

const btn = 'h-9 min-w-9 rounded-md px-2 text-sm font-semibold active:bg-soft'
const on = 'bg-soft text-accent'
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-line bg-card text-card-text">
    <div v-if="editor" class="flex flex-wrap items-center gap-1 border-b border-line p-1.5">
      <button type="button" :class="[btn, active('bold') && on]" @mousedown.prevent @click="run((c) => c.toggleBold())"><b>B</b></button>
      <button type="button" :class="[btn, active('italic') && on]" @mousedown.prevent @click="run((c) => c.toggleItalic())"><i>I</i></button>
      <button type="button" :class="[btn, active('underline') && on]" @mousedown.prevent @click="run((c) => c.toggleUnderline())"><u>U</u></button>
      <button type="button" :class="[btn, active('strike') && on]" @mousedown.prevent @click="run((c) => c.toggleStrike())"><s>S</s></button>

      <select :value="currentSize()" @change="setSize"
        class="h-9 rounded-md border border-line bg-transparent px-1 text-sm">
        <option v-for="s in sizes" :key="s.v" :value="s.v">{{ t(s.k) }}</option>
      </select>

      <label class="relative flex h-9 w-9 items-center justify-center rounded-md active:bg-soft" :title="t('textColor')">
        <span class="font-bold" :style="{ color: currentColor() }">A</span>
        <span class="absolute bottom-1 h-1 w-5 rounded" :style="{ background: currentColor() }" />
        <input type="color" class="absolute inset-0 opacity-0" :value="currentColor()"
          @input="editor.chain().focus().setColor($event.target.value).run()" />
      </label>
      <button type="button" :class="btn" :title="t('resetColor')" @mousedown.prevent @click="run((c) => c.unsetColor())">⌫</button>

      <button type="button" :class="[btn, active('bulletList') && on]" @mousedown.prevent @click="run((c) => c.toggleBulletList())">•</button>
      <button type="button" :class="[btn, active('orderedList') && on]" @mousedown.prevent @click="run((c) => c.toggleOrderedList())">1.</button>
      <button type="button" :class="btn" @mousedown.prevent @click="run((c) => c.undo())">↶</button>
      <button type="button" :class="btn" @mousedown.prevent @click="run((c) => c.redo())">↷</button>
    </div>
    <EditorContent :editor="editor" class="rich p-3" />
  </div>
</template>
