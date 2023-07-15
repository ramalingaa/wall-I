const {Configuration, OpenAIApi } = require("openai")
const express = require("express")
const cors = require("cors")
const app = express()
const path = require('node:path');
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())
const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  const PORT = 8080
  app.listen(PORT, () => {
      console.log("Server is running on", PORT);
  })
app.post("/api/generate", async (req, res) => {
    const { answer, question } = req.body
    if (!configuration.apiKey) {
        res.status(500).json({
          error: {
            message: "OpenAI API key not configured, please follow instructions in README.md",
          }
        });
        return;
      }
      if (answer.trim().length === 0) {
        res.status(400).json({
          error: {
            message: "Provided Answer is not valid one",
          }
        });
        return;
      }
      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: generatePrompt(answer, question),
          temperature: 1,
          max_tokens: 2900
        });
        console.log(completion.data.choices);
        res.status(200).json({ result: completion.data.choices[0].text });
      } catch(error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          console.error(error.response.status, error.response.data);
          res.status(error.response.status).json(error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
          res.status(500).json({
            error: {
              message: 'An error occurred during your request.',
            }
          });
        }
      }
})



function generatePrompt(answer, question) {
  return `You are an expert interviewer and you are best at analyzing at providing detailed feedback to users. The feedback should be in 1000 characters and should not exceed this limit in any given circumstance.Now I will give you question and answer mentioned by user. For this provide me with detailed accuracy and correctness of the answer with respect to question. Suggest better way of answering the question.
Question: ${question}
Answer: ${answer}
`
}