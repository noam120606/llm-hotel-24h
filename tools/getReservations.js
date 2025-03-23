const { z } = require("zod");
const { tool } = require("@langchain/core/tools");
  
module.exports = tool(
    async () => {
        const prompt = ChatPromptTemplate.fromTemplate(
            "You are an expert writer. Summarize the following text in 10 words or less:\n\n{long_text}"
          );

          const reverse = (x) => {
            return x.split("").reverse().join("");
          };
          const chain = prompt
            .pipe(model)
            .pipe(new StringOutputParser())
            .pipe(reverse);
          const summary = await chain.invoke({ long_text: input.long_text });
    },
    {
      name: "getReservations",
      schema: z.object({}),
      description: "Obtenir des infos sur les réservations",
    }
  );