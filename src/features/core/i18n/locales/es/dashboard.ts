// src/features/core/i18n/locales/es/dashboard.ts

export default {
    title: 'Panel del Canal',
    
    menu: {
        overview: 'Resumen',
        content: 'Contenido',
    },
    
    overview: {
    
    
        title: 'Panel del Canal',
        analytics: {
            title: 'Datos analíticos del canal',
            videos: 'Videos',
            totalViews: 'Total de visualizaciones',
            accessAnalytics: 'Acceder a los datos analíticos'
        },
        import: {
            title: '¿Quieres consultar las métricas de uno de tus videos recientes?',
            subtitle: 'Tus videos permanecerán privados hasta su publicación.',
            button: 'Importar videos'
        }
    },
    
    videos: {
        title: 'Contenido del canal',
        subtitle: 'Gestiona tus videos',
        addVideo: 'Añadir video',
        
        table: {
            video: 'Video',
            date: 'Fecha',
            views: 'Visualizaciones',
            comments: 'Comentarios',
            status: {
                published: 'Publicado'
            },
            empty: {
                title: 'Sin videos',
                description: 'Comienza agregando tu primer video.'
            },
            loading: 'Cargando videos...',
            actions: {
                view: 'Ver video',
                edit: 'Editar',
                delete: 'Eliminar'
            }
        },
        
        filter: 'Filtrar',
        pagination: {
            showing: 'Mostrando',
            to: 'a',
            of: 'de',
            videos: 'videos',
            video: 'video',
            previous: 'Anterior',
            next: 'Siguiente',
            page: 'Página'
        },
        
        empty: {
            title: 'Sin videos',
            description: 'Comienza añadiendo tu primer video.'
        },
        
        loading: 'Cargando videos...'
    },
    
    import: {
        title: 'Importar videos',
        subtitle: 'Tus videos permanecerán privados hasta su publicación.',
        urlLabel: 'URL del video de YouTube',
        urlPlaceholder: 'https://www.youtube.com/watch?v=...',
        acceptedFormats: 'Formatos de URL de YouTube aceptados:',
        cancel: 'Cancelar',
        addVideo: 'Añadir video',
        errors: {
            invalidUrl: 'Por favor, introduce una URL de YouTube válida',
            urlExists: 'URL inválida o video ya existente',
            addFailed: 'Ocurrió un error al añadir el video'
        }
    }
}