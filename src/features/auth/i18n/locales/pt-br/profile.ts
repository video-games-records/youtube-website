// src/i18n/locales/pt-br/profile.ts

export default {
    title: 'Configurações do Perfil',
    subtitle: 'Gerencie suas configurações de conta e preferências',
    tabs: {
        info: 'Informações Pessoais',
        avatar: 'Foto do Perfil',
        password: 'Senha'
    },
    fields: {
        username: 'Nome de Usuário',
        email: 'Endereço de Email',
        language: 'Preferência de Idioma'
    },
    placeholders: {
        username: 'Digite seu nome de usuário',
        email: 'Digite seu endereço de email',
        language: 'Selecione seu idioma preferido'
    },
    descriptions: {
        username: 'Seu nome de usuário será visível para outros usuários',
        email: 'Nunca compartilharemos seu email com terceiros',
        language: 'Escolha o idioma para a interface'
    },
    validation: {
        required: 'Este campo é obrigatório',
        usernameLength: 'O nome de usuário deve ter pelo menos 3 caracteres',
        usernameMax: 'O nome de usuário deve ter no máximo 20 caracteres',
        usernameFormat: 'O nome de usuário pode conter apenas letras, números e underscore',
        emailFormat: 'Por favor, digite um endereço de email válido',
        passwordLength: 'A senha deve ter pelo menos 8 caracteres'
    },
    buttons: {
        save: 'Salvar Alterações',
        saving: 'Salvando...',
        cancel: 'Cancelar'
    },
    password: {
        fields: {
            current: 'Senha Atual',
            new: 'Nova Senha',
            confirm: 'Confirmar Nova Senha'
        },
        placeholders: {
            current: 'Digite sua senha atual',
            new: 'Digite sua nova senha',
            confirm: 'Confirme sua nova senha'
        },
        descriptions: {
            requirements: 'A senha deve ter pelo menos 8 caracteres com letras e números'
        },
        validation: {
            currentRequired: 'A senha atual é obrigatória',
            newLength: 'A nova senha deve ter pelo menos 8 caracteres',
            newLetters: 'A nova senha deve conter pelo menos uma letra',
            newNumbers: 'A nova senha deve conter pelo menos um número',
            passwordMatch: 'As senhas não coincidem'
        },
        buttons: {
            change: 'Alterar Senha',
            changing: 'Alterando Senha...'
        },
        success: {
            title: 'Senha Alterada',
            changed: 'Sua senha foi alterada com sucesso'
        },
        error: {
            title: 'Erro',
            changeFailed: 'Falha ao alterar a senha. Verifique sua senha atual e tente novamente.',
            validationFailed: 'Falha na validação da senha'
        }
    },
    avatar: {
        currentAvatar: 'Foto do Perfil Atual',
        description: 'Esta será exibida no seu perfil e comentários',
        sizeInfo: 'O avatar será redimensionado para 100x100 pixels',
        dragDrop: 'Arraste e solte uma imagem aqui, ou clique para procurar',
        fileTypes: 'PNG, JPG ou GIF até 2MB',
        browse: 'Procurar Arquivos',
        selectFile: 'Selecionar um arquivo',
        upload: 'Enviar Foto',
        uploading: 'Enviando...',
        success: {
            title: 'Sucesso',
            uploaded: 'Sua foto de perfil foi atualizada'
        },
        error: {
            title: 'Erro',
            invalidType: 'Tipo de arquivo inválido. Por favor, envie PNG, JPG ou GIF',
            tooLarge: 'Arquivo muito grande. O tamanho máximo é 2MB',
            uploadFailed: 'Falha ao enviar foto do perfil'
        }
    },
    authentication: {
        title: 'Status de Autenticação'
    },
    success: {
        title: 'Sucesso',
        updated: 'Seu perfil foi atualizado'
    },
    error: {
        title: 'Erro',
        loadFailed: 'Falha ao carregar dados do perfil',
        updateFailed: 'Falha ao atualizar perfil'
    }
}