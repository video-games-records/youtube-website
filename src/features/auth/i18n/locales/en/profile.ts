// src/i18n/locales/en/profile.ts

export default {
    title: 'Profile Settings',
    subtitle: 'Manage your account settings and preferences',
    tabs: {
        info: 'Personal Information',
        avatar: 'Profile Picture',
        password: 'Password'
    },
    fields: {
        username: 'Username',
        email: 'Email Address',
        language: 'Language Preference'
    },
    placeholders: {
        username: 'Enter your username',
        email: 'Enter your email address',
        language: 'Select your preferred language'
    },
    descriptions: {
        username: 'Your username will be visible to other users',
        email: 'We\'ll never share your email with anyone else',
        language: 'Choose the language for the interface'
    },
    validation: {
        required: 'This field is required',
        usernameLength: 'Username must be at least 3 characters',
        usernameMax: 'Username must be at most 20 characters',
        usernameFormat: 'Username can only contain letters, numbers, and underscores',
        emailFormat: 'Please enter a valid email address',
        passwordLength: 'Password must be at least 8 characters'
    },
    buttons: {
        save: 'Save Changes',
        saving: 'Saving...',
        cancel: 'Cancel'
    },
    password: {
        fields: {
            current: 'Current Password',
            new: 'New Password',
            confirm: 'Confirm New Password'
        },
        placeholders: {
            current: 'Enter your current password',
            new: 'Enter your new password',
            confirm: 'Confirm your new password'
        },
        descriptions: {
            requirements: 'Password must be at least 8 characters with letters and numbers'
        },
        validation: {
            currentRequired: 'Current password is required',
            newLength: 'New password must be at least 8 characters',
            newLetters: 'New password must contain at least one letter',
            newNumbers: 'New password must contain at least one number',
            passwordMatch: 'Passwords do not match'
        },
        buttons: {
            change: 'Change Password',
            changing: 'Changing Password...'
        },
        success: {
            title: 'Password Changed',
            changed: 'Your password has been changed successfully'
        },
        error: {
            title: 'Error',
            changeFailed: 'Failed to change password. Please check your current password and try again.',
            validationFailed: 'Password validation failed'
        }
    },
    avatar: {
        currentAvatar: 'Current Profile Picture',
        description: 'This will be displayed on your profile and comments',
        sizeInfo: 'Avatar will be resized to 100x100 pixels',
        dragDrop: 'Drag and drop an image here, or click to browse',
        fileTypes: 'PNG, JPG, or GIF up to 2MB',
        browse: 'Browse Files',
        selectFile: 'Select a file',
        upload: 'Upload Picture',
        uploading: 'Uploading...',
        success: {
            title: 'Success',
            uploaded: 'Your profile picture has been updated'
        },
        error: {
            title: 'Error',
            invalidType: 'Invalid file type. Please upload a PNG, JPG, or GIF',
            tooLarge: 'File is too large. Maximum size is 2MB',
            uploadFailed: 'Failed to upload profile picture'
        }
    },
    authentication: {
        title: 'Authentication Status'
    },
    success: {
        title: 'Success',
        updated: 'Your profile has been updated'
    },
    error: {
        title: 'Error',
        loadFailed: 'Failed to load profile data',
        updateFailed: 'Failed to update profile'
    }
}