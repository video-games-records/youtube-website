<template>
  <div class="relative max-w-xl w-full">
    <form @submit.prevent="handleSearch" class="relative">
      <div class="relative flex">
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          :placeholder="t('search.placeholder')"
          class="w-full px-4 py-2 pr-12 border border-input rounded-l-full bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          @keyup.escape="clearSearch"
        />
        <button
          type="submit"
          :disabled="!searchQuery.trim()"
          class="px-6 py-2 bg-muted border border-l-0 border-input rounded-r-full hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
    
    <!-- Clear button -->
    <button
      v-if="searchQuery"
      @click="clearSearch"
      class="absolute right-14 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
    >
      <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from '@/core/i18n'

const emit = defineEmits<{
  search: []
}>()

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const searchInput = ref<HTMLInputElement>()
const searchQuery = ref('')

const handleSearch = () => {
  const query = searchQuery.value.trim()
  if (!query) return
  
  const currentLang = route.params.lang as string
  router.push({
    name: 'SearchResults',
    params: { lang: currentLang },
    query: { q: query }
  })
  
  // Emit search event for mobile
  emit('search')
}

const clearSearch = () => {
  searchQuery.value = ''
  searchInput.value?.focus()
}

// Initialize search query from URL if we're on search page
onMounted(() => {
  if (route.name === 'SearchResults' && route.query.q) {
    searchQuery.value = route.query.q as string
  }
})

// Keyboard shortcut (Ctrl+K or Cmd+K to focus search)
const handleKeydown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault()
    searchInput.value?.focus()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

// Cleanup on unmount
import { onUnmounted } from 'vue'
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>