// src/features/theme/composables/useThemes.ts
import type { Component } from 'vue'
import { Sun, Moon, Play } from 'lucide-vue-next'
import { useI18n } from '@/core/i18n'

export interface Theme {
  id: string
  name: string
  icon: Component
  description: string
  className?: string
}

export function useThemes() {
  const { t } = useI18n()

  // Thèmes disponibles
  const allThemes: Theme[] = [
    {
      id: 'light',
      name: t('theme.selector.themes.light.name'),
      icon: Sun,
      description: t('theme.selector.themes.light.description'),
    },
    {
      id: 'dark', 
      name: t('theme.selector.themes.dark.name'),
      icon: Moon,
      description: t('theme.selector.themes.dark.description'),
    },
    {
      id: 'youtube-light',
      name: t('theme.selector.themes.youtubeLight.name'),
      icon: Play,
      description: t('theme.selector.themes.youtubeLight.description'),
      className: 'youtube-light'
    },
    {
      id: 'youtube-dark',
      name: t('theme.selector.themes.youtubeDark.name'),
      icon: Play,
      description: t('theme.selector.themes.youtubeDark.description'),
      className: 'youtube-dark'
    }
  ]

  // Top themes est maintenant identique à allThemes
  const topThemes: Theme[] = allThemes

  const applyTheme = (theme: Theme) => {
    // Supprimer toutes les classes de thème
    const htmlElement = document.documentElement
    allThemes.forEach(t => {
      if (t.className) {
        htmlElement.classList.remove(t.className)
      }
    })
    
    // Supprimer la classe dark par défaut
    htmlElement.classList.remove('dark')
    
    // Appliquer le nouveau thème
    if (theme.className) {
      htmlElement.classList.add(theme.className)
    } else if (theme.id === 'dark') {
      htmlElement.classList.add('dark')
    }
    
    localStorage.setItem('selectedTheme', theme.id)
  }

  return {
    topThemes,
    allThemes,
    applyTheme
  }
}