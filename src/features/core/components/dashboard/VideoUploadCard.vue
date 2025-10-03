<template>
  <div class="bg-card rounded-lg border p-6 text-center">
    <!-- Icon -->
    <div class="mb-4 flex justify-center">
      <div class="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
        <svg class="w-12 h-12 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h1m4 0h1M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
          <path d="M15 9l-3-3-3 3"/>
          <path d="M12 6v6"/>
        </svg>
      </div>
    </div>
    
    <!-- Content -->
    <div class="mb-6">
      <h3 class="text-lg font-medium text-foreground mb-2">
        {{ t('dashboard.overview.import.title') }}
      </h3>
      <p class="text-sm text-muted-foreground">
        {{ t('dashboard.overview.import.subtitle') }}
      </p>
    </div>
    
    <!-- Import Button -->
    <button 
      class="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md font-medium transition-colors"
      @click="$emit('import-videos')"
    >
      {{ t('dashboard.overview.import.button') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/core/i18n'

const { t } = useI18n()

defineEmits<{
  'import-videos': []
}>()
</script>