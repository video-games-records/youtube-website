// src/i18n/locales/it/profile.ts

export default {
    title: 'Impostazioni Profilo',
    subtitle: 'Gestisci le impostazioni del tuo account e le preferenze',
    tabs: {
        info: 'Informazioni Personali',
        avatar: 'Immagine del Profilo',
        password: 'Password'
    },
    fields: {
        username: 'Nome Utente',
        email: 'Indirizzo Email',
        language: 'Preferenza Lingua'
    },
    placeholders: {
        username: 'Inserisci il tuo nome utente',
        email: 'Inserisci il tuo indirizzo email',
        language: 'Seleziona la tua lingua preferita'
    },
    descriptions: {
        username: 'Il tuo nome utente sarà visibile agli altri utenti',
        email: 'Non condivideremo mai la tua email con nessun altro',
        language: 'Scegli la lingua per l\'interfaccia'
    },
    validation: {
        required: 'Questo campo è obbligatorio',
        usernameLength: 'Il nome utente deve essere di almeno 3 caratteri',
        usernameMax: 'Il nome utente deve essere di massimo 20 caratteri',
        usernameFormat: 'Il nome utente può contenere solo lettere, numeri e underscore',
        emailFormat: 'Inserisci un indirizzo email valido',
        passwordLength: 'La password deve essere di almeno 8 caratteri'
    },
    buttons: {
        save: 'Salva Modifiche',
        saving: 'Salvataggio...',
        cancel: 'Annulla'
    },
    password: {
        fields: {
            current: 'Password Attuale',
            new: 'Nuova Password',
            confirm: 'Conferma Nuova Password'
        },
        placeholders: {
            current: 'Inserisci la tua password attuale',
            new: 'Inserisci la tua nuova password',
            confirm: 'Conferma la tua nuova password'
        },
        descriptions: {
            requirements: 'La password deve essere di almeno 8 caratteri con lettere e numeri'
        },
        validation: {
            currentRequired: 'La password attuale è obbligatoria',
            newLength: 'La nuova password deve essere di almeno 8 caratteri',
            newLetters: 'La nuova password deve contenere almeno una lettera',
            newNumbers: 'La nuova password deve contenere almeno un numero',
            passwordMatch: 'Le password non corrispondono'
        },
        buttons: {
            change: 'Cambia Password',
            changing: 'Cambio Password...'
        },
        success: {
            title: 'Password Cambiata',
            changed: 'La tua password è stata cambiata con successo'
        },
        error: {
            title: 'Errore',
            changeFailed: 'Impossibile cambiare la password. Controlla la tua password attuale e riprova.',
            validationFailed: 'Validazione password fallita'
        }
    },
    avatar: {
        currentAvatar: 'Immagine del Profilo Attuale',
        description: 'Questa sarà visualizzata sul tuo profilo e nei commenti',
        sizeInfo: 'L\'avatar sarà ridimensionato a 100x100 pixel',
        dragDrop: 'Trascina e rilascia un\'immagine qui, o clicca per sfogliare',
        fileTypes: 'PNG, JPG, o GIF fino a 2MB',
        browse: 'Sfoglia File',
        selectFile: 'Seleziona un file',
        upload: 'Carica Immagine',
        uploading: 'Caricamento...',
        success: {
            title: 'Successo',
            uploaded: 'La tua immagine del profilo è stata aggiornata'
        },
        error: {
            title: 'Errore',
            invalidType: 'Tipo di file non valido. Carica un PNG, JPG, o GIF',
            tooLarge: 'Il file è troppo grande. La dimensione massima è 2MB',
            uploadFailed: 'Impossibile caricare l\'immagine del profilo'
        }
    },
    authentication: {
        title: 'Stato Autenticazione'
    },
    success: {
        title: 'Successo',
        updated: 'Il tuo profilo è stato aggiornato'
    },
    error: {
        title: 'Errore',
        loadFailed: 'Impossibile caricare i dati del profilo',
        updateFailed: 'Impossibile aggiornare il profilo'
    }
}