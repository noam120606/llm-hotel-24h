
const { z } = require("zod");
const { tool } = require("@langchain/core/tools");

module.exports = (bot, socket) => {
    return tool(
        async () => {
            return (await bot.api.hotel.restaurants.getList()).map(r => `
                ${r.name}
                ${r.description}
                ${r.opening_hours}
                ${r.location}
                ${r.is_active}
            `).join('\n');
        },
        {
            name: "getRestaurants",
            schema: z.object({}),
            description: "Donnes la liste des restaurants",
        }
    );
};