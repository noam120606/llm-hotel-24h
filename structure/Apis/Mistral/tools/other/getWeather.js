const weather = require('../../../Weather/index.js');
const { z } = require("zod");
const { tool } = require("@langchain/core/tools");

module.exports = (bot, socket) => {
    return tool(
        async () => {
            const data = await weather();
            return `
                ${data.temperature}°C
                ${data.description}
                ${data.vent}m/s
            `;
        },
        {
            name: "getWeather",
            schema: z.object({}),
            description: "Donnes la meteo actuelle",
        }
    );
};