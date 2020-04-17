export default {
    "system": {
        "date": "{time, selectordinal, =0 {{date, date}} other {{date, date}, {date, time, medium}}}",
        "number": "{value, number}",
        "boolean": "{value, select, true {wahr} other {falsch}}",
        "percent": "{value, number, percent}",
        "fieldSeparator": ": ",
        "memorySize": {
            "bytes": "{value, number, sqZeroDecimalPlaces} B",
            "kb": "{value, number, sqZeroDecimalPlaces} KB",
            "mb": "{value, number, sqOneDecimalPlace} MB",
            "gb": "{value, number, sqTwoDecimalPlaces} GB",
            "tb": "{value, number, sqThreeDecimalPlaces} TB",
            "pb": "{value, number, sqFourDecimalPlaces} PB"
        }
    },

    "error": {
        "serverError": "Serverfehler",
        "loginCancelled": "Anmeldung abgebrochen (login cancelled)",
        "processedCredentialsError": "Verarbeitete Anmeldeinformationen konnten nicht ermittelt werden (unable to get processed credentials)",
        "autoLoginError": "Anmeldung fehlgeschlagen (login failed)",
        "principalSwitched": "Der angemeldete Benutzer hat sich geändert (the logged in user has changed)",
        "userOverrideFailure": "Benutzerwechsel fehlgeschlagen (unable to override user)",
        "responseLoadFailure": "Antwort konnte nicht geladen werden (failed to load response)",
        "unknownError": "Unbekannter Fehler"
    },

    "language": {
        "ar": "Arabisch",
        "da": "Dänisch",
        "de": "Deutsch",
        "el": "Griechisch",
        "en": "Englisch",
        "es": "Spanisch",
        "fi": "Finnisch",
        "fr": "Französisch",
        "it": "Italienisch",
        "ja": "Japanisch",
        "ko": "Koreanisch",
        "nl": "Niederländisch",
        "no": "Norwegisch",
        "pl": "Polnisch",
        "pt": "Portugiesisch",
        "ro": "Rumänisch",
        "ru": "Russisch",
        "sv": "Schwedisch",
        "th": "Thailändisch",
        "zh": "Traditionelles Chinesisch",
        "zs": "Vereinfachtes Chinesisch",
        "zz": "Unbekannt"
    },
};
