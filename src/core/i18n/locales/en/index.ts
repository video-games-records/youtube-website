// src/i18n/locales/en.ts
import common from './common.ts'
import app from './app.ts'
import layout from './layout.ts'
import error from './error.ts'
import authTranslations from '@/features/auth/i18n/locales/en/index.ts'
import pwaTranslations from '@/features/pwa/i18n/locales/en/index.ts'
import themeTranslations from '@/features/theme/i18n/locales/en/index.ts'
import languageTranslations from '@/features/language/i18n/en/index.ts'
import coreTranslations from '@/features/core/i18n/locales/en/index.ts'

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
        home: 'Home',
        inbox: 'Inbox',
        calendar: 'Calendar',
        search: 'Search',
        settings: 'Settings'
    },
    settings: {
        subtitle: 'Customize your experience and preferences',
        tabs: {
            appearance: 'Appearance',
        },
    },
}
