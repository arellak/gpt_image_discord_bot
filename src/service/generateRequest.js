import { Configuration, OpenAIApi } from "openai";
import { config } from "../../config/config.js";


export default async function generate(promptText){
    const configuration = new Configuration({
        apiKey: config.openai.api_key,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
        prompt: promptText,
        n: 2,
        size: "1024x1024",
    });

    return response?.data.data?.[0]?.url;
}
