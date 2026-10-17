<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import BottomNav from './components/BottomNav.vue'

const route = useRoute()
const sidebarOpen = ref(false)
</script>

<template>
  <div class="flex h-full flex-col">
    <AppHeader @open-sidebar="sidebarOpen = true" />
    <main class="flex-1 overflow-y-auto">
      <router-view />
    </main>
    <BottomNav v-if="route.meta.tabs" @open-sidebar="sidebarOpen = true" />
    <AppSidebar v-model="sidebarOpen" />
  </div>
</template>
