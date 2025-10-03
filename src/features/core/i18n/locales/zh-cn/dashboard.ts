// src/features/core/i18n/locales/zh-cn/dashboard.ts

export default {
    title: '频道仪表板',
    
    menu: {
        overview: '概览',
        content: '内容',
    },
    
    overview: {
    
    
        title: '频道仪表板',
        analytics: {
            title: '频道分析数据',
            videos: '视频',
            totalViews: '总观看次数',
            accessAnalytics: '访问分析数据'
        },
        import: {
            title: '想要查看您最近视频的指标吗？',
            subtitle: '您的视频在发布前将保持私密状态。',
            button: '导入视频'
        }
    },
    
    videos: {
        title: '频道内容',
        subtitle: '管理您的视频',
        addVideo: '添加视频',
        
        table: {
            video: '视频',
            date: '日期',
            views: '观看次数',
            comments: '评论',
            status: {
                published: '已发布'
            },
            empty: {
                title: '暂无视频',
                description: '开始添加您的第一个视频。'
            },
            loading: '正在加载视频...',
            actions: {
                view: '查看视频',
                edit: '编辑',
                delete: '删除'
            }
        },
        
        filter: '筛选',
        pagination: {
            showing: '显示',
            to: '至',
            of: '共',
            videos: '个视频',
            video: '个视频',
            previous: '上一页',
            next: '下一页',
            page: '页'
        },
        
        empty: {
            title: '没有视频',
            description: '开始添加您的第一个视频。'
        },
        
        loading: '正在加载视频...'
    },
    
    import: {
        title: '导入视频',
        subtitle: '您的视频在发布前将保持私密状态。',
        urlLabel: 'YouTube视频URL',
        urlPlaceholder: 'https://www.youtube.com/watch?v=...',
        acceptedFormats: '接受的YouTube URL格式：',
        cancel: '取消',
        addVideo: '添加视频',
        errors: {
            invalidUrl: '请输入有效的YouTube URL',
            urlExists: '无效的URL或视频已存在',
            addFailed: '添加视频时发生错误'
        }
    }
}