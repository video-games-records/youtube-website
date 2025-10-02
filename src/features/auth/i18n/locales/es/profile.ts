// src/i18n/locales/es/profile.ts

export default {
    title: 'Configuración del perfil',
    subtitle: 'Gestiona la configuración y preferencias de tu cuenta',
    tabs: {
        info: 'Información personal',
        avatar: 'Foto de perfil',
        password: 'Contraseña'
    },
    fields: {
        username: 'Nombre de usuario',
        email: 'Dirección de correo electrónico',
        language: 'Preferencia de idioma'
    },
    placeholders: {
        username: 'Introduce tu nombre de usuario',
        email: 'Introduce tu dirección de correo electrónico',
        language: 'Selecciona tu idioma preferido'
    },
    descriptions: {
        username: 'Tu nombre de usuario será visible para otros usuarios',
        email: 'Nunca compartiremos tu correo electrónico con nadie más',
        language: 'Elige el idioma para la interfaz'
    },
    validation: {
        required: 'Este campo es obligatorio',
        usernameLength: 'El nombre de usuario debe tener al menos 3 caracteres',
        usernameMax: 'El nombre de usuario debe tener como máximo 20 caracteres',
        usernameFormat: 'El nombre de usuario solo puede contener letras, números y guiones bajos',
        emailFormat: 'Por favor introduce una dirección de correo electrónico válida',
        passwordLength: 'La contraseña debe tener al menos 8 caracteres'
    },
    buttons: {
        save: 'Guardar cambios',
        saving: 'Guardando...',
        cancel: 'Cancelar'
    },
    password: {
        fields: {
            current: 'Contraseña actual',
            new: 'Nueva contraseña',
            confirm: 'Confirmar nueva contraseña'
        },
        placeholders: {
            current: 'Introduce tu contraseña actual',
            new: 'Introduce tu nueva contraseña',
            confirm: 'Confirma tu nueva contraseña'
        },
        descriptions: {
            requirements: 'La contraseña debe tener al menos 8 caracteres con letras y números'
        },
        validation: {
            currentRequired: 'La contraseña actual es obligatoria',
            newLength: 'La nueva contraseña debe tener al menos 8 caracteres',
            newLetters: 'La nueva contraseña debe contener al menos una letra',
            newNumbers: 'La nueva contraseña debe contener al menos un número',
            passwordMatch: 'Las contraseñas no coinciden'
        },
        buttons: {
            change: 'Cambiar contraseña',
            changing: 'Cambiando contraseña...'
        },
        success: {
            title: 'Contraseña cambiada',
            changed: 'Tu contraseña ha sido cambiada exitosamente'
        },
        error: {
            title: 'Error',
            changeFailed: 'Error al cambiar la contraseña. Por favor verifica tu contraseña actual e inténtalo de nuevo.',
            validationFailed: 'Error en la validación de la contraseña'
        }
    },
    avatar: {
        currentAvatar: 'Foto de perfil actual',
        description: 'Esto se mostrará en tu perfil y comentarios',
        sizeInfo: 'El avatar será redimensionado a 100x100 píxeles',
        dragDrop: 'Arrastra y suelta una imagen aquí, o haz clic para navegar',
        fileTypes: 'PNG, JPG, o GIF hasta 2MB',
        browse: 'Explorar archivos',
        selectFile: 'Seleccionar un archivo',
        upload: 'Subir imagen',
        uploading: 'Subiendo...',
        success: {
            title: 'Éxito',
            uploaded: 'Tu foto de perfil ha sido actualizada'
        },
        error: {
            title: 'Error',
            invalidType: 'Tipo de archivo inválido. Por favor sube un PNG, JPG, o GIF',
            tooLarge: 'El archivo es demasiado grande. El tamaño máximo es 2MB',
            uploadFailed: 'Error al subir la foto de perfil'
        }
    },
    authentication: {
        title: 'Estado de autenticación'
    },
    success: {
        title: 'Éxito',
        updated: 'Tu perfil ha sido actualizado'
    },
    error: {
        title: 'Error',
        loadFailed: 'Error al cargar los datos del perfil',
        updateFailed: 'Error al actualizar el perfil'
    }
}