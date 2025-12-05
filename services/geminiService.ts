import { GoogleGenAI } from "@google/genai";
import { ImageResolution } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment.");
  }
  return new GoogleGenAI({ apiKey });
};

const getClientForPaidFeatures = async () => {
    // Safely access aistudio off window with type casting
    const aiStudio = (window as any).aistudio;

    if (aiStudio && typeof aiStudio.hasSelectedApiKey === 'function') {
        const hasKey = await aiStudio.hasSelectedApiKey();
        if (!hasKey && typeof aiStudio.openSelectKey === 'function') {
            await aiStudio.openSelectKey();
        }
    }
    
    // Re-instantiate with the potentially new key injected into env
    // The environment variable is automatically updated after key selection
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const generateDescription = async (landCoverName: string, code: string): Promise<{ text: string; sources: string[] }> => {
  try {
    const ai = getClient();
    const prompt = `Actúa como un experto geógrafo del IDEAM Colombia. Genera una descripción técnica para la verificación en campo de la cobertura Corine Land Cover: "${code} - ${landCoverName}".
    
    Estructura la respuesta en:
    1. Definición breve.
    2. Características diagnósticas para identificación en campo (qué buscar visualmente).
    3. Confusiones comunes con otras coberturas.
    
    Usa el Search Tool para validar definiciones oficiales del sistema de clasificación colombiano.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "No se pudo generar la descripción.";
    
    const sources: string[] = [];
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      response.candidates[0].groundingMetadata.groundingChunks.forEach(chunk => {
        if (chunk.web?.uri) {
          sources.push(chunk.web.uri);
        }
      });
    }

    return { text, sources };

  } catch (error) {
    console.error("Error generating description:", error);
    return { text: "Hubo un error al generar la descripción. Por favor intenta de nuevo.", sources: [] };
  }
};

export const generateLandCoverImage = async (
  landCoverName: string, 
  code: string,
  resolution: ImageResolution
): Promise<string | null> => {
  try {
    // Validating and selecting API Key for paid feature
    const ai = await getClientForPaidFeatures();
    
    // Prompt optimizado para verificación en campo (Ground Truthing)
    const prompt = `Fotografía de referencia para 'Ground Truth' (Verificación de Campo) de la cobertura terrestre: ${landCoverName} (Código Corine: ${code}) en un paisaje típico de Colombia.
    
    Perspectiva: Vista a nivel de ojos o dron a baja altura (20 metros), simulando lo que ve un equipo de campo.
    Objetivo: Identificación visual clara de especies vegetales dominantes, patrones de siembra, densidad de estructuras o textura del suelo.
    Composición: Centrada en los elementos distintivos que definen esta clase según la leyenda Corine Land Cover.
    Estilo: Fotografía documental de alta resolución, luz natural neutra, sin filtros artísticos.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
            aspectRatio: "16:9",
            imageSize: resolution
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    return null;

  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};