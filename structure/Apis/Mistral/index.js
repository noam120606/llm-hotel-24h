const fs = require('fs');
const { ChatMistralAI } = require("@langchain/mistralai");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const { TavilySearchResults } = require("@langchain/community/tools/tavily_search");
const { MemorySaver } = require("@langchain/langgraph");
const { createReactAgent } = require("@langchain/langgraph/prebuilt");
const { CallbackHandler } = require("langfuse-langchain");
const { setContextVariable } = require("@langchain/core/context");

class LLM {
    constructor(bot, socket, type = "mistral") {
        this.bot = bot;
        this.socket = socket;

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

        setContextVariable("bot", bot);
    }

    loadTools() {
        this.toolsByName = {};
        let tools = []
        fs.readdirSync('./structure/Apis/Mistral/tools').forEach(folders=> {
            fs.readdirSync(`./structure/Apis/Mistral/tools/${folders}`).forEach(file => {

                const tool = require(`./tools/${folders}/${file}`)(this.bot, this.socket);
                this.toolsByName[file.split('.')[0]] = tool;
                tools.push(tool);

            })
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
        console.log(messages);
        return messages.messages[messages.messages.length - 1].content;
    }
}

module.exports = LLM;