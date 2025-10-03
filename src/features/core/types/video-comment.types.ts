// src/features/core/types/video-comment.types.ts
import type { Player } from './player.types.ts'

/**
 * Comment interface
 */
export interface Comment {
    id: number
    content: string
    createdAt: string
    player: Player
}

/**
 * Interface pour la réponse API d'une collection de commentaires
 */
export interface CommentCollectionResponse {
    'hydra:member': Comment[]
    'hydra:totalItems': number
    'hydra:view': {
        '@id': string
        'hydra:first': string
        'hydra:last': string
        'hydra:next'?: string
        'hydra:previous'?: string
    }
}