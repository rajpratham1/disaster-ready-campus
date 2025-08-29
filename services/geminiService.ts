import { GoogleGenAI, Type } from "@google/genai";
import { DisasterType, Region, DrillScenario, WeatherInfo, DrillHistoryItem } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateModuleContent = async (disasterType: DisasterType): Promise<string> => {
    let prompt = `
        Generate a comprehensive yet easy-to-understand disaster preparedness guide for a ${disasterType} for school and college students in India.
        The tone should be informative, reassuring, and actionable.
        Structure the guide into three main sections: 'Before a ${disasterType}', 'During a ${disasterType}', and 'After a ${disasterType}'.
        Use headings (<h3>), paragraphs (<p>), and unordered lists (<ul><li>) for clear formatting.
        Ensure the output is clean, valid HTML content that can be rendered directly. Do not include <!DOCTYPE html>, <html>, or <body> tags.
    `;

    if (disasterType === DisasterType.TSUNAMI) {
        prompt = `
            Generate a comprehensive yet easy-to-understand disaster preparedness guide for a Tsunami, specifically for school and college students in India's coastal regions.
            The tone should be informative, reassuring, and actionable.
            Structure the guide into three main sections: 'Before a Tsunami (Warning Signs & Evacuation Plans)', 'During a Tsunami (Immediate Actions)', and 'After a Tsunami (Safety & Recovery)'.
            Include crucial information like recognizing natural warning signs (strong earthquakes, loud ocean roar, receding ocean water), understanding official warnings, and the importance of moving to higher ground immediately.
            Use headings (<h3>), paragraphs (<p>), and unordered lists (<ul><li>) for clear formatting.
            Ensure the output is clean, valid HTML content that can be rendered directly. Do not include <!DOCTYPE html>, <html>, or <body> tags.
        `;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating module content:", error);
        return "<p>Failed to load content. Please check your connection and API key, then try again.</p>";
    }
};

export const generateDrillScenario = async (disasterType: DisasterType): Promise<DrillScenario | null> => {
    const prompt = `
        Create a virtual disaster drill scenario for a ${disasterType} targeting college students in India.
        Provide a short, immersive scenario description.
        Then, provide one multiple-choice question with 4 options about the immediate correct action to take. One option must be correct.
        For each of the 4 options, provide a brief explanation for why it is correct or incorrect.
        The scenario and question must be relevant to a school or college campus setting.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        scenario: { type: Type.STRING },
                        question: { type: Type.STRING },
                        options: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    text: { type: Type.STRING },
                                    isCorrect: { type: Type.BOOLEAN },
                                    explanation: { type: Type.STRING },
                                },
                                required: ["text", "isCorrect", "explanation"],
                            },
                        },
                    },
                     required: ["scenario", "question", "options"],
                },
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as DrillScenario;
    } catch (error) {
        console.error("Error generating drill scenario:", error);
        return null;
    }
};

export const generateRegionalTips = async (city: string, weather: WeatherInfo): Promise<{ tips: string[] } | null> => {
    const prompt = `
        Provide a JSON object with a single key "tips".
        The value for "tips" should be an array of 5 concise, actionable disaster preparedness tips for the city of ${city}, India.
        These tips must be DIRECTLY RELEVANT to the current weather conditions:
        - Temperature: ${weather.temperature}
        - Condition: ${weather.condition}
        - Humidity: ${weather.humidity}
        - Wind: ${weather.wind}

        For example, if the condition is 'Rain', give tips about potential flooding. If it's 'Haze' or 'Fog', give tips about low visibility. If it's a heatwave, give tips on staying cool and hydrated.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tips: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                        },
                    },
                    required: ["tips"],
                },
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as { tips: string[] };
    } catch (error) {
        console.error("Error generating regional tips:", error);
        return null;
    }
};

export const generateDrillFeedback = async (history: DrillHistoryItem[]): Promise<string> => {
    const disasterType = history[0]?.scenario.scenario.includes('Earthquake') ? 'Earthquake'
        : history[0]?.scenario.scenario.includes('Flood') ? 'Flood'
        : history[0]?.scenario.scenario.includes('Fire') ? 'Fire'
        : history[0]?.scenario.scenario.includes('Cyclone') ? 'Cyclone'
        : history[0]?.scenario.scenario.includes('Tsunami') ? 'Tsunami'
        : 'Disaster';

    const performanceSummary = history.map((item, index) => `
        Scenario ${index + 1}: "${item.scenario.question}"
        User's Answer: "${item.selectedOption.text}" (${item.isCorrect ? 'Correct' : 'Incorrect'})
        Correct Answer: "${item.scenario.options.find(o => o.isCorrect)?.text}"
    `).join('\n');

    const prompt = `
        You are a disaster preparedness instructor reviewing a user's performance in a virtual drill.
        The drill was about ${disasterType} safety.
        Here is a summary of the user's performance:
        ${performanceSummary}

        Based on this, provide personalized, encouraging, and constructive feedback.
        - Start with an overall positive comment.
        - Identify any patterns in their mistakes (e.g., struggling with immediate actions, post-event safety).
        - Provide 2-3 specific, actionable tips for improvement based on their incorrect answers.
        - End with an encouraging closing statement.
        - Format the output as clean, readable HTML using a heading (<h3>), paragraphs (<p>), and an unordered list (<ul><li>).
        - Do not include <!DOCTYPE html>, <html>, or <body> tags. Keep it concise.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating drill feedback:", error);
        return "<p>Could not generate personalized feedback at this time. Please review your answers below.</p>";
    }
};
