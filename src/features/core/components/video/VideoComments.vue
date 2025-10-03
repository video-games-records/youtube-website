<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">{{ t('video.comments') }}</h3>
    
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
    
    <div v-else-if="error" class="text-red-500 text-center py-4">
      {{ error }}
    </div>
    
    <div v-else-if="comments.length === 0" class="text-muted-foreground text-center py-8">
      {{ t('video.noComments') }}
    </div>
    
    <div v-else class="space-y-4">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="flex space-x-3 p-4 bg-muted/30 rounded-lg"
      >
        <PlayerAvatar :player="comment.player" class="w-8 h-8 flex-shrink-0" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-2 mb-2">
            <PlayerLink :player="comment.player" class="font-medium text-sm" />
            <span class="text-xs text-muted-foreground">
              {{ formatRelativeTime(comment.createdAt) }}
            </span>
          </div>
          <div class="text-sm text-foreground prose prose-sm max-w-none" v-html="comment.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useI18n } from '@/core/i18n'
import { useDateFormatter } from '@/shared/composables/useDateFormatter'
import VideoService from '@/features/core/services/video.service'
import PlayerAvatar from '@/features/core/components/player/PlayerAvatar.vue'
import PlayerLink from '@/features/core/components/player/PlayerLink.vue'
import type { Comment } from '@/features/core/types/video-comment.types'

interface Props {
  videoId: string | number | null
}

const props = defineProps<Props>()
const { t } = useI18n()
const { formatRelativeTime } = useDateFormatter()

const comments = ref<Comment[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const loadComments = async () => {
  if (!props.videoId) return

  try {
    loading.value = true
    error.value = null
    
    const response = await VideoService.getComments(props.videoId)
    comments.value = response['hydra:member']
  } catch (err) {
    console.error('Error loading comments:', err)
    error.value = 'Erreur lors du chargement des commentaires'
  } finally {
    loading.value = false
  }
}

watch(() => props.videoId, (newVideoId) => {
  if (newVideoId) {
    loadComments()
  }
}, { immediate: true })

onMounted(() => {
  if (props.videoId) {
    loadComments()
  }
})
</script>