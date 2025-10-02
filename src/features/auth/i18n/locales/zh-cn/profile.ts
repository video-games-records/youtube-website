// src/i18n/locales/zh-cn/profile.ts

export default {
    title: '个人资料设置',
    subtitle: '管理您的账户设置和偏好',
    tabs: {
        info: '个人信息',
        avatar: '头像',
        password: '密码'
    },
    fields: {
        username: '用户名',
        email: '邮箱地址',
        language: '语言偏好'
    },
    placeholders: {
        username: '请输入您的用户名',
        email: '请输入您的邮箱地址',
        language: '选择您的首选语言'
    },
    descriptions: {
        username: '您的用户名将对其他用户可见',
        email: '我们绝不会与任何人分享您的邮箱',
        language: '选择界面语言'
    },
    validation: {
        required: '此字段为必填项',
        usernameLength: '用户名至少需要3个字符',
        usernameMax: '用户名最多20个字符',
        usernameFormat: '用户名只能包含字母、数字和下划线',
        emailFormat: '请输入有效的邮箱地址',
        passwordLength: '密码至少需要8个字符'
    },
    buttons: {
        save: '保存更改',
        saving: '保存中...',
        cancel: '取消'
    },
    password: {
        fields: {
            current: '当前密码',
            new: '新密码',
            confirm: '确认新密码'
        },
        placeholders: {
            current: '请输入您的当前密码',
            new: '请输入您的新密码',
            confirm: '请确认您的新密码'
        },
        descriptions: {
            requirements: '密码至少需要8个字符，包含字母和数字'
        },
        validation: {
            currentRequired: '当前密码为必填项',
            newLength: '新密码至少需要8个字符',
            newLetters: '新密码必须包含至少一个字母',
            newNumbers: '新密码必须包含至少一个数字',
            passwordMatch: '密码不匹配'
        },
        buttons: {
            change: '更改密码',
            changing: '更改密码中...'
        },
        success: {
            title: '密码已更改',
            changed: '您的密码已成功更改'
        },
        error: {
            title: '错误',
            changeFailed: '更改密码失败。请检查您的当前密码并重试。',
            validationFailed: '密码验证失败'
        }
    },
    avatar: {
        currentAvatar: '当前头像',
        description: '这将显示在您的个人资料和评论中',
        sizeInfo: '头像将被调整为100x100像素',
        dragDrop: '拖拽图片到此处，或点击浏览',
        fileTypes: 'PNG、JPG或GIF，最大2MB',
        browse: '浏览文件',
        selectFile: '选择文件',
        upload: '上传头像',
        uploading: '上传中...',
        success: {
            title: '成功',
            uploaded: '您的头像已更新'
        },
        error: {
            title: '错误',
            invalidType: '无效的文件类型。请上传PNG、JPG或GIF',
            tooLarge: '文件过大。最大尺寸为2MB',
            uploadFailed: '头像上传失败'
        }
    },
    authentication: {
        title: '认证状态'
    },
    success: {
        title: '成功',
        updated: '您的个人资料已更新'
    },
    error: {
        title: '错误',
        loadFailed: '加载个人资料数据失败',
        updateFailed: '更新个人资料失败'
    }
}