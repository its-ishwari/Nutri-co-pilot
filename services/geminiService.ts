import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    intent: {
      type: Type.STRING,
      description: "Inferred user intent based on the ingredients (e.g., 'Weight Loss', 'Clean Label', 'Allergy Safety', 'General Health')."
    },
    summary: {
      type: Type.STRING,
      description: "A one-sentence human-readable summary of the product's health impact."
    },
    verdict: {
      type: Type.STRING,
      enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Avoid'],
      description: "The overall verdict of the product."
    },
    healthScore: {
      type: Type.NUMBER,
      description: "A score from 0 to 100 representing the healthiness of the product."
    },
    processingLevel: {
      type: Type.STRING,
      enum: ['Unprocessed', 'Minimally Processed', 'Processed', 'Ultra-Processed'],
      description: "The level of processing of the food."
    },
    keyInsights: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: {
            type: Type.STRING,
            enum: ['positive', 'negative', 'neutral']
          },
          text: { type: Type.STRING }
        }
      },
      description: "3-4 key bullet points explaining the analysis."
    },
    tradeOffs: {
      type: Type.STRING,
      description: "An explanation of the trade-offs (e.g., 'Low sugar, but high in artificial sweeteners')."
    },
    uncertainty: {
      type: Type.STRING,
      description: "What is unknown or ambiguous about the ingredients or label."
    }
  },
  required: ["intent", "summary", "verdict", "healthScore", "processingLevel", "keyInsights", "tradeOffs", "uncertainty"]
};

export const analyzeIngredients = async (
  input: { text?: string; imageBase64?: string }
): Promise<AnalysisResult> => {
  
  const systemInstruction = `
    You are an AI-Native Consumer Health Co-Pilot. 
    Your goal is to interpret food ingredients and labels for a human at the moment of purchase.
    
    DO NOT just list ingredients. 
    DO NOT be a database.
    
    1. INFER INTENT: Look at the ingredients. Is this person likely trying to avoid sugar? Eat clean? Manage weight? Feed a child?
    2. REASON: Analyze the synergy of ingredients. 
    3. TRADE-OFFS: Explicitly identify trade-offs (e.g., "Organic, but extremely high in added sodium").
    4. UNCERTAINTY: If an ingredient is vague (e.g., "Natural Flavors"), explain why that's a blind spot.
    
    Return the response in strict JSON format matching the provided schema.
  `;

  try {
    const parts: any[] = [];
    
    if (input.imageBase64) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg", // Assuming JPEG for simplicity/conversion
          data: input.imageBase64
        }
      });
    }

    if (input.text) {
      parts.push({
        text: input.text
      });
    } else if (!input.imageBase64) {
      throw new Error("No input provided");
    }

    parts.push({
        text: "Analyze these ingredients. act as a critical decision support tool."
    });

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest', 
      contents: {
        role: 'user',
        parts: parts
      },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze ingredients. Please try again.");
  }
};
