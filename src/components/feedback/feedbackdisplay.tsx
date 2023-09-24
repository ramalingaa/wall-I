import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { QuestionAnswerFeedback } from "../../redux/reducer";
import "./feedbackdisplay.css"
import { feedbackPostCall } from "../../pages/interview";
import { BallTriangle } from "react-loader-spinner";

const FeedbackDisplay = () => {
  const { allQuestionAnswerFeedbackData, failedFeedbackAPICallQueue } = useAppSelector((state) => state.interview)
  const dispatch = useAppDispatch()
  const apiFeedbackCall = feedbackPostCall(dispatch, failedFeedbackAPICallQueue)
  useEffect(() => {
    //implement failed API calls here
    if(failedFeedbackAPICallQueue.length > 0){
        failedFeedbackAPICallQueue.forEach((payload) => apiFeedbackCall(payload))
    }
},[])
  const samples = [
    {
      question: "Where is Paris located?",
      answer: "Paris is in India",
      feedback: "Paris is in France",
      rating: 0
    },
    {
      question: "What is the capital of Japan?",
      answer: "The capital of Japan is Tokyo",
      feedback: "The capital of Japan is Kyoto",
      rating: 7
    },
    {
      question: "What is the largest mammal?",
      answer: "The largest mammal is the blue whale",
      feedback: "The largest mammal is the elephant",
      rating: 9
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      answer: "The play 'Romeo and Juliet' was written by William Shakespeare",
      feedback: "The play 'Romeo and Juliet' was written by Christopher Marlowe",
      rating: 10
    },
    {
      question: "What is the chemical symbol for gold?",
      answer: "The chemical symbol for gold is Au",
      feedback: "The chemical symbol for gold is G",
      rating: 5
    },
    {
      question: "What is the capital of Brazil?",
      answer: "The capital of Brazil is Brasília",
      feedback: "The capital of Brazil is Rio de Janeiro",
      rating: 8
    }
  ];
  const answerSegment = (rating: number) => {
    if(rating >= 7){
      return "correct"
    }else if (rating < 7 && rating > 3) {
      return "partially-correct"
    } else if (rating < 3 && rating >=0) {
      return "incorrect"
    }
  }
  const userScore = allQuestionAnswerFeedbackData.map((feedback) => Number(feedback.rating)).reduce((a,b) => a+b,0)
  const idealScore = allQuestionAnswerFeedbackData.length * 10
    return (
        <div>
            {!failedFeedbackAPICallQueue.length ? <div className="feedback-container-parent">
          <div>
            <p>Yay! You have successfully completed your mock interview.</p>
            <p className="feedback-answer">Interview Score: {userScore} / {idealScore}</p>
          </div>
            {allQuestionAnswerFeedbackData.map((singleInstance:QuestionAnswerFeedback) => {
              return <div key={singleInstance.feedback} className="feedback-single-container">
                <p className="feedback-question"><b>Question: </b>{singleInstance.question}</p>
                <ul className="feedback-step">
                  <li className={answerSegment(Number(singleInstance.rating))}><b>Your Answer: </b>{singleInstance.answer}</li>
                  <li className="feedback-feedback"><b>Agent Feedback: </b>{singleInstance.feedback}</li>
                  <li className={answerSegment(Number(singleInstance.rating))}><b>Score: </b>{singleInstance.rating} out of 10</li>         
                </ul>
              </div>;
            })}
        </div> :<div className = "loader-container">
        <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass="loading-balls-wrapper"
            visible={true}/>
        <p>One step Closer, Sit back and Relax while we create your Score card</p>
    </div>}
        </div>
    )
}
export default FeedbackDisplay