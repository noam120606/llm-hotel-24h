const { z } = require("zod");
const { tool } = require("@langchain/core/tools");

  
module.exports = tool(
    async ({ name }) => {
      if (name === "Noam") {
        return "Roger";
      } else if (name === "Sami") {
        return "Hajadi";
      } else if (name === "Alexandre") {
        return "Tricot";
      } else if (name === "Chloe") {
        return "Quinton";
      } else if (name === "Lucas") {
        return "Gourdelier";
      } else {
        return "Inconnu";
      }
    },
    {
      name: "getName",
      schema: z.object({
        name: z.string(),
      }),
      description: "Quel est le nom d'un client ?",
    }
  );