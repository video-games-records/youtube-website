// src/i18n/locales/ja/profile.ts

export default {
    title: 'プロフィール設定',
    subtitle: 'アカウント設定と環境設定を管理',
    tabs: {
        info: '個人情報',
        avatar: 'プロフィール画像',
        password: 'パスワード'
    },
    fields: {
        username: 'ユーザー名',
        email: 'メールアドレス',
        language: '言語設定'
    },
    placeholders: {
        username: 'ユーザー名を入力',
        email: 'メールアドレスを入力',
        language: '希望の言語を選択'
    },
    descriptions: {
        username: 'ユーザー名は他のユーザーに表示されます',
        email: 'メールアドレスは第三者と共有することはありません',
        language: 'インターフェースの言語を選択'
    },
    validation: {
        required: 'この項目は必須です',
        usernameLength: 'ユーザー名は3文字以上で入力してください',
        usernameMax: 'ユーザー名は20文字以下で入力してください',
        usernameFormat: 'ユーザー名は文字、数字、アンダースコアのみ使用可能です',
        emailFormat: '有効なメールアドレスを入力してください',
        passwordLength: 'パスワードは8文字以上で入力してください'
    },
    buttons: {
        save: '変更を保存',
        saving: '保存中...',
        cancel: 'キャンセル'
    },
    password: {
        fields: {
            current: '現在のパスワード',
            new: '新しいパスワード',
            confirm: '新しいパスワードの確認'
        },
        placeholders: {
            current: '現在のパスワードを入力',
            new: '新しいパスワードを入力',
            confirm: '新しいパスワードを再入力'
        },
        descriptions: {
            requirements: 'パスワードは8文字以上で、文字と数字を含む必要があります'
        },
        validation: {
            currentRequired: '現在のパスワードが必要です',
            newLength: '新しいパスワードは8文字以上で入力してください',
            newLetters: '新しいパスワードには文字を含める必要があります',
            newNumbers: '新しいパスワードには数字を含める必要があります',
            passwordMatch: 'パスワードが一致しません'
        },
        buttons: {
            change: 'パスワードを変更',
            changing: 'パスワード変更中...'
        },
        success: {
            title: 'パスワード変更完了',
            changed: 'パスワードが正常に変更されました'
        },
        error: {
            title: 'エラー',
            changeFailed: 'パスワードの変更に失敗しました。現在のパスワードを確認して再試行してください。',
            validationFailed: 'パスワード検証に失敗しました'
        }
    },
    avatar: {
        currentAvatar: '現在のプロフィール画像',
        description: 'プロフィールとコメントに表示されます',
        sizeInfo: 'アバターは100x100ピクセルにリサイズされます',
        dragDrop: '画像をここにドラッグ＆ドロップするか、クリックして参照',
        fileTypes: 'PNG、JPG、またはGIF（最大2MB）',
        browse: 'ファイルを参照',
        selectFile: 'ファイルを選択',
        upload: '画像をアップロード',
        uploading: 'アップロード中...',
        success: {
            title: '成功',
            uploaded: 'プロフィール画像が更新されました'
        },
        error: {
            title: 'エラー',
            invalidType: '無効なファイル形式です。PNG、JPG、またはGIFをアップロードしてください',
            tooLarge: 'ファイルサイズが大きすぎます。最大サイズは2MBです',
            uploadFailed: 'プロフィール画像のアップロードに失敗しました'
        }
    },
    authentication: {
        title: '認証ステータス'
    },
    success: {
        title: '成功',
        updated: 'プロフィールが更新されました'
    },
    error: {
        title: 'エラー',
        loadFailed: 'プロフィールデータの読み込みに失敗しました',
        updateFailed: 'プロフィールの更新に失敗しました'
    }
}