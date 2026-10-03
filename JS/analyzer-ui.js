const messagePanel =
    document.getElementById("messagePanel");

const urlPanel =
    document.getElementById("urlPanel");

const imagePanel =
    document.getElementById("imagePanel");

const tabs =
    document.querySelectorAll(".tab");

const messageInput =
    document.getElementById("messageInput");

const urlInput =
    document.getElementById("urlInput");

const analyzeButton =
    document.getElementById("analyzeButton");

const loading =
    document.getElementById("loading");

const resultSection =
    document.getElementById("resultSection");

const riskScore =
    document.getElementById("riskScore");

const riskLevel =
    document.getElementById("riskLevel");

const riskSummary =
    document.getElementById("riskSummary");

const riskReasons =
    document.getElementById("riskReasons");

const recommendations =
    document.getElementById("recommendations");

const charCount =
    document.getElementById("charCount");

const imageInput =
    document.getElementById("imageInput");

const imagePreview =
    document.getElementById("imagePreview");

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

        currentType =
            tab.dataset.type;

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

messageInput.addEventListener(
    "input",
    () => {

        charCount.textContent =
            `${messageInput.value.length} characters`;

    }
);


/* ================= IMAGE PREVIEW ================= */

imageInput.addEventListener(
    "change",
    () => {

        const file =
            imageInput.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onload = function(event) {

            imagePreview.innerHTML = `
                <img
                    src="${event.target.result}"
                    alt="Uploaded screenshot"
                >
            `;

        };

        reader.readAsDataURL(file);

    }
);


/* ================= ANALYZE ================= */

analyzeButton.addEventListener(
    "click",
    async () => {

        let input = "";

        detectedContentBox.style.display = "none";

        if (currentType === "message") {

            input =
                messageInput.value.trim();

        }

        if (currentType === "url") {

            input =
                urlInput.value.trim();

        }


        /* Screenshot currently only previews */

        if (currentType === "image") {

            const file = imageInput.files[0];

            if (!file) {
                alert("Please upload a screenshot first.");
                return;
            }

            loading.style.display = "block";
            resultSection.style.display = "none";

            try {

                const result = await Tesseract.recognize(
                    file,
                    "eng",
                    {
                        logger: info => {

                            if (info.status === "recognizing text") {

                                const percent =
                                    Math.round(info.progress * 100);

                                document.querySelector(
                                    ".loading p"
                                ).textContent =
                                    `Reading screenshot... ${percent}%`;

                            }

                        }
                    }
                );


                const extractedText =
                    result.data.text.trim();

                if (!extractedText) {

                    loading.style.display = "none";

                    alert(
                        "No readable text was found in this image."
                    );

                    return;
                }


                /* OCR CONFIDENCE */

                const confidence =
                    Math.round(result.data.confidence || 0);

                ocrConfidence.textContent =
                    confidence + "%";


                /* SHOW DETECTED MESSAGE */

                detectedText.textContent =
                    extractedText;

                detectedContentBox.style.display =
                    "block";


                document.querySelector(
                    ".loading p"
                ).textContent =
                    "Analyzing extracted text...";

                await new Promise(
                    resolve => setTimeout(resolve, 500)
                );

                
                const analysis =
                    analyzeInput(
                        extractedText,
                        "message"
                    );

                loading.style.display = "none";

                displayResult(analysis);

            } catch (error) {

                console.error(error);

                loading.style.display = "none";

                alert(
                    "Could not read the screenshot. Please try a clearer image."
                );
            }

            return;
        }


        if (!input) {

            alert(
                "Please enter a message or URL first."
            );

            return;

        }


        /* Show loading */

        loading.style.display = "block";

        resultSection.style.display = "none";


        await new Promise(
            resolve =>
                setTimeout(resolve, 700)
        );


        /* REAL ANALYSIS */

        const result =
            analyzeInput(
                input,
                currentType
            );


        /* Hide loading */

        loading.style.display = "none";


        /* Show result */

        displayResult(result);

    }
);


/* ================= DISPLAY RESULT ================= */

function displayResult(result) {

    resultSection.style.display = "block";


    riskScore.textContent =
        result.score;


    riskLevel.textContent =
        result.level;


    /* Level color */

    if (result.level === "HIGH") {

        riskLevel.style.color = "#ef4444";

        riskSummary.textContent =
            "High-risk indicators were detected. Avoid interacting with this content.";

    }

    else if (result.level === "MEDIUM") {

        riskLevel.style.color = "#f59e0b";

        riskSummary.textContent =
            "Some suspicious indicators were detected. Verify before taking action.";

    }

    else {

        riskLevel.style.color = "#16a34a";

        riskSummary.textContent =
            "No major suspicious indicators were detected.";

    }


    /* Reasons */

    riskReasons.innerHTML = "";

    result.reasons.forEach(reason => {

        const li =
            document.createElement("li");

        li.textContent = reason;

        riskReasons.appendChild(li);

    });


    /* Recommendations */

    recommendations.innerHTML = "";

    result.recommendations.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        recommendations.appendChild(li);

    });


    /* Scroll to result */

    resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}