
# # import os
# # import openai
# # openai.api_type = "azure"


from flask import Flask, request, jsonify
import openai
import os
from flask_cors import CORS

app = Flask(__name__)
allowed_origins = ["https://app.mockman.in", "http://localhost:3000", "https://www.mockman.in"]
# Configure OpenAI
openai.api_type = "azure"
openai.api_base = "https://mockman-feedback.openai.azure.com/"
openai.api_version = "2023-07-01-preview"
openai.api_key = "802ad67bd5fb421a80cae271c7d3d52a"
CORS(app, resources={r"/api/*": {"origins": allowed_origins}})  # Update with your frontend URL

@app.route('/api/questions', methods=['POST'])
def chat(): 
    try:
        data = request.json
        user_message = data.get('user_message')

        # Make the OpenAI ChatCompletion request
        response = openai.ChatCompletion.create(
            engine="mockman-interviewdata",
            messages=[{"role":"system","content":"You are an JavaScript Interview Expert who helps in figuring out the questions to be asked in an interview for students based on their experience"},{"role":"user","content": "Generate interview questions which can be asked in an interview in" + user_message["language"] + "programming language for a candidate whose experience level is" + user_message["experience"] + "in profession. Only generate questions which are in" + user_message["interviewLevel"] + "level concepts in" +  user_message["language"] + "which tests thoroughly in depth concepts of" + user_message["language"] + "which can be asked to test candidates experience and at the same time their" + user_message["language"] + "knowledge. generate" + user_message["noOfQuestions"] + "questions for the above task."}],
            
            temperature=0.7,
            max_tokens=800,
            top_p=0.95,
            frequency_penalty=0,
            presence_penalty=0,
            stop=None
        )

        # Extract and return the assistant's reply
        assistant_reply = response.choices[0].message['content']
        print("response", response)
        return jsonify({"assistant_reply": assistant_reply})

    except Exception as e:
        print("error", e)
        return jsonify({"error": str(e)})

@app.route('/api/feedback', methods=['POST'])
def feedback(): 
    try:
        data = request.json
        user_message = data.get('user_message')

        # Make the OpenAI ChatCompletion request
        response = openai.ChatCompletion.create(
            engine="mockman-interviewdata",
            messages=[{"role":"system","content":"You are an JavaScript Interview Expert who can analyse the question and answer and provides feedback to user"},{"role":"user", "content":"Respond to the following in a JSON format with two keys feedback and rating. I'll tell you how to calculate feedback and rating below.Provide feedback by comparing the following question" + user_message['question'] + "and the following answer" + user_message['answer'] + "and give feedback whether the answer is correct and accurate as an interviewer. If the answer is totally wrong and does not relate to question then give correct answer with rating as zero, if answer is partially correct then appreciate efforts at the same time tell where they can improve in correctly answering this question and rate between 0 to 10. If an answer correctly matches overall description and justifies the question then appreciate and inform it is correct with rating 10.Do not rate your answer only rate provided answer along with question."}],
            temperature=0.7,
            max_tokens=800,
            top_p=0.95,
            frequency_penalty=0,
            presence_penalty=0,
            stop=None
        )

        # Extract and return the assistant's reply
        assistant_reply = response.choices[0].message['content']
        print("response", response)
        return jsonify({"assistant_reply": assistant_reply})

    except Exception as e:
        print("error", e)
        return jsonify({"error": str(e)})
if __name__ == '__main__':
    app.run(debug=True)

