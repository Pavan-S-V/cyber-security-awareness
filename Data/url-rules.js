const URL_RULES = [

    {
        id: "IP_ADDRESS",
        test: function(url) {
            return /^https?:\/\/\d{1,3}(\.\d{1,3}){3}/i.test(url);
        },
        score: 25,
        reason: "URL uses a direct IP address instead of a normal domain."
    },

    {
        id: "HTTP",
        test: function(url) {
            return /^http:\/\//i.test(url);
        },
        score: 10,
        reason: "URL does not use HTTPS."
    },

    {
        id: "LONG_URL",
        test: function(url) {
            return url.length > 100;
        },
        score: 10,
        reason: "Unusually long URL detected."
    },

    {
        id: "SUSPICIOUS_WORD",
        test: function(url) {
            return /(login|verify|secure|account|update|claim|reward|kyc|wallet)/i.test(url);
        },
        score: 15,
        reason: "URL contains words commonly used in deceptive links."
    },

    {
        id: "SPECIAL_SYMBOLS",
        test: function(url) {
            return /@/.test(url);
        },
        score: 20,
        reason: "Unusual URL structure detected."
    },

    {
        id: "SHORTENER",
        test: function(url) {
            return /(bit\.ly|tinyurl\.com|t\.co|shorturl\.at|is\.gd)/i.test(url);
        },
        score: 15,
        reason: "URL uses a link-shortening service."
    }

];