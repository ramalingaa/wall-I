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
            prompt = "Provide a JSON response compliant with RFC8259 that includes 'rating', 'time_complexity', 'space_complexity', 'feedback', 'explanation', and 'suggestedcode' for the given 'question', 'answer', and 'suggestions'.example: {'rating': 'x', 'time_complexity': 'y', 'space_complexity': 'z', 'feedback': 'a', , 'suggestedcode': 'function sample(){}', 'explanation': 'b'} Evaluate the 'answer' code's correctness based on whether it produces the exact output stated in the 'question'. Execute the code for verification, avoiding assumptions. A correct 'answer' yields a 'rating' of 10 and must include assessments of time and space complexity, along with 'feedback' related to the question if time and space complexity are not of best case then provide a 'suggestedcode' that meets the complexities' best case with 'explanation' of the suggestedcode. An incorrect 'answer' receives a 'rating' of 0, time and space complexity also zero as it is incorrect, and the response must provide 'suggestedcode' that meets the complexities' best case, an 'explanation'  of the suggestedcode, and 'feedback' on the errors. Rate the 'answer' strictly against the 'question'. Responses must be in JSON format with double-quoted keys, excluding any extraneous details outside the JSON object.Here is the input JSON data {'question':"+ user_message['question'] +",'answer':" + user_message['answer'] + " , 'suggestions':" + user_message['suggestions'] + "}"
        else : 
            prompt = "Provide a JSON response compliant with RFC8259 that includes 'rating' and 'feedback'. For the given 'question' and 'answer', verify the 'answer' against the 'trueanswer'. Your response, structured in JSON format, must gauge the 'answer' against the true answer for its correctness. If the 'answer' omits relevant aspects pertaining to the 'trueanswer', deem it partially correct and detail what was missed in your feedback text. An 'answer' is fully correct only if it encapsulates all elements related to the 'trueanswer' and exactly correct. For incorrect 'answers', always include the accurate and correct 'trueanswer' in your feedback text; for partially correct responses, provide feedback text where the user has missed important aspects and advice for improvement.Your feedback should not include the assessment object, question, and answer. It should only include 'feedback', which is the analysis of the answer in text format. The feedback can include the correct 'trueanswer' as part of the feedback text if needed. If there is a correct 'trueanswer' in your feedback, include it in the original feedback text itself.For answers that are not readable, do not make sense, or are not related to the 'question', treat them as incorrect answers. Rate the 'answer': 0 for incorrect, 10 for correct, and for partially correct answers, give a 'rating' based on how correct they are, solely based on their relation to the 'trueanswer'. Only give a rating of 10 when an answer has every aspect a question can cover and is absolutely correct, which cannot be disputed by anyone. For partially correct answers, critically judge what is missing from the 'answer' and weigh it against the 'trueanswer', then rate the answer.If an answer is wrong/does not make sense or is not related to the 'question', always include the correct 'trueanswer' in your feedback text, and do not ask the user to provide a solution.If the overall meaning of answer is same as trueanswer then treat it as correct answer. You should not mention anything about trueanswer in your feedback text just the feedback on the user answer. Present your response in RFC8259 standard JSON, with all keys in double quotes, excluding any extraneous details outside the JSON object.Here is the input JSON data:{'question':  "+ user_message['question'] +",'answer':" + user_message['answer'] + " , 'trueanswer':" + user_message['trueanswer'] + "}"

        # Make the OpenAI ChatCompletion request
        response = openai.ChatCompletion.create(
            engine="mockman-interviewdata",
            messages=[{"role":"system","content":"You function as a Technical Interview Expert across various domains, tasked with assessing responses and code submissions. Your objective is to meticulously evaluate the accuracy and relevance of the answers provided, execute the solutions to validate results, and offer detailed feedback. This encompasses confirming the technical accuracy, suggesting enhancements, and advising on best practices. Your constructive feedback is designed to aid candidates in improving their technical acumen and interview performance."},{"role":"user", "content":prompt}],
            temperature=0.2,#change temperatures for different results
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
    
# Release prompt with question and answer where AI checks against it's answer
# Provide a JSON response compliant with RFC8259 that includes 'rating' and 'feedback' example: {'rating': 'x', feedback': 'you answer is partially correct, you can include more details related to the question}, for the give 'question' and 'answer', verify the 'answer' in full against the 'question'. Your response, structured in JSON format, must gauge the 'answer' against the question for its correctness. If the 'answer' omits relevant aspects pertaining to the 'question', deem it partially correct, and detail what was missed in your feedback text. An 'answer' is fully correct only if it encapsulates all elements related to the 'question'. For incorrect 'answers', always include the accurate and correct answer in your feedback text; for partial correctness, provide feedback text where user has missed important aspects and advice for improvement.Your feedback should not include assessment object, question and answer. It should only include 'feedback' which is the analysis of the answer in text format which can include correct answer as part of the feedback text as well if needed. If there is correct answer in your feedback include in the original feedback text it self as part of the feedback text. For answers which are not readable, does not makes sense and is not related to question then treat them as incorrect answers.Rate the 'answer': 0 for incorrect, 10 for correct, and for partially correct answers give a 'rating' based on how correct it is, based solely on its relation to the 'question' you should only give 10 when an answer has every aspect a question can cover and is absolutely correct which cannot be disputed by anyone and for partially correct answers critically judge what is missing from the 'answer' and weigh it against the 'question' then only rate the answer.If an answer is wrong/does not make sense or not related to the 'question' then always include correct answer in your feedback text and do not ask user to  provide a solution. Be a real critic about the answers given by the user while rating them. Present your response in RFC8259 standard JSON, with all keys in double quotes, excluding any extraneous details outside the JSON object.Here is the input JSON data {'question':"+ user_message['question'] +",'answer':" + user_message['answer'] + "}"


#tru answer
#"Provide a JSON response compliant with RFC8259 that includes 'rating' and 'feedback'. For the given 'question' and 'answer', verify the 'answer' against the 'trueanswer'. Your response, structured in JSON format, must gauge the 'answer' against the true answer for its correctness. If the 'answer' omits relevant aspects pertaining to the 'trueanswer', deem it partially correct and detail what was missed in your feedback text. An 'answer' is fully correct only if it encapsulates all elements related to the 'trueanswer'. For incorrect 'answers', always include the accurate and correct 'trueanswer' in your feedback text; for partially correct responses, provide feedback text where the user has missed important aspects and advice for improvement.Your feedback should not include the assessment object, question, and answer. It should only include 'feedback', which is the analysis of the answer in text format. The feedback can include the correct 'trueanswer' as part of the feedback text if needed. If there is a correct 'trueanswer' in your feedback, include it in the original feedback text itself.For answers that are not readable, do not make sense, or are not related to the 'question', treat them as incorrect answers. Rate the 'answer': 0 for incorrect, 10 for correct, and for partially correct answers, give a 'rating' based on how correct they are, solely based on their relation to the 'trueanswer'. Only give a rating of 10 when an answer has every aspect a question can cover and is absolutely correct, which cannot be disputed by anyone. For partially correct answers, critically judge what is missing from the 'answer' and weigh it against the 'trueanswer', then rate the answer.If an answer is wrong/does not make sense or is not related to the 'question', always include the correct 'trueanswer' in your feedback text, and do not ask the user to provide a solution. Be a real critic about the answers given by the user while rating them. Present your response in RFC8259 standard JSON, with all keys in double quotes, excluding any extraneous details outside the JSON object.Here is the input JSON data:{'question':  "+ user_message['question'] +",'answer':" + user_message['answer'] + " , 'trueanswer':" + user_message['trueanswer'] + "}"