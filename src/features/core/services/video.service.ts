// src/features/core/services/video.service.ts
import apiClient from '@/core/lib/axios.ts'
import type {
    Video,
    VideoCollectionResponse,
    VideoFilters,
} from '@/features/core/types/video.types.ts'
import type { CommentCollectionResponse } from '@/features/core/types/video-comment.types.ts'


/**
 * Service pour gérer les videos
 */
class VideoService {

    /**
     * Récupère une video par son ID
     */
    async getVideo(id: string | number): Promise<Video> {
        const response = await apiClient.get<Video>(`/api/videos/${id}`)
        return response.data
    }

    /**
     * Récupère une liste de videos avec filtres
     */
    async getVideos(filters: VideoFilters = {}): Promise<VideoCollectionResponse> {
        const params: Record<string, unknown> = {
            isActive: 1,
            'order[id]': 'DESC',
            type: 'Youtube',
            itemsPerPage: 30,
            page: 1
        }

        if (filters.page) params.page = filters.page
        if (filters.itemsPerPage) params.itemsPerPage = filters.itemsPerPage
        if (filters.type) params.type = filters.type
        if (filters.search) params.search = filters.search
        if (filters.sortOrder) params['order[id]'] = filters.sortOrder.toUpperCase()
        if (filters.isActive !== undefined) params.isActive = filters.isActive

        const response = await apiClient.get<VideoCollectionResponse>('/api/videos', {params})
        return response.data
    }

    /**
     * Crée une nouvelle vidéo
     */
    async createVideo(url: string): Promise<Video> {
        const response = await apiClient.post<Video>('/api/videos', { url })
        return response.data
    }

    /**
     * Récupère les commentaires d'une vidéo
     */
    async getComments(videoId: string | number): Promise<CommentCollectionResponse> {
        const response = await apiClient.get<CommentCollectionResponse>(`/api/videos/${videoId}/comments`)
        return response.data
    }

}

export default new VideoService()
