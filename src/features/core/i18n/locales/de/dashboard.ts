// src/features/core/i18n/locales/de/dashboard.ts

export default {
    title: 'Kanal-Dashboard',
    
    menu: {
        overview: 'Übersicht',
        content: 'Inhalte',
    },
    
    overview: {
    
    
        title: 'Kanal-Dashboard',
        analytics: {
            title: 'Kanal-Analysedaten',
            videos: 'Videos',
            totalViews: 'Gesamtaufrufe',
            accessAnalytics: 'Auf Analysedaten zugreifen'
        },
        import: {
            title: 'Möchten Sie die Metriken eines Ihrer kürzlichen Videos überprüfen?',
            subtitle: 'Ihre Videos bleiben privat bis zur Veröffentlichung.',
            button: 'Videos importieren'
        }
    },
    
    videos: {
        title: 'Kanalinhalt',
        subtitle: 'Verwalten Sie Ihre Videos',
        addVideo: 'Video hinzufügen',
        
        table: {
            video: 'Video',
            date: 'Datum',
            views: 'Aufrufe',
            comments: 'Kommentare',
            status: {
                published: 'Veröffentlicht'
            },
            empty: {
                title: 'Keine Videos',
                description: 'Fügen Sie Ihr erstes Video hinzu.'
            },
            loading: 'Videos laden...',
            actions: {
                view: 'Video ansehen',
                edit: 'Bearbeiten',
                delete: 'Löschen'
            }
        },
        
        filter: 'Filtern',
        pagination: {
            showing: 'Zeige',
            to: 'bis',
            of: 'von',
            videos: 'Videos',
            video: 'Video',
            previous: 'Vorherige',
            next: 'Nächste',
            page: 'Seite'
        },
        
        empty: {
            title: 'Keine Videos',
            description: 'Beginnen Sie mit dem Hinzufügen Ihres ersten Videos.'
        },
        
        loading: 'Videos laden...'
    },
    
    import: {
        title: 'Videos importieren',
        subtitle: 'Ihre Videos bleiben privat bis zur Veröffentlichung.',
        urlLabel: 'YouTube-Video-URL',
        urlPlaceholder: 'https://www.youtube.com/watch?v=...',
        acceptedFormats: 'Akzeptierte YouTube-URL-Formate:',
        cancel: 'Abbrechen',
        addVideo: 'Video hinzufügen',
        errors: {
            invalidUrl: 'Bitte geben Sie eine gültige YouTube-URL ein',
            urlExists: 'Ungültige URL oder Video bereits vorhanden',
            addFailed: 'Beim Hinzufügen des Videos ist ein Fehler aufgetreten'
        }
    }
}