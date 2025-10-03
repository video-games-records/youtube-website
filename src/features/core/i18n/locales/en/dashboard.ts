// src/features/core/i18n/locales/en/dashboard.ts

export default {
    title: 'Channel Dashboard',
    
    menu: {
        overview: 'Overview',
        content: 'Content'
    },
    
    overview: {
        title: 'Channel Dashboard',
        analytics: {
            title: 'Channel Analytics',
            videos: 'Videos',
            totalViews: 'Total Views',
            accessAnalytics: 'Access Analytics'
        },
        import: {
            title: 'Want to check the metrics of one of your recent videos?',
            subtitle: 'Import and publish one to get started.',
            button: 'Import Videos'
        }
    },
    
    videos: {
        title: 'Channel Content',
        subtitle: 'Manage your videos',
        addVideo: 'Add Video',
        
        table: {
            video: 'Video',
            date: 'Date',
            views: 'Views',
            comments: 'Comments',
            status: {
                published: 'Published'
            },
            empty: {
                title: 'No videos',
                description: 'Start by adding your first video.'
            },
            loading: 'Loading videos...',
            actions: {
                view: 'View Video',
                edit: 'Edit',
                delete: 'Delete'
            }
        },
        
        filter: 'Filter',
        pagination: {
            showing: 'Showing',
            to: 'to',
            of: 'of',
            videos: 'videos',
            video: 'video',
            previous: 'Previous',
            next: 'Next',
            page: 'Page'
        }
    },
    
    analytics: {
        title: 'Channel Analytics',
        videoCount: 'Video Count',
        totalViews: 'Total Views',
        accessButton: 'Access Analytics'
    },
    
    import: {
        title: 'Import Videos',
        description: 'Your videos will remain private until publication.',
        urlLabel: 'YouTube Video URL',
        urlPlaceholder: 'https://www.youtube.com/watch?v=...',
        formats: {
            title: 'Accepted YouTube URL formats:',
            watch: 'https://www.youtube.com/watch?v=VIDEO_ID',
            short: 'https://youtu.be/VIDEO_ID',
            embed: 'https://www.youtube.com/embed/VIDEO_ID'
        },
        cancel: 'Cancel',
        addVideo: 'Add Video',
        errors: {
            invalidUrl: 'Please enter a valid YouTube URL'
        }
    }
}