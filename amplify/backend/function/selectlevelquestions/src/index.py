import json
import openai
import os

# Configure OpenAI
openai.api_type = "azure"
openai.api_base = "https://mockman-feedback.openai.azure.com/"
openai.api_version = "2023-07-01-preview"
openai.api_key = "802ad67bd5fb421a80cae271c7d3d52a"

def handler(event, context): 
    try:
        body = json.loads(event['body'])
        user_message = body.get('user_message')

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
        response_dict = {"assistant_reply": assistant_reply}
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST'
            },
            'body': json.dumps(response_dict)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST'
            },
            'body': json.dumps({"error": str(e)})
        }
