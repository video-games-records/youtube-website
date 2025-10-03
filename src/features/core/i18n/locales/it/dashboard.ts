// src/features/core/i18n/locales/it/dashboard.ts

export default {
    title: 'Dashboard del Canale',
    
    menu: {
        overview: 'Panoramica',
        content: 'Contenuti',
    },
    
    overview: {
    
    
        title: 'Dashboard del Canale',
        analytics: {
            title: 'Dati analitici del canale',
            videos: 'Video',
            totalViews: 'Visualizzazioni totali',
            accessAnalytics: 'Accedi ai dati analitici'
        },
        import: {
            title: 'Vuoi controllare le metriche di uno dei tuoi video recenti?',
            subtitle: 'I tuoi video rimarranno privati fino alla pubblicazione.',
            button: 'Importa video'
        }
    },
    
    videos: {
        title: 'Contenuto del canale',
        subtitle: 'Gestisci i tuoi video',
        addVideo: 'Aggiungi video',
        
        table: {
            video: 'Video',
            date: 'Data',
            views: 'Visualizzazioni',
            comments: 'Commenti',
            status: {
                published: 'Pubblicato'
            },
            empty: {
                title: 'Nessun video',
                description: 'Inizia aggiungendo il tuo primo video.'
            },
            loading: 'Caricamento video...',
            actions: {
                view: 'Visualizza video',
                edit: 'Modifica',
                delete: 'Elimina'
            }
        },
        
        filter: 'Filtra',
        pagination: {
            showing: 'Mostrando',
            to: 'a',
            of: 'di',
            videos: 'video',
            video: 'video',
            previous: 'Precedente',
            next: 'Successivo',
            page: 'Pagina'
        },
        
        empty: {
            title: 'Nessun video',
            description: 'Inizia aggiungendo il tuo primo video.'
        },
        
        loading: 'Caricamento video...'
    },
    
    import: {
        title: 'Importa video',
        subtitle: 'I tuoi video rimarranno privati fino alla pubblicazione.',
        urlLabel: 'URL del video YouTube',
        urlPlaceholder: 'https://www.youtube.com/watch?v=...',
        acceptedFormats: 'Formati URL YouTube accettati:',
        cancel: 'Annulla',
        addVideo: 'Aggiungi video',
        errors: {
            invalidUrl: 'Inserisci un URL YouTube valido',
            urlExists: 'URL non valido o video già esistente',
            addFailed: 'Si è verificato un errore durante l\'aggiunta del video'
        }
    }
}