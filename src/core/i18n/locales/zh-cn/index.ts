// src/i18n/locales/zh-cn.ts
import common from './common.ts'
import app from './app.ts'
import layout from './layout.ts'
import error from './error.ts'
import authTranslations from '@/features/auth/i18n/locales/zh-cn/index.ts'
import pwaTranslations from '@/features/pwa/i18n/locales/zh-cn/index.ts'
import themeTranslations from '@/features/theme/i18n/locales/zh-cn/index.ts'
import languageTranslations from '@/features/language/i18n/zh-cn/index.ts'
import coreTranslations from '@/features/core/i18n/locales/zh-cn/index.ts'

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
        home: '首页',
        channels: '频道',
        inbox: '收件箱',
        calendar: '日历',
        search: '搜索',
        settings: '设置'
    },
    settings: {
        subtitle: '自定义您的体验和偏好',
        tabs: {
            appearance: '外观',
        },
    },
}