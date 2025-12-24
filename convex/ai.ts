import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

// AI Assistant for customers
export const chatWithAssistant = action({
    args: {
        sessionId: v.string(),
        message: v.string(),
        language: v.string(), // "ta" or "en"
    },
    handler: async (ctx, args): Promise<string> => {
        // Store user message
        await ctx.runMutation(api.chat.saveMessage, {
            sessionId: args.sessionId,
            role: "user",
            content: args.message,
            language: args.language,
        });

        // Get conversation history
        const history: Array<{ role: string; content: string }> = await ctx.runQuery(api.chat.getSessionMessages, {
            sessionId: args.sessionId,
        });

        // Prepare system prompt based on language
        const systemPrompt: string = args.language === "ta"
            ? `நீங்கள் அபி ஃபேஷன் டிசைனர் நிறுவனத்தின் உதவியாளர். 30+ ஆண்டுகள் அனுபவம் கொண்ட தையல் நிபுணர். 

முக்கிய குறிப்பு: உங்கள் நிறுவனம் பெண்கள் மற்றும் பெண் குழந்தைகளுக்கு (Ladies & Kids - Girls) மட்டுமே தையல் சேவைகளை வழங்குகிறது. ஆண்களுக்கு தையல் சேவைகள் வழங்கப்படுவதில்லை.

வாடிக்கையாளர்களுக்கு பின்வரும் விஷயங்களில் உதவுங்கள்:
- ப்ளவுஸ் டிசைன் பரிந்துரைகள்
- திருமண ப்ளவுஸ் யோசனைகள்
- ஆரி எம்ப்ராய்டரி வேலைகள்
- தையல் செய்ய எடுக்கும் நேரம்
- விலை தகவல்கள் (தோராயமாக)
எப்போதும் மரியாதையாகவும், உதவிகரமாகவும் இருங்கள். வாடிக்கையாளர்களை WhatsApp மூலம் தொடர்பு கொள்ள ஊக்குவியுங்கள்.`
            : `You are an assistant for Abi Fashion Designer, a tailoring service with 30+ years of experience. 

CRITICAL NOTE: We ONLY provide tailoring services for Ladies and Kids (Girls). We do NOT provide services for men.

Help customers with:
- Blouse design recommendations
- Bridal blouse ideas
- Aari embroidery work
- Stitching time estimates
- Pricing information (approximate)
Always be polite and helpful. Encourage customers to contact via WhatsApp for detailed discussions.`;

        // Call OpenAI API
        const response: Response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: systemPrompt },
                    ...history.map((msg: { role: string; content: string }) => ({
                        role: msg.role,
                        content: msg.content,
                    })),
                    { role: "user", content: args.message },
                ],
                temperature: 0.7,
                max_tokens: 500,
            }),
        });

        const data: any = await response.json();
        const assistantMessage: string = data.choices[0].message.content;

        // Store assistant response
        await ctx.runMutation(api.chat.saveMessage, {
            sessionId: args.sessionId,
            role: "assistant",
            content: assistantMessage,
            language: args.language,
        });

        return assistantMessage;
    },
});

// AI Assistant for owner (admin mode)
export const ownerAssistant = action({
    args: {
        task: v.string(), // "translate", "suggest_description", "suggest_pricing"
        input: v.string(),
        language: v.string(),
    },
    handler: async (ctx, args): Promise<string> => {
        let systemPrompt: string = "";

        switch (args.task) {
            case "translate":
                systemPrompt = `Translate the following text between Tamil and English. If input is in Tamil, translate to English. If input is in English, translate to Tamil. Provide only the translation, no explanations.`;
                break;
            case "suggest_description":
                systemPrompt = `You are helping a senior tailor write product descriptions. Create an elegant, professional description for a tailoring work item. Write in ${args.language === "ta" ? "Tamil" : "English"}. Keep it concise and appealing.`;
                break;
            case "suggest_pricing":
                systemPrompt = `You are helping a tailor with pricing suggestions. Based on the work description, suggest appropriate pricing text (not exact prices, but pricing approach). Write in ${args.language === "ta" ? "Tamil" : "English"}.`;
                break;
            default:
                systemPrompt = "You are a helpful assistant for a tailoring business owner.";
        }

        const response: Response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: args.input },
                ],
                temperature: 0.7,
                max_tokens: 300,
            }),
        });

        const data: any = await response.json();
        return data.choices[0].message.content as string;
    },
});
