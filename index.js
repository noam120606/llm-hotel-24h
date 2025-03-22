const fs = require('fs');
const { ChatMistralAI } = require("@langchain/mistralai");
const { HumanMessage } = require("@langchain/core/messages");

require('dotenv').config();

class MistralAI {
    constructor() {
        this.mistral = new ChatMistralAI({
            model: "mistral-large-latest",
            role: "user",
            apiKey: process.env.MISTRALAI_API_KEY,
            temperature:0
          });

        this.loadTools();
    }

    loadTools() {
        this.toolsByName = {};
        let tools = []
        fs.readdirSync('./tools').forEach(file=> {
            this.toolsByName[file.split('.')[0]] = require(`./tools/${file}`);
            tools.push(require(`./tools/${file}`));
        })
        this.mistral = this.mistral.bindTools(tools);
    }
    async getResponse(userPrompt) {
        let messages = [new HumanMessage(userPrompt)];
        const aiMessage = await this.mistral.invoke(messages);
        messages.push(aiMessage);

        for (const toolCall of aiMessage.tool_calls) {
            const selectedTool = this.toolsByName[toolCall.name];
            const toolMessage = await selectedTool.invoke(toolCall);
            messages.push(toolMessage);
        }

        return await this.mistral.invoke(messages)
    }
}

const Mistral = new MistralAI();

Mistral.getResponse("Quel est le nom du client Sami").then((response) => {
    console.log(response.content);
});