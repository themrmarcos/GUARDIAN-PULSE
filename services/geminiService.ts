
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAIImage = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const translateText = async (text: string, targetLanguage: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Translate the following text to ${targetLanguage}: "${text}"`,
  });
  return response.text;
};

export const generateStory = async (topic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Write a short story about: ${topic}. Make it engaging and concise.`,
  });
  return response.text;
};

export const getMapsInfo = async (query: string, latitude?: number, longitude?: number) => {
  const config: any = {
    tools: [{ googleMaps: {} }],
  };

  if (latitude && longitude) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: { latitude, longitude }
      }
    };
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: query,
    config,
  });

  return {
    text: response.text,
    grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [],
  };
};

export const chatWithAssistant = async (message: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: message,
  });
  return response.text;
};
