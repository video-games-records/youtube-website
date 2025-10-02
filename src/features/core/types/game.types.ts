// src/features/core/types/game.types.ts

/**
 * Game interface based on actual API response
 */
export interface Game {
    '@context': string
    '@id': string
    '@type': string
    id: number
    slug: string
    name: string
}

/**
 * API response interface for game collection
 */
export interface GameCollectionResponse {
    'hydra:member': Game[]
    'hydra:totalItems': number
    'hydra:view': {
        '@id': string
        'hydra:first': string
        'hydra:last': string
        'hydra:next'?: string
        'hydra:previous'?: string
    }
}

