// src/types/adsense.ts

import {AD_SLOTS} from "@/features/adsense";

export interface AdSenseConfig {
    clientId: string
    enabled: boolean
    testMode?: boolean
}

export interface AdUnit {
    id: string
    slot: string
    format: 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'responsive'
    width?: number
    height?: number
    responsive?: boolean
}

// Interface pour les paramètres d'annonce AdSense
export interface AdParameters {
    google_ad_client?: string
    google_ad_slot?: string
    google_ad_format?: string
    google_ad_width?: number
    google_ad_height?: number
    [key: string]: unknown
}

export interface AdSenseService {
    push: (ad: AdParameters | Record<string, never>) => void
    refresh: () => void
}

export type AdSlotKey = keyof typeof AD_SLOTS
