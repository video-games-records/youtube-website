// src/i18n/locales/pt-br.ts
import common from './common.ts'
import app from './app.ts'
import layout from './layout.ts'
import error from './error.ts'
import authTranslations from '@/features/auth/i18n/locales/pt-br/index.ts'
import pwaTranslations from '@/features/pwa/i18n/locales/pt-br/index.ts'
import themeTranslations from '@/features/theme/i18n/locales/pt-br/index.ts'
import languageTranslations from '@/features/language/i18n/pt-br/index.ts'
import coreTranslations from '@/features/core/i18n/locales/pt-br/index.ts'

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
        home: 'Início',
        inbox: 'Caixa de entrada',
        calendar: 'Calendário',
        search: 'Pesquisar',
        settings: 'Configurações'
    },
    settings: {
        subtitle: 'Personalize sua experiência e preferências',
        tabs: {
            appearance: 'Aparência',
        },
    },
}