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
}

export default new GameService()