const { z } = require("zod");
const { tool } = require("@langchain/core/tools");
  
module.exports = (bot, socket) => {
    return tool(
        async (data) => {
            data.room_number = Math.floor(Math.random() * 1000);
            const response = await bot.api.hotel.clients.create(data);
            console.log(response);
            return `
                Client créé avec succès
                Numéro de chambre: ${data.room_number}
            `;
        },
        {
            name: "creerClient",
            schema: z.object({
                name: z.string(),
                phone_number: z.string(),
                special_requests: z.string(),
            }),
            description: "Creer un client et lui donner une chambre d'hotel",
        }
    );
}