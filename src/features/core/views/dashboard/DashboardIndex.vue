<template>
  <div class="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
    <!-- Video Upload Card -->
    <div class="lg:col-span-1">
      <VideoUploadCard @import-videos="handleImportVideos" />
    </div>
    
    <!-- Channel Analytics -->
    <div class="lg:col-span-1 xl:col-span-2">
      <ChannelAnalytics 
        v-if="!loading && player"
        :video-count="player.nbVideo"
        :total-views="totalViews"
        @access-analytics="handleAccessAnalytics"
      />
      <div v-else-if="loading" class="bg-card rounded-lg border p-6">
        <div class="animate-pulse">
          <div class="h-4 bg-muted rounded w-3/4 mb-4"></div>
          <div class="h-8 bg-muted rounded w-1/2 mb-6"></div>
          <div class="space-y-3">
            <div class="h-4 bg-muted rounded"></div>
            <div class="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Video Import Modal -->
  <VideoImportModal 
    :is-open="showImportModal"
    @close="showImportModal = false"
    @add-video="handleAddVideo"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/features/auth/stores/auth'
import playerService from '@/features/core/services/player.service'
import videoService from '@/features/core/services/video.service'
import type { Player } from '@/features/core/types/player.types'
import ChannelAnalytics from '@/features/core/components/dashboard/ChannelAnalytics.vue'
import VideoUploadCard from '@/features/core/components/dashboard/VideoUploadCard.vue'
import VideoImportModal from '@/features/core/components/dashboard/VideoImportModal.vue'

const authStore = useAuthStore()
const loading = ref(true)
const player = ref<Player | null>(null)
const totalViews = ref(0)
const showImportModal = ref(false)

onMounted(async () => {
  if (authStore.user?.id) {
    try {
      player.value = await playerService.getPlayer(authStore.user.id)
    } catch (error) {
      console.error('Error fetching player data:', error)
    } finally {
      loading.value = false
    }
  } else {
    loading.value = false
  }
})

const handleImportVideos = () => {
  showImportModal.value = true
}

const handleAddVideo = async (url: string, onSuccess: () => void, onError: (message: string) => void) => {
  try {
    const response = await videoService.createVideo(url)
    
    // Check if the response status is 201 (Created)
    if (response) {
      // Refresh player data to get updated video count
      if (authStore.user?.id) {
        player.value = await playerService.getPlayer(authStore.user.id)
      }
      onSuccess()
    }
  } catch (error: unknown) {
    console.error('Error adding video:', error)
    
    // Handle different error types
    let errorMessage = 'Une erreur est survenue lors de l\'ajout de la vidéo'
    
    if (error && typeof error === 'object' && 'response' in error) {
      const errorWithResponse = error as { response?: { status?: number; data?: { message?: string } } }
      if (errorWithResponse.response?.status === 422) {
        errorMessage = 'URL invalide ou vidéo déjà existante'
      } else if (errorWithResponse.response?.data?.message) {
        errorMessage = errorWithResponse.response.data.message
      }
    } else if (error && typeof error === 'object' && 'message' in error) {
      const errorWithMessage = error as { message: string }
      errorMessage = errorWithMessage.message
    }
    
    onError(errorMessage)
  }
}

const handleAccessAnalytics = () => {
  // TODO: Navigate to detailed analytics page
  console.log('Access analytics clicked')
}
</script>