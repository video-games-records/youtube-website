// src/features/adsense/composables/useAdSense.ts
import { inject, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import type { AdSenseService, AdSlotKey } from '@/features/adsense/types'
import { getAdConfig, AD_SLOTS } from '@/features/adsense/constants/adSlots'

export function useAdSense() {
    const adsense = inject('adsense') as AdSenseService
    const route = useRoute()

    // Configuration
    const isEnabled = computed(() => {
        return import.meta.env.VITE_ADSENSE_ENABLED === 'true' &&
            !!import.meta.env.VITE_ADSENSE_CLIENT_ID
    })

    const isDevelopment = computed(() => import.meta.env.DEV)

    const clientId = computed(() => import.meta.env.VITE_ADSENSE_CLIENT_ID)

    // Méthodes
    const refreshAds = () => {
        if (adsense && isEnabled.value) {
            adsense.refresh()
        }
    }

    const loadAd = (slotKey: AdSlotKey) => {
        if (!adsense || !isEnabled.value) return

        const config = getAdConfig(slotKey)

        nextTick(() => {
            try {
                adsense.push({
                    slot: config.slot,
                    format: config.format,
                    responsive: config.responsive
                })
            } catch (error) {
                console.error(`Erreur lors du chargement de l'annonce ${slotKey}:`, error)
            }
        })
    }

    // Détection du type de device pour les annonces adaptées
    const isMobile = computed(() => {
        if (typeof window === 'undefined') return false
        return window.innerWidth <= 768
    })

    // Suggestions d'emplacements selon la route
    const getSuggestedSlots = (): AdSlotKey[] => {
        const path = route.path

        if (path.includes('/games')) {
            return isMobile.value
                ? ['MOBILE_BANNER', 'GAME_HEADER']
                : ['GAME_HEADER', 'GAME_SIDEBAR', 'GAME_FOOTER']
        }

        if (path.includes('/records')) {
            return isMobile.value
                ? ['MOBILE_BANNER', 'RECORDS_BANNER']
                : ['RECORDS_BANNER', 'RECORDS_INLINE']
        }

        if (path.includes('/forum')) {
            return isMobile.value
                ? ['MOBILE_BANNER', 'FORUM_HEADER']
                : ['FORUM_HEADER', 'FORUM_BETWEEN_POSTS']
        }

        if (path.includes('/profile')) {
            return isMobile.value
                ? ['MOBILE_BANNER']
                : ['PROFILE_SIDEBAR']
        }

        // Page d'accueil par défaut
        return isMobile.value
            ? ['MOBILE_BANNER']
            : ['HOME_BANNER', 'HOME_SIDEBAR']
    }

    // Auto-refresh sur changement de route
    onMounted(() => {
        if (isEnabled.value) {
            // Petit délai pour laisser la page se charger
            setTimeout(refreshAds, 1000)
        }
    })

    return {
        // État
        isEnabled,
        isDevelopment,
        clientId,
        isMobile,

        // Méthodes
        refreshAds,
        loadAd,
        getSuggestedSlots,
        getAdConfig,

        // Constantes
        AD_SLOTS
    }
}

// Composable spécialisé pour les annonces conditionnelles
export function useConditionalAds() {
    const { isEnabled, isMobile } = useAdSense()

    const shouldShowAd = (conditions: {
        mobile?: boolean
        desktop?: boolean
        routes?: string[]
        userType?: 'guest' | 'member' | 'premium'
    } = {}) => {
        const route = useRoute()

        if (!isEnabled.value) return false

        // Vérification device
        if (conditions.mobile === false && isMobile.value) return false
        if (conditions.desktop === false && !isMobile.value) return false

        // Vérification routes
        if (conditions.routes) {
            const currentPath = route.path
            const shouldShow = conditions.routes.some(routePath =>
                currentPath.includes(routePath)
            )
            if (!shouldShow) return false
        }

        // Vérification type d'utilisateur (à implémenter selon votre système d'auth)
        // if (conditions.userType) {
        //   const userStore = useUserStore()
        //   if (userStore.userType !== conditions.userType) return false
        // }

        return true
    }

    return {
        shouldShowAd
    }
}