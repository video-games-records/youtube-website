// src/features/adsense/services/adsenseService.ts
import type { AdSenseConfig, AdParameters } from '../types'

class AdSenseService {
    private config: AdSenseConfig | null = null
    private isInitialized = false

    constructor() {
        this.config = {
            clientId: import.meta.env.VITE_ADSENSE_CLIENT_ID || '',
            enabled: import.meta.env.VITE_ADSENSE_ENABLED === 'true',
            testMode: import.meta.env.DEV
        }
    }

    initialize(): void {
        if (this.isInitialized || !this.config?.enabled || !this.config?.clientId) {
            return
        }

        // Initialisation de l'objet global AdSense
        window.adsbygoogle = window.adsbygoogle || []

        // Chargement du script AdSense
        this.loadScript()
        this.isInitialized = true

        console.info(`AdSense Service initialized with client ID: ${this.config.clientId}`)
    }

    private loadScript(): void {
        if (!this.config?.clientId) return

        const script = document.createElement('script')
        script.async = true
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.config.clientId}`
        script.crossOrigin = 'anonymous'

        if (this.config.testMode) {
            script.setAttribute('data-ad-frequency-hint', '30s')
        }

        // Gestion des erreurs de chargement
        script.onerror = () => {
            console.error('Failed to load AdSense script')
        }

        document.head.appendChild(script)
    }

    push(ad: AdParameters | Record<string, never>): void {
        if (!this.isEnabled() || !window.adsbygoogle) return

        try {
            window.adsbygoogle.push(ad)
        } catch (error) {
            console.error('AdSense push error:', error)
        }
    }

    refresh(): void {
        if (!this.isEnabled() || !window.adsbygoogle) return

        try {
            window.adsbygoogle.push({})
        } catch (error) {
            console.warn('AdSense refresh error:', error)
        }
    }

    isEnabled(): boolean {
        return this.config?.enabled && !!this.config?.clientId && this.isInitialized
    }

    getConfig(): AdSenseConfig | null {
        return this.config
    }

    // Méthode pour les métriques
    trackAdLoad(slotId: string): void {
        if (!this.isEnabled()) return

        // Ici vous pourriez envoyer des métriques à votre système d'analytics
        console.debug(`AdSense: Ad loaded for slot ${slotId}`)
    }

    trackAdError(slotId: string, error: Error): void {
        if (!this.isEnabled()) return

        console.error(`AdSense: Ad error for slot ${slotId}:`, error)
        // Envoyer l'erreur à votre système de monitoring
    }
}

// Instance singleton
export const adsenseService = new AdSenseService()

// Export du type pour l'injection
export type { AdSenseService }
export default adsenseService