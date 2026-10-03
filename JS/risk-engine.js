function analyzeInput(inputText, inputType = "message") {

    const input = String(inputText || "").trim();

    let score = 0;
    let reasons = [];
    let matchedRules = [];

    if (!input) {
        return {
            score: 0,
            level: "LOW",
            reasons: [
                "No content was provided for analysis."
            ],
            recommendations: [
                "Enter a message or URL to perform an analysis."
            ],
            matchedRules: []
        };
    }


    /* =====================================================
       MESSAGE ANALYSIS
    ===================================================== */

    if (inputType === "message") {

        const text = input.toLowerCase();


        /* ---------------------------------------------
           KEYWORD RULES
        --------------------------------------------- */

        KEYWORD_RULES.forEach(rule => {

            const matched = rule.keywords.some(keyword =>
                text.includes(keyword.toLowerCase())
            );


            if (matched) {

                score += rule.score;

                reasons.push(rule.reason);

                matchedRules.push(rule.id);

            }

        });


        /* ---------------------------------------------
           URLS INSIDE MESSAGE
        --------------------------------------------- */

        const urlPattern =
            /(https?:\/\/[^\s]+)/gi;

        const urls = input.match(urlPattern);


        if (urls) {

            urls.forEach(url => {

                const urlResult =
                    analyzeURL(url);

                score += urlResult.score;

                reasons.push(
                    ...urlResult.reasons
                );

                matchedRules.push(
                    ...urlResult.matchedRules
                );

            });

        }

    }


    /* =====================================================
       URL ANALYSIS
    ===================================================== */

    if (inputType === "url") {

        const urlResult =
            analyzeURL(input);

        score += urlResult.score;

        reasons.push(
            ...urlResult.reasons
        );

        matchedRules.push(
            ...urlResult.matchedRules
        );

    }


    /* =====================================================
       REMOVE DUPLICATES
    ===================================================== */

    matchedRules =
        [...new Set(matchedRules)];

    reasons =
        [...new Set(reasons)];


    /* =====================================================
       ADVANCED COMBINATION SCORING
    ===================================================== */

    const has = id =>
        matchedRules.includes(id);


    /* -----------------------------------------------------
       REWARD + URGENCY
       Example:
       "You won a prize. Claim immediately."
       ----------------------------------------------------- */

    if (
        has("REWARD_LOTTERY") &&
        has("URGENCY")
    ) {

        score += 25;

        reasons.push(
            "Prize or reward combined with urgent action request."
        );

    }


    /* -----------------------------------------------------
       OTP + ACCOUNT THREAT
       ----------------------------------------------------- */

    if (
        has("CREDENTIAL_THEFT") &&
        has("ACCOUNT_THREAT")
    ) {

        score += 20;

        reasons.push(
            "Account threat combined with a request for authentication credentials."
        );

    }


    /* -----------------------------------------------------
       OTP + URGENCY
       ----------------------------------------------------- */

    if (
        has("CREDENTIAL_THEFT") &&
        has("URGENCY")
    ) {

        score += 15;

        reasons.push(
            "Sensitive credential request combined with urgent pressure."
        );

    }


    /* -----------------------------------------------------
       KYC + ACCOUNT THREAT
       ----------------------------------------------------- */

    if (
        has("KYC_VERIFICATION") &&
        has("ACCOUNT_THREAT")
    ) {

        score += 20;

        reasons.push(
            "KYC verification request combined with an account threat."
        );

    }


    /* -----------------------------------------------------
       KYC + URGENCY
       ----------------------------------------------------- */

    if (
        has("KYC_VERIFICATION") &&
        has("URGENCY")
    ) {

        score += 15;

        reasons.push(
            "KYC request combined with urgent pressure."
        );

    }


    /* -----------------------------------------------------
       PAYMENT + URGENCY
       ----------------------------------------------------- */

    if (
        has("PAYMENT_REQUEST") &&
        has("URGENCY")
    ) {

        score += 20;

        reasons.push(
            "Payment request combined with urgent pressure."
        );

    }


    /* -----------------------------------------------------
       PAYMENT + THREAT
       ----------------------------------------------------- */

    if (
        has("PAYMENT_REQUEST") &&
        has("ACCOUNT_THREAT")
    ) {

        score += 25;

        reasons.push(
            "Payment request combined with threatening language."
        );

    }


    /* -----------------------------------------------------
       DIGITAL ARREST + PAYMENT
       ----------------------------------------------------- */

    if (
        has("DIGITAL_ARREST") &&
        has("PAYMENT_REQUEST")
    ) {

        score += 25;

        reasons.push(
            "Possible digital-arrest scam combined with a financial demand."
        );

    }


    /* -----------------------------------------------------
       DIGITAL ARREST + URGENCY
       ----------------------------------------------------- */

    if (
        has("DIGITAL_ARREST") &&
        has("URGENCY")
    ) {

        score += 20;

        reasons.push(
            "Possible digital-arrest language combined with urgent pressure."
        );

    }


    /* -----------------------------------------------------
       PHISHING + CREDENTIAL THEFT
       ----------------------------------------------------- */

    if (
        has("PHISHING_LINK") &&
        has("CREDENTIAL_THEFT")
    ) {

        score += 25;

        reasons.push(
            "Suspicious link combined with a request for sensitive credentials."
        );

    }


    /* -----------------------------------------------------
       PHISHING + ACCOUNT THREAT
       ----------------------------------------------------- */

    if (
        has("PHISHING_LINK") &&
        has("ACCOUNT_THREAT")
    ) {

        score += 20;

        reasons.push(
            "Suspicious link combined with an account threat."
        );

    }


    /* -----------------------------------------------------
       MALICIOUS APP + REMOTE ACCESS
       ----------------------------------------------------- */

    if (
        has("MALICIOUS_APP") &&
        has("REMOTE_ACCESS")
    ) {

        score += 25;

        reasons.push(
            "Unsafe application installation combined with remote-access request."
        );

    }


    /* -----------------------------------------------------
       MALWARE + REMOTE ACCESS
       ----------------------------------------------------- */

    if (
        has("MALWARE_ALERT") &&
        has("REMOTE_ACCESS")
    ) {

        score += 20;

        reasons.push(
            "Security alert combined with a request for remote device access."
        );

    }


    /* -----------------------------------------------------
       INVESTMENT + PAYMENT
       ----------------------------------------------------- */

    if (
        has("INVESTMENT_SCAM") &&
        has("PAYMENT_REQUEST")
    ) {

        score += 20;

        reasons.push(
            "Investment opportunity combined with a financial payment request."
        );

    }


    /* -----------------------------------------------------
       JOB + PAYMENT
       ----------------------------------------------------- */

    if (
        has("JOB_SCAM") &&
        has("PAYMENT_REQUEST")
    ) {

        score += 20;

        reasons.push(
            "Job opportunity combined with a payment request."
        );

    }


    /* -----------------------------------------------------
       DELIVERY + PAYMENT
       ----------------------------------------------------- */

    if (
        has("DELIVERY_SCAM") &&
        has("PAYMENT_REQUEST")
    ) {

        score += 15;

        reasons.push(
            "Delivery notification combined with a payment request."
        );

    }


    /* -----------------------------------------------------
       QR + PAYMENT
       ----------------------------------------------------- */

    if (
        has("QR_SCAM") &&
        has("PAYMENT_REQUEST")
    ) {

        score += 20;

        reasons.push(
            "QR-code instruction combined with a payment request."
        );

    }


    /* -----------------------------------------------------
       PERSONAL INFORMATION + URGENCY
       ----------------------------------------------------- */

    if (
        has("PERSONAL_INFORMATION") &&
        has("URGENCY")
    ) {

        score += 15;

        reasons.push(
            "Sensitive personal-information request combined with urgent pressure."
        );

    }


    /* -----------------------------------------------------
       BLACKMAIL + PAYMENT
       ----------------------------------------------------- */

    if (
        has("EXTORTION") &&
        has("PAYMENT_REQUEST")
    ) {

        score += 25;

        reasons.push(
            "Threatening or blackmail language combined with a financial demand."
        );

    }


    /* -----------------------------------------------------
       SEXTORTION + PAYMENT
       ----------------------------------------------------- */

    if (
        has("SEXTORTION") &&
        has("PAYMENT_REQUEST")
    ) {

        score += 25;

        reasons.push(
            "Intimate-content threat combined with a financial demand."
        );

    }


    /* =====================================================
       HIGH-RISK CATEGORY OVERRIDES
    ===================================================== */

    /*
       These patterns are serious enough that the
       analyzer should not leave them as LOW.
    */

    if (has("DIGITAL_ARREST")) {

        score = Math.max(score, 70);

    }


    if (has("SEXTORTION")) {

        score = Math.max(score, 70);

    }


    if (has("EXTORTION")) {

        score = Math.max(score, 65);

    }


    if (
        has("CREDENTIAL_THEFT") &&
        has("ACCOUNT_THREAT")
    ) {

        score = Math.max(score, 65);

    }


    /* =====================================================
       REWARD + URGENCY SPECIAL CASE
    ===================================================== */

    if (
        has("REWARD_LOTTERY") &&
        has("URGENCY")
    ) {

        score = Math.max(score, 60);

    }


    /* =====================================================
       CAP SCORE
    ===================================================== */

    score =
        Math.min(Math.round(score), 100);


    /* =====================================================
       CLASSIFICATION
    ===================================================== */

    let level;


    if (score >= 61) {

        level = "HIGH";

    }

    else if (score >= 31) {

        level = "MEDIUM";

    }

    else {

        level = "LOW";

    }


    /* =====================================================
       RECOMMENDATIONS
    ===================================================== */

    let recommendations = [];


    if (level === "HIGH") {

        recommendations = [

            "Do not click links or open attachments.",

            "Do not share OTPs, passwords, PINs or banking information.",

            "Do not transfer money because of threats, rewards or urgent requests.",

            "Verify the message through the organization's official website or app.",

            "If you already shared information or money, contact your bank or relevant authority immediately."

        ];

    }


    else if (level === "MEDIUM") {

        recommendations = [

            "Be cautious before interacting with this content.",

            "Verify the sender through an official source.",

            "Do not share sensitive information.",

            "Avoid making payments until the request is independently verified."

        ];

    }


    else {

        recommendations = [

            "No major suspicious indicators were detected.",

            "Still verify unexpected requests before taking action.",

            "Never share OTPs, passwords or PINs.",

            "Avoid clicking unexpected links."

        ];

    }


    /* =====================================================
       FINAL RESULT
    ===================================================== */

    return {

        score,

        level,

        reasons:
            [...new Set(reasons)],

        recommendations,

        matchedRules

    };

}


/* =========================================================
   URL ANALYZER
========================================================= */

function analyzeURL(url) {

    let score = 0;

    let reasons = [];

    let matchedRules = [];


    URL_RULES.forEach(rule => {

        try {

            if (rule.test(url)) {

                score += rule.score;

                reasons.push(
                    rule.reason
                );

                matchedRules.push(
                    rule.id
                );

            }

        }

        catch (error) {

            console.error(
                "URL rule error:",
                rule.id,
                error
            );

        }

    });


    return {

        score,

        reasons,

        matchedRules

    };

}