<template>
  <div class="bg-card rounded-lg border p-6">
    <h2 class="text-lg font-semibold mb-4 text-foreground">{{ t('dashboard.analytics.title') }}</h2>
    
    <!-- Video Count -->
    <div class="mb-6">
      <div class="text-sm text-muted-foreground mb-1">{{ t('dashboard.analytics.videoCount') }}</div>
      <div class="text-3xl font-bold text-foreground">{{ videoCount }}</div>
    </div>

    <!-- Total Views -->
    <div class="mb-6">
      <div class="text-sm text-muted-foreground mb-1">{{ t('dashboard.analytics.totalViews') }}</div>
      <div class="text-3xl font-bold text-foreground">{{ formatViews(totalViews) }}</div>
    </div>

    <!-- Access Analytics Button -->
    <button 
      class="w-full bg-muted hover:bg-muted/80 text-foreground py-2 px-4 rounded-md text-sm font-medium transition-colors"
      @click="$emit('access-analytics')"
    >
      {{ t('dashboard.analytics.accessButton') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/core/i18n'

const { t } = useI18n()

interface Props {
  videoCount?: number
  totalViews?: number
}

withDefaults(defineProps<Props>(), {
  videoCount: 0,
  totalViews: 0
})

// Format view count like YouTube (e.g., 1.2K, 1.5M)
const formatViews = (count: number): string => {
  if (count < 1000) return count.toString()
  if (count < 1000000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  if (count < 1000000000) return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  return (count / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'
}

defineEmits<{
  'access-analytics': []
}>()
</script>