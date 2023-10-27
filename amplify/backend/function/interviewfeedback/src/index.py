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
        if user_message['question'].startswith('DSA:', 0):
            prompt = "For this task You should only respond in RFC8259 compliant JSON format. I will give you a JSON object with three keys which are question, answer and suggestions. I refer them as question, answer and suggestions below. I want you to process it using the below instructions. Pretend you are a technical interviewer who can read the code to find bugs/errors any involved in that code or find outputs based on the given question and answer along with suggestions.Provide feedback by reading and analyzing the answer code for the question using suggestions. You should read code line by line to find whether answer code exactly produces desired result/outputs asked in the question.You should not assume or predict outputs of the code Instead you should run the code and analyze the output.  And based on correctness give feedback as an interviewer. If the answer does not produce output asked in the question and is totally wrong and does not relate to question then your JSON response should include {rating: rating as 0,'suggestedcode': which contains the correct code,'explanation': which contains the explanation of correct code, feedback: why answer is wrong}, if answer is partially correct then appreciate efforts and your JSON response should include { rating: rating between 0 and 10 based on correctness of code, suggestedcode: which is corrected code, feedback: why answer needs changes, explanation: explanation of suggested code changes}If an answer correctly produces the desired output asked in question and suggestions then your JSON response should include {'feedback': Appreciating and informing it is correct, rating: rating as 10}.Do not rate your answer code with question rating should be provided for given question and answer along with suggestions but not comparing your suggested code. only rate provided answer along with question.Do not include any explanations outside JSON object. Only provide a RFC8259 compliant JSON response with keys in double quotes, do not use single quotes for keys,following this format without deviation format-example: {feedback: "", suggestedcode:"", rating: x}.Here is the input JSON data {'question':"+ user_message['question'] +",'answer':" + user_message['answer'] + " , 'suggestions':" + user_message['suggestions'] + "}"
        else : 
            prompt = "I will give you a JSON object with two keys question and answer and I refer them as question and answer below I want you to process it using the below instructions Pretend you are a technical interviewer.Provide feedback by comparing the question and the answer and give feedback whether the answer is correct and accurate as an interviewer. If the answer is totally wrong and does not relate to question then give correct answer, if answer is partially correct then appreciate efforts at the same time tell where they can improve in correctly answering this question. If an answer correctly matches overall description and justifies the question then appreciate and inform it is correct. Based on correctness of answer provide rating,if the answer is wrong give 0 if it is correct give 10 and if it is partially correct analyse the answer and provide the required rating between 0 to 10.Do not rate your answer only rate provided answer along with question. always!2 Your response should be in JSON format with keys in double quotes, do not use single quotes for keys example {feedback: "", rating: x} Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation.Here is the input JSON data {'question':"+ user_message['question'] +",'answer':" + user_message['answer'] + "}"
        # Make the OpenAI ChatCompletion request
        response = openai.ChatCompletion.create(
            engine="mockman-interviewdata",
            messages=[{"role":"system","content":"You are an JavaScript Interview Expert who can analyse the question and answer and provides feedback to user"},{"role":"user", "content":prompt}],
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
        print("error", e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST'
            },
            'body': json.dumps({"error": str(e)})
        }