import { ChatMistralAI } from '@langchain/mistralai';
import { HumanMessage } from "@langchain/core/messages";

class MistralAI extends ChatMistralAI{
    constructor() {
        super({
            modelName: "mistral-large-latest",
            apiKey: process.env.MISTRALAI_API_KEY
          });
    }

    async getResponse() {
        const response = await model.invoke(new HumanMessage("Hello world!"));
        console.log(response);
    }
}

const Mistral = new MistralAI();
MistralAI.getResponse();