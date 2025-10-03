// src/features/adsense/plugins/adsense.ts
import type { App } from 'vue'

import type { AdParameters } from '../types/index'

declare global {
    interface Window {
        adsbygoogle?: AdParameters[]
    }
}

interface AdSenseOptions {
    clientId: string
    enabled?: boolean
    testMode?: boolean
}

/**
 * Plugin Google AdSense pour Vue 3
 */
const adsensePlugin = {
    install(app: App, options: AdSenseOptions) {
        const { clientId, enabled = true, testMode = false } = options

        if (!enabled || !clientId) {
            console.warn('AdSense: Plugin désactivé ou ID client manquant')
            return
        }

        // Initialisation de l'objet global AdSense
        window.adsbygoogle = window.adsbygoogle || []

        // Chargement du script AdSense
        const script = document.createElement('script')
        script.async = true
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`
        script.crossOrigin = 'anonymous'

        if (testMode) {
            script.setAttribute('data-ad-frequency-hint', '30s')
        }

        document.head.appendChild(script)

        // Méthodes globales pour AdSense
        const adsenseService = {
            push(ad: AdParameters | Record<string, never>) {
                if (window.adsbygoogle) {
                    window.adsbygoogle.push(ad)
                }
            },

            // Méthode pour rafraîchir les annonces sur changement de route
            refresh() {
                if (window.adsbygoogle) {
                    try {
                        window.adsbygoogle.push({})
                    } catch (e) {
                        console.warn('Erreur lors du rafraîchissement AdSense:', e)
                    }
                }
            }
        }

        // Injection globale
        app.config.globalProperties.$adsense = adsenseService
        app.provide('adsense', adsenseService)

        console.info(`AdSense initialisé avec l'ID: ${clientId}`)
    }
}

export default adsensePlugin
export type { AdSenseOptions }