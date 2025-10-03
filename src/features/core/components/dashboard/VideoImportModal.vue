<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Overlay -->
    <div 
      class="absolute inset-0 bg-black/50 backdrop-blur-sm"
      @click="closeModal"
    ></div>
    
    <!-- Modal -->
    <div class="relative bg-card rounded-lg border shadow-lg w-full max-w-md mx-4">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-lg font-semibold text-foreground">{{ t('dashboard.import.title') }}</h2>
        <button 
          @click="closeModal"
          class="text-muted-foreground hover:text-foreground p-1"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <!-- Content -->
      <div class="p-6">
        <!-- Upload Icon -->
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
          </div>
        </div>
        
        <!-- Description -->
        <div class="text-center mb-6">
          <p class="text-xs text-muted-foreground">
            {{ t('dashboard.import.description') }}
          </p>
        </div>
        
        <!-- URL Input Section -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">
              {{ t('dashboard.import.urlLabel') }}
            </label>
            <div class="relative">
              <input 
                v-model="videoUrl"
                type="url"
                :placeholder="t('dashboard.import.urlPlaceholder')"
                class="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                :class="{ 'border-destructive': urlError }"
              />
              <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
            </div>
            <div v-if="urlError" class="mt-1 text-xs text-destructive">
              {{ urlError }}
            </div>
          </div>
          
          <!-- Accepted formats -->
          <div class="text-xs text-muted-foreground">
            <p class="font-medium mb-1">{{ t('dashboard.import.formats.title') }}</p>
            <ul class="space-y-1 ml-4">
              <li>• {{ t('dashboard.import.formats.watch') }}</li>
              <li>• {{ t('dashboard.import.formats.short') }}</li>
              <li>• {{ t('dashboard.import.formats.embed') }}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="flex justify-end gap-3 p-4 border-t">
        <button 
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {{ t('dashboard.import.cancel') }}
        </button>
        <button 
          @click="addVideo"
          :disabled="!isValidUrl || loading"
          class="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          {{ t('dashboard.import.addVideo') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from '@/core/i18n'

const { t } = useI18n()

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'close': []
  'add-video': [url: string, onSuccess: () => void, onError: (message: string) => void]
}>()

const videoUrl = ref('')
const urlError = ref('')
const loading = ref(false)

// YouTube URL validation
const isValidUrl = computed(() => {
  if (!videoUrl.value) return false
  
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  return youtubeRegex.test(videoUrl.value)
})

// Watch for URL changes to clear errors
watch(videoUrl, () => {
  if (urlError.value) {
    urlError.value = ''
  }
})

const closeModal = () => {
  videoUrl.value = ''
  urlError.value = ''
  loading.value = false
  emit('close')
}

const addVideo = async () => {
  if (!isValidUrl.value) {
    urlError.value = t('dashboard.import.errors.invalidUrl')
    return
  }
  
  loading.value = true
  
  const onSuccess = () => {
    closeModal()
  }
  
  const onError = (message: string) => {
    urlError.value = message
    loading.value = false
  }
  
  emit('add-video', videoUrl.value, onSuccess, onError)
}

// Close modal on Escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

// Add/remove event listener when modal opens/closes
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>