
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("/login.html");
});

// Serve the existing CyberSafe frontend.
app.use(express.static(__dirname));

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, callback) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif"
        ];

        if (!allowedTypes.includes(file.mimetype)) {
            return callback(
                new Error(
                    "Unsupported image type. Please upload a JPG, PNG, WEBP, or GIF image."
                )
            );
        }

        callback(null, true);
    }
});

const apiKey = process.env.GEMINI_API_KEY;

const ai = apiKey
    ? new GoogleGenAI({ apiKey })
    : null;

// Retry only temporary API errors. Never retry indefinitely.
function isTemporaryError(error) {
    const status = Number(
        error.status ||
        error.statusCode ||
        error.code
    );

    return [408, 429, 500, 502, 503, 504].includes(status);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function generateWithRetry(request) {
    const models = [
        "gemini-3.7-flash",
        "gemini-3.5-flash",
        "gemini-3.5-flash-lite"
    ];

    let lastError;

    for (const model of models) {
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                console.log(
                    `Trying ${model}, attempt ${attempt}/2`
                );

                return await ai.models.generateContent({
                    ...request,
                    model
                });

            } catch (error) {
                lastError = error;

                const status = Number(
                    error.status ||
                    error.statusCode ||
                    error.code
                );

                console.error(
                    `${model} failed:`,
                    error.message || error
                );

                // Try another model if this model is unavailable.
                if (status === 404) {
                    break;
                }

                // Retry temporary service errors once.
                if ([408, 429, 500, 502, 503, 504].includes(status)) {
                    if (attempt < 2) {
                        await sleep(2000);
                        continue;
                    }

                    break;
                }

                // Do not retry invalid requests or authentication errors.
                throw error;
            }
        }
    }

    throw lastError || new Error(
        "All configured Gemini models failed."
    );
}


// IMAGE ANALYSIS
app.post(
    "/api/analyze-image",
    (req, res, next) => {
        upload.single("image")(req, res, error => {
            if (error) {
                return res.status(400).json({
                    error: error.message || "Could not upload the image."
                });
            }

            next();
        });
    },
    async (req, res) => {
        try {
            if (!ai) {
                return res.status(500).json({
                    error: "Gemini API key is not configured on the server."
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    error: "No image was uploaded."
                });
            }

            console.log("Image received:", req.file.mimetype);
            console.log("Image size:", req.file.size);

            const imageBase64 = req.file.buffer.toString("base64");

            const prompt = `
You are the image text extraction engine for a cybersecurity
awareness platform.

Inspect the uploaded image and extract the main user-facing message
that might need a cybersecurity risk check. It may be an SMS, email,
chat message, notification, banking alert, or website message.

Extract only the relevant message. Ignore browser controls,
application navigation, tutorial instructions, captions, and
unrelated interface text.

Rules:
1. Do not invent text.
2. Preserve the original wording.
3. Extract the complete identifiable message when possible.
4. Include URLs that belong to that message.
5. If no identifiable message exists, return an empty extractedText.
6. Do not decide whether the message is a scam. Another component
   performs risk analysis.
7. Ordinary messages and unrelated photographs must not be
   classified as scams just because they were uploaded.

Return only the requested JSON structure.
`;

            const request = {
                contents: [
                    {
                        text: prompt
                    },
                    {
                        inlineData: {
                            mimeType: req.file.mimetype,
                            data: imageBase64
                        }
                    }
                ],
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: "object",
                        properties: {
                            extractedText: {
                                type: "string"
                            },
                            urls: {
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },
                            confidence: {
                                type: "number"
                            }
                        },
                        required: [
                            "extractedText",
                            "urls",
                            "confidence"
                        ]
                    }
                }
            };

            const response = await generateWithRetry(request);

            const responseText = response.text;

            if (!responseText) {
                throw new Error(
                    "Gemini returned an empty response. Please try another image."
                );
            }

            let result;

            try {
                result = JSON.parse(responseText);
            } catch {
                throw new Error(
                    "Gemini returned an invalid response. Please try again."
                );
            }

            const extractedText =
                typeof result.extractedText === "string"
                    ? result.extractedText.trim()
                    : "";

            const urls = Array.isArray(result.urls)
                ? result.urls.filter(url => typeof url === "string")
                : [];

            const confidence = Number(result.confidence);

            console.log("Image extraction completed.");

            return res.json({
                success: true,
                extractedText,
                urls,
                confidence: Number.isFinite(confidence)
                    ? Math.max(0, Math.min(1, confidence))
                    : 0
            });

        } catch (error) {
            console.error("GEMINI IMAGE ERROR:", error.message || error);

            const status = Number(
                error.status ||
                error.statusCode ||
                error.code
            );

            if ([429, 500, 502, 503, 504, 408].includes(status)) {
                return res.status(503).json({
                    success: false,
                    error:
                        "The image analysis service is temporarily busy. Please try again in a few seconds."
                });
            }

            if (status === 401 || status === 403) {
                return res.status(502).json({
                    success: false,
                    error:
                        "Gemini authentication failed. Check the server API key and its permissions."
                });
            }

            return res.status(500).json({
                success: false,
                error:
                    error.message ||
                    "Image analysis failed. Please try another image."
            });
        }
    }
);

// HEALTH CHECK
app.get("/api/health", (req, res) => {
    res.json({
        status: "CyberSafe server is running"
    });
});

// General error handler
app.use((error, req, res, next) => {
    console.error("Server error:", error.message || error);

    if (res.headersSent) {
        return next(error);
    }

    res.status(500).json({
        success: false,
        error: "An unexpected server error occurred."
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`CyberSafe running on port ${PORT}`);
});
