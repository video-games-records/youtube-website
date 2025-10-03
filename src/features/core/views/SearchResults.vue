<template>
  <div class="px-6 py-4">
    <!-- Search Info -->
    <div class="mb-6">
      <h1 class="text-xl font-medium text-muted-foreground">
        {{ t('search.resultsFor') }} "{{ searchQuery }}"
      </h1>
      <p v-if="!loading && totalResults > 0" class="text-sm text-muted-foreground mt-1">
        {{ t('search.aboutResults', { count: totalResults }) }}
      </p>
    </div>

    <!-- Search Banner Ad -->
    <SearchBannerAd class="mb-6" />

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>
    
    <!-- No Results -->
    <div v-else-if="videos.length === 0 && !loading" class="text-center text-muted-foreground py-16">
      <h2 class="text-xl font-medium mb-2">{{ t('search.noResults') }}</h2>
      <p>{{ t('search.tryDifferentKeywords') }}</p>
    </div>
    
    <!-- Results Grid -->
    <div v-else class="space-y-4">
      <VideoCard
        v-for="video in videos"
        :key="video.id"
        :video="video"
        layout="search"
        class="cursor-pointer hover:bg-muted/50 rounded-lg p-2 transition-colors"
        @click="navigateToVideo(video)"
      />
    </div>
    
    <!-- Load More Button -->
    <div v-if="videos.length > 0 && !loading && hasMoreResults" class="flex justify-center mt-8">
      <button 
        @click="loadMoreResults"
        :disabled="loadingMore"
        class="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        <span v-if="loadingMore">{{ t('search.loadingMore') }}</span>
        <span v-else>{{ t('search.loadMore') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSEO } from '@/shared/composables/useSEO'
import { useI18n } from '@/core/i18n'
import VideoService from '@/features/core/services/video.service'
import VideoCard from '@/features/core/components/video/VideoCard.vue'
import type { Video } from '@/features/core/types/video.types'
import SearchBannerAd from '@/features/adsense/components/bloc/SearchBannerAd.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const videos = ref<Video[]>([])
const loading = ref(true)
const loadingMore = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const hasMoreResults = ref(true)
const totalResults = ref(0)

const searchQuery = computed(() => route.query.q as string || '')

const searchVideos = async (page = 1, reset = true) => {
  try {
    if (page === 1) {
      loading.value = true
      if (reset) {
        videos.value = []
        currentPage.value = 1
        hasMoreResults.value = true
      }
    } else {
      loadingMore.value = true
    }
    
    error.value = null
    
    const response = await VideoService.getVideos({
      search: searchQuery.value,
      page,
      itemsPerPage: 20
    })
    
    if (page === 1) {
      videos.value = response['hydra:member']
    } else {
      videos.value.push(...response['hydra:member'])
    }
    
    totalResults.value = response['hydra:totalItems']
    currentPage.value = page
    hasMoreResults.value = response['hydra:view']?.['hydra:next'] ? true : false
    
  } catch (err) {
    console.error('Error searching videos:', err)
    error.value = t('search.errorMessage')
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

const loadMoreResults = () => {
  searchVideos(currentPage.value + 1, false)
}

const navigateToVideo = (video: Video) => {
  const currentLang = route.params.lang as string
  router.push(`/${currentLang}/video/${video.id}/${video.slug}`)
}

// Watch for search query changes
watch(() => route.query.q, (newQuery, oldQuery) => {
  if (newQuery && newQuery !== oldQuery) {
    searchVideos()
  }
}, { immediate: true })

onMounted(() => {
  if (searchQuery.value) {
    searchVideos()
  }
})

// SEO Configuration
const seoData = computed(() => {
  const query = searchQuery.value
  if (!query) {
    return {
      title: 'Search Videos | Video Games Records',
      description: 'Search gaming videos, speedruns and world records on Video Games Records',
      ogType: 'website'
    }
  }

  return {
    title: `"${query}" - Search Results | Video Games Records`,
    description: `Search results for "${query}" on Video Games Records. Find gaming videos, speedruns and world records.`,
    ogType: 'website',
    ogTitle: `Search Results for "${query}"`,
    ogDescription: `Find gaming videos for "${query}" on Video Games Records`,
    keywords: [
      query,
      'search',
      'gaming videos',
      'speedrun',
      'world record',
      'video games records'
    ].join(', '),
    canonical: `/search?q=${encodeURIComponent(query)}`
  }
})

useSEO(seoData)
</script>