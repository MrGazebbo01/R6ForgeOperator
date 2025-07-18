
import { GoogleGenAI, Type } from "@google/genai";
import type { OperatorInput, GeneratedOperatorData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const operatorDetailsSchema = {
    type: Type.OBJECT,
    properties: {
        callsign: { type: Type.STRING, description: "The operator's callsign provided in the prompt." },
        realName: { type: Type.STRING, description: "A plausible real name for the operator." },
        role: { type: Type.STRING, description: "The operator's role (Attacker/Defender) provided in the prompt." },
        backstory: { type: Type.STRING, description: "A detailed and compelling backstory (2-3 paragraphs) for the operator, linking their personality and history to their unique ability." },
        gameplayAnalysis: { type: Type.STRING, description: "An analysis of the operator's loadout and ability within the Rainbow Six Siege meta. Discuss balance, potential strategies, and synergies with other operators (2-3 paragraphs)." },
        developerNote: { type: Type.STRING, description: "A short, insightful note from the perspective of a game developer explaining the design philosophy behind this operator." },
    },
    required: ["callsign", "realName", "role", "backstory", "gameplayAnalysis", "developerNote"],
};


export const generateOperatorDetails = async (input: OperatorInput): Promise<GeneratedOperatorData> => {
    const prompt = `
        You are a creative game designer for the game Rainbow Six Siege.
        Based on the following operator concept, generate a detailed profile.

        Operator Concept:
        - Callsign: ${input.callsign}
        - Role: ${input.role}
        - Primary Weapons: ${input.primaryWeapons.join(', ')}
        - Secondary Weapon: ${input.secondaryWeapon}
        - Gadgets: ${input.gadgets.join(', ')}
        - Unique Ability: ${input.uniqueAbility}

        Generate the profile in JSON format according to the provided schema. The backstory and analysis should be well-written and thematic to the world of Rainbow Six Siege.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: operatorDetailsSchema,
                temperature: 0.8,
            },
        });

        const jsonText = response.text;
        const parsedData = JSON.parse(jsonText) as GeneratedOperatorData;
        return parsedData;

    } catch (error) {
        console.error("Error generating operator details:", error);
        throw new Error("Failed to generate operator details from AI.");
    }
};

export const generateOperatorIcon = async (input: OperatorInput): Promise<string> => {
    const prompt = `
        Create a tactical operator icon for a character in the style of Rainbow Six Siege.
        The operator's callsign is "${input.callsign}".
        Their role is ${input.role}.
        Their unique ability is: "${input.uniqueAbility}".
        The icon should be a close-up portrait (head and shoulders).
        It needs a dark, gritty, and realistic art style with a hint of stylization.
        Incorporate a visual element related to their unique ability into their headgear or appearance.
        The background should be a simple, dark, abstract pattern.
    `;

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating operator icon:", error);
        throw new Error("Failed to generate operator icon from AI.");
    }
};
