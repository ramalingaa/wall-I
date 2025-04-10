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
        #if user_message['dsaQuestionCount'] > 0 then create a function to return prompt or else different prompt
        nonDSAPrompt = "Return array format questions,follow example at the last for format I will give you instructions on how to generate questions.Generate interview questions which can be asked in an interview in " + user_message["language"] + " programming language for a candidate whose experience level is " + user_message["experience"] + " in profession. Only generate questions which are in " + user_message["interviewLevel"] + " level concepts in " +  user_message["language"] + " which tests thoroughly in depth concepts of " + user_message["language"] + " which can be asked to test candidates experience and at the same time their " + user_message["language"] + " knowledge.only provide RFC8259 compliant JSON response as Array."
        nonDSAQuestionLimitPrompt = " You should only generate " + user_message["noOfQuestions"] + " number of questions and not more than this. "
        nonDSAPromptExample = "Question String should use double quotes, do not use single quotes for questions.Example:['How do you define variables in JavaScript','Can you explain the differences between var, let, and const when declaring variables in JavaScript?']"

        dsaPrompt = "Also add DSA questions to response array considering above experience and level of interview level and language. Each DSA Question should start with prefix as 'DSA: '. Number of DSA questions should be "+ user_message['dsaQuestionCount'] + " and it should not exceed this number. DSA questions are programming questions not a theoretical questions and DSA question object should include required information such as sample inputs, outputs and suggestions along with question."

        dsaPromptExample = "You need to generate  exactly" + user_message["noOfQuestions"] + " number of NoN-DSA questions not more than that and "+ user_message['dsaQuestionCount'] + " number of  DSA questions not more than that. You should follow question count exactly. Provide Non-DSA questions in a double quoted strings only, do not use single quotes for questions and DSA questions as objects with keys in lowercase in an Array.Example:['How do you define variables in JavaScript',{'question': 'DSA: Given a list of integers nums and an integer target, find two numbers in the list that add up to the target and return their indices.','suggestions': 'You may assume that each input would have exactly one solution.You may not use the same element twice.You can return the answer in any order.', 'example': '{'input':'nums = [2,7,11,15] target: 9', 'output': '[0,1]', 'explanation': 'Because nums[0] + nums[1] == 9, we return [0, 1].'}'}]."
        #write if and else condition to return prompt
        if int(user_message['dsaQuestionCount']) > 0:
            # dsaPrompt to nonDSAPrompt's second elements content at the end
            prompt = nonDSAPrompt+" " + dsaPrompt+ " " + dsaPromptExample
        else:
            prompt = nonDSAPrompt+ nonDSAQuestionLimitPrompt + " "+ nonDSAPromptExample
        # Make the OpenAI ChatCompletion request
        response = openai.ChatCompletion.create(
            engine="mockman-interviewdata",
            messages=[{"role":"system","content":"You are an Interview Expert who helps in figuring out the questions to be asked in an interview for students based on their experience"},{"role":"user","content": prompt}],
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
