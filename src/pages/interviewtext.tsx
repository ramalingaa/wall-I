import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import "./interviewtext.css"
import { feedbackPostCall } from './interview'
import { useNavigate } from 'react-router-dom'

const InterviewText = (props:any) => {
    const { failedFeedbackAPICallQueue } = useAppSelector((state) => state.interview)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [isAnswerSubmittedForText, setIsAnswerSubmittedForText] = useState<boolean>(false)
    const  { questionDataForInterview } = useAppSelector((state) => state.interview)
    const [currentQuestionAnswer, setCurrentQuestionAnswer] =useState<string>("")
    const [answerFieldErrorMsg, setAnswerFieldErrorMsg] = useState<string>("")
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const apiFeedbackCall = feedbackPostCall(dispatch, failedFeedbackAPICallQueue)

    const answerErrors = {
        emptyAnswer: "Please Write Your Answer in the above box",
        minCharLimit: "Answer should be minimum of 100 characters length. White Space is not Counted",
        maxCharLimit: "Answer should not exceed 1000 characters length White Space is not Counted"
    }
    useEffect(() => {
        //implement failed API calls here
        if(failedFeedbackAPICallQueue.length > 0){
            failedFeedbackAPICallQueue.forEach((payload) => apiFeedbackCall(payload))

        }


    },[currentQuestion])
    const textInputSubmitAnswerHandler = () => {
       if (!answerFieldErrorMsg && currentQuestionAnswer) {
        setIsAnswerSubmittedForText(true)
        const payload = {
            question:questionDataForInterview[currentQuestion],
            answer: currentQuestionAnswer
        }
        try {
            apiFeedbackCall(payload)
        }catch (e){
            console.log(e)
        }
       }
    }
    const answerChangeHandler = (e:any) => {
        setCurrentQuestionAnswer(e.target.value)
        if(e.target.value.replace(/\s/g, '').length < 100){
            setAnswerFieldErrorMsg(answerErrors.minCharLimit)
        }else if(e.target.value.replace(/\s/g, '').length > 1000){
            setAnswerFieldErrorMsg(answerErrors.maxCharLimit)
        } else {
            setAnswerFieldErrorMsg("")
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
    const pastePreventHandler = (e:any) => {
        e.preventDefault()
        alert('Pasting is not allowed in this textarea. Please type your Answer.');
    }
  return (
    <div className = "align-interviewtext interviewtext-parent">
        <div className='align-interviewtext interviewtext-question'>
            <p className='section-header'>Current Question</p>
            <p>{questionDataForInterview[currentQuestion]}</p>
            
        </div>
        <div className='align-interviewtext interviewtext-textarea'>
            <p className='section-header'>Write Your Answer Here</p>
            <textarea  className='userinput-textarea dynamic-textarea' onChange = {answerChangeHandler} onPaste = {pastePreventHandler} value = {currentQuestionAnswer}>
                
                </textarea>
                <p className='error-visible'>{answerFieldErrorMsg}</p>
        </div>
        <div>
            <button className =  {isAnswerSubmittedForText ? "btn disabled" : "btn btn-active"} onClick = {textInputSubmitAnswerHandler} disabled = {isAnswerSubmittedForText}>Submit Answer</button>
            <button className = {!isAnswerSubmittedForText ? "btn disabled" : "btn btn-active"} onClick = {textInputNextQuestionHandler} disabled = {!isAnswerSubmittedForText}>{currentQuestion+1 === questionDataForInterview.length ? "Get Feedback" : "Next Question"}</button>
        </div>
    </div>
  )
}

export default InterviewText