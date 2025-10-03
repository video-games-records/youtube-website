// src/features/core/services/game.service.ts
import apiClient from '@/core/lib/axios.ts'
import type {
    VideoCollectionResponse,
    VideoFilters,
} from '@/features/core/types/video.types.ts'


/**
 * Service pour gérer les jeux
 */
class GameService {

    /**
     * Récupère les vidéos d'un jeu spécifique
     */
    async getVideos(gameId: string | number, filters: Partial<VideoFilters> = {}): Promise<VideoCollectionResponse> {
        const params: Record<string, unknown> = {
            isActive: 1,
            'order[id]': 'DESC',
            type: 'Youtube',
            itemsPerPage: 8,
            page: 1,
            ...filters
        }

        const response = await apiClient.get<VideoCollectionResponse>(`/api/games/${gameId}/videos`, {params})
        return response.data
    }

    /**
     * Search games for autocomplete
     * @param query Search query
     * @returns Promise with games collection for autocomplete
     */
    async getGamesAutocomplete(query: string): Promise<{ 'hydra:member': Game[], 'hydra:totalItems': number }> {
        const params: Record<string, string> = {}

        if (query && query.trim()) {
            params.query = query.trim()
        }

        const response = await apiClient.get<{ 'hydra:member': Game[], 'hydra:totalItems': number }>('/api/games/autocomplete', {
            params
        })
        return response.data
    }
}

export default new GameService()