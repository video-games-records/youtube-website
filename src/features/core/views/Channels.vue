<template>
  <div class="px-6 py-4">
    <!-- Page Title -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold">{{ t('channels.title') }}</h1>
      <p class="text-muted-foreground mt-1">{{ t('channels.subtitle') }}</p>
      <p v-if="!loading && channels.length > 0" class="text-sm text-muted-foreground mt-2">
        {{ t('channels.totalCount', { count: channels.length }) }}
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>
    
    <!-- No Channels -->
    <div v-else-if="channels.length === 0 && !loading" class="text-center text-muted-foreground py-16">
      <h2 class="text-xl font-medium mb-2">{{ t('channels.noChannels') }}</h2>
    </div>
    
    <!-- Channels Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      <div
        v-for="channel in channels"
        :key="channel.id"
        class="bg-card rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
        @click="navigateToChannel(channel)"
      >
        <!-- Avatar -->
        <div class="flex justify-center mb-3">
          <PlayerAvatar :player="channel" size="xl" />
        </div>
        
        <!-- Channel Info -->
        <div class="text-center">
          <h3 class="font-semibold text-lg mb-1 truncate">{{ channel.pseudo }}</h3>
          <p class="text-sm text-muted-foreground mb-2">
            {{ t('channels.videoCount', { count: channel.nbVideo }) }}
          </p>
          
          <!-- Country & Team -->
          <div class="flex flex-col gap-1 text-xs text-muted-foreground">
            <span v-if="channel.country">{{ channel.country.name }}</span>
            <span v-if="channel.team" class="truncate">{{ channel.team.libTeam }}</span>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from '@/core/i18n'
import { useSEO } from '@/shared/composables/useSEO'
import PlayerService from '@/features/core/services/player.service'
import PlayerAvatar from '@/features/core/components/player/PlayerAvatar.vue'
import type { Player } from '@/features/core/types/player.types'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

// State
const channels = ref<Player[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Load all channels
const loadChannels = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await PlayerService.getPlayers({
      pagination: false,
      nbVideoMin: 1,
      sortBy: 'nbVideo',
      sortOrder: 'DESC'
    })
    
    channels.value = response['hydra:member']
    
  } catch (err) {
    console.error('Error loading channels:', err)
    error.value = t('channels.errorMessage')
  } finally {
    loading.value = false
  }
}


// Navigate to channel
const navigateToChannel = (channel: Player) => {
  const currentLang = route.params.lang as string
  router.push(`/${currentLang}/player/${channel.id}/${channel.slug}`)
}


// Load channels on mount
onMounted(() => {
  loadChannels()
})

// SEO Configuration
const seoData = computed(() => ({
  title: t('channels.seo.title'),
  description: t('channels.seo.description'),
  ogType: 'website'
}))

useSEO(seoData)
</script>