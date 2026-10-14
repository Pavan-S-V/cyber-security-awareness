
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

async function main() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.log("GEMINI_API_KEY is missing from .env");
        return;
    }

    const ai = new GoogleGenAI({ apiKey });

    try {
        const models = await ai.models.list();

        for await (const model of models) {
            const name = model.name || "";

            if (
                name.toLowerCase().includes("gemini") &&
                model.supportedActions?.includes("generateContent")
            ) {
                console.log(name);
            }
        }
    } catch (error) {
        console.log("Could not list models:", error.message);
    }
}

main();