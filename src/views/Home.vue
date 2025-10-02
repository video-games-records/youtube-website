<template>
  <div class="px-6 py-4">
    <!-- Videos Grid -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
    
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      <VideoCard
        v-for="video in videos"
        :key="video.id"
        :video="video"
        layout="vertical"
        class="cursor-pointer hover:scale-[1.02] transition-transform duration-200"
        @click="navigateToVideo(video)"
      />
    </div>
    
    <!-- Load More Button -->
    <div v-if="videos.length > 0 && !loading" class="flex justify-center mt-8">
      <button 
        @click="loadMoreVideos"
        :disabled="loadingMore"
        class="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        <span v-if="loadingMore">{{ t('home.loadingVideos') }}</span>
        <span v-else>{{ t('home.loadMore') }}</span>
      </button>
    </div>
  </div>

  <!-- Social Links Section -->
  <section class="py-8 bg-muted/10">
    <div class="max-w-[1880px] mx-auto px-4">
      <div class="flex justify-center">
        <div class="flex items-center gap-6">
          <!-- Shop -->
          <a href="https://video-games-records.myspreadshop.fr/" target="_blank" rel="noopener noreferrer"
             class="text-muted-foreground hover:text-primary transition-colors duration-200">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </a>

          <!-- Discord -->
          <a href="https://discord.com/invite/nYsRzsZ" target="_blank" rel="noopener noreferrer"
             class="text-muted-foreground hover:text-[#5865F2] transition-colors duration-200">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
            </svg>
          </a>

          <!-- Twitch -->
          <a href="https://www.twitch.tv/videogamesrecords/" target="_blank" rel="noopener noreferrer"
             class="text-muted-foreground hover:text-[#9146FF] transition-colors duration-200">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
            </svg>
          </a>

          <!-- YouTube -->
          <a href="https://www.youtube.com/channel/UC_b4IOPqkN9uOsk-vktl8eA" target="_blank" rel="noopener noreferrer"
             class="text-muted-foreground hover:text-[#FF0000] transition-colors duration-200">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

          <!-- Steam -->
          <a href="https://steamcommunity.com/groups/vgrr" target="_blank" rel="noopener noreferrer"
             class="text-muted-foreground hover:text-[#000000] transition-colors duration-200">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.030 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.62 20.565 6.363 24.695 11.979 24.695c6.649 0 12.021-5.373 12.021-12.021C24 5.372 18.628.001 11.979.001zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.453-.397.951-1.498 1.407-2.454 1.014H7.54zm8.397-8.85c0 1.66-1.345 3.005-3.005 3.005s-3.005-1.345-3.005-3.005 1.345-3.005 3.005-3.005 3.005 1.345 3.005 3.005zm-5.634.002c0 1.452 1.178 2.629 2.629 2.629s2.629-1.177 2.629-2.629-1.178-2.629-2.629-2.629-2.629 1.177-2.629 2.629z"/>
            </svg>
          </a>

          <!-- Twitter -->
          <a href="https://x.com/VGRecords" target="_blank" rel="noopener noreferrer"
             class="text-muted-foreground hover:text-[#1DA1F2] transition-colors duration-200">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>

          <!-- LinkedIn -->
          <a href="https://www.linkedin.com/company/video-games-records/" target="_blank" rel="noopener noreferrer"
             class="text-muted-foreground hover:text-[#0A66C2] transition-colors duration-200">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from '@/core/i18n';
import { useSEO } from '@/shared/composables/useSEO'
import VideoCard from '@/features/core/components/video/VideoCard.vue'
import VideoService from '@/features/core/services/video.service'
import type { Video } from '@/features/core/types/video.types'

const { t } = useI18n();
const router = useRouter()
const route = useRoute()

// State
const videos = ref<Video[]>([])
const loading = ref(true)
const loadingMore = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)

// Load initial videos
const loadVideos = async (page = 1) => {
  try {
    if (page === 1) {
      loading.value = true
    } else {
      loadingMore.value = true
    }
    error.value = null
    
    const response = await VideoService.getVideos({ 
      page,
      itemsPerPage: 24 
    })
    
    if (page === 1) {
      videos.value = response['hydra:member']
    } else {
      videos.value.push(...response['hydra:member'])
    }
    
    currentPage.value = page
  } catch (err) {
    console.error('Error loading videos:', err)
    error.value = t('home.errors.loadVideos')
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

// Load more videos
const loadMoreVideos = () => {
  loadVideos(currentPage.value + 1)
}

// Navigate to video
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

// Load videos on mount
onMounted(() => {
  loadVideos()
})

// SEO Configuration for Home page
const seoData = computed(() => ({
  title: t('app.home.seo.title'),
  description: t('app.home.seo.description'),
  ogType: 'website'
}))

useSEO(seoData)
</script>