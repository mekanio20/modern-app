<script setup>
import { computed } from 'vue'
import { themeVars } from '../themes'

const props = defineProps({ colors: { type: Object, required: true }, big: Boolean })
// Değişkenler bu elemanın içinde geçerli olur; içerik gerçek uygulama sınıflarını kullanır.
const style = computed(() => themeVars(props.colors))
</script>

<template>
  <div :style="style" class="pointer-events-none overflow-hidden rounded-lg border border-line bg-page text-page-text">
    <div class="flex items-center justify-between bg-head px-2 py-1.5 text-head-text" :class="big ? 'text-sm' : 'text-[10px]'">
      <span class="font-semibold">Aa</span>
      <span class="rounded-full bg-head-text px-2 text-head">+</span>
    </div>
    <div class="space-y-1.5 p-2" :class="big ? 'text-sm' : 'text-[10px]'">
      <div class="rounded-md border border-line bg-card p-1.5 text-card-text">
        <span class="rounded-full bg-soft px-1.5 text-accent">tag</span>
        <div class="font-semibold">Lorem ipsum</div>
        <div class="text-muted">dolor sit amet</div>
      </div>
      <div class="rounded-md bg-accent px-2 py-1 text-center text-accent-text">OK</div>
    </div>
  </div>
</template>
