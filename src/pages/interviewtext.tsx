import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import "./interviewtext.css"
import { feedbackPostCall } from './interview'

const InterviewText = (props:any) => {
    const { setIsInterviewCompleted } = props
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const  {  questionDataForInterview } = useAppSelector((state) => state.interview)
    const [currentQuestionAnswer, setCurrentQuestionAnswer] =useState<string>("")
    const dispatch = useAppDispatch()
    const apiFeedbackCall = feedbackPostCall(dispatch)
    const textInputSubmitAnswerHandler = () => {
        const payload = {
            question:questionDataForInterview[currentQuestion],
            answer: currentQuestionAnswer
        }
        console.log(payload)
        // try {
        //     apiFeedbackCall(payload)
        // }catch (e){
        //     console.log(e)
        // }
    }
    const answerChangeHandler = (e:any) => {
        setCurrentQuestionAnswer(e.target.value)
    }
    const textInputNextQuestionHandler = () => {
        if(currentQuestion+1 === questionDataForInterview.length){
            setIsInterviewCompleted(true)
        }else {
            setCurrentQuestion((prev) => ++prev)
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
            <textarea rows={15} cols = {120} className='userinput-textarea' onChange = {answerChangeHandler}>
                
                </textarea>
        </div>
        <div>
            <button className = "btn btn-primary" onClick = {textInputSubmitAnswerHandler}>Submit Answer</button>
            <button className = "btn btn-primary" onClick = {textInputNextQuestionHandler}>{currentQuestion+1 === questionDataForInterview.length ? "Get Feedback" : "Next Question"}</button>
        </div>
    </div>
  )
}

export default InterviewText