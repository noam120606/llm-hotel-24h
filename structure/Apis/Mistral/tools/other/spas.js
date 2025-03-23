
const { z } = require("zod");
const { tool } = require("@langchain/core/tools");
  
module.exports = (bot, socket) => {
    return tool(
        async () => {
            console.log("a");

            return bot.api.hotel.spas.getList().map(s => ({
                name: s.name,
                description: s.description,
                location: s.location,
                phone_number: s.phone_number,
                email: s.email,
                opening_hours: s.opening_hours
            }));
        },
        {
            name: "getRestaurants",
            schema: z.object({}),
            description: "Donnes la liste des spas",
        }
    );
}