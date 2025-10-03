import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/auth.ts'
import { useI18n, type SupportedLocale } from '@/core/i18n'

// Import layouts
import AppLayout from '@/shared/components/layout/AppLayout.vue'
import ViewLayout from '@/shared/components/layout/ViewLayout.vue'

// Import layouts
// Views will be imported dynamically below

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '',
                redirect: () => {
                    const savedLocale = localStorage.getItem('app-locale')
                    const fullLang = navigator.language.toLowerCase()
                    const browserLang = fullLang.split('-')[0]
                    
                    // Handle special cases for multi-regional languages
                    let detectedLang = browserLang
                    if (fullLang.startsWith('pt-br') || fullLang === 'pt-br') detectedLang = 'pt-br'
                    if (fullLang.startsWith('zh-cn') || fullLang === 'zh-cn' || fullLang === 'zh') detectedLang = 'zh-cn'
                    
                    const supportedLocales = ['fr', 'en', 'ja', 'it', 'pt-br', 'zh-cn', 'es', 'de']
                    const defaultLocale = savedLocale || (supportedLocales.includes(detectedLang) ? detectedLang : 'en')
                    return `/${defaultLocale}`
                }
            },
            {
                path: ':lang(fr|en|ja|it|pt-br|zh-cn|es|de)',
                component: ViewLayout,
                children: [
                    {
                        path: '',
                        name: 'Home',
                        component: () => import(/* webpackChunkName: "home" */ '../../views/Home.vue')
                    },
                    {
                        path: 'login',
                        name: 'Login',
                        component: () => import(/* webpackChunkName: "auth" */ '../../features/auth/views/Login.vue'),
                        meta: { guest: true }
                    },
                    {
                        path: 'register',
                        name: 'Register',
                        component: () => import(/* webpackChunkName: "auth" */ '../../features/auth/views/Register.vue'),
                        meta: { guest: true }
                    },
                    {
                        path: 'forgot-password',
                        name: 'ForgotPassword',
                        component: () => import(/* webpackChunkName: "auth" */ '@/features/auth/views/ForgotPassword.vue'),
                        meta: { guest: true }
                    },
                    {
                        path: 'reset-password',
                        name: 'ResetPassword',
                        component: () => import(/* webpackChunkName: "auth" */ '@/features/auth/views/ResetPassword.vue'),
                        meta: { guest: true }
                    },
                    {
                        path: 'profile',
                        name: 'Profile',
                        component: () => import(/* webpackChunkName: "auth" */ '@/features/auth/views/Profile.vue'),
                        meta: { requiresAuth: true }
                    },
                    {
                        path: 'settings',
                        name: 'Settings',
                        component: () => import('@/views/Settings.vue'),
                        meta: {
                            title: 'Settings',
                            description: 'Configure your preferences and account settings'
                        }
                    },
                    {
                        path: 'privacy',
                        name: 'Privacy',
                        beforeEnter: (to) => {
                            const lang = to.params.lang as string
                            window.open(`https://www.videogamesrecords.net/${lang}/privacy`, '_blank')
                            return false
                        }
                    },
                    {
                        path: 'rules',
                        name: 'Rules',
                        beforeEnter: (to) => {
                            const lang = to.params.lang as string
                            window.open(`https://www.videogamesrecords.net/${lang}/rules`, '_blank')
                            return false
                        }
                    },
                    {
                        path: 'terms',
                        name: 'Terms',
                        beforeEnter: (to) => {
                            const lang = to.params.lang as string
                            window.open(`https://www.videogamesrecords.net/${lang}/terms`, '_blank')
                            return false
                        }
                    },
                    {
                        path: 'contact',
                        name: 'Contact',
                        beforeEnter: (to) => {
                            const lang = to.params.lang as string
                            window.open(`https://www.videogamesrecords.net/${lang}/contact`, '_blank')
                            return false
                        }
                    },
                    {
                        path: 'about',
                        name: 'About',
                        beforeEnter: (to) => {
                            const lang = to.params.lang as string
                            window.open(`https://www.videogamesrecords.net/${lang}/about`, '_blank')
                            return false
                        }
                    },
                    {
                        path: 'legal',
                        name: 'Legal',
                        beforeEnter: (to) => {
                            const lang = to.params.lang as string
                            window.open(`https://www.videogamesrecords.net/${lang}/legal`, '_blank')
                            return false
                        }
                    },
                    {
                        path: 'player/:id(\\d+)/:slug?',
                        name: 'UserProfile',
                        component: () => import(/* webpackChunkName: "core" */ '@/features/core/views/UserProfile.vue'),
                        meta: {
                            title: 'Player Profile'
                        }
                    },
                    {
                        path: 'video/:id(\\d+)/:slug?',
                        name: 'VideoIndex',
                        component: () => import(/* webpackChunkName: "core" */ '@/features/core/views/VideoIndex.vue'),
                        meta: {
                            title: 'Video'
                        }
                    },
                    {
                        path: 'search',
                        name: 'SearchResults',
                        component: () => import(/* webpackChunkName: "core" */ '@/features/core/views/SearchResults.vue'),
                        meta: {
                            title: 'Search Results'
                        }
                    },
                    {
                        path: 'channels',
                        name: 'Channels',
                        component: () => import(/* webpackChunkName: "core" */ '@/features/core/views/Channels.vue'),
                        meta: {
                            title: 'Channels'
                        }
                    },
                    {
                        path: 'dashboard',
                        component: () => import(/* webpackChunkName: "dashboard" */ '@/features/core/views/dashboard/DashboardMain.vue'),
                        meta: {
                            requiresAuth: true
                        },
                        children: [
                            {
                                path: '',
                                redirect: 'index'
                            },
                            {
                                path: 'index',
                                name: 'DashboardIndex',
                                component: () => import(/* webpackChunkName: "dashboard" */ '@/features/core/views/dashboard/DashboardIndex.vue'),
                                meta: {
                                    title: 'Dashboard'
                                }
                            },
                            {
                                path: 'videos',
                                name: 'DashboardVideos',
                                component: () => import(/* webpackChunkName: "dashboard" */ '@/features/core/views/dashboard/VideosList.vue'),
                                meta: {
                                    title: 'Mes Vidéos'
                                }
                            }
                        ]
                    },
                    {
                        path: ':pathMatch(.*)*',
                        name: 'NotFound',
                        component: () => import(/* webpackChunkName: "errors" */ '@/views/NotFound.vue')
                    }
                ]
            }
        ]
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


// Global navigation guard
router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore()
    const { setLocale } = useI18n()

    // Extract language from route params
    const lang = to.params.lang as SupportedLocale

    // If we have a language in the route, sync it with i18n
    if (lang && ['fr', 'en', 'ja', 'it', 'pt-br', 'zh-cn', 'es', 'de'].includes(lang)) {
        setLocale(lang)
    }

    // Auth checks
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isGuestOnly = to.matched.some(record => record.meta.guest)

    if (requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else if (isGuestOnly && authStore.isAuthenticated) {
        // Redirect authenticated users to default language home
        const currentLocale = localStorage.getItem('app-locale') || 'en'
        next(`/${currentLocale}`)
    } else {
        next()
    }
})


export default router