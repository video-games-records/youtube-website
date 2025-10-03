// src/features/core/i18n/locales/fr/dashboard.ts

export default {
    title: 'Tableau de bord de la chaîne',
    
    menu: {
        overview: 'Vue d\'ensemble',
        content: 'Contenus'
    },
    
    overview: {
        title: 'Tableau de bord de la chaîne',
        analytics: {
            title: 'Données analytiques de la chaîne',
            videos: 'Vidéos',
            totalViews: 'Total des vues',
            accessAnalytics: 'Accéder aux données analytiques'
        },
        import: {
            title: 'Vous voulez consulter les métriques d\'une de vos vidéos récentes ?',
            subtitle: 'Vos vidéos resteront privées jusqu\'à leur publication.',
            button: 'Importer des vidéos'
        }
    },
    
    videos: {
        title: 'Contenu de la chaîne',
        subtitle: 'Gérez vos vidéos',
        addVideo: 'Ajouter une vidéo',
        
        table: {
            video: 'Vidéo',
            date: 'Date',
            views: 'Vues',
            comments: 'Commentaires',
            status: {
                published: 'Publié'
            },
            empty: {
                title: 'Aucune vidéo',
                description: 'Commencez par ajouter votre première vidéo.'
            },
            loading: 'Chargement des vidéos...',
            actions: {
                view: 'Voir la vidéo',
                edit: 'Modifier',
                delete: 'Supprimer'
            }
        },
        
        filter: 'Filtrer',
        pagination: {
            showing: 'Affichage de',
            to: 'à',
            of: 'sur',
            videos: 'vidéos',
            video: 'vidéo',
            previous: 'Précédent',
            next: 'Suivant',
            page: 'Page'
        }
    },
    
    analytics: {
        title: 'Données analytiques de la chaîne',
        videoCount: 'Nombre de vidéos',
        totalViews: 'Total des vues',
        accessButton: 'Accéder aux données analytiques'
    },
    
    import: {
        title: 'Importer des vidéos',
        description: 'Vos vidéos resteront privées jusqu\'à leur publication.',
        urlLabel: 'URL de la vidéo YouTube',
        urlPlaceholder: 'https://www.youtube.com/watch?v=...',
        formats: {
            title: 'Formats d\'URL YouTube acceptés :',
            watch: 'https://www.youtube.com/watch?v=VIDEO_ID',
            short: 'https://youtu.be/VIDEO_ID',
            embed: 'https://www.youtube.com/embed/VIDEO_ID'
        },
        cancel: 'Annuler',
        addVideo: 'Ajouter une vidéo',
        errors: {
            invalidUrl: 'Veuillez entrer une URL YouTube valide'
        }
    }
}