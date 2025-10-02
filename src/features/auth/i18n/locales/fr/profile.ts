// src/i18n/locales/fr/profile.ts

export default {
    title: 'Paramètres du profil',
    subtitle: 'Gérez vos paramètres de compte et vos préférences',
    tabs: {
        info: 'Informations personnelles',
        avatar: 'Photo de profil',
        password: 'Mot de passe'
    },
    fields: {
        username: 'Nom d\'utilisateur',
        email: 'Adresse email',
        language: 'Langue préférée'
    },
    placeholders: {
        username: 'Entrez votre nom d\'utilisateur',
        email: 'Entrez votre adresse email',
        language: 'Sélectionnez votre langue préférée'
    },
    descriptions: {
        username: 'Votre nom d\'utilisateur sera visible par les autres utilisateurs',
        email: 'Nous ne partagerons jamais votre email avec des tiers',
        language: 'Choisissez la langue de l\'interface'
    },
    validation: {
        required: 'Ce champ est requis',
        usernameLength: 'Le nom d\'utilisateur doit comporter au moins 3 caractères',
        usernameMax: 'Le nom d\'utilisateur doit comporter au plus 20 caractères',
        usernameFormat: 'Le nom d\'utilisateur ne peut contenir que des lettres, des chiffres et des underscores',
        emailFormat: 'Veuillez entrer une adresse email valide',
        passwordLength: 'Le mot de passe doit comporter au moins 8 caractères'
    },
    buttons: {
        save: 'Enregistrer les modifications',
        saving: 'Enregistrement...',
        cancel: 'Annuler'
    },
    password: {
        fields: {
            current: 'Mot de passe actuel',
            new: 'Nouveau mot de passe',
            confirm: 'Confirmer le nouveau mot de passe'
        },
        placeholders: {
            current: 'Entrez votre mot de passe actuel',
            new: 'Entrez votre nouveau mot de passe',
            confirm: 'Confirmez votre nouveau mot de passe'
        },
        descriptions: {
            requirements: 'Le mot de passe doit contenir au moins 8 caractères avec des lettres et des chiffres'
        },
        validation: {
            currentRequired: 'Le mot de passe actuel est requis',
            newLength: 'Le nouveau mot de passe doit contenir au moins 8 caractères',
            newLetters: 'Le nouveau mot de passe doit contenir au moins une lettre',
            newNumbers: 'Le nouveau mot de passe doit contenir au moins un chiffre',
            passwordMatch: 'Les mots de passe ne correspondent pas'
        },
        buttons: {
            change: 'Changer de mot de passe',
            changing: 'Changement en cours...'
        },
        success: {
            title: 'Mot de passe changé',
            changed: 'Votre mot de passe a été changé avec succès'
        },
        error: {
            title: 'Erreur',
            changeFailed: 'Échec du changement de mot de passe. Veuillez vérifier votre mot de passe actuel et réessayer.',
            validationFailed: 'Échec de validation du mot de passe'
        }
    },
    avatar: {
        currentAvatar: 'Photo de profil actuelle',
        description: 'Cette photo sera affichée sur votre profil et vos commentaires',
        sizeInfo: 'L\'avatar sera redimensionné à 100x100 pixels',
        dragDrop: 'Glissez-déposez une image ici, ou cliquez pour parcourir',
        fileTypes: 'PNG, JPG ou GIF jusqu\'à 2 Mo',
        browse: 'Parcourir les fichiers',
        selectFile: 'Sélectionner un fichier',
        upload: 'Télécharger la photo',
        uploading: 'Téléchargement...',
        success: {
            title: 'Succès',
            uploaded: 'Votre photo de profil a été mise à jour'
        },
        error: {
            title: 'Erreur',
            invalidType: 'Type de fichier invalide. Veuillez télécharger un PNG, JPG ou GIF',
            tooLarge: 'Le fichier est trop volumineux. La taille maximale est de 2 Mo',
            uploadFailed: 'Échec du téléchargement de la photo de profil'
        }
    },
    authentication: {
        title: 'Statut d\'authentification'
    },
    success: {
        title: 'Succès',
        updated: 'Votre profil a été mis à jour'
    },
    error: {
        title: 'Erreur',
        loadFailed: 'Échec du chargement des données du profil',
        updateFailed: 'Échec de la mise à jour du profil'
    }
}