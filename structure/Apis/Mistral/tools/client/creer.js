const { z } = require("zod");
const { tool } = require("@langchain/core/tools");
  
module.exports = (bot, socket) => {
    return tool(
        async (data) => {
            return bot.api.hotel.client.create(data);
        },
        {
            name: "creerClient",
            schema: z.object({
                name: z.string(),
                phone_number: z.string(),
                special_requests: z.string(),
            }),
            description: "Creer un client",
        }
    );
}
