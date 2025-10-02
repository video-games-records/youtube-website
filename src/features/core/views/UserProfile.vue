<template>
  <div class="container mx-auto py-6">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
    
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="player" class="space-y-6">
      <!-- Player Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-card p-6 rounded-lg border">
        <PlayerAvatar :player="player" class="w-24 h-24" />
        
        <div class="flex-1 space-y-2">
          <h1 class="text-3xl font-bold tracking-tight">{{ player.pseudo }}</h1>
          
          <div class="flex flex-col space-y-1 text-muted-foreground">
            <div v-if="player.country" class="flex items-center space-x-2">
              <span class="font-medium">{{ t('player.country') }}:</span>
              <span>{{ player.country.name }}</span>
              <span class="text-xs bg-muted px-2 py-1 rounded">{{ player.country.codeIso2 }}</span>
            </div>
            
            <div v-if="player.team" class="flex items-center space-x-2">
              <span class="font-medium">{{ t('player.team') }}:</span>
              <span>{{ player.team.libTeam }}</span>
              <span class="text-xs bg-muted px-2 py-1 rounded">[{{ player.team.tag }}]</span>
            </div>
            
            <div class="flex items-center space-x-4 text-sm">
              <span><strong>{{ player.nbVideo }}</strong> {{ t('player.videos') }}</span>
              <span><strong>{{ player.nbChart }}</strong> {{ t('player.charts') }}</span>
              <span><strong>{{ player.nbGame }}</strong> {{ t('player.games') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Player Videos -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold tracking-tight">Videos ({{ player.nbVideo }})</h2>
        </div>
        
        <!-- Videos Grid -->
        <div v-if="loadingVideos" class="flex justify-center items-center h-32">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
        
        <div v-else-if="videos.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <VideoCard
            v-for="video in videos"
            :key="video.id"
            :video="video"
            layout="vertical"
            class="cursor-pointer hover:scale-[1.02] transition-transform duration-200"
            @click="navigateToVideo(video.id)"
          />
        </div>
        
        <div v-else class="text-center text-muted-foreground py-8">
          {{ t('player.noVideos') }}
        </div>
        
        <!-- Load More Button -->
        <div v-if="videos.length > 0 && !loadingVideos && hasMoreVideos" class="flex justify-center mt-6">
          <button 
            @click="loadMoreVideos"
            :disabled="loadingMoreVideos"
            class="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <span v-if="loadingMoreVideos">{{ t('player.loadingVideos') }}</span>
            <span v-else>{{ t('player.loadMore') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSEO } from '@/shared/composables/useSEO'
import { useI18n } from '@/core/i18n'
import PlayerAvatar from '@/features/core/components/player/PlayerAvatar.vue'
import VideoCard from '@/features/core/components/video/VideoCard.vue'
import PlayerService from '@/features/core/services/player.service'
import type { Player } from '@/features/core/types/player.types'
import type { Video } from '@/features/core/types/video.types'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const player = ref<Player | null>(null)
const videos = ref<Video[]>([])
const loading = ref(true)
const loadingVideos = ref(false)
const loadingMoreVideos = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const hasMoreVideos = ref(true)

const playerId = computed(() => route.params.id as string)

const loadPlayer = async () => {
  try {
    loading.value = true
    error.value = null
    
    const playerData = await PlayerService.getPlayer(playerId.value)
    player.value = playerData
    
    // Check if slug in URL matches the actual player slug
    const urlSlug = route.params.slug as string
    const actualSlug = playerData.slug
    
    if (actualSlug && urlSlug !== actualSlug) {
      // Redirect to correct slug
      const currentLang = route.params.lang as string
      router.replace(`/${currentLang}/player/${playerData.id}/${actualSlug}`)
      // Don't return here, continue loading the videos since we have the player data
    }
    
    // Load player videos
    await loadPlayerVideos()
    
  } catch (err) {
    console.error('Error loading player:', err)
    error.value = t('home.errors.loadPlayer')
  } finally {
    loading.value = false
  }
}

const loadPlayerVideos = async (page = 1) => {
  try {
    if (page === 1) {
      loadingVideos.value = true
    } else {
      loadingMoreVideos.value = true
    }
    
    const response = await PlayerService.getVideos(playerId.value, {
      page,
      itemsPerPage: 20
    })
    
    if (page === 1) {
      videos.value = response['hydra:member'] || []
    } else {
      videos.value.push(...(response['hydra:member'] || []))
    }
    
    currentPage.value = page
    hasMoreVideos.value = response['hydra:view']?.['hydra:next'] ? true : false
    
  } catch (err) {
    console.error('Error loading player videos:', err)
  } finally {
    loadingVideos.value = false
    loadingMoreVideos.value = false
  }
}

const loadMoreVideos = () => {
  loadPlayerVideos(currentPage.value + 1)
}

const navigateToVideo = (videoId: number) => {
  const currentLang = route.params.lang as string
  router.push(`/${currentLang}/video/${videoId}`)
}

// Watch for route changes to reload data when switching players
watch(() => route.params.id, (newId, oldId) => {
  if (newId && newId !== oldId) {
    // Reset state
    player.value = null
    videos.value = []
    currentPage.value = 1
    hasMoreVideos.value = true
    
    // Reload data for new player
    loadPlayer()
  }
}, { immediate: false })

onMounted(() => {
  loadPlayer()
})

// SEO Configuration with computed reactive properties
const seoData = computed(() => {
  if (!player.value) {
    return {
      title: t('player.profile'),
      description: 'Player profile on Video Games Records',
      ogType: 'profile'
    }
  }

  const playerName = player.value.pseudo
  const videoCount = player.value.nbVideo || 0
  const gameCount = player.value.nbGame || 0
  const country = player.value.country?.name
  const team = player.value.team?.libTeam
  
  // Build rich description
  let description = `${playerName} profile on Video Games Records`
  if (videoCount > 0) {
    description += ` - ${videoCount} gaming videos`
  }
  if (gameCount > 0) {
    description += `, ${gameCount} games played`
  }
  if (country) {
    description += ` from ${country}`
  }
  if (team) {
    description += ` (${team} team)`
  }
  description += '. Watch speedruns, gaming achievements and world records.'

  return {
    title: `${playerName} - Gaming Profile | Video Games Records`,
    description,
    ogType: 'profile',
    ogTitle: `${playerName} - Gaming Profile`,
    ogDescription: description,
    ogImage: player.value.avatar || undefined,
    keywords: [
      playerName,
      'gaming profile',
      'speedrun',
      'world record',
      'video games records',
      country,
      team,
      'gaming videos'
    ].filter(Boolean).join(', '),
    canonical: `/player/${player.value.id}/${player.value.slug}`
  }
})

useSEO(seoData)
</script>