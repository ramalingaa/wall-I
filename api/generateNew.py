
# # import os
# # import openai
# # openai.api_type = "azure"


from flask import Flask, request, jsonify
import openai
import os
from flask_cors import CORS

app = Flask(__name__)

# Configure OpenAI
openai.api_type = "azure"
openai.api_base = "https://mockman-feedback.openai.azure.com/"
openai.api_version = "2023-07-01-preview"
openai.api_key = "802ad67bd5fb421a80cae271c7d3d52a"
CORS(app, resources={r"/api/*": {"origins": "https://app.mockman.in"}})  # Update with your frontend URL

@app.route('/api/questions', methods=['POST'])
def chat(): 
    try:
        data = request.json
        user_message = data.get('user_message')

        # Make the OpenAI ChatCompletion request
        response = openai.ChatCompletion.create(
            engine="mockman-interviewdata",
            messages=[{"role":"system","content":"You are an JavaScript Interview Expert who helps in figuring out the questions to be asked in an interview for students based on their experience"},{"role":"user","content": "Generate interview questions which can be asked in an interview in" + user_message["language"] + "programming language for a candidate whose experience level is" + user_message["experience"] + "in profession. Only generate questions which are in" + user_message["interviewLevel"] + "level concepts in" +  user_message["language"] + "which tests thoroughly in depth concepts of" + user_message["language"] + "which can be asked to test candidates experience and at the same time their Javascript knowledge. generate" + user_message["noOfQuestions"] + "questions for the above task."}],
            
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
            messages=[{"role":"system","content":"You are an JavaScript Interview Expert who can analyse the question and answer and provides feedback to user"},{"role":"user", "content":"Provide feedback by comparing the following question" + user_message['question'] + "and the following answer" + user_message['answer'] + "and give feedback whether the answer is correct and accurate as an interviewer. If the answer is totally wrong and does not relate to question then give correct answer, if answer is partially correct then appreciate efforts at the same time tell where they can improve in correctly answering this question. If an answer correctly matches overall description and justifies the question then appreciate and inform it is correct. Based on correctness of answer provide rating always!2 only at the end of feedback in this format Rating: x/y, if the answer is wrong give 0 if it is correct give 10 and if it is partially correct analyse the answer and provide the required rating between 0 to 10 in this format, rating: .Do not rate your answer only rate provided answer along with question. always!2 rating should be the last word in your reply in this format rating: x/y"}],
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

