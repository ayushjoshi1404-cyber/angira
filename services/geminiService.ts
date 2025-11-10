
import { GoogleGenAI, Chat } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";


let chat: Chat | null = null;

function getChatInstance(): Chat {
    if (!chat) {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are Angira, a sophisticated AI-driven personal assistant. Your goal is to streamline daily tasks and enhance user productivity with precision and efficiency. You have advanced natural language understanding and provide thoughtful responses. You should be professional, polite, and embody a balance of intelligence and grace. Your conversations should feel seamless and human-like.`,
            },
        });
    }
    return chat;
}

export async function sendMessageToGemini(message: string): Promise<string> {
  try {
    const chatInstance = getChatInstance();
    const result: GenerateContentResponse = await chatInstance.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    if (error instanceof Error) {
        return `Sorry, I encountered an error: ${error.message}`;
    }
    return "Sorry, I encountered an unknown error. Please try again.";
  }
}
