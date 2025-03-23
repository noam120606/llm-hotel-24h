const fs = require('fs');

const { ChatMistralAI } = require("@langchain/mistralai");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const { TavilySearchResults } = require("@langchain/community/tools/tavily_search");
const { MemorySaver } = require("@langchain/langgraph");
const { createReactAgent } = require("@langchain/langgraph/prebuilt");
const { CallbackHandler } = require("langfuse-langchain");

require('dotenv').config();

const prompt = require('prompt-sync')();

class LLM {
    constructor(type = "mistral") {
        this.type = type;
        this.langfuseHandler = new CallbackHandler();

        let agentCheckpointer = new MemorySaver();
        let agentModel;

        switch(type) {
            case "mistral":
                agentModel = new ChatMistralAI({
                    model: "mistral-large-latest",
                    apiKey: process.env.MISTRALAI_API_KEY,
                    temperature:0
                  });
                break;
            case "gemini" :
                agentModel = new ChatGoogleGenerativeAI({
                    model: "gemini-1.5-pro",
                    temperature: 0,
                    maxRetries: 2,
                    apiKey: process.env.GOOGLE_API_KEY
                });
                break;
        }

        this.agent = createReactAgent({
            llm: agentModel,
            tools: [new TavilySearchResults({ maxResults: 3 })].concat(this.loadTools()),
            checkpointSaver: agentCheckpointer
        });

        
    }

    loadTools() {
        this.toolsByName = {};
        let tools = []
        fs.readdirSync('./tools').forEach(file=> {
            this.toolsByName[file.split('.')[0]] = require(`./tools/${file}`);
            tools.push(require(`./tools/${file}`));
        })
        return tools;
    }
    async getResponse(userPrompt) {
        const messages = await this.agent.invoke(
            { messages: userPrompt },
            { 
                configurable: { thread_id: "42" },
                callbacks: [this.langfuseHandler]
            },
        );
        return messages.messages[messages.messages.length - 1].content;
    }
}


async function main() {
    const ai = new LLM();

    for (let i = 0; i < 10; i++) {
        await ai.getResponse(prompt("Question : ")).then((response) => {
            console.log(response);
        });
    }
}
main()
