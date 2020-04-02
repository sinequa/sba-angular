export default {
    "system": {
        "date": "{time, selectordinal, =0 {{date, date}} other {{date, date}, {date, time, medium}}}",
        "number": "{value, number}",
        "boolean": "{value, select, true {true} other {false}}",
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
        "serverError": "Server error",
        "loginCancelled": "login cancelled",
        "processedCredentialsError": "unable to get processed credentials",
        "autoLoginError": "login failed",
        "principalSwitched": "the logged in user has changed",
        "userOverrideFailure": "unable to override user",
        "responseLoadFailure": "failed to load response",
        "unknownError": "unknown error"
    },

    "language": {
        "ar": "Arabic",
        "da": "Danish",
        "de": "German",
        "el": "Greek",
        "en": "English",
        "es": "Spanish",
        "fi": "Finnish",
        "fr": "French",
        "it": "Italian",
        "ja": "Japanese",
        "ko": "Korean",
        "nl": "Dutch",
        "no": "Norwegian",
        "pl": "Polish",
        "pt": "Portuguese",
        "ro": "Romanian",
        "ru": "Russian",
        "sv": "Swedish",
        "th": "Thai",
        "zh": "Traditional Chinese",
        "zs": "Simplified Chinese",
        "zz": "Unknown"
    }
};
