// src/features/adsense/index.ts
// Barrel export pour le module AdSense

// Types
export * from './types'

// Constants
export * from './constants/adSlots'

// Plugin
export { default as adsensePlugin } from './plugins'

// Composables
export * from './composables/useAdSense'


// Components
export { default as AdSenseWrapper } from './components/AdSenseWrapper.vue'

