// src/i18n/locales/de.ts
import common from './common.ts'
import app from './app.ts'
import layout from './layout.ts'
import error from './error.ts'
import authTranslations from '@/features/auth/i18n/locales/de/index.ts'
import pwaTranslations from '@/features/pwa/i18n/locales/de/index.ts'
import themeTranslations from '@/features/theme/i18n/locales/de/index.ts'
import languageTranslations from '@/features/language/i18n/de/index.ts'
import coreTranslations from '@/features/core/i18n/locales/de/index.ts'

export default {
    common,
    layout,
    app,
    error,
    ...authTranslations,
    ...pwaTranslations,
    ...themeTranslations,
    ...languageTranslations,
    ...coreTranslations,
    menu: {
        home: 'Startseite',
        inbox: 'Posteingang',
        calendar: 'Kalender',
        search: 'Suchen',
        settings: 'Einstellungen'
    },
    settings: {
        subtitle: 'Passen Sie Ihre Erfahrung und Einstellungen an',
        tabs: {
            appearance: 'Erscheinungsbild',
        },
    },
}