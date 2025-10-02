<template>
  <div class="flex gap-2" :class="layoutClasses">
    <!-- Thumbnail -->
    <div class="relative flex-shrink-0 overflow-hidden rounded-lg" :class="thumbnailClasses">
      <img 
        :src="thumbnailUrl" 
        :alt="video.title"
        class="w-full h-full object-cover bg-muted"
        style="object-position: center;"
        loading="lazy"
      />
      <!-- Duration badge (placeholder) -->
      <div class="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
        {{ formatDuration(120) }}
      </div>
    </div>
    
    <!-- Video Info -->
    <div class="flex-1 min-w-0">
      <h3 class="font-medium text-sm leading-tight line-clamp-2 mb-1">
        {{ video.title }}
      </h3>
      
      <div class="text-xs text-muted-foreground space-y-1">
        <div v-if="video.player" class="hover:text-foreground cursor-pointer">
          {{ video.player.name }}
        </div>
        
        <div class="flex items-center space-x-1">
          <span>{{ formatViews(video.viewCount) }} views</span>
          <span>•</span>
          <span>{{ formatTimeAgo(video.createdAt) }}</span>
        </div>
        
        <div v-if="video.game" class="text-xs">
          {{ video.game.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Video } from '@/features/core/types/video.types'
import { useDateFormatter } from '@/shared/composables/useDateFormatter'

interface Props {
  video: Video
  layout?: 'horizontal' | 'vertical' | 'search'
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'horizontal'
})

const { formatDateRelative } = useDateFormatter()

const layoutClasses = computed(() => {
  if (props.layout === 'vertical') return 'flex-col'
  if (props.layout === 'search') return 'flex-row gap-4'
  return 'flex-row'
})

const thumbnailClasses = computed(() => {
  if (props.layout === 'vertical') return 'w-full aspect-video'
  if (props.layout === 'search') return 'w-80 aspect-video'
  return 'w-40 aspect-video'
})

// Use the thumbnail from the video data, fallback to YouTube API or placeholder
const thumbnailUrl = computed(() => {
  // Use the thumbnail URL from the video data if available
  if (props.video.thumbnail) {
    return props.video.thumbnail
  }
  // Fallback to YouTube thumbnail if we have externalId
  if (props.video.externalId) {
    // Use maxresdefault for better quality, fallback to mqdefault if not available
    return `https://img.youtube.com/vi/${props.video.externalId}/maxresdefault.jpg`
  }
  // Final fallback to placeholder
  return '/placeholder-thumbnail.jpg'
})

// Format view count like YouTube (e.g., 1.2K, 1.5M)
const formatViews = (count: number): string => {
  if (count < 1000) return count.toString()
  if (count < 1000000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  if (count < 1000000000) return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  return (count / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'
}

// Format duration (placeholder)
const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Format time ago using the video's createdAt date
const formatTimeAgo = (dateString: string): string => {
  return formatDateRelative(dateString)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>