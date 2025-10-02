// src/features/core/types/player.types.ts

/**
 * Country interface
 */
export interface Country {
    '@id': string
    '@type': string
    id: number
    name: string
    codeIso2: string
    slug: string
}

/**
 * Team interface
 */
export interface Team {
    '@id': string
    '@type': string
    id: number
    libTeam: string
    tag: string
    slug: string
}

/**
 * Player interface
 */
export interface Player {
    '@context': string
    '@id': string
    '@type': string
    id: number
    pseudo: string
    slug: string
    lastLogin: string
    rankCup: number
    gameRank0: number
    gameRank1: number
    gameRank2: number
    gameRank3: number
    rankMedal: number
    chartRank0: number
    chartRank1: number
    chartRank2: number
    chartRank3: number
    rankPointChart: number
    pointChart: number
    rankPointGame: number
    pointGame: number
    website?: string
    youtube?: string
    twitch?: string
    discord?: string
    nbChart: number
    nbGame: number
    nbVideo: number
    initial: string
    country?: Country
    team?: Team
}

/**
 * Interface pour la réponse API d'une collection de joueurs
 */
export interface PlayerCollectionResponse {
    'hydra:member': Player[]
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
 * Interface pour les filtres de recherche de players
 */
export interface PlayerFilters {
    page?: number
    itemsPerPage?: number
    pagination?: boolean
    search?: string
    sortBy?: string
    sortOrder?: 'ASC' | 'DESC'
    nbVideoMin?: number
}


