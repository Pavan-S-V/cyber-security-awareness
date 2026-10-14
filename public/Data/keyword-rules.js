const KEYWORD_RULES = [

    /* =========================================================
       01. URGENCY / PRESSURE
    ========================================================= */

    {
        id: "URGENCY",
        keywords: [
            "urgent",
            "urgently",
            "immediately",
            "immediate action",
            "immediate response",
            "act now",
            "act immediately",
            "act fast",
            "respond now",
            "respond immediately",
            "verify now",
            "verify immediately",
            "confirm now",
            "confirm immediately",
            "take action now",
            "do this now",
            "last warning",
            "final warning",
            "final notice",
            "last notice",
            "important notice",
            "immediate attention required",
            "action required immediately",
            "response required immediately",
            "within 24 hours",
            "within 12 hours",
            "within 48 hours",
            "within one hour",
            "within 1 hour",
            "within a few hours",
            "expires today",
            "expires soon",
            "deadline today",
            "limited time",
            "limited period",
            "do not delay",
            "don't delay",
            "without delay",
            "before it is too late",
            "failure to respond",
            "failure to verify",
            "failure to comply",
            "immediate verification required",
            "immediate payment required"
        ],
        score: 15,
        reason: "Urgent or pressure-based language detected."
    },


    /* =========================================================
       02. ACCOUNT SUSPENSION / THREATS
    ========================================================= */

    {
        id: "ACCOUNT_THREAT",
        keywords: [
            "account blocked",
            "account has been blocked",
            "account is blocked",
            "account will be blocked",
            "account suspended",
            "account has been suspended",
            "account is suspended",
            "account will be suspended",
            "account deactivated",
            "account has been deactivated",
            "account is deactivated",
            "account will be deactivated",
            "account disabled",
            "account has been disabled",
            "account is disabled",
            "account will be disabled",
            "account terminated",
            "account has been terminated",
            "account will be terminated",
            "account closed",
            "account will be closed",
            "access blocked",
            "access has been blocked",
            "access will be blocked",
            "access suspended",
            "service suspended",
            "service will be suspended",
            "service terminated",
            "service will be terminated",
            "legal action",
            "legal consequences",
            "strict action",
            "action will be taken",
            "case will be filed",
            "case has been filed",
            "criminal case",
            "criminal action",
            "penalty will be imposed",
            "fine will be imposed",
            "warrant issued",
            "warrant has been issued",
            "arrest warrant",
            "you will be arrested",
            "arrest immediately",
            "account is at risk"
        ],
        score: 20,
        reason: "Threatening or account-blocking language detected."
    },


    /* =========================================================
       03. OTP / PASSWORD / CREDENTIAL THEFT
    ========================================================= */

    {
        id: "CREDENTIAL_THEFT",
        keywords: [
            "otp",
            "one time password",
            "one-time password",
            "verification code",
            "verification otp",
            "security code",
            "security verification code",
            "authentication code",
            "authentication otp",
            "login code",
            "login otp",
            "password",
            "passcode",
            "pin",
            "upi pin",
            "atm pin",
            "card pin",
            "cvv",
            "card cvv",
            "card number",
            "debit card number",
            "credit card number",
            "card details",
            "debit card details",
            "credit card details",
            "bank details",
            "bank account details",
            "account number",
            "bank account number",
            "login details",
            "login credentials",
            "banking credentials",
            "net banking password",
            "internet banking password",
            "username and password",
            "user id and password",
            "share your otp",
            "send your otp",
            "provide your otp",
            "tell us your otp",
            "enter your otp",
            "share otp",
            "send otp",
            "share your password",
            "send your password",
            "provide your password",
            "share verification code",
            "send verification code",
            "provide verification code",
            "enter verification code",
            "tell us the verification code"
        ],
        score: 30,
        reason: "Request for sensitive authentication or financial information detected."
    },


    /* =========================================================
       04. KYC / IDENTITY VERIFICATION
    ========================================================= */

    {
        id: "KYC_VERIFICATION",
        keywords: [
            "kyc",
            "kyc expired",
            "kyc has expired",
            "kyc update",
            "update kyc",
            "verify kyc",
            "verify your kyc",
            "kyc verification",
            "complete kyc",
            "complete your kyc",
            "kyc pending",
            "kyc incomplete",
            "kyc rejected",
            "kyc failed",
            "kyc document",
            "kyc documents",
            "kyc renewal",
            "renew kyc",
            "renew your kyc",
            "kyc update required",
            "kyc verification required",
            "account verification",
            "account verification required",
            "verify your account",
            "verify account",
            "verify identity",
            "identity verification",
            "confirm your identity",
            "confirm identity",
            "update your details",
            "update account details",
            "update personal details",
            "reverify your account",
            "re-verify your account",
            "verification required",
            "verification is required",
            "reactivate account",
            "reactivate your account"
        ],
        score: 15,
        reason: "KYC or account-verification lure detected."
    },


    /* =========================================================
       05. PHISHING / MALICIOUS LINKS
    ========================================================= */

    {
        id: "PHISHING_LINK",
        keywords: [
            "click this link",
            "click the link",
            "click here",
            "click below",
            "click immediately",
            "click now",
            "open this link",
            "open the link",
            "visit this link",
            "visit the link",
            "tap this link",
            "tap here",
            "verify through this link",
            "verify using this link",
            "verify via this link",
            "login through this link",
            "log in through this link",
            "sign in through this link",
            "complete verification using the link",
            "complete verification through the link",
            "follow this link",
            "use this link",
            "link will expire",
            "link expires",
            "verification link",
            "secure verification link",
            "account verification link",
            "claim through this link",
            "download from this link",
            "click to verify",
            "click to activate",
            "click to continue",
            "click to claim",
            "click to receive",
            "click to unlock",
            "click to confirm"
        ],
        score: 15,
        reason: "Phishing-style link or verification instruction detected."
    },


    /* =========================================================
       06. BANKING / FINANCIAL IMPERSONATION
    ========================================================= */

    {
        id: "BANKING_SCAM",
        keywords: [
            "your bank",
            "bank account",
            "banking account",
            "bank verification",
            "bank security",
            "bank security team",
            "bank officer",
            "bank representative",
            "bank manager",
            "bank customer care",
            "bank support team",
            "bank official",
            "banking security alert",
            "security alert from your bank",
            "transaction verification",
            "suspicious transaction",
            "unauthorized transaction",
            "unauthorised transaction",
            "unusual transaction",
            "unknown transaction",
            "account security alert",
            "debit card blocked",
            "credit card blocked",
            "card has been blocked",
            "card will be blocked",
            "net banking",
            "mobile banking",
            "internet banking",
            "banking service",
            "bank account verification"
        ],
        score: 15,
        reason: "Possible banking-service impersonation or financial scam detected."
    },


    /* =========================================================
       07. UPI / DIGITAL PAYMENT
    ========================================================= */

    {
        id: "UPI_SCAM",
        keywords: [
            "upi",
            "upi id",
            "upi pin",
            "scan qr",
            "scan the qr",
            "scan this qr",
            "scan qr code",
            "qr code",
            "collect request",
            "upi collect request",
            "approve collect request",
            "accept collect request",
            "upi payment",
            "upi transfer",
            "upi transaction",
            "payment request",
            "receive money",
            "receive payment",
            "enter your upi pin",
            "enter upi pin",
            "share your upi pin",
            "approve the payment",
            "approve transaction",
            "accept payment request",
            "upi verification",
            "upi verification code"
        ],
        score: 20,
        reason: "Potential UPI or digital-payment scam indicator detected."
    },


    /* =========================================================
       08. PAYMENT / MONEY TRANSFER
    ========================================================= */

    {
        id: "PAYMENT_REQUEST",
        keywords: [
            "send money",
            "send the money",
            "transfer money",
            "transfer funds",
            "make payment",
            "make a payment",
            "pay now",
            "payment required",
            "payment pending",
            "payment failed",
            "pay immediately",
            "send payment",
            "bank transfer",
            "wire transfer",
            "transfer to this account",
            "transfer to this number",
            "send to this account",
            "send to this number",
            "send money to",
            "transfer money to",
            "pay this amount",
            "pay the fine",
            "pay the penalty",
            "pay to avoid",
            "pay to avoid legal action",
            "processing fee",
            "verification fee",
            "security deposit",
            "activation fee",
            "registration fee",
            "advance payment",
            "refund fee",
            "release fee"
        ],
        score: 20,
        reason: "Unexpected payment or money-transfer request detected."
    },


    /* =========================================================
       09. DIGITAL ARREST / CYBER CRIME
    ========================================================= */

    {
        id: "DIGITAL_ARREST",
        keywords: [
            "digital arrest",
            "under digital arrest",
            "you are under digital arrest",
            "cyber crime case",
            "cybercrime case",
            "cyber crime investigation",
            "cybercrime investigation",
            "cyber crime department",
            "cybercrime department",
            "cyber police",
            "cyber police officer",
            "police investigation",
            "criminal investigation",
            "online investigation",
            "court case",
            "court notice",
            "court summons",
            "court order",
            "arrest warrant",
            "warrant issued",
            "warrant has been issued",
            "non bailable warrant",
            "non-bailable warrant",
            "supreme court",
            "high court",
            "income tax department",
            "income tax officer",
            "customs department",
            "customs officer",
            "narcotics department",
            "narcotics officer",
            "enforcement directorate",
            "government investigation",
            "government authority",
            "video call with police",
            "video call with officer",
            "video call with government officer",
            "stay on the video call",
            "do not disconnect the call",
            "do not leave the video call",
            "keep your camera on",
            "keep camera on",
            "verify yourself on video call",
            "your case is under investigation",
            "your phone number is involved",
            "your aadhaar is involved",
            "your aadhaar is linked",
            "your bank account is involved",
            "money laundering case",
            "money laundering investigation",
            "illegal transaction",
            "illegal transactions"
        ],
        score: 30,
        reason: "Possible digital-arrest or official-impersonation scam detected."
    },


    /* =========================================================
       10. GOVERNMENT / OFFICIAL IMPERSONATION
    ========================================================= */

    {
        id: "OFFICIAL_IMPERSONATION",
        keywords: [
            "this is the police",
            "i am a police officer",
            "i am from the police",
            "police department",
            "cyber police officer",
            "government officer",
            "government department",
            "government authority",
            "income tax officer",
            "income tax department",
            "customs officer",
            "customs department",
            "court officer",
            "court department",
            "legal department",
            "investigating officer",
            "investigation officer",
            "official representative",
            "government representative",
            "law enforcement",
            "law enforcement officer",
            "central government",
            "government notice",
            "official notice"
        ],
        score: 20,
        reason: "Possible impersonation of an official or trusted authority detected."
    },


    /* =========================================================
       11. REWARD / LOTTERY / PRIZE
    ========================================================= */

    {
        id: "REWARD_LOTTERY",
        keywords: [
            "you won",
            "you have won",
            "you are a winner",
            "winner",
            "lucky winner",
            "congratulations",
            "congratulations you won",
            "congratulations winner",
            "prize",
            "cash prize",
            "cash reward",
            "reward",
            "free reward",
            "free gift",
            "gift voucher",
            "gift card",
            "cashback",
            "cash back",
            "bonus",
            "special bonus",
            "special reward",
            "exclusive reward",
            "exclusive offer",
            "lottery",
            "lottery winner",
            "lucky draw",
            "lucky draw winner",
            "draw winner",
            "claim your prize",
            "claim prize",
            "claim reward",
            "claim your reward",
            "claim cashback",
            "claim your cashback",
            "you have been selected",
            "selected as a winner",
            "selected for a reward",
            "free money",
            "free cash"
        ],
        score: 15,
        reason: "Prize, reward or financial-lure language detected."
    },


    /* =========================================================
       12. DELIVERY / COURIER / CUSTOMS
    ========================================================= */

    {
        id: "DELIVERY_SCAM",
        keywords: [
            "parcel",
            "package",
            "courier",
            "delivery",
            "delivery failed",
            "delivery attempt failed",
            "package delivery failed",
            "parcel delivery failed",
            "parcel is on hold",
            "parcel has been held",
            "package is on hold",
            "package held",
            "parcel held",
            "customs clearance",
            "customs fee",
            "customs payment",
            "delivery fee",
            "delivery charge",
            "reschedule delivery",
            "confirm delivery address",
            "update delivery address",
            "pay delivery fee",
            "pay customs fee",
            "address verification",
            "delivery verification"
        ],
        score: 15,
        reason: "Potential delivery, courier or customs scam indicator detected."
    },


    /* =========================================================
       13. JOB / EMPLOYMENT SCAMS
    ========================================================= */

    {
        id: "JOB_SCAM",
        keywords: [
            "work from home",
            "work from home job",
            "earn money from home",
            "earn money online",
            "easy money",
            "easy income",
            "part time job",
            "part-time job",
            "online job",
            "job offer",
            "job vacancy",
            "job opportunity",
            "selected for the job",
            "job selection",
            "job registration fee",
            "registration fee for job",
            "pay registration fee",
            "training fee",
            "job processing fee",
            "job security deposit",
            "guaranteed income",
            "guaranteed salary",
            "daily income",
            "earn thousands",
            "earn lakhs",
            "earn money quickly",
            "investment required for job",
            "pay to get the job",
            "pay to start the job",
            "task job",
            "online task",
            "task based job",
            "rating job",
            "review job",
            "product review job"
        ],
        score: 15,
        reason: "Potential employment or work-from-home scam indicator detected."
    },


    /* =========================================================
       14. INVESTMENT / TRADING / CRYPTO
    ========================================================= */

    {
        id: "INVESTMENT_SCAM",
        keywords: [
            "guaranteed returns",
            "guaranteed return",
            "guaranteed profit",
            "guaranteed income",
            "double your money",
            "double your investment",
            "double money",
            "high returns",
            "huge returns",
            "quick returns",
            "quick profit",
            "easy profit",
            "risk free investment",
            "risk-free investment",
            "no risk investment",
            "zero risk investment",
            "limited investment opportunity",
            "investment opportunity",
            "trading opportunity",
            "crypto investment",
            "cryptocurrency investment",
            "bitcoin investment",
            "ethereum investment",
            "forex investment",
            "trading account",
            "investment account",
            "deposit to activate",
            "withdrawal fee",
            "withdrawal tax",
            "tax to withdraw",
            "pay tax to withdraw",
            "profit withdrawal",
            "investment bonus",
            "investment profit",
            "guaranteed monthly income",
            "guaranteed daily income",
            "make passive income"
        ],
        score: 20,
        reason: "Potential investment or financial-fraud language detected."
    },


    /* =========================================================
       15. LOAN / CREDIT CARD SCAMS
    ========================================================= */

    {
        id: "LOAN_SCAM",
        keywords: [
            "instant loan",
            "instant personal loan",
            "pre-approved loan",
            "pre approved loan",
            "loan approved",
            "loan approval",
            "loan offer",
            "easy loan",
            "quick loan",
            "low interest loan",
            "zero interest loan",
            "loan processing fee",
            "loan verification fee",
            "loan release fee",
            "pay loan fee",
            "loan activation fee",
            "credit card approved",
            "credit card offer",
            "credit limit increased",
            "increase your credit limit",
            "instant credit",
            "loan without documents",
            "loan without verification",
            "guaranteed loan",
            "same day loan"
        ],
        score: 15,
        reason: "Potential loan or credit scam indicator detected."
    },


    /* =========================================================
       16. TECH SUPPORT SCAMS
    ========================================================= */

    {
        id: "TECH_SUPPORT_SCAM",
        keywords: [
            "virus detected",
            "virus has been detected",
            "malware detected",
            "malware has been detected",
            "your device is infected",
            "your phone is infected",
            "your computer is infected",
            "security threat detected",
            "critical security alert",
            "critical virus alert",
            "security warning",
            "windows security alert",
            "microsoft support",
            "technical support",
            "tech support",
            "call support immediately",
            "call this number",
            "contact support immediately",
            "remote access",
            "remote desktop",
            "install remote access",
            "allow remote access",
            "give remote access",
            "computer support",
            "device security alert",
            "your device has been compromised",
            "your computer has been compromised",
            "security breach detected"
        ],
        score: 20,
        reason: "Potential technical-support or device-security scam detected."
    },


    /* =========================================================
       17. MALICIOUS APPLICATION / APK
    ========================================================= */

    {
        id: "MALICIOUS_APP",
        keywords: [
            "download this app",
            "install this app",
            "install the application",
            "download the application",
            "download apk",
            "install apk",
            "apk file",
            "apk application",
            "unknown app",
            "unknown application",
            "install from unknown source",
            "allow unknown sources",
            "enable installation",
            "screen sharing app",
            "remote control app",
            "remote access app",
            "screen sharing",
            "give screen access",
            "allow screen access",
            "grant accessibility access",
            "enable accessibility",
            "accessibility permission",
            "device administrator",
            "install this security app",
            "download security application",
            "install security application",
            "download this apk",
            "install this apk",
            "open the apk",
            "enable accessibility service"
        ],
        score: 25,
        reason: "Potential malicious application or unsafe installation request detected."
    },


    /* =========================================================
       18. PERSONAL / IDENTITY INFORMATION
    ========================================================= */

    {
        id: "PERSONAL_INFORMATION",
        keywords: [
            "aadhaar number",
            "aadhaar details",
            "aadhaar card",
            "aadhaar verification",
            "pan number",
            "pan card details",
            "pan card",
            "date of birth",
            "dob",
            "passport number",
            "passport details",
            "driving licence number",
            "driving license number",
            "driving licence details",
            "personal details",
            "personal information",
            "identity proof",
            "id proof",
            "government id",
            "send your id",
            "send your aadhaar",
            "send your pan",
            "share your personal details",
            "share your identity",
            "identity document",
            "identity documents",
            "proof of identity",
            "proof of address",
            "address proof"
        ],
        score: 20,
        reason: "Request for sensitive personal or identity information detected."
    },


    /* =========================================================
       19. REFUND / TAX REFUND
    ========================================================= */

    {
        id: "REFUND_SCAM",
        keywords: [
            "refund pending",
            "refund is pending",
            "refund approved",
            "refund failed",
            "refund verification",
            "claim your refund",
            "receive your refund",
            "refund amount",
            "tax refund",
            "income tax refund",
            "refund processing fee",
            "pay refund fee",
            "refund release fee",
            "refund requires verification",
            "refund verification required",
            "tax refund verification",
            "refund claim",
            "refund claim approved"
        ],
        score: 15,
        reason: "Potential refund or financial-lure scam detected."
    },


    /* =========================================================
       20. SIM / TELECOM SCAMS
    ========================================================= */

    {
        id: "SIM_TELECOM_SCAM",
        keywords: [
            "sim blocked",
            "sim will be blocked",
            "sim card blocked",
            "mobile number blocked",
            "mobile number suspended",
            "mobile service suspended",
            "sim verification",
            "sim kyc",
            "mobile kyc",
            "update sim kyc",
            "reactivate sim",
            "telecom verification",
            "number will be disconnected",
            "number will be deactivated",
            "mobile number will be blocked",
            "sim card verification",
            "telecom kyc",
            "mobile verification"
        ],
        score: 15,
        reason: "Potential SIM, mobile-number or telecom scam indicator detected."
    },


    /* =========================================================
       21. SOCIAL MEDIA ACCOUNT TAKEOVER
    ========================================================= */

    {
        id: "ACCOUNT_TAKEOVER",
        keywords: [
            "social media account",
            "instagram account",
            "facebook account",
            "whatsapp account",
            "telegram account",
            "account recovery",
            "recover your account",
            "account security verification",
            "verify your login",
            "new login detected",
            "suspicious login",
            "unusual login",
            "unauthorized login",
            "unauthorised login",
            "confirm your login",
            "reset your password",
            "password reset",
            "security verification",
            "someone logged into your account",
            "new device login",
            "unknown device login",
            "account takeover"
        ],
        score: 15,
        reason: "Potential account-takeover or credential-theft indicator detected."
    },


    /* =========================================================
       22. ROMANCE / RELATIONSHIP SCAMS
    ========================================================= */

    {
        id: "ROMANCE_SCAM",
        keywords: [
            "online relationship",
            "online romance",
            "romantic relationship",
            "love you",
            "send me money",
            "help me financially",
            "emergency money",
            "need money urgently",
            "hospital expenses",
            "medical emergency",
            "travel money",
            "customs problem",
            "send money for my ticket",
            "send money for visa",
            "send money for passport",
            "gift card",
            "send gift cards",
            "buy gift cards",
            "western union",
            "money transfer",
            "i need your help financially"
        ],
        score: 20,
        reason: "Potential romance or relationship-based financial scam indicator detected."
    },


    /* =========================================================
       23. SEXTORTION / INTIMATE CONTENT EXTORTION
    ========================================================= */

    {
        id: "SEXTORTION",
        keywords: [
            "private photos",
            "private video",
            "intimate photos",
            "intimate video",
            "your photos will be leaked",
            "your video will be leaked",
            "leak your photos",
            "leak your video",
            "share your photos",
            "share your video",
            "send money or i will leak",
            "pay or i will leak",
            "blackmail",
            "blackmailing",
            "pay to delete",
            "pay to remove",
            "delete the video",
            "delete the photos",
            "embarrassing photos",
            "embarrassing video"
        ],
        score: 30,
        reason: "Potential blackmail or sextortion language detected."
    },


    /* =========================================================
       24. EXTORTION / BLACKMAIL
    ========================================================= */

    {
        id: "EXTORTION",
        keywords: [
            "blackmail",
            "blackmailing",
            "pay or else",
            "pay or we will",
            "pay or i will",
            "send money or else",
            "we will expose you",
            "i will expose you",
            "we will report you",
            "i will report you",
            "we will publish",
            "i will publish",
            "we will leak",
            "i will leak",
            "your information will be released",
            "your details will be released",
            "publicly expose",
            "expose your information",
            "expose your identity"
        ],
        score: 30,
        reason: "Threatening or blackmail-based language detected."
    },


    /* =========================================================
       25. CHARITY / DONATION SCAMS
    ========================================================= */

    {
        id: "CHARITY_SCAM",
        keywords: [
            "donate now",
            "urgent donation",
            "emergency donation",
            "help this child",
            "help this family",
            "medical donation",
            "hospital donation",
            "charity donation",
            "fundraising",
            "fund raiser",
            "crowdfunding",
            "donation required",
            "donate immediately",
            "send donation",
            "support this cause",
            "relief fund",
            "disaster relief donation",
            "flood relief",
            "earthquake relief",
            "war relief"
        ],
        score: 10,
        reason: "Potential donation or charity-based financial lure detected."
    },


    /* =========================================================
       26. SHOPPING / E-COMMERCE SCAMS
    ========================================================= */

    {
        id: "SHOPPING_SCAM",
        keywords: [
            "exclusive deal",
            "limited stock",
            "huge discount",
            "massive discount",
            "90% off",
            "99% off",
            "flash sale",
            "clearance sale",
            "special offer",
            "exclusive offer",
            "prepaid order",
            "prepayment required",
            "pay before delivery",
            "advance payment",
            "cheap price",
            "lowest price",
            "free shipping",
            "free product",
            "order cancelled",
            "refund your order",
            "confirm your order",
            "payment required for order"
        ],
        score: 10,
        reason: "Potential shopping or e-commerce scam indicator detected."
    },


    /* =========================================================
       27. TRAVEL / TICKET / VISA SCAMS
    ========================================================= */

    {
        id: "TRAVEL_SCAM",
        keywords: [
            "flight ticket",
            "cheap flight",
            "free flight",
            "flight refund",
            "flight cancellation",
            "ticket refund",
            "train ticket",
            "bus ticket",
            "travel booking",
            "hotel booking",
            "visa approved",
            "visa processing",
            "visa fee",
            "visa verification",
            "passport verification",
            "immigration fee",
            "customs problem",
            "travel emergency",
            "travel insurance",
            "booking confirmation"
        ],
        score: 10,
        reason: "Potential travel, ticket or visa scam indicator detected."
    },


    /* =========================================================
       28. SCHOLARSHIP / EDUCATION SCAMS
    ========================================================= */

    {
        id: "EDUCATION_SCAM",
        keywords: [
            "scholarship approved",
            "scholarship winner",
            "scholarship amount",
            "education grant",
            "student grant",
            "student scholarship",
            "college admission",
            "admission offer",
            "guaranteed admission",
            "seat booking fee",
            "admission fee",
            "registration fee",
            "exam fee",
            "certificate fee",
            "certificate verification",
            "education loan",
            "student loan",
            "government scholarship",
            "scholarship verification"
        ],
        score: 10,
        reason: "Potential education, scholarship or admission scam indicator detected."
    },


    /* =========================================================
       29. INSURANCE SCAMS
    ========================================================= */

    {
        id: "INSURANCE_SCAM",
        keywords: [
            "insurance policy",
            "insurance claim",
            "claim approved",
            "claim amount",
            "insurance refund",
            "insurance bonus",
            "policy expired",
            "policy renewal",
            "renew your policy",
            "insurance verification",
            "insurance officer",
            "insurance department",
            "maturity amount",
            "policy maturity",
            "pay policy fee",
            "claim processing fee"
        ],
        score: 15,
        reason: "Potential insurance or policy-related scam indicator detected."
    },


    /* =========================================================
       30. ELECTRICITY / UTILITY SCAMS
    ========================================================= */

    {
        id: "UTILITY_SCAM",
        keywords: [
            "electricity bill",
            "electricity connection",
            "power connection",
            "power supply",
            "electricity disconnected",
            "electricity will be disconnected",
            "bill pending",
            "bill overdue",
            "pay electricity bill",
            "electricity verification",
            "utility bill",
            "water bill",
            "gas bill",
            "utility connection",
            "connection will be disconnected"
        ],
        score: 15,
        reason: "Potential utility-bill or service-disconnection scam indicator detected."
    },


    /* =========================================================
       31. FASTAG / VEHICLE SCAMS
    ========================================================= */

    {
        id: "VEHICLE_SCAM",
        keywords: [
            "fastag",
            "fastag blocked",
            "fastag expired",
            "fastag kyc",
            "update fastag",
            "vehicle challan",
            "traffic fine",
            "traffic violation",
            "challan pending",
            "challan payment",
            "pay traffic fine",
            "driving licence",
            "vehicle registration",
            "rc verification",
            "rc renewal",
            "insurance renewal"
        ],
        score: 15,
        reason: "Potential vehicle, FASTag or traffic-fine scam indicator detected."
    },


    /* =========================================================
       32. TAX / GST / GOVERNMENT PAYMENT
    ========================================================= */

    {
        id: "TAX_SCAM",
        keywords: [
            "income tax notice",
            "income tax refund",
            "income tax verification",
            "income tax department",
            "tax refund",
            "tax payment",
            "tax penalty",
            "tax notice",
            "gst notice",
            "gst payment",
            "gst verification",
            "gst refund",
            "government tax",
            "tax department",
            "tax officer",
            "tax case",
            "tax violation"
        ],
        score: 15,
        reason: "Potential tax or government-payment scam indicator detected."
    },


    /* =========================================================
       33. MALWARE / VIRUS
    ========================================================= */

    {
        id: "MALWARE",
        keywords: [
            "virus detected",
            "malware detected",
            "trojan detected",
            "spyware detected",
            "ransomware detected",
            "your device is infected",
            "device infected",
            "computer infected",
            "phone infected",
            "remove virus now",
            "download antivirus",
            "install antivirus",
            "security scan required",
            "security threat",
            "critical threat",
            "malware infection",
            "virus infection",
            "security breach"
        ],
        score: 20,
        reason: "Potential malware or fake-security-alert language detected."
    },


    /* =========================================================
       34. REMOTE ACCESS / SCREEN CONTROL
    ========================================================= */

    {
        id: "REMOTE_ACCESS",
        keywords: [
            "remote access",
            "remote control",
            "remote desktop",
            "screen sharing",
            "share your screen",
            "share screen",
            "screen access",
            "give screen access",
            "allow screen access",
            "allow remote access",
            "install remote access",
            "install remote desktop",
            "download remote desktop",
            "remote support",
            "let me access your computer",
            "let me access your phone",
            "give me access to your phone",
            "give me access to your computer"
        ],
        score: 25,
        reason: "Request for remote or screen access detected."
    },


    /* =========================================================
       35. QR CODE SCAMS
    ========================================================= */

    {
        id: "QR_SCAM",
        keywords: [
            "scan qr",
            "scan the qr",
            "scan this qr",
            "scan qr code",
            "scan the code",
            "scan this code",
            "qr payment",
            "qr code payment",
            "scan to receive money",
            "scan to get refund",
            "scan to receive refund",
            "scan to verify",
            "scan to claim",
            "scan to unlock"
        ],
        score: 20,
        reason: "Potential QR-code payment or verification scam detected."
    },


    /* =========================================================
       36. MONEY MULE / RECEIVE AND FORWARD MONEY
    ========================================================= */

    {
        id: "MONEY_MULE",
        keywords: [
            "receive money and send it",
            "receive money then transfer",
            "receive funds and transfer",
            "use your bank account",
            "use your account to receive",
            "receive payment for us",
            "transfer money for us",
            "keep a commission",
            "earn commission for transfer",
            "money transfer job",
            "payment processing job",
            "use your bank account for business",
            "temporary bank account",
            "open bank account for us"
        ],
        score: 25,
        reason: "Potential money-mule or suspicious fund-transfer activity detected."
    },


    /* =========================================================
       37. FAKE SUPPORT / CUSTOMER CARE
    ========================================================= */

    {
        id: "FAKE_SUPPORT",
        keywords: [
            "customer care",
            "customer support",
            "support executive",
            "support agent",
            "help desk",
            "technical support",
            "customer care number",
            "call customer care",
            "contact support",
            "contact our support",
            "support representative",
            "account support",
            "bank support",
            "refund support",
            "verification support"
        ],
        score: 10,
        reason: "Potential customer-support impersonation indicator detected."
    },


    /* =========================================================
       38. FAKE REFUND / PAYMENT REVERSAL
    ========================================================= */

    {
        id: "REFUND_PAYMENT",
        keywords: [
            "refund pending",
            "refund approved",
            "refund failed",
            "refund verification",
            "claim your refund",
            "receive your refund",
            "refund amount",
            "refund processing",
            "refund processing fee",
            "refund release",
            "refund release fee",
            "payment reversal",
            "payment reversed",
            "reversal pending",
            "refund link",
            "refund verification link"
        ],
        score: 15,
        reason: "Potential refund or payment-reversal scam indicator detected."
    },


    /* =========================================================
       39. FAKE INVESTIGATION / LEGAL NOTICE
    ========================================================= */

    {
        id: "FAKE_LEGAL_NOTICE",
        keywords: [
            "legal notice",
            "legal notice issued",
            "court notice",
            "court summons",
            "summons issued",
            "police notice",
            "police complaint",
            "criminal complaint",
            "criminal case",
            "investigation notice",
            "investigation order",
            "arrest notice",
            "warrant notice",
            "legal department",
            "law enforcement notice",
            "case number",
            "fir registered",
            "fir filed",
            "first information report",
            "criminal investigation"
        ],
        score: 25,
        reason: "Potential fake legal, police or investigation notice detected."
    },


    /* =========================================================
       40. ACCOUNT RECOVERY / PASSWORD RESET
    ========================================================= */

    {
        id: "ACCOUNT_RECOVERY",
        keywords: [
            "account recovery",
            "recover your account",
            "recover account",
            "reset password",
            "password reset",
            "reset your password",
            "verify your login",
            "confirm your login",
            "confirm identity to recover",
            "account recovery link",
            "security verification",
            "security check",
            "new login detected",
            "new device login",
            "unknown device login",
            "suspicious login",
            "unusual login",
            "unauthorized login",
            "unauthorised login"
        ],
        score: 15,
        reason: "Potential account-takeover or credential-theft indicator detected."
    },


    /* =========================================================
       41. SOCIAL ENGINEERING
    ========================================================= */

    {
        id: "SOCIAL_ENGINEERING",
        keywords: [
            "keep this confidential",
            "do not tell anyone",
            "don't tell anyone",
            "do not inform your family",
            "don't inform your family",
            "do not contact the bank",
            "don't contact the bank",
            "do not contact police",
            "don't contact police",
            "do not discuss this",
            "keep this secret",
            "this is confidential",
            "secret transaction",
            "secret payment",
            "only you can help",
            "trust me",
            "you must trust me"
        ],
        score: 15,
        reason: "Social-engineering or secrecy-based manipulation detected."
    },


    /* =========================================================
       42. ROMANCE / RELATIONSHIP FINANCIAL SCAMS
    ========================================================= */

    {
        id: "ROMANCE_SCAM",
        keywords: [
            "online relationship",
            "online romance",
            "romantic relationship",
            "help me financially",
            "need money urgently",
            "emergency money",
            "hospital expenses",
            "medical emergency",
            "travel money",
            "customs problem",
            "send money for my ticket",
            "send money for visa",
            "send money for passport",
            "buy gift cards",
            "send gift cards",
            "gift card",
            "money transfer",
            "western union",
            "i need your help financially"
        ],
        score: 20,
        reason: "Potential relationship-based financial scam indicator detected."
    },


    /* =========================================================
       43. SEXTORTION / INTIMATE BLACKMAIL
    ========================================================= */

    {
        id: "SEXTORTION",
        keywords: [
            "private photos",
            "private video",
            "intimate photos",
            "intimate video",
            "your photos will be leaked",
            "your video will be leaked",
            "leak your photos",
            "leak your video",
            "share your photos",
            "share your video",
            "send money or i will leak",
            "pay or i will leak",
            "blackmail",
            "blackmailing",
            "pay to delete",
            "pay to remove",
            "delete the video",
            "delete the photos",
            "embarrassing photos",
            "embarrassing video"
        ],
        score: 30,
        reason: "Potential sextortion or intimate-content blackmail detected."
    },


    /* =========================================================
       44. GENERAL EXTORTION
    ========================================================= */

    {
        id: "EXTORTION",
        keywords: [
            "pay or else",
            "pay or i will",
            "pay or we will",
            "send money or else",
            "we will expose you",
            "i will expose you",
            "we will report you",
            "i will report you",
            "we will publish",
            "i will publish",
            "we will leak",
            "i will leak",
            "your information will be released",
            "your details will be released",
            "publicly expose",
            "expose your information",
            "expose your identity"
        ],
        score: 30,
        reason: "Threatening or extortion-based language detected."
    },


    /* =========================================================
       45. CHARITY / DONATION SCAMS
    ========================================================= */

    {
        id: "CHARITY_SCAM",
        keywords: [
            "donate now",
            "urgent donation",
            "emergency donation",
            "help this child",
            "help this family",
            "medical donation",
            "hospital donation",
            "charity donation",
            "fundraising",
            "fund raiser",
            "crowdfunding",
            "donation required",
            "donate immediately",
            "send donation",
            "support this cause",
            "relief fund",
            "disaster relief donation",
            "flood relief",
            "earthquake relief"
        ],
        score: 10,
        reason: "Potential donation or charity-based financial lure detected."
    },


    /* =========================================================
       46. SHOPPING / E-COMMERCE
    ========================================================= */

    {
        id: "SHOPPING_SCAM",
        keywords: [
            "exclusive deal",
            "limited stock",
            "huge discount",
            "massive discount",
            "90% off",
            "99% off",
            "flash sale",
            "clearance sale",
            "special offer",
            "exclusive offer",
            "prepaid order",
            "prepayment required",
            "pay before delivery",
            "advance payment",
            "cheap price",
            "lowest price",
            "free product",
            "order cancelled",
            "refund your order",
            "confirm your order",
            "payment required for order"
        ],
        score: 10,
        reason: "Potential shopping or e-commerce scam indicator detected."
    },


    /* =========================================================
       47. TRAVEL / TICKET / VISA
    ========================================================= */

    {
        id: "TRAVEL_SCAM",
        keywords: [
            "flight ticket",
            "cheap flight",
            "free flight",
            "flight refund",
            "flight cancellation",
            "ticket refund",
            "train ticket",
            "bus ticket",
            "travel booking",
            "hotel booking",
            "visa approved",
            "visa processing",
            "visa fee",
            "visa verification",
            "passport verification",
            "immigration fee",
            "customs problem",
            "travel emergency",
            "travel insurance"
        ],
        score: 10,
        reason: "Potential travel, ticket or visa scam indicator detected."
    },


    /* =========================================================
       48. SCHOLARSHIP / EDUCATION
    ========================================================= */

    {
        id: "EDUCATION_SCAM",
        keywords: [
            "scholarship approved",
            "scholarship winner",
            "scholarship amount",
            "education grant",
            "student grant",
            "student scholarship",
            "college admission",
            "admission offer",
            "guaranteed admission",
            "seat booking fee",
            "admission fee",
            "registration fee",
            "exam fee",
            "certificate fee",
            "certificate verification",
            "education loan",
            "student loan",
            "government scholarship",
            "scholarship verification"
        ],
        score: 10,
        reason: "Potential education, scholarship or admission scam indicator detected."
    },


    /* =========================================================
       49. INSURANCE
    ========================================================= */

    {
        id: "INSURANCE_SCAM",
        keywords: [
            "insurance policy",
            "insurance claim",
            "claim approved",
            "claim amount",
            "insurance refund",
            "insurance bonus",
            "policy expired",
            "policy renewal",
            "renew your policy",
            "insurance verification",
            "insurance officer",
            "insurance department",
            "maturity amount",
            "policy maturity",
            "pay policy fee",
            "claim processing fee"
        ],
        score: 15,
        reason: "Potential insurance or policy-related scam indicator detected."
    },


    /* =========================================================
       50. ELECTRICITY / UTILITY
    ========================================================= */

    {
        id: "UTILITY_SCAM",
        keywords: [
            "electricity bill",
            "electricity connection",
            "power connection",
            "power supply",
            "electricity disconnected",
            "electricity will be disconnected",
            "bill pending",
            "bill overdue",
            "pay electricity bill",
            "electricity verification",
            "utility bill",
            "water bill",
            "gas bill",
            "utility connection",
            "connection will be disconnected"
        ],
        score: 15,
        reason: "Potential utility-bill or service-disconnection scam indicator detected."
    },


    /* =========================================================
       51. FASTAG / VEHICLE
    ========================================================= */

    {
        id: "VEHICLE_SCAM",
        keywords: [
            "fastag",
            "fastag blocked",
            "fastag expired",
            "fastag kyc",
            "update fastag",
            "vehicle challan",
            "traffic fine",
            "traffic violation",
            "challan pending",
            "challan payment",
            "pay traffic fine",
            "driving licence",
            "driving license",
            "vehicle registration",
            "rc verification",
            "rc renewal",
            "insurance renewal"
        ],
        score: 15,
        reason: "Potential vehicle, FASTag or traffic-fine scam indicator detected."
    },


    /* =========================================================
       52. TAX / GST
    ========================================================= */

    {
        id: "TAX_SCAM",
        keywords: [
            "income tax notice",
            "income tax refund",
            "income tax verification",
            "income tax department",
            "tax refund",
            "tax payment",
            "tax penalty",
            "tax notice",
            "gst notice",
            "gst payment",
            "gst verification",
            "gst refund",
            "government tax",
            "tax department",
            "tax officer",
            "tax case",
            "tax violation"
        ],
        score: 15,
        reason: "Potential tax or government-payment scam indicator detected."
    },


    /* =========================================================
       53. MALWARE / FAKE SECURITY ALERT
    ========================================================= */

    {
        id: "MALWARE_ALERT",
        keywords: [
            "virus detected",
            "malware detected",
            "trojan detected",
            "spyware detected",
            "ransomware detected",
            "your device is infected",
            "device infected",
            "computer infected",
            "phone infected",
            "remove virus now",
            "download antivirus",
            "install antivirus",
            "security scan required",
            "security threat",
            "critical threat",
            "malware infection",
            "virus infection",
            "security breach",
            "security breach detected"
        ],
        score: 20,
        reason: "Potential malware or fake-security-alert language detected."
    },


    /* =========================================================
       54. REMOTE ACCESS / SCREEN CONTROL
    ========================================================= */

    {
        id: "REMOTE_ACCESS",
        keywords: [
            "remote access",
            "remote control",
            "remote desktop",
            "screen sharing",
            "share your screen",
            "share screen",
            "screen access",
            "give screen access",
            "allow screen access",
            "allow remote access",
            "install remote access",
            "install remote desktop",
            "download remote desktop",
            "remote support",
            "let me access your computer",
            "let me access your phone",
            "give me access to your phone",
            "give me access to your computer"
        ],
        score: 25,
        reason: "Request for remote or screen access detected."
    },


    /* =========================================================
       55. QR CODE
    ========================================================= */

    {
        id: "QR_SCAM",
        keywords: [
            "scan qr",
            "scan the qr",
            "scan this qr",
            "scan qr code",
            "scan the code",
            "scan this code",
            "qr payment",
            "qr code payment",
            "scan to receive money",
            "scan to get refund",
            "scan to receive refund",
            "scan to verify",
            "scan to claim",
            "scan to unlock"
        ],
        score: 20,
        reason: "Potential QR-code payment or verification scam detected."
    },


    /* =========================================================
       56. MONEY MULE
    ========================================================= */

    {
        id: "MONEY_MULE",
        keywords: [
            "receive money and send it",
            "receive money then transfer",
            "receive funds and transfer",
            "use your bank account",
            "use your account to receive",
            "receive payment for us",
            "transfer money for us",
            "keep a commission",
            "earn commission for transfer",
            "money transfer job",
            "payment processing job",
            "use your bank account for business",
            "temporary bank account",
            "open bank account for us"
        ],
        score: 25,
        reason: "Potential money-mule or suspicious fund-transfer activity detected."
    },


    /* =========================================================
       57. FAKE CUSTOMER SUPPORT
    ========================================================= */

    {
        id: "FAKE_SUPPORT",
        keywords: [
            "customer care",
            "customer support",
            "support executive",
            "support agent",
            "help desk",
            "customer care number",
            "call customer care",
            "contact support",
            "contact our support",
            "support representative",
            "account support",
            "bank support",
            "refund support",
            "verification support"
        ],
        score: 10,
        reason: "Potential customer-support impersonation indicator detected."
    },


    /* =========================================================
       58. FAKE REFUND / PAYMENT REVERSAL
    ========================================================= */

    {
        id: "PAYMENT_REVERSAL",
        keywords: [
            "payment reversal",
            "payment reversed",
            "reversal pending",
            "refund link",
            "refund verification link",
            "refund processing",
            "refund release",
            "refund release fee",
            "payment reversal verification",
            "claim payment reversal"
        ],
        score: 15,
        reason: "Potential refund or payment-reversal scam indicator detected."
    },


    /* =========================================================
       59. FAKE LEGAL NOTICE
    ========================================================= */

    {
        id: "LEGAL_SCAM",
        keywords: [
            "legal notice",
            "legal notice issued",
            "court notice",
            "court summons",
            "summons issued",
            "police notice",
            "police complaint",
            "criminal complaint",
            "criminal case",
            "investigation notice",
            "investigation order",
            "arrest notice",
            "warrant notice",
            "legal department",
            "law enforcement notice",
            "case number",
            "fir registered",
            "fir filed",
            "first information report",
            "criminal investigation"
        ],
        score: 25,
        reason: "Potential fake legal, police or investigation notice detected."
    },


    /* =========================================================
       60. SOCIAL ENGINEERING / SECRECY
    ========================================================= */

    {
        id: "SOCIAL_ENGINEERING",
        keywords: [
            "keep this confidential",
            "do not tell anyone",
            "don't tell anyone",
            "do not inform your family",
            "don't inform your family",
            "do not contact the bank",
            "don't contact the bank",
            "do not contact police",
            "don't contact police",
            "do not discuss this",
            "keep this secret",
            "this is confidential",
            "secret transaction",
            "secret payment",
            "only you can help",
            "you must trust me",
            "trust me"
        ],
        score: 15,
        reason: "Social-engineering or secrecy-based manipulation detected."
    },


    /* =========================================================
       61. SIM / MOBILE / TELECOM
    ========================================================= */

    {
        id: "SIM_SCAM",
        keywords: [
            "sim blocked",
            "sim will be blocked",
            "sim card blocked",
            "mobile number blocked",
            "mobile number suspended",
            "mobile service suspended",
            "sim verification",
            "sim kyc",
            "mobile kyc",
            "update sim kyc",
            "reactivate sim",
            "telecom verification",
            "number will be disconnected",
            "number will be deactivated",
            "mobile number will be blocked",
            "sim card verification",
            "telecom kyc",
            "mobile verification"
        ],
        score: 15,
        reason: "Potential SIM, mobile-number or telecom scam indicator detected."
    },


    /* =========================================================
       62. SOCIAL MEDIA / ACCOUNT TAKEOVER
    ========================================================= */

    {
        id: "SOCIAL_ACCOUNT",
        keywords: [
            "instagram account",
            "facebook account",
            "whatsapp account",
            "telegram account",
            "social media account",
            "account recovery",
            "recover your account",
            "account security verification",
            "verify your login",
            "new login detected",
            "suspicious login",
            "unusual login",
            "unauthorized login",
            "unauthorised login",
            "confirm your login",
            "reset your password",
            "password reset",
            "new device login",
            "unknown device login",
            "someone logged into your account",
            "account takeover"
        ],
        score: 15,
        reason: "Potential social-media account takeover or credential-theft indicator detected."
    },


    /* =========================================================
       63. FAKE JOB TASK / LIKE / REVIEW SCAMS
    ========================================================= */

    {
        id: "TASK_SCAM",
        keywords: [
            "complete tasks",
            "task commission",
            "task earnings",
            "like and earn",
            "review and earn",
            "rating and earn",
            "complete orders and earn",
            "recharge to continue",
            "deposit to continue",
            "deposit to unlock",
            "pay to unlock tasks",
            "pay to withdraw",
            "withdrawal requires payment",
            "commission withdrawal",
            "task withdrawal",
            "merchant task",
            "online task commission"
        ],
        score: 20,
        reason: "Potential task, commission or fake-earning scam detected."
    },


    /* =========================================================
       64. CRYPTO / WALLET
    ========================================================= */

    {
        id: "CRYPTO_SCAM",
        keywords: [
            "crypto wallet",
            "cryptocurrency wallet",
            "wallet verification",
            "wallet recovery",
            "wallet security",
            "connect your wallet",
            "verify your wallet",
            "wallet address",
            "seed phrase",
            "recovery phrase",
            "private key",
            "crypto transfer",
            "crypto payment",
            "bitcoin payment",
            "ethereum payment",
            "send crypto",
            "send bitcoin",
            "send ethereum",
            "unlock wallet",
            "wallet activation fee"
        ],
        score: 25,
        reason: "Potential cryptocurrency or digital-wallet scam indicator detected."
    },


    /* =========================================================
       65. FAKE AIRDROP / FREE CRYPTO
    ========================================================= */

    {
        id: "CRYPTO_REWARD",
        keywords: [
            "free crypto",
            "free bitcoin",
            "free ethereum",
            "crypto giveaway",
            "bitcoin giveaway",
            "crypto airdrop",
            "free airdrop",
            "claim airdrop",
            "claim free crypto",
            "double your crypto",
            "send crypto to receive",
            "send bitcoin to receive",
            "crypto reward"
        ],
        score: 25,
        reason: "Potential cryptocurrency giveaway or airdrop scam detected."
    },


    /* =========================================================
       66. ADVANCE FEE / PRINCE / INHERITANCE STYLE SCAMS
    ========================================================= */

    {
        id: "ADVANCE_FEE",
        keywords: [
            "processing fee",
            "release fee",
            "transfer fee",
            "clearance fee",
            "customs fee",
            "legal fee",
            "administrative fee",
            "inheritance",
            "inheritance money",
            "inheritance fund",
            "beneficiary",
            "beneficiary payment",
            "claim inheritance",
            "million dollars",
            "large sum of money",
            "fund transfer",
            "beneficiary transfer",
            "advance fee",
            "pay fee to receive",
            "pay fee to release",
            "pay fee to claim"
        ],
        score: 20,
        reason: "Potential advance-fee or inheritance scam indicator detected."
    },


    /* =========================================================
       67. FAKE INVESTIGATION / MONEY LAUNDERING
    ========================================================= */

    {
        id: "MONEY_LAUNDERING",
        keywords: [
            "money laundering",
            "money laundering case",
            "money laundering investigation",
            "illegal transaction",
            "illegal transactions",
            "suspicious funds",
            "suspicious money",
            "black money",
            "financial crime",
            "financial investigation",
            "bank account linked to crime",
            "account linked to money laundering",
            "funds linked to crime",
            "criminal funds"
        ],
        score: 25,
        reason: "Potential financial-investigation or money-laundering impersonation scam detected."
    },


    /* =========================================================
       68. FAKE POLICE / ARREST
    ========================================================= */

    {
        id: "POLICE_ARREST",
        keywords: [
            "you are under arrest",
            "arrest order",
            "arrest notice",
            "arrest warrant",
            "warrant issued",
            "police warrant",
            "police case",
            "police complaint",
            "police investigation",
            "police verification",
            "police department",
            "cyber police",
            "cyber crime police",
            "criminal complaint",
            "criminal case against you"
        ],
        score: 25,
        reason: "Possible police or arrest impersonation scam detected."
    },


    /* =========================================================
       69. FAKE CUSTOMS / PARCEL PENALTY
    ========================================================= */

    {
        id: "CUSTOMS_SCAM",
        keywords: [
            "customs fee",
            "customs payment",
            "customs penalty",
            "customs clearance fee",
            "parcel held by customs",
            "package held by customs",
            "customs department",
            "customs officer",
            "pay customs",
            "customs fine",
            "customs case",
            "illegal parcel",
            "illegal package"
        ],
        score: 20,
        reason: "Potential customs or parcel-related scam indicator detected."
    },


    /* =========================================================
       70. FAKE MEDICAL EMERGENCY
    ========================================================= */

    {
        id: "MEDICAL_SCAM",
        keywords: [
            "medical emergency",
            "medical treatment",
            "hospital emergency",
            "hospital bill",
            "operation cost",
            "surgery cost",
            "treatment cost",
            "medicine cost",
            "urgent medical help",
            "emergency treatment",
            "send money for treatment",
            "donate for treatment",
            "medical donation"
        ],
        score: 10,
        reason: "Potential emergency or medical financial-lure indicator detected."
    },


    /* =========================================================
       71. FAKE SECURITY VERIFICATION
    ========================================================= */

    {
        id: "SECURITY_VERIFICATION",
        keywords: [
            "security verification",
            "security check required",
            "verify security",
            "security confirmation",
            "confirm security",
            "verify device",
            "verify this device",
            "device verification",
            "new device verification",
            "login verification",
            "verification required",
            "security verification required"
        ],
        score: 10,
        reason: "Unexpected security-verification request detected."
    },


    /* =========================================================
       72. FAKE SUBSCRIPTION / MEMBERSHIP
    ========================================================= */

    {
        id: "SUBSCRIPTION_SCAM",
        keywords: [
            "subscription expired",
            "subscription will expire",
            "membership expired",
            "membership will expire",
            "renew subscription",
            "renew membership",
            "subscription payment",
            "membership payment",
            "subscription verification",
            "membership verification",
            "subscription will be cancelled",
            "membership will be cancelled"
        ],
        score: 10,
        reason: "Potential subscription or membership scam indicator detected."
    },


    /* =========================================================
       73. FAKE CLOUD / STORAGE ALERT
    ========================================================= */

    {
        id: "CLOUD_STORAGE_SCAM",
        keywords: [
            "storage is full",
            "cloud storage full",
            "cloud storage expired",
            "storage subscription expired",
            "renew cloud storage",
            "your storage will be deleted",
            "files will be deleted",
            "photos will be deleted",
            "backup will be deleted",
            "account storage limit"
        ],
        score: 10,
        reason: "Potential fake cloud-storage or account-renewal lure detected."
    },


    /* =========================================================
       74. FAKE GIVEAWAY / CELEBRITY / EVENT
    ========================================================= */

    {
        id: "GIVEAWAY_SCAM",
        keywords: [
            "free giveaway",
            "giveaway winner",
            "you won the giveaway",
            "celebrity giveaway",
            "free iphone",
            "free phone",
            "free laptop",
            "free smartphone",
            "free prize",
            "claim giveaway",
            "winner announcement",
            "selected winner"
        ],
        score: 15,
        reason: "Potential giveaway or prize scam indicator detected."
    },


    /* =========================================================
       75. FAKE VERIFICATION / ID DOCUMENT REQUEST
    ========================================================= */

    {
        id: "DOCUMENT_SCAM",
        keywords: [
            "send your documents",
            "upload your documents",
            "upload identity proof",
            "upload id proof",
            "upload aadhaar",
            "upload pan card",
            "upload passport",
            "upload driving licence",
            "send identity documents",
            "document verification",
            "document verification fee"
        ],
        score: 20,
        reason: "Request for potentially sensitive identity documents detected."
    }

];