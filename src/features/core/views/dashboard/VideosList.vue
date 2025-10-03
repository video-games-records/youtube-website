<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-foreground">{{ t('dashboard.videos.title') }}</h1>
        <p class="text-sm text-muted-foreground mt-1">{{ t('dashboard.videos.subtitle') }}</p>
      </div>
      <button 
        @click="showImportModal = true"
        class="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors"
      >
        {{ t('dashboard.videos.addVideo') }}
      </button>
    </div>


    <!-- Filters -->
    <div class="flex items-center gap-4">
      <button class="flex items-center gap-2 px-3 py-1.5 border border-input rounded-md text-sm hover:bg-accent">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
        </svg>
        {{ t('dashboard.videos.filter') }}
      </button>
      <div class="text-sm text-muted-foreground">
        {{ totalVideos }} {{ totalVideos > 1 ? t('dashboard.videos.pagination.videos') : t('dashboard.videos.pagination.video') }}
      </div>
    </div>

    <!-- Video Table -->
    <VideoTable 
      :videos="videos" 
      :loading="loading"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <!-- Pagination -->
    <div v-if="totalVideos > 0" class="flex items-center justify-between">
      <div class="text-sm text-muted-foreground">
        {{ t('dashboard.videos.pagination.showing') }} {{ ((currentPage - 1) * itemsPerPage) + 1 }} {{ t('dashboard.videos.pagination.to') }} {{ Math.min(currentPage * itemsPerPage, totalVideos) }} {{ t('dashboard.videos.pagination.of') }} {{ totalVideos }} {{ totalVideos > 1 ? t('dashboard.videos.pagination.videos') : t('dashboard.videos.pagination.video') }}
      </div>
      
      <Pagination
        v-slot="{ page }"
        :items-per-page="itemsPerPage"
        :total="totalVideos"
        :default-page="currentPage"
        @update:page="goToPage"
      >
        <PaginationContent v-slot="{ items }">
          <PaginationPrevious />
          <template v-for="(item, index) in items" :key="index">
            <PaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === page"
            >
              {{ item.value }}
            </PaginationItem>
            <PaginationEllipsis v-else :index="index" />
          </template>
          <PaginationNext />
        </PaginationContent>
      </Pagination>
    </div>

    <!-- Video Import Modal -->
    <VideoImportModal 
      :is-open="showImportModal"
      @close="showImportModal = false"
      @add-video="handleAddVideo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from '@/core/i18n'
import { useAuthStore } from '@/features/auth/stores/auth'
import playerService from '@/features/core/services/player.service'
import videoService from '@/features/core/services/video.service'
import type { Video } from '@/features/core/types/video.types'
import VideoTable from '@/features/core/components/dashboard/VideoTable.vue'
import VideoImportModal from '@/features/core/components/dashboard/VideoImportModal.vue'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/pagination'


const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const loading = ref(true)
const videos = ref<Video[]>([])
const totalVideos = ref(0)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showImportModal = ref(false)

const totalPages = computed(() => Math.ceil(totalVideos.value / itemsPerPage.value))

const loadVideos = async (page = 1) => {
  if (!authStore.user?.id) return
  
  loading.value = true
  try {
    const response = await playerService.getVideos(authStore.user.id, {
      page,
      itemsPerPage: itemsPerPage.value,
      isActive: undefined // Get all videos (active and inactive)
    })
    
    videos.value = response['hydra:member']
    totalVideos.value = response['hydra:totalItems']
    currentPage.value = page
  } catch (error) {
    console.error('Error loading videos:', error)
  } finally {
    loading.value = false
  }
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    loadVideos(page)
  }
}

const handleView = (video: Video) => {
  router.push({
    name: 'VideoIndex',
    params: {
      lang: route.params.lang,
      id: video.id,
      slug: video.slug
    }
  })
}

const handleEdit = (video: Video) => {
  // TODO: Implement edit functionality
  console.log('Edit video:', video)
}

const handleDelete = async (video: Video) => {
  // TODO: Implement delete functionality
  console.log('Delete video:', video)
}


const handleAddVideo = async (url: string, onSuccess: () => void, onError: (message: string) => void) => {
  try {
    await videoService.createVideo(url)
    // Refresh the video list
    await loadVideos(currentPage.value)
    onSuccess()
  } catch (error: unknown) {
    console.error('Error adding video:', error)
    
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

onMounted(() => {
  loadVideos()
})
</script>