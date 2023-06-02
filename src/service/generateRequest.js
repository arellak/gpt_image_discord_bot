import { Configuration, OpenAIApi } from "openai";
import { config } from "../../config/config.js";


export default function generate(prompt){
    const configuration = new Configuration({
        apiKey: config.openai.api_key,
    });
}
