import { QuestionAnswer, addFailedFeedbackAPIData, addQuestionAnswerFeedback, removeFailedFeedbackAPIData } from "../redux/reducer";
import axios from "axios"
export function feedbackPostCall(dispatch:any, failedFeedbackAPICallQueue: QuestionAnswer[], jwtToken: string) {
    return async (payload: QuestionAnswer | undefined) => {
      const apiFeedbackData = {
          question: payload?.question,
          answer: payload?.userAnswer,
          language: payload?.language,
          suggestions: payload?.suggestions,
          trueanswer: payload?.answer
        };
        console.log(apiFeedbackData)
      const isFailedDataAlreadyAdded = failedFeedbackAPICallQueue.some((feedback: QuestionAnswer) => feedback.question === apiFeedbackData.question)
      const headers = {
        'Authorization': `Bearer ${jwtToken}`, // Add 'Bearer ' before the token
        'Content-Type': 'application/json',
      }
      try {
        const response = await axios.post('https://uxe3u4fjf8.execute-api.ap-south-1.amazonaws.com/dev/api/feedback', { user_message: apiFeedbackData }, { headers });
        const assistantReply =  JSON.parse(response.data.assistant_reply);
        const feedbackPayload = {
          question: payload?.question,
          answer: payload?.userAnswer,
          feedback: assistantReply?.feedback,
          rating: assistantReply?.rating,
          suggestedcode: assistantReply?.suggestedcode,
          explanation: assistantReply?.explanation,
          time_complexity: assistantReply?.time_complexity,
          space_complexity: assistantReply?.space_complexity
  
        }
        dispatch(addQuestionAnswerFeedback(feedbackPayload));
        if(isFailedDataAlreadyAdded){
          dispatch(removeFailedFeedbackAPIData(apiFeedbackData))
        }
      } catch (error) {
        
        if(!isFailedDataAlreadyAdded){
          dispatch(addFailedFeedbackAPIData(apiFeedbackData))
        }
        console.error('Error:', error);
      } finally {
      }
    };
  }