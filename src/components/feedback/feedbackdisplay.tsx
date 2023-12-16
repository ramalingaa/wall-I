import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { QuestionAnswerFeedback, updateUserDetails, updateUserInterviewHistoryData } from "../../redux/reducer";
import "./feedbackdisplay.css"
import {Button} from "@nextui-org/react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import FeedbackCard from "./feedbackcard";
import { feedbackPostCall } from "../../utils/feedbackpostcall";

const allQuestionAnswerFeedbackData = [
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      answer: "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
      feedback: "The play 'Romeo and Juliet' was written by Christopher Marlowe",
      rating: 0
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      answer: "The play 'Romeo and Juliet' was written by William Shakespeare",
      feedback: "The play 'Romeo and Juliet' was written by Christopher Marlowe",
      rating: 10
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      answer: "The play 'Romeo and Juliet' was written by William Shakespeare",
      feedback: "The play 'Romeo and Juliet' was written by Christopher Marlowe",
      rating: 10
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      answer: "The play 'Romeo and Juliet' was written by William Shakespeare",
      feedback: "The play 'Romeo and Juliet' was written by Christopher Marlowe",
      rating: 5
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      answer: "The play 'Romeo and Juliet' was written by William Shakespeare",
      feedback: "The play 'Romeo and Juliet' was written by Christopher Marlowe",
      suggestedcode: "console.log('Helloworld')",
      rating: 9
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      answer: "The play 'Romeo and Juliet' was written by William Shakespeare",
      feedback: "The play 'Romeo and Juliet' was written by Christopher Marlowe",
      suggestedcode: "console.log('Helloworld')",
      rating: 10
    },
  ];
async function updateUserInterviewDetails(props:any) {
  const { allQuestionAnswerFeedbackData, jwtToken, credit, userId, setIsDataPosted, dispatch } = props 
  const newCredit = Number(credit) - 1
  
  const userMessage = {
    userId: userId,
    credit: newCredit,
    interviewData: {
      interviewData: allQuestionAnswerFeedbackData
    },
  };
  const headers = {
      'Authorization': `Bearer ${jwtToken}`, // Add 'Bearer ' before the token
      'Content-Type': 'application/json',
    }
  try {
    const response = await axios.post('https://uxe3u4fjf8.execute-api.ap-south-1.amazonaws.com/dev/api/updateuserdetails', { ...userMessage });
    const payload = JSON.parse(response.data.body)
    dispatch(updateUserDetails(payload))
    dispatch(updateUserInterviewHistoryData(payload))
    setIsDataPosted(true)
  } catch (error) {
    console.error('Error:', error);
  }
}
const FeedbackDisplay = () => {

  const { allQuestionAnswerFeedbackData,  failedFeedbackAPICallQueue, jwtToken, userDetails } = useAppSelector((state) => state.interview)
  const { credit, userId } = userDetails
  const [isDataPosted, setIsDataPosted] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const apiFeedbackCall = feedbackPostCall(dispatch, failedFeedbackAPICallQueue, jwtToken)
  useEffect(() => {
    //implement failed API calls here
    if(failedFeedbackAPICallQueue.length > 0){
        failedFeedbackAPICallQueue.forEach((payload) => apiFeedbackCall(payload))
    }
},[])
useEffect(() => {
  window.history.pushState({}, '', window.location.href);
  const handlePopState = (e:any) => {
    e.preventDefault();
    if (window.confirm('Your Interview is completed wanna go back to Home Page?')) {
      navigate('/'); // Redirects to home page if confirmed
    } else {
      // The user has chosen to stay, push a new state into the history
      window.history.pushState(null, document.title, window.location.href);
    }

  };

  window.addEventListener('popstate', handlePopState);

  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
}, [navigate]);
useEffect(() => {
  if(!isDataPosted){
    updateUserInterviewDetails({allQuestionAnswerFeedbackData, jwtToken, userId, credit, setIsDataPosted, dispatch})
  }
},[])

  

  const submitFeedbackHandler = () => {
    navigate('/user-feedback')
  }
  const userScore = allQuestionAnswerFeedbackData.map((feedback) => Number(feedback.rating)).reduce((a,b) => a+b,0)
  const idealScore = allQuestionAnswerFeedbackData.length * 10
    return (
        <div className = "flex flex-col feedback-parent">
          <div className="flex flex-col gap-6">
            <div className="align-center">
              <p>Yay! You have successfully completed your mock interview.</p>
              <p className="feedback-answer">Interview Score: {userScore} / {idealScore}</p>
            </div>
            <div className="flex flex-col gap-4">
              {allQuestionAnswerFeedbackData.map((singleInstance:QuestionAnswerFeedback, index) => {
                return (
                  <FeedbackCard samples = {singleInstance} index = {index}/>
                )
              })}
            </div>
          </div>
          <Button color = 'primary' onPress = {submitFeedbackHandler}>Submit Feedback</Button>
        </div>
    )
}
export default FeedbackDisplay