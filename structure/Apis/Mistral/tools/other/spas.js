
const { z } = require("zod");
const { tool } = require("@langchain/core/tools");
  
module.exports = (bot, socket) => {
    return tool(
        async () => {
            return bot.api.hotel.spas.getList().map(s => `
                ${s.name}
                ${s.description}
                ${s.location}
                ${s.phone_number}
                ${s.email}
                ${s.opening_hours}
            `).join('\n\n');
        },
        {
            name: "getRestaurants",
            schema: z.object({}),
            description: "Donnes la liste des spas",
        }
    );
}