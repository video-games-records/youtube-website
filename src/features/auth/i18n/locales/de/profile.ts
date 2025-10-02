// src/i18n/locales/de/profile.ts

export default {
    title: 'Profil-Einstellungen',
    subtitle: 'Verwalten Sie Ihre Kontoeinstellungen und Präferenzen',
    tabs: {
        info: 'Persönliche Informationen',
        avatar: 'Profilbild',
        password: 'Passwort'
    },
    fields: {
        username: 'Benutzername',
        email: 'E-Mail-Adresse',
        language: 'Bevorzugte Sprache'
    },
    placeholders: {
        username: 'Geben Sie Ihren Benutzernamen ein',
        email: 'Geben Sie Ihre E-Mail-Adresse ein',
        language: 'Wählen Sie Ihre bevorzugte Sprache'
    },
    descriptions: {
        username: 'Ihr Benutzername wird von anderen Benutzern gesehen',
        email: 'Wir werden Ihre E-Mail niemals an Dritte weitergeben',
        language: 'Wählen Sie die Sprache der Benutzeroberfläche'
    },
    validation: {
        required: 'Dieses Feld ist erforderlich',
        usernameLength: 'Der Benutzername muss mindestens 3 Zeichen haben',
        usernameMax: 'Der Benutzername darf höchstens 20 Zeichen haben',
        usernameFormat: 'Der Benutzername darf nur Buchstaben, Zahlen und Unterstriche enthalten',
        emailFormat: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
        passwordLength: 'Das Passwort muss mindestens 8 Zeichen haben'
    },
    buttons: {
        save: 'Änderungen speichern',
        saving: 'Speichern...',
        cancel: 'Abbrechen'
    },
    password: {
        fields: {
            current: 'Aktuelles Passwort',
            new: 'Neues Passwort',
            confirm: 'Neues Passwort bestätigen'
        },
        placeholders: {
            current: 'Geben Sie Ihr aktuelles Passwort ein',
            new: 'Geben Sie Ihr neues Passwort ein',
            confirm: 'Bestätigen Sie Ihr neues Passwort'
        },
        descriptions: {
            requirements: 'Das Passwort muss mindestens 8 Zeichen mit Buchstaben und Zahlen enthalten'
        },
        validation: {
            currentRequired: 'Das aktuelle Passwort ist erforderlich',
            newLength: 'Das neue Passwort muss mindestens 8 Zeichen haben',
            newLetters: 'Das neue Passwort muss mindestens einen Buchstaben enthalten',
            newNumbers: 'Das neue Passwort muss mindestens eine Zahl enthalten',
            passwordMatch: 'Die Passwörter stimmen nicht überein'
        },
        buttons: {
            change: 'Passwort ändern',
            changing: 'Änderung läuft...'
        },
        success: {
            title: 'Passwort geändert',
            changed: 'Ihr Passwort wurde erfolgreich geändert'
        },
        error: {
            title: 'Fehler',
            changeFailed: 'Passwort-Änderung fehlgeschlagen. Bitte überprüfen Sie Ihr aktuelles Passwort und versuchen Sie es erneut.',
            validationFailed: 'Passwort-Validierung fehlgeschlagen'
        }
    },
    avatar: {
        currentAvatar: 'Aktuelles Profilbild',
        description: 'Dieses Bild wird in Ihrem Profil und Ihren Kommentaren angezeigt',
        sizeInfo: 'Das Avatar wird auf 100x100 Pixel skaliert',
        dragDrop: 'Ziehen Sie ein Bild hierher oder klicken Sie zum Durchsuchen',
        fileTypes: 'PNG, JPG oder GIF bis 2 MB',
        browse: 'Dateien durchsuchen',
        selectFile: 'Datei auswählen',
        upload: 'Bild hochladen',
        uploading: 'Hochladen...',
        success: {
            title: 'Erfolgreich',
            uploaded: 'Ihr Profilbild wurde aktualisiert'
        },
        error: {
            title: 'Fehler',
            invalidType: 'Ungültiger Dateityp. Bitte laden Sie ein PNG, JPG oder GIF hoch',
            tooLarge: 'Die Datei ist zu groß. Die maximale Größe beträgt 2 MB',
            uploadFailed: 'Hochladen des Profilbilds fehlgeschlagen'
        }
    },
    authentication: {
        title: 'Authentifizierungsstatus'
    },
    success: {
        title: 'Erfolgreich',
        updated: 'Ihr Profil wurde aktualisiert'
    },
    error: {
        title: 'Fehler',
        loadFailed: 'Laden der Profildaten fehlgeschlagen',
        updateFailed: 'Aktualisierung des Profils fehlgeschlagen'
    }
}