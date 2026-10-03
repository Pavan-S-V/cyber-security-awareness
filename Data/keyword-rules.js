const KEYWORD_RULES = [

    {
        id: "URGENCY",
        keywords: [
            "urgent",
            "immediately",
            "act now",
            "last warning",
            "within 24 hours",
            "verify now",
            "immediate action"
        ],
        score: 15,
        reason: "Urgent or pressure-based language detected."
    },

    {
        id: "THREAT",
        keywords: [
            "account blocked",
            "account suspended",
            "legal action",
            "police",
            "arrest",
            "penalty",
            "case filed",
            "account will be blocked"
        ],
        score: 20,
        reason: "Threatening or account-blocking language detected."
    },

    {
        id: "SENSITIVE_INFO",
        keywords: [
            "otp",
            "password",
            "pin",
            "cvv",
            "bank details",
            "login details",
            "verification code",
            "card details"
        ],
        score: 20,
        reason: "Request for sensitive personal or financial information detected."
    },

    {
        id: "KYC",
        keywords: [
            "kyc",
            "kyc expired",
            "verify kyc",
            "update kyc",
            "kyc verification",
            "reactivate account"
        ],
        score: 15,
        reason: "KYC or account-verification lure detected."
    },

    {
        id: "REWARD",
        keywords: [
            "you won",
            "winner",
            "prize",
            "cashback",
            "free gift",
            "reward",
            "lottery"
        ],
        score: 15,
        reason: "Prize, reward or financial-lure language detected."
    },

    {
        id: "PAYMENT",
        keywords: [
            "send money",
            "transfer money",
            "make payment",
            "pay now",
            "refund",
            "bank transfer"
        ],
        score: 15,
        reason: "Unexpected payment or money-transfer request detected."
    },

    {
        id: "DIGITAL_ARREST",
        keywords: [
            "digital arrest",
            "cyber crime case",
            "police investigation",
            "supreme court",
            "video call with police",
            "warrant",
            "court case"
        ],
        score: 25,
        reason: "Possible digital-arrest scam language detected."
    }

];