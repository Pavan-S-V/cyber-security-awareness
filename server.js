const express = require("express");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


/* ================= IMAGE ANALYSIS ================= */

app.post("/api/analyze-image", upload.single("image"), async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                error: "No image was uploaded."
            });
        }

        console.log("Image received:", req.file.mimetype);
        console.log("Image size:", req.file.size);


        const imageBase64 =
            req.file.buffer.toString("base64");


        const prompt = `
You are the image text extraction engine for a cybersecurity awareness platform.

Carefully inspect the uploaded image and identify the MAIN SUSPICIOUS MESSAGE, SMS, email, chat message, notification, or scam content shown in the image.

IMPORTANT:
Extract the suspicious/user-facing message content only.

IGNORE:
- Website navigation menus
- Browser UI
- Buttons
- Headings
- Instructions such as "Click", "Test it", "Then", "Step 1", etc.
- Developer instructions
- Tutorial instructions
- Application interface text
- Text explaining how to use the analyzer
- Captions or labels surrounding the suspicious message
- Other unrelated text that is not part of the suspected message

For example, if the image contains:

"Click Screenshot
Upload a screenshot containing something like:
URGENT! Your bank account will be blocked.
Verify your KYC immediately."

The extracted text should contain ONLY the suspected message:

"URGENT! Your bank account will be blocked.
Verify your KYC immediately."

Do NOT include the surrounding instructions.

Rules:
1. Do not invent text.
2. Do not rewrite or improve the suspicious message.
3. Preserve the original wording as accurately as possible.
4. Extract the complete suspicious message when it is clearly identifiable.
5. Detect URLs that belong to the suspicious message.
6. Ignore unrelated surrounding text.
7. If there is no identifiable suspicious/message content, return an empty string.
8. Do not decide whether the message is a scam. Only extract the content.

Return JSON with:
- extractedText
- urls
- confidence

confidence must be a number from 0 to 1.
`;


        const response = await ai.models.generateContent({

            model: "gemini-3.6-flash",

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

        });


        console.log("Gemini response received.");


        const responseText = response.text;

        console.log("Gemini output:", responseText);


        let result;

        try {

            result = JSON.parse(responseText);

        } catch (parseError) {

            console.error(
                "JSON parsing failed:",
                parseError
            );

            return res.status(500).json({
                error: "Gemini returned an invalid response.",
                raw: responseText
            });

        }


        res.json({

            extractedText:
                result.extractedText || "",

            urls:
                Array.isArray(result.urls)
                    ? result.urls
                    : [],

            confidence:
                Number(result.confidence) || 0

        });

    }


    catch (error) {

        console.error(
            "================================"
        );

        console.error(
            "GEMINI IMAGE ERROR:"
        );

        console.error(error);

        console.error(
            "================================"
        );


        res.status(500).json({

            error:
                error.message ||
                "Gemini image analysis failed."

        });

    }

});


/* ================= HEALTH CHECK ================= */

app.get("/api/health", (req, res) => {

    res.json({
        status: "CyberSafe server is running"
    });

});


/* ================= START SERVER ================= */

app.listen(3000, () => {

    console.log(
        "CyberSafe running at http://localhost:3000"
    );

});