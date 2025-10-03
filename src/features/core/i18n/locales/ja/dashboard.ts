// src/features/core/i18n/locales/ja/dashboard.ts

export default {
    title: 'チャンネルダッシュボード',
    
    menu: {
        overview: '概要',
        content: 'コンテンツ',
    },
    
    overview: {
    
    
        title: 'チャンネルダッシュボード',
        analytics: {
            title: 'チャンネル分析データ',
            videos: '動画',
            totalViews: '総再生回数',
            accessAnalytics: '分析データにアクセス'
        },
        import: {
            title: '最近の動画のメトリクスを確認したいですか？',
            subtitle: '動画は公開まで非公開のままです。',
            button: '動画をインポート'
        }
    },
    
    videos: {
        title: 'チャンネルコンテンツ',
        subtitle: '動画を管理',
        addVideo: '動画を追加',
        
        table: {
            video: '動画',
            date: '日付',
            views: '再生回数',
            comments: 'コメント',
            status: {
                published: '公開済み'
            },
            empty: {
                title: '動画がありません',
                description: '最初の動画を追加してください。'
            },
            loading: '動画を読み込み中...',
            actions: {
                view: '動画を見る',
                edit: '編集',
                delete: '削除'
            }
        },
        
        filter: 'フィルター',
        pagination: {
            showing: '表示中',
            to: '〜',
            of: '/',
            videos: '動画',
            video: '動画',
            previous: '前へ',
            next: '次へ',
            page: 'ページ'
        },
        
        empty: {
            title: '動画なし',
            description: '最初の動画を追加して始めましょう。'
        },
        
        loading: '動画を読み込み中...'
    },
    
    import: {
        title: '動画をインポート',
        subtitle: '動画は公開まで非公開のままです。',
        urlLabel: 'YouTube動画URL',
        urlPlaceholder: 'https://www.youtube.com/watch?v=...',
        acceptedFormats: '対応YouTubeURL形式：',
        cancel: 'キャンセル',
        addVideo: '動画を追加',
        errors: {
            invalidUrl: '有効なYouTube URLを入力してください',
            urlExists: '無効なURLまたは既存の動画',
            addFailed: '動画の追加中にエラーが発生しました'
        }
    }
}