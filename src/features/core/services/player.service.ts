// src/features/core/services/player.service.ts
import apiClient from '@/core/lib/axios.ts'
import type {
    Player,
    PlayerCollectionResponse,
    PlayerFilters,
} from '@/features/core/types/player.types.ts'
import type { VideoCollectionResponse, VideoFilters } from '@/features/core/types/video.types.ts'


/**
 * Service pour gérer les players
 */
class PlayerService {

    /**
     * Récupère un player par son ID
     */
    async getPlayer(id: string | number): Promise<Player> {
        const response = await apiClient.get<Player>(`/api/players/${id}`)
        return response.data
    }

    /**
     * Récupère une liste de players avec filtres
     */
    async getPlayers(filters: PlayerFilters = {}): Promise<PlayerCollectionResponse> {
        const params: Record<string, unknown> = {
            pagination: true,
            itemsPerPage: 100,
            'order[pseudo]': 'ASC'
        }

        if (filters.page) params.page = filters.page
        if (filters.itemsPerPage) params.itemsPerPage = filters.itemsPerPage
        if (filters.search) params.search = filters.search
        if (filters.sortBy) params[`order[${filters.sortBy}]`] = filters.sortOrder || 'ASC'
        if (filters.nbVideoMin) params['nbVideo[gte]'] = filters.nbVideoMin

        const response = await apiClient.get<PlayerCollectionResponse>('/api/players', {params})
        return response.data
    }

    /**
     * Récupère les players avec au moins 20 vidéos
     */
    async getActiveChannels(): Promise<PlayerCollectionResponse> {
        return this.getPlayers({
            pagination: true,
            itemsPerPage: 100,
            sortBy: 'pseudo',
            sortOrder: 'ASC',
            nbVideoMin: 20
        })
    }

    /**
     * Récupère les vidéos d'un player spécifique
     */
    async getVideos(playerId: string | number, filters: Partial<VideoFilters> = {}): Promise<VideoCollectionResponse> {
        const params: Record<string, unknown> = {
            isActive: 1,
            'order[id]': 'DESC',
            type: 'Youtube',
            itemsPerPage: 30,
            page: 1,
            ...filters
        }

        const response = await apiClient.get(`/api/players/${playerId}/videos`, { params })
        return response.data
    }
}

export default new PlayerService()