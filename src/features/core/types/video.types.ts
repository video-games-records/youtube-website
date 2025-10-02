// src/features/core/types/video.types.ts
import type { Player } from './player.types.ts'
import type { Game } from './game.types.ts'

/**
 * Video interface
 */
export interface Video {
    '@context': string
    '@id': string
    '@type': string
    id: number
    title: string
    description: string
    externalId: string
    thumbnail: string
    viewCount: number
    slug: string
    player?: Player
    game?: Game
}

/**
 * Interface pour la réponse API d'une collection de video
 */
export interface VideoCollectionResponse {
    'hydra:member': Video[]
    'hydra:totalItems': number
    'hydra:view': {
        '@id': string
        'hydra:first': string
        'hydra:last': string
        'hydra:next'?: string
        'hydra:previous'?: string
    }
}


/**
 * Interface pour les filtres de recherche de videos
 */
export interface VideoFilters {
    page?: number
    itemsPerPage?: number
    type?: string
    search?: string
    sortOrder?: 'asc' | 'desc'
    isActive?: number
}
