
const { z } = require("zod");
const { tool } = require("@langchain/core/tools");
  
module.exports = (bot, socket) => {
    return tool(
        async () => {
            return bot.api.hotel.restaurants.getList().map(r => ({
                name: r.name,
                description: r.description,
                opening_hours: r.opening_hours,
                location: r.location,
                open: r.is_active,
            }));
        },
        {
            name: "getRestaurants",
            schema: z.object({}),
            description: "Donnes la liste des restaurants",
        }
    );
}