function analyzeInput(inputText, inputType = "message") {

    const input = String(inputText || "").trim();

    let score = 0;
    let reasons = [];
    let matchedRules = [];

    if (!input) {
        return {
            score: 0,
            level: "LOW",
            reasons: ["No content was provided for analysis."],
            recommendations: [
                "Enter a message or URL to perform an analysis."
            ],
            matchedRules: []
        };
    }


    /* ================= MESSAGE ANALYSIS ================= */

    if (inputType === "message") {

        const text = input.toLowerCase();

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


        /* Detect URLs inside messages */

        const urlPattern = /(https?:\/\/[^\s]+)/gi;

        const urls = input.match(urlPattern);

        if (urls) {

            urls.forEach(url => {

                const urlResult = analyzeURL(url);

                score += urlResult.score;

                reasons.push(...urlResult.reasons);

                matchedRules.push(...urlResult.matchedRules);

            });

        }

    }


    /* ================= URL ANALYSIS ================= */

    if (inputType === "url") {

        const urlResult = analyzeURL(input);

        score += urlResult.score;

        reasons.push(...urlResult.reasons);

        matchedRules.push(...urlResult.matchedRules);

    }


    /* Prevent score above 100 */

    score = Math.min(score, 100);


    /* ================= LEVEL ================= */

    let level;

    if (score >= 61) {

        level = "HIGH";

    } else if (score >= 31) {

        level = "MEDIUM";

    } else {

        level = "LOW";

    }


    /* ================= RECOMMENDATIONS ================= */

    let recommendations = [];


    if (level === "HIGH") {

        recommendations = [
            "Do not click any links.",
            "Do not share OTPs, passwords or banking information.",
            "Verify the request through an official channel.",
            "Do not transfer money because of threats or pressure."
        ];

    } else if (level === "MEDIUM") {

        recommendations = [
            "Be careful before interacting with this content.",
            "Verify the sender through an official source.",
            "Do not share sensitive information."
        ];

    } else {

        recommendations = [
            "No major suspicious indicators were detected.",
            "Still verify unexpected requests before taking action.",
            "Never share OTPs, passwords or PINs."
        ];

    }


    /* Remove duplicate reasons */

    reasons = [...new Set(reasons)];

    matchedRules = [...new Set(matchedRules)];


    return {

        score,
        level,
        reasons,
        recommendations,
        matchedRules

    };
}


/* ================= URL ENGINE ================= */

function analyzeURL(url) {

    let score = 0;

    let reasons = [];

    let matchedRules = [];


    URL_RULES.forEach(rule => {

        try {

            if (rule.test(url)) {

                score += rule.score;

                reasons.push(rule.reason);

                matchedRules.push(rule.id);

            }

        } catch (error) {

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