<!-- src/features/adsense/components/bloc/HomeBannerdAd.vue -->
<template>
  <div
      v-if="shouldShow"
      class="home-banner-ad"
      :class="containerClasses"
  >
    <!-- Titre optionnel -->
    <div v-if="showLabel" class="ad-label">
      <span class="text-xs text-muted-foreground/60 uppercase tracking-wide">
        {{ labelText }}
      </span>
    </div>

    <!-- Annonce AdSense -->
    <ins
        ref="adElement"
        class="adsbygoogle"
        style="display:block"
        :data-ad-client="clientId"
        :data-ad-slot="adSlot"
        data-ad-format="horizontal"
        :data-ad-test="testMode ? 'on' : undefined"
        :style="adStyles"
    ></ins>

    <!-- Indicateur de développement -->
    <div
        v-if="isDevelopment"
        class="dev-indicator"
    >
      <div class="text-xs font-mono text-muted-foreground/40">
        Slot: {{ adSlot }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject, nextTick } from 'vue'
import { AD_SLOTS } from '@/features/adsense/constants/adSlots.ts'

interface Props {
  /** Afficher un label au-dessus de l'annonce */
  showLabel?: boolean
  /** Texte du label personnalisé */
  labelText?: string
  /** Classes CSS supplémentaires */
  className?: string
  /** Centrer l'annonce */
  centered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showLabel: false,
  labelText: 'Publicité',
  className: '',
  centered: true
})

// Injection du service AdSense
const adsense = inject('adsense')

// Configuration
const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID
const isEnabled = import.meta.env.VITE_ADSENSE_ENABLED === 'true'
const isDevelopment = import.meta.env.DEV
const testMode = isDevelopment

// Références
const adElement = ref<HTMLElement | null>(null)

// Computed
const adSlot = computed(() => AD_SLOTS.HOME_BANNER)

const shouldShow = computed(() => {
  return isEnabled && clientId && adSlot.value
})

const containerClasses = computed(() => {
  return [
    'relative',
    'w-full',
    'max-w-[728px]', // Largeur max pour le format horizontal
    props.centered ? 'mx-auto' : '',
    props.className
  ].filter(Boolean).join(' ')
})

const adStyles = computed(() => {
  return {
    width: '728px',
    height: '90px',
    margin: '0 auto',
    display: 'block'
  }
})

// Méthodes
const loadAd = async () => {
  if (!shouldShow.value || !adsense) return

  await nextTick()

  try {
    if (adElement.value) {
      adsense.push({})
      console.debug('Home banner ad loaded')
    }
  } catch (error) {
    console.error('Erreur chargement annonce home banner:', error)
  }
}

// Lifecycle
onMounted(() => {
  if (shouldShow.value) {
    // Petit délai pour laisser la page se stabiliser
    setTimeout(loadAd, 500)
  }
})

</script>

<style scoped>
.home-banner-ad {
  /* Container pour l'annonce */
  background: transparent;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.ad-label {
  /* Style pour le label optionnel */
  text-align: center;
  margin-bottom: 8px;
  padding: 4px 8px;
}

.dev-indicator {
  /* Indicateur visible en développement */
  position: absolute;
  bottom: 2px;
  right: 2px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  pointer-events: none;
}

/* Responsive - adapter sur mobile */
@media (max-width: 768px) {
  .home-banner-ad {
    max-width: 320px;
  }
  
  .adsbygoogle {
    width: 320px !important;
    height: 50px !important;
  }
}

/* Animation de chargement optionnelle */
.adsbygoogle:empty {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>