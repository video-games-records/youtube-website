// src/features/core/i18n/locales/pt-br/dashboard.ts

export default {
    title: 'Painel do Canal',
    
    menu: {
        overview: 'Visão Geral',
        content: 'Conteúdo',
    },
    
    overview: {
    
    
        title: 'Painel do Canal',
        analytics: {
            title: 'Dados analíticos do canal',
            videos: 'Vídeos',
            totalViews: 'Total de visualizações',
            accessAnalytics: 'Acessar dados analíticos'
        },
        import: {
            title: 'Quer verificar as métricas de um dos seus vídeos recentes?',
            subtitle: 'Seus vídeos permanecerão privados até a publicação.',
            button: 'Importar vídeos'
        }
    },
    
    videos: {
        title: 'Conteúdo do canal',
        subtitle: 'Gerencie seus vídeos',
        addVideo: 'Adicionar vídeo',
        
        table: {
            video: 'Vídeo',
            date: 'Data',
            views: 'Visualizações',
            comments: 'Comentários',
            status: {
                published: 'Publicado'
            },
            empty: {
                title: 'Nenhum vídeo',
                description: 'Comece adicionando seu primeiro vídeo.'
            },
            loading: 'Carregando vídeos...',
            actions: {
                view: 'Ver vídeo',
                edit: 'Editar',
                delete: 'Excluir'
            }
        },
        
        filter: 'Filtrar',
        pagination: {
            showing: 'Mostrando',
            to: 'a',
            of: 'de',
            videos: 'vídeos',
            video: 'vídeo',
            previous: 'Anterior',
            next: 'Próximo',
            page: 'Página'
        },
        
        empty: {
            title: 'Nenhum vídeo',
            description: 'Comece adicionando seu primeiro vídeo.'
        },
        
        loading: 'Carregando vídeos...'
    },
    
    import: {
        title: 'Importar vídeos',
        subtitle: 'Seus vídeos permanecerão privados até a publicação.',
        urlLabel: 'URL do vídeo do YouTube',
        urlPlaceholder: 'https://www.youtube.com/watch?v=...',
        acceptedFormats: 'Formatos de URL do YouTube aceitos:',
        cancel: 'Cancelar',
        addVideo: 'Adicionar vídeo',
        errors: {
            invalidUrl: 'Por favor, insira uma URL válida do YouTube',
            urlExists: 'URL inválida ou vídeo já existente',
            addFailed: 'Ocorreu um erro ao adicionar o vídeo'
        }
    }
}