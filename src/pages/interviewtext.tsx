import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import "./interviewtext.css"
import { feedbackPostCall } from './interview'
import { useNavigate } from 'react-router-dom'

const InterviewText = (props:any) => {
    const { failedFeedbackAPICallQueue } = useAppSelector((state) => state.interview)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [isAnswerSubmittedForText, setIsAnswerSubmittedForText] = useState<boolean>(false)
    const  {  questionDataForInterview } = useAppSelector((state) => state.interview)
    const [currentQuestionAnswer, setCurrentQuestionAnswer] =useState<string>("")
    const [answerFieldErrorState, setAnswerFieldErrorState] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const apiFeedbackCall = feedbackPostCall(dispatch, failedFeedbackAPICallQueue)
    useEffect(() => {
        //implement failed API calls here
        if(failedFeedbackAPICallQueue.length > 0){
            failedFeedbackAPICallQueue.forEach((payload) => apiFeedbackCall(payload))

        }


    },[currentQuestion])
    const textInputSubmitAnswerHandler = () => {
       if (currentQuestionAnswer) {
        setIsAnswerSubmittedForText(true)
        setAnswerFieldErrorState(false)
        const payload = {
            question:questionDataForInterview[currentQuestion],
            answer: currentQuestionAnswer
        }
        console.log(payload)
        try {
            apiFeedbackCall(payload)
        }catch (e){
            console.log(e)
        }
       } else {
            setAnswerFieldErrorState(true)
       }
    }
    const answerChangeHandler = (e:any) => {
        if(e.target.value){
            setCurrentQuestionAnswer(e.target.value)
            setAnswerFieldErrorState(false)

        }else {
            setAnswerFieldErrorState(true)
            setCurrentQuestionAnswer("")
        }
    }
    const textInputNextQuestionHandler = () => {
        if(currentQuestion+1 === questionDataForInterview.length){
            navigate("/feedback")
        }else {
            setCurrentQuestion((prev) => ++prev)
            setIsAnswerSubmittedForText(false)
            setCurrentQuestionAnswer("")
        }
        
    }
  return (
    <div className = "align-interviewtext interviewtext-parent">
        <div className='align-interviewtext interviewtext-question'>
            <p className='section-header'>Current Question</p>
            <p>{questionDataForInterview[currentQuestion]}</p>
            
        </div>
        <div className='align-interviewtext interviewtext-textarea'>
            <p className='section-header'>Write Your Answer Here</p>
            <textarea  className='userinput-textarea dynamic-textarea' onChange = {answerChangeHandler} value = {currentQuestionAnswer}>
                
                </textarea>
                <p className={answerFieldErrorState? "error-visible": "error-hidden"}>Please Write Your Answer in the above box</p>
        </div>
        <div>
            <button className =  {isAnswerSubmittedForText ? "btn disabled" : "btn btn-active"} onClick = {textInputSubmitAnswerHandler} disabled = {isAnswerSubmittedForText}>Submit Answer</button>
            <button className = {!isAnswerSubmittedForText ? "btn disabled" : "btn btn-active"} onClick = {textInputNextQuestionHandler} disabled = {!isAnswerSubmittedForText}>{currentQuestion+1 === questionDataForInterview.length ? "Get Feedback" : "Next Question"}</button>
        </div>
    </div>
  )
}

export default InterviewText