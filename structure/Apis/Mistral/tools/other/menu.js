
const { z } = require("zod");
const { tool } = require("@langchain/core/tools");
  
module.exports = (bot, socket) => {
    return tool(
        async () => {
            return bot.api.hotel.meals.getList().map(m => m.name).join('\n');
        },
        {
            name: "getMeals",
            schema: z.object({}),
            description: "Donnes la liste des menus",
        }
    );
}