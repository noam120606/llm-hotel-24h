const fs = require('fs');
const { ChatMistralAI } = require("@langchain/mistralai");
const { HumanMessage } = require("@langchain/core/messages");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

require('dotenv').config();

class LLM {
    constructor(type = "mistral") {
        this.type = type;
        switch(type) {
            case "mistral":
                this.llm = new ChatMistralAI({
                    model: "mistral-large-latest",
                    apiKey: process.env.MISTRALAI_API_KEY,
                    temperature:0
                  });
                break;
            case "gemini" :
                this.llm = new ChatGoogleGenerativeAI({
                    model: "gemini-1.5-pro",
                    temperature: 0,
                    maxRetries: 2,
                    apiKey: process.env.GOOGLE_API_KEY
                  });
                break;
        }

        this.loadTools();
    }

    loadTools() {
        this.toolsByName = {};
        let tools = []
        fs.readdirSync('./tools').forEach(file=> {
            this.toolsByName[file.split('.')[0]] = require(`./tools/${file}`);
            tools.push(require(`./tools/${file}`));
        })
        this.llm = this.llm.bindTools(tools);
    }
    async getResponse(userPrompt) {
        let messages;
        switch (this.type) {
            case "mistral":
                messages = [new HumanMessage(userPrompt)];
                const aiMessage = await this.llm.invoke(messages);
                messages.push(aiMessage);

                for (const toolCall of aiMessage.tool_calls) {
                    const selectedTool = this.toolsByName[toolCall.name];
                    const toolMessage = await selectedTool.invoke(toolCall);
                    messages.push(toolMessage);
                }

                return await this.llm.invoke(messages);
                break;
            case "gemini":
                const toolRes = await this.llm.invoke([
                    [
                        "human",
                        userPrompt,
                    ],
                ]);
                console.log(toolRes)
                break;
        }   
        
    }
}

const ai = new LLM("gemini");

ai.getResponse("Quel est le nom du client Sami").then((response) => {
    console.log(response);
});