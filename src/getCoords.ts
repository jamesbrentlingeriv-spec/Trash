import { GoogleGenAI } from "@google/genai";

async function getLandfillCoordinates() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "What are the exact latitude and longitude coordinates for the Rumpke Landfill in Montgomery County, KY (30 Larison Rd, Jeffersonville, KY 40337)?",
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  console.log(response.text);
}

getLandfillCoordinates();
