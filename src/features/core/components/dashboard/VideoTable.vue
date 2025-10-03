<template>
  <div class="bg-card rounded-lg border">
    <!-- Table Header -->
    <div class="grid grid-cols-7 gap-4 p-4 border-b border-border text-sm font-medium text-muted-foreground">
      <div class="col-span-4">{{ t('dashboard.videos.table.video') }}</div>
      <div class="col-span-1">{{ t('dashboard.videos.table.date') }}</div>
      <div class="col-span-1">{{ t('dashboard.videos.table.views') }}</div>
      <div class="col-span-1">{{ t('dashboard.videos.table.comments') }}</div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-8 text-center">
      <div class="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
      <p class="text-muted-foreground mt-2">{{ t('dashboard.videos.table.loading') }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="videos.length === 0" class="p-8 text-center">
      <div class="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-foreground mb-2">{{ t('dashboard.videos.table.empty.title') }}</h3>
      <p class="text-muted-foreground">{{ t('dashboard.videos.table.empty.description') }}</p>
    </div>

    <!-- Video Rows -->
    <div v-else>
      <div 
        v-for="video in videos" 
        :key="video.id"
        class="grid grid-cols-7 gap-4 p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
      >
        <!-- Video Info -->
        <div class="col-span-4 flex items-center gap-3">
          <div class="relative w-20 h-11 bg-muted rounded overflow-hidden flex-shrink-0">
            <img 
              :src="getVideoThumbnail(video)" 
              :alt="video.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div class="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
              {{ formatDuration(video.duration || 0) }}
            </div>
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="font-medium text-sm text-foreground line-clamp-2 leading-tight">
              {{ video.title }}
            </h3>
          </div>
        </div>

        <!-- Date -->
        <div class="col-span-1 flex items-center">
          <div class="text-sm">
            <div class="text-foreground">{{ formatDate(video.createdAt) }}</div>
            <div class="text-xs text-muted-foreground">{{ getVideoStatus(video) }}</div>
          </div>
        </div>

        <!-- Views -->
        <div class="col-span-1 flex items-center">
          <span class="text-sm text-foreground">{{ formatViews(video.viewCount || 0) }}</span>
        </div>

        <!-- Comments -->
        <div class="col-span-1 flex items-center justify-between">
          <span class="text-sm text-foreground">{{ video.commentCount || 0 }}</span>
          
          <!-- Actions Menu -->
          <div class="relative">
            <button 
              @click.stop="toggleMenu(video.id)"
              class="p-1 hover:bg-muted rounded transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            
            <!-- Dropdown Menu -->
            <div 
              v-if="activeMenu === video.id"
              @click.stop
              class="absolute right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-lg z-10"
            >
              <button 
                @click="handleView(video)"
                class="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {{ t('dashboard.videos.table.actions.view') }}
              </button>
              <button 
                @click="handleEdit(video)"
                class="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {{ t('dashboard.videos.table.actions.edit') }}
              </button>
              <button 
                @click="handleDelete(video)"
                class="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground text-destructive flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {{ t('dashboard.videos.table.actions.delete') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '@/core/i18n'
import type { Video } from '@/features/core/types/video.types'

const { t } = useI18n()

interface Props {
  videos: Video[]
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  'view': [video: Video]
  'edit': [video: Video]
  'delete': [video: Video]
}>()

const activeMenu = ref<string | null>(null)

const toggleMenu = (videoId: string) => {
  activeMenu.value = activeMenu.value === videoId ? null : videoId
}

const handleView = (video: Video) => {
  activeMenu.value = null
  emit('view', video)
}

const handleEdit = (video: Video) => {
  activeMenu.value = null
  emit('edit', video)
}

const handleDelete = (video: Video) => {
  activeMenu.value = null
  emit('delete', video)
}

const getVideoThumbnail = (video: Video): string => {
  if (video.thumbnail) return video.thumbnail
  if (video.externalId) return `https://img.youtube.com/vi/${video.externalId}/mqdefault.jpg`
  return '/placeholder-thumbnail.jpg'
}

const getVideoStatus = (_video: Video): string => {
  return t('dashboard.videos.table.status.published')
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const formatViews = (count: number): string => {
  if (count < 1000) return count.toString()
  if (count < 1000000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  if (count < 1000000000) return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  return (count / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Close menu when clicking outside
const handleClickOutside = (_event: Event) => {
  if (activeMenu.value) {
    activeMenu.value = null
  }
}

// Add event listener on mount and remove on unmount
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>