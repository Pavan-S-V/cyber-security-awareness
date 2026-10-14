const messagePanel = document.getElementById("messagePanel");
const urlPanel = document.getElementById("urlPanel");
const imagePanel = document.getElementById("imagePanel");

const tabs = document.querySelectorAll(".tab");

const messageInput = document.getElementById("messageInput");
const urlInput = document.getElementById("urlInput");

const analyzeButton = document.getElementById("analyzeButton");
const loading = document.getElementById("loading");

const resultSection = document.getElementById("resultSection");

const riskScore = document.getElementById("riskScore");
const riskLevel = document.getElementById("riskLevel");
const riskSummary = document.getElementById("riskSummary");

const riskReasons = document.getElementById("riskReasons");
const recommendations = document.getElementById("recommendations");

const charCount = document.getElementById("charCount");

const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");

const detectedContentBox =
    document.getElementById("detectedContentBox");

const detectedText =
    document.getElementById("detectedText");

const ocrConfidence =
    document.getElementById("ocrConfidence");

    
let currentType = "message";


/* ================= TABS ================= */

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(t =>
            t.classList.remove("active")
        );

        tab.classList.add("active");

        currentType = tab.dataset.type;

        messagePanel.classList.remove("active");
        urlPanel.classList.remove("active");
        imagePanel.classList.remove("active");

        if (currentType === "message") {
            messagePanel.classList.add("active");
        }

        if (currentType === "url") {
            urlPanel.classList.add("active");
        }

        if (currentType === "image") {
            imagePanel.classList.add("active");
        }

    });

});


/* ================= CHARACTER COUNT ================= */

messageInput.addEventListener("input", () => {

    charCount.textContent =
        `${messageInput.value.length} characters`;

});


/* ================= IMAGE PREVIEW ================= */

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event) {

        imagePreview.innerHTML = `
            <img
                src="${event.target.result}"
                alt="Uploaded screenshot"
            >
        `;

    };

    reader.readAsDataURL(file);

});


/* ================= ANALYZE ================= */

analyzeButton.addEventListener("click", async () => {

    let input = "";

    detectedContentBox.style.display = "none";

    /* ================= MESSAGE ================= */

    if (currentType === "message") {

        input = messageInput.value.trim();

    }


    /* ================= URL ================= */

    if (currentType === "url") {

        input = urlInput.value.trim();

    }


    /* ================= SCREENSHOT / AI ================= */

    if (currentType === "image") {

        const file = imageInput.files[0];

        if (!file) {

            alert("Please upload a screenshot first.");

            return;

        }

        loading.style.display = "block";
        resultSection.style.display = "none";

        document.querySelector(".loading p").textContent =
            "AI is reading the screenshot...";

        try {

            /* Create FormData */

            const formData = new FormData();

            formData.append("image", file);


            /* Send image to Node.js backend */

            const response = await fetch(
                "/api/analyze-image",
                {
                    method: "POST",
                    body: formData
                }
            );


            /* Check server response */

            if (!response.ok) {

                throw new Error(
                    "AI image analysis failed."
                );

            }


            /* Get AI result */

            const aiResult =
                await response.json();


            /* Actual extracted text */

            const extractedText =
                aiResult.extractedText || "";


            /* AI extraction confidence */

            const confidence = Math.round(
                (Number(aiResult.confidence) || 0) * 100
            );


            /* ================= SHOW SCREENSHOT RESULT ================= */

            detectedText.textContent =
                extractedText ||
                "No readable text detected.";


            detectedContentBox.style.display =
                "block";


            ocrConfidence.textContent =
                `${confidence}%`;


            /* ================= ANALYZE EXTRACTED TEXT ================= */

            if (!extractedText.trim()) {

                loading.style.display = "none";

                displayResult({

                    score: 0,

                    level: "LOW",

                    reasons: [
                        "No readable text was detected in the uploaded image."
                    ],

                    recommendations: [
                        "Upload a clearer screenshot with readable text."
                    ]

                });

                return;

            }


            document.querySelector(".loading p").textContent =
                "Analyzing extracted text...";


            /* Small professional loading delay */

            await new Promise(resolve =>
                setTimeout(resolve, 4500)
            )


            /* Send AI-extracted text to existing risk engine */

            const result =
                analyzeInput(
                    extractedText,
                    "message"
                );


            /* Hide loading */

            loading.style.display = "none";


            /* Display risk result */

            displayResult(result);

        }

        catch (error) {

            console.error(
                "Screenshot analysis error:",
                error
            );

            loading.style.display = "none";

            alert(
                "Could not analyze the screenshot. Please make sure the server is running and try again."
            );

        }

        return;

    }



    /* ================= MESSAGE URL VALIDATION ================= */

    if (currentType === "message") {

        const onlyURL =
            /^(https?:\/\/|www\.)[^\s]+$/i.test(input);

        if (onlyURL) {

            resultSection.style.display = "none";

            alert(
                "This looks like a URL. Please use the URL tab to analyze it."
            );

            return;
        }
    }


    /* ================= URL VALIDATION ================= */

    if (currentType === "url") {

        let validURL = false;

        try {

            const parsedURL = new URL(input);

            validURL =
                (parsedURL.protocol === "http:" ||
                parsedURL.protocol === "https:") &&
                parsedURL.hostname.includes(".");

        } catch (error) {

            validURL = false;

        }


        if (!validURL) {

            alert(
                "Please enter a URL or Link, that starts with http:// or https:// and contains a valid domain."
            );

            return;

        }

    }


    /* ================= NORMAL ANALYSIS ================= */

    loading.style.display = "block";

    resultSection.style.display = "none";

    const loadingText =
        document.querySelector(".loading p");

    const analysisSteps = [
        "Reading the submitted content...",
        "Checking suspicious patterns...",
        "Analyzing security indicators...",
        "Calculating risk score...",
        "Preparing security recommendations..."
    ];

    let stepIndex = 0;

    loadingText.textContent =
        analysisSteps[stepIndex];

    const stepTimer = setInterval(() => {

        stepIndex++;

        if (stepIndex < analysisSteps.length) {

            loadingText.textContent =
                analysisSteps[stepIndex];

        }

    }, 850);


    /* Keep the analysis screen visible for about 4.5 seconds */

    await new Promise(resolve =>
        setTimeout(resolve, 4500)
    );

    clearInterval(stepTimer);


    /* Existing risk engine */

    const result =
        analyzeInput(
            input,
            currentType
        );


    /* Hide loading */

    loading.style.display = "none";


    /* Show result */

    displayResult(result);

});


/* ================= DISPLAY RESULT ================= */

function displayResult(result) {

    resultSection.style.display = "block";


    /* Score */

    riskScore.textContent =
        result.score;


    /* Level */

    riskLevel.textContent =
        result.level;


    /* ================= LEVEL ================= */

    if (result.level === "HIGH") {

        riskLevel.style.color =
            "#ef4444";

        riskSummary.textContent =
            "High-risk indicators were detected. Avoid interacting with this content.";

    }

    else if (result.level === "MEDIUM") {

        riskLevel.style.color =
            "#f59e0b";

        riskSummary.textContent =
            "Some suspicious indicators were detected. Verify before taking action.";

    }

    else {

        riskLevel.style.color =
            "#16a34a";

        riskSummary.textContent =
            "No major suspicious indicators were detected.";

    }


    /* ================= REASONS ================= */

    riskReasons.innerHTML = "";

    result.reasons.forEach(reason => {

        const li =
            document.createElement("li");

        li.textContent =
            reason;

        riskReasons.appendChild(li);

    });


    /* ================= RECOMMENDATIONS ================= */

    recommendations.innerHTML = "";

    result.recommendations.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent =
            item;

        recommendations.appendChild(li);

    });


    /* ================= SCROLL ================= */

    resultSection.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}