export default {
    "system": {
        "date": "{time, selectordinal, =0 {{date, date}} other {{date, date} à {date, time, medium}}}",
        "number": "{value, number}",
        "boolean": "{value, select, true {vrai} other {faux}}",
        "percent": "{value, number, percent}",
        "fieldSeparator": " : ",
        "memorySize": {
            "bytes": "{value, number, sqZeroDecimalPlaces} o",
            "kb": "{value, number, sqZeroDecimalPlaces} Ko",
            "mb": "{value, number, sqOneDecimalPlace} Mo",
            "gb": "{value, number, sqTwoDecimalPlaces} Go",
            "tb": "{value, number, sqThreeDecimalPlaces} To",
            "pb": "{value, number, sqFourDecimalPlaces} Po"
        }
    },

    "error": {
        "serverError": "Erreur de serveur",
        "loginCancelled": "Connexion annulée",
        "processedCredentialsError": "Impossible d'obtenir les informations d'identification",
        "autoLoginError": "Echec de la connexion",
        "principalSwitched": "L'utilisateur connecté a été modifié",
        "userOverrideFailure": "Echec de surchargement de l'utilisateur",
        "responseLoadFailure": "Echec de chargement de la réponse",
        "queryError": "Il y a eu une erreur de serveur. Cela peut être causé par une erreur de syntaxe de la requête, vous pouvez vérifier sur la page de documentation \"Syntaxe des critères de sélection\": https://doc.sinequa.com/fr.sinequa-es.v11/Content/fr.sinequa-es.syntax.selection-query.html",
        "unknownError": "Erreur inconnue"
    },

    "language": {
        "ar": "Arabe",
        "da": "Danois",
        "de": "Allemand",
        "el": "Grec",
        "en": "Anglais",
        "es": "Espagnol",
        "fi": "Finlandais",
        "fr": "Français",
        "it": "Italien",
        "ja": "Japonais",
        "ko": "Coréen",
        "nl": "Néerlandais",
        "no": "Norvégien",
        "pl": "Polonais",
        "pt": "Portugais",
        "ro": "Roumain",
        "ru": "Russe",
        "sv": "Suédois",
        "th": "Thaïlandais",
        "zh": "Chinois traditionnel",
        "zs": "Chinois simplifié",
        "zz": "Inconnu"
    },
};
