<!-- src/features/adsense/components/AdSenseWrapper.vue -->
<template>
  <div
      v-if="shouldShow"
      :class="wrapperClass"
      data-testid="adsense-wrapper"
  >
    <slot
        :is-enabled="isEnabled"
        :is-loading="isLoading"
        :has-error="hasError"
        :retry="retry"
    >
      <!-- Contenu par défaut -->
      <div v-if="isLoading" class="animate-pulse">
        <div class="bg-muted/20 rounded h-24 flex items-center justify-center">
          <span class="text-xs text-muted-foreground">Loading ad...</span>
        </div>
      </div>

      <div v-else-if="hasError" class="text-center py-4">
        <p class="text-xs text-muted-foreground mb-2">Ad failed to load</p>
        <button
            @click="retry"
            class="text-xs text-primary hover:underline"
        >
          Retry
        </button>
      </div>

      <div v-else-if="!isEnabled" class="hidden" aria-hidden="true">
        <!-- AdSense désactivé -->
      </div>
    </slot>

    <!-- Indicateur de test en développement -->
    <div
        v-if="isDevelopment && testMode"
        class="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full shadow-sm font-mono"
    >
      TEST
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAdSense } from '@/features/adsense'

interface Props {
  /** Afficher le wrapper même si AdSense est désactivé (pour les tests) */
  forceShow?: boolean
  /** Classes CSS personnalisées */
  wrapperClass?: string
  /** Délai avant de considérer le chargement comme échoué (ms) */
  timeout?: number
}

const props = withDefaults(defineProps<Props>(), {
  forceShow: false,
  wrapperClass: 'relative',
  timeout: 10000
})

// Composables
const { isEnabled, isDevelopment } = useAdSense()

// State
const isLoading = ref(true)
const hasError = ref(false)
const testMode = computed(() => isDevelopment.value)

// Computed
const shouldShow = computed(() => {
  return props.forceShow || isEnabled.value || isDevelopment.value
})

// Methods
const retry = () => {
  hasError.value = false
  isLoading.value = true

  // Simuler un nouveau chargement
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

// Lifecycle
onMounted(() => {
  if (!isEnabled.value) {
    isLoading.value = false
    return
  }

  // Timer pour détecter les échecs de chargement
  const timer = setTimeout(() => {
    if (isLoading.value) {
      isLoading.value = false
      hasError.value = true
    }
  }, props.timeout)

  // Simuler le chargement réussi pour la démo
  setTimeout(() => {
    isLoading.value = false
    clearTimeout(timer)
  }, 2000)
})

// Expose pour les tests
defineExpose({
  retry,
  isLoading: readonly(isLoading),
  hasError: readonly(hasError)
})
</script>

<style scoped>
/* Styles pour les animations de chargement */
@keyframes shimmer {
  0% { opacity: 0.5; }
  50% { opacity: 0.8; }
  100% { opacity: 0.5; }
}

.animate-pulse > div {
  animation: shimmer 2s ease-in-out infinite;
}
</style>