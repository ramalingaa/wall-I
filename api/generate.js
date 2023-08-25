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
        const responseText = completion.data.choices[0].text
        
        const ratingIndex = responseText.indexOf("Rating: ");
        const feedbackText = responseText.substring(0,ratingIndex)
        const ratingSubstring = responseText.substring(ratingIndex+8); 

        const rating = parseFloat(ratingSubstring);
        
        const result = {
          question: question,
          answer: answer,
          feedback:feedbackText,
          rating:rating
        }
        res.status(200).json({ result: result });
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
  if(question.startsWith('codeDSA:')){
    return `You are an expert code analyzer and can provide feedback by comparing coding question in javascript with the answer which is in JavaScript. Provide feedback on answer with respect to question. The feedback should be based on how accurate the answer i.e, whether given answer produce satisfied output for the question, second give suggestion on how it can be improved. For an incorrect answer you can tell why it is incorrect and suggest ways of solving the question using javascript.In Any case you should provide code example for feedback.
    Question: ${question}
    Answer: ${answer}
    `
  }else {
    return `You are an expert interviewer and you are best at analyzing at providing detailed feedback to users. The feedback should be in 1000 characters and should not exceed this limit in any given circumstance.Now I will give you question and answer mentioned by user. For this provide me with detailed accuracy and correctness of the answer with respect to question. If the answer is incorrect or partially correct suggest better way of answering the question.At last on a scale of 10 rate answer for it's accuracy, correctness and relevance to subject, 0 is for inaccurate and 10 is for close to perfect answer or correct answer that describes it well. The rating should always be at last and should be in format of Rating: number.There shouldn't be any other text after rating
    Question: ${question}
    Answer: ${answer}
    `
  }
}