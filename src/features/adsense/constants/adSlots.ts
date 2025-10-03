// src/features/adsense/constants/adSlots.ts
import type { AdUnit, AdSlotKey } from '../types'

export const AD_SLOTS = {
    // Page d'accueil
    HOME_BANNER: '7559698575',

    // Channel
    CHANNEL_BANNER: '9404097439',

    // Search
    SEARCH_BANNER: '3664685591',

    // Video
    VIDEO_SIDEBAR: '2115800208'
} as const

export const AD_FORMATS = {
    HOME_BANNER: {
        format: 'horizontal' as const,
        width: 728,
        height: 90,
        responsive: true
    },
    CHANNEL_BANNER: {
        format: 'horizontal' as const,
        width: 728,
        height: 50,
        responsive: true
    },
    SEARCH_BANNER: {
        format: 'horizontal' as const,
        width: 728,
        height: 50,
        responsive: true
    },
    VIDEO_SIDEBAR: {
        format: 'rectangle' as const,
        width: 300,
        height: 250,
        responsive: true
    },
} as const


// Utilitaire pour obtenir la configuration d'un slot
export function getAdConfig(slotKey: AdSlotKey): AdUnit {
    return {
        id: slotKey,
        slot: AD_SLOTS[slotKey],
        ...AD_FORMATS[slotKey],
        format: AD_FORMATS[slotKey].format || 'auto'
    }
}