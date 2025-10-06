<template>
  <div class="border rounded-lg p-4 mb-6">
    <h4 class="text-md font-medium mb-3">{{ t('video.addComment') }}</h4>
    
    <form @submit.prevent="submitComment" class="space-y-4">
      <div>
        <div ref="quillContainer" class="min-h-[120px] bg-background border rounded-md"></div>
      </div>
      
      <div class="flex justify-end space-x-2">
        <button
          type="button"
          @click="resetForm"
          class="px-4 py-2 text-sm border rounded-md hover:bg-muted transition-colors"
          :disabled="isSubmitting"
        >
          {{ t('common.cancel') }}
        </button>
        <button
          type="submit"
          class="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          :disabled="isSubmitting || !isContentValid"
        >
          {{ isSubmitting ? t('common.submitting') : t('video.postComment') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from '@/core/i18n'
import VideoService from '@/features/core/services/video.service'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

interface Props {
  videoId: string | number | null
}

interface Emits {
  (e: 'commentAdded'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { t } = useI18n()

const quillContainer = ref<HTMLElement>()
let quill: Quill | null = null
const isSubmitting = ref(false)
const content = ref('')

const isContentValid = computed(() => {
  return content.value.trim().length > 0
})

onMounted(() => {
  if (quillContainer.value) {
    quill = new Quill(quillContainer.value, {
      theme: 'snow',
      placeholder: t('video.commentPlaceholder'),
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          ['link'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['clean']
        ]
      }
    })

    quill.on('text-change', () => {
      content.value = quill?.root.innerHTML || ''
    })
  }
})

onUnmounted(() => {
  if (quill) {
    quill = null
  }
})

const submitComment = async () => {
  if (!props.videoId || !quill || !isContentValid.value) return

  try {
    isSubmitting.value = true
    
    // Get HTML content from Quill
    const htmlContent = quill.root.innerHTML
    
    await VideoService.createComment(props.videoId, htmlContent)
    
    // Reset form
    resetForm()
    
    // Emit event to refresh comments
    emit('commentAdded')
    
  } catch (error) {
    console.error('Error submitting comment:', error)
    // TODO: Show error message to user
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  if (quill) {
    quill.setContents([])
    content.value = ''
  }
}
</script>