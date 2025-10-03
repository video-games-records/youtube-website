<template>
  <div class="px-6 py-4">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
    
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="video" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Video Section (Left side) -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Video Player -->
        <VideoPlayer
          :source="video.externalId"
          :title="video.title"
          platform="youtube"
          aspect-ratio="video"
          class="w-full"
          :load-immediately="true"
        />
        
        <!-- Video Title -->
        <h1 class="text-xl font-semibold leading-tight">{{ video.title }}</h1>
        
        <!-- Video Stats -->
        <div class="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>{{ formatViews(video.viewCount) }} {{ t('video.views') }}</span>
        </div>
        
        <!-- Channel Info -->
        <div v-if="video.player" class="flex items-start space-x-3 py-4 border-b">
          <PlayerAvatar :player="video.player" class="w-10 h-10" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2">
              <PlayerLink :player="video.player" class="font-medium hover:no-underline" />
            </div>
            <div v-if="video.game" class="text-sm text-muted-foreground mt-1">
              {{ t('player.playing') }} {{ video.game.name }}
            </div>
          </div>
        </div>
        
        <!-- Video Description Area -->
        <div class="bg-muted/30 rounded-lg p-4">
          <div class="text-sm">
            <div class="mb-3">
              <p class="whitespace-pre-line text-foreground">{{ video.description }}</p>
            </div>
            <div v-if="video.game" class="flex items-center space-x-2 text-muted-foreground">
              <span class="font-medium">Game:</span>
              <span>{{ video.game.name }}</span>
            </div>
          </div>
        </div>
        
        <!-- Video Comments -->
        <VideoComments :video-id="video.id" />
      </div>
      
      <!-- Sidebar (Right side) -->
      <div class="space-y-4">
        <!-- Related Videos List -->
        <div class="space-y-2">
          <h2 v-if="relatedVideos.length > 0" class="text-lg font-semibold mb-3">
            {{ video.game ? `${t('video.moreVideosFrom')} ${video.game.name}` : t('video.relatedVideos') }}
          </h2>
          <VideoCard
            v-for="relatedVideo in relatedVideos"
            :key="relatedVideo.id"
            :video="relatedVideo"
            layout="horizontal"
            class="cursor-pointer hover:bg-muted/50 rounded-lg p-2 transition-colors"
            @click="navigateToVideo(relatedVideo)"
          />
        </div>
        
        <!-- Video Sidebar Ad -->
        <VideoSidebarAd sticky />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSEO } from '@/shared/composables/useSEO'
import { useI18n } from '@/core/i18n'
import VideoService from '@/features/core/services/video.service'
import GameService from '@/features/core/services/game.service'
import PlayerAvatar from '@/features/core/components/player/PlayerAvatar.vue'
import PlayerLink from '@/features/core/components/player/PlayerLink.vue'
import VideoPlayer from '@/shared/components/media/VideoPlayer.vue'
import VideoCard from '@/features/core/components/video/VideoCard.vue'
import VideoComments from '@/features/core/components/video/VideoComments.vue'
import type { Video } from '@/features/core/types/video.types'
import VideoSidebarAd from '@/features/adsense/components/bloc/VideoSidebarAd.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const video = ref<Video | null>(null)
const relatedVideos = ref<Video[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Format view count like YouTube (e.g., 1.2K, 1.5M)
const formatViews = (count: number): string => {
  if (count < 1000) return count.toString()
  if (count < 1000000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  if (count < 1000000000) return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  return (count / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'
}

const loadVideo = async () => {
  try {
    loading.value = true
    error.value = null
    
    const videoId = route.params.id as string
    video.value = await VideoService.getVideo(videoId)
    
    // Check if slug in URL matches the actual video slug
    const urlSlug = route.params.slug as string
    const actualSlug = video.value.slug
    
    if (actualSlug && urlSlug !== actualSlug) {
      // Redirect to correct slug
      const currentLang = route.params.lang as string
      router.replace(`/${currentLang}/video/${videoId}/${actualSlug}`)
      // Don't return here, continue loading the related videos since we have the video data
    }
    
    // Load related videos
    await loadRelatedVideos()
  } catch (err) {
    console.error('Error loading video:', err)
    error.value = t('home.errors.loadVideo')
  } finally {
    loading.value = false
  }
}

const loadRelatedVideos = async () => {
  try {
    // If video has a game, load videos from the same game
    if (video.value?.game?.id) {
      const response = await GameService.getVideos(video.value.game.id, { 
        itemsPerPage: 8 
      })
      relatedVideos.value = response['hydra:member'].filter(v => v.id !== video.value?.id)
    } else {
      // Fallback to general videos if no game
      const response = await VideoService.getVideos({ 
        page: 1, 
        itemsPerPage: 8 
      })
      relatedVideos.value = response['hydra:member'].filter(v => v.id !== video.value?.id)
    }
  } catch (err) {
    console.error('Error loading related videos:', err)
    // Don't set error, just leave related videos empty
  }
}

const navigateToVideo = (video: Video | number) => {
  const currentLang = route.params.lang as string
  
  if (typeof video === 'number') {
    // Fallback for just ID
    router.push(`/${currentLang}/video/${video}`)
  } else {
    // Use slug if available
    router.push(`/${currentLang}/video/${video.id}/${video.slug}`)
  }
}

// Watch for route changes to reload data when switching videos
watch(() => route.params.id, (newId, oldId) => {
  if (newId && newId !== oldId) {
    // Reset state
    video.value = null
    relatedVideos.value = []
    
    // Reload data for new video
    loadVideo()
  }
}, { immediate: false })

onMounted(() => {
  loadVideo()
})

// SEO Configuration with computed reactive properties
const seoData = computed(() => {
  if (!video.value) {
    return {
      title: 'Gaming Video | Video Games Records',
      description: 'Watch gaming videos, speedruns and world records on Video Games Records',
      ogType: 'video'
    }
  }

  const videoTitle = video.value.title
  const playerName = video.value.player?.pseudo
  const gameName = video.value.game?.name
  const viewCount = video.value.viewCount || 0
  const description = video.value.description
  
  // Build rich title
  let title = videoTitle
  if (gameName) {
    title += ` - ${gameName}`
  }
  if (playerName) {
    title += ` by ${playerName}`
  }
  title += ' | Video Games Records'

  // Build rich description
  let metaDescription = ''
  if (description && description.length > 10) {
    // Use first 120 chars of description
    metaDescription = description.substring(0, 120).trim()
    if (description.length > 120) metaDescription += '...'
  } else {
    metaDescription = `Watch ${videoTitle}`
    if (playerName) {
      metaDescription += ` by ${playerName}`
    }
    if (gameName) {
      metaDescription += ` in ${gameName}`
    }
  }
  
  if (viewCount > 0) {
    metaDescription += ` (${formatViews(viewCount)} views)`
  }
  metaDescription += '. Gaming videos, speedruns and world records on Video Games Records.'

  return {
    title,
    description: metaDescription,
    ogType: 'video',
    ogTitle: videoTitle,
    ogDescription: metaDescription,
    ogImage: video.value.thumbnail || `https://img.youtube.com/vi/${video.value.externalId}/maxresdefault.jpg`,
    ogVideo: `https://www.youtube.com/watch?v=${video.value.externalId}`,
    keywords: [
      videoTitle,
      playerName,
      gameName,
      'gaming video',
      'speedrun',
      'world record',
      'youtube',
      'video games records'
    ].filter(Boolean).join(', '),
    canonical: `/video/${video.value.id}/${video.value.slug}`
  }
})

useSEO(seoData)
</script>