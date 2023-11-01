import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import "./interviewtext.css"
import { feedbackPostCall } from '../interviewaudio/interview'
import { useNavigate } from 'react-router-dom'
import {Card, CardBody, Textarea, CardHeader, Button} from "@nextui-org/react";

const InterviewText = () => {
    const { failedFeedbackAPICallQueue, jwtToken, nonDSAquestionDataForInterview, dsaQuestionDataForInterview } = useAppSelector((state) => state.interview)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [isAnswerSubmittedForText, setIsAnswerSubmittedForText] = useState<boolean>(false)
    const [currentQuestionAnswer, setCurrentQuestionAnswer] =useState<string>("")
    const [answerFieldErrorMsg, setAnswerFieldErrorMsg] = useState<string>("")
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const apiFeedbackCall = feedbackPostCall(dispatch, failedFeedbackAPICallQueue, jwtToken)

    const answerErrors = {
        emptyAnswer: "Please Write Your Answer in the above box",
        minCharLimit: "Answer should be minimum of 25 characters length. White Space is not Counted",
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
            question:nonDSAquestionDataForInterview[currentQuestion],
            answer: currentQuestionAnswer
        }
        try {
            apiFeedbackCall(payload)
        }catch (e){
            console.log(e)
        }
       } else {
        setAnswerFieldErrorMsg(answerErrors.emptyAnswer)
       }
    }
    const answerChangeHandler = (e:any) => {
        setCurrentQuestionAnswer(e.target.value)
        if(!e.target.value) {
            setAnswerFieldErrorMsg(answerErrors.emptyAnswer)
        }
        else if(e.target.value.replace(/\s/g, '').length < 25){
            setAnswerFieldErrorMsg(answerErrors.minCharLimit)
        }else if(e.target.value.replace(/\s/g, '').length > 1000){
            setAnswerFieldErrorMsg(answerErrors.maxCharLimit)
        } else {
            setAnswerFieldErrorMsg("")
        }
           
    }
    const textInputNextQuestionHandler = () => {
            if(currentQuestion+1 === nonDSAquestionDataForInterview.length && dsaQuestionDataForInterview.length === 0){
                navigate("/feedback")
            }else if(currentQuestion+1 === nonDSAquestionDataForInterview.length && dsaQuestionDataForInterview.length > 0){
                navigate("/code-editor")
            }
            else {
                setCurrentQuestion((prev) => ++prev)
                setIsAnswerSubmittedForText(false)
                setCurrentQuestionAnswer("")
            }

    }
    const pastePreventHandler = (e:any) => {
        e.preventDefault()
        alert('Pasting is not allowed in this textarea. Please type your Answer.');
    }
    const textInputQuestionSkipHandler = () => {
        textInputNextQuestionHandler()
    }
  return (
    <div className = "interview-text-parent pt-6">
            <Card className="w-full align-center pb-4 interviewtext-card-container">
                    <CardHeader className="feedback-header">
                        <div>
                            <p>{nonDSAquestionDataForInterview[currentQuestion]}</p>
                        </div>
                        <div>
                            <p>Current Question: {currentQuestion + 1}/ {nonDSAquestionDataForInterview.length}</p>
                        </div>
                    </CardHeader>
                    <CardBody className = "flex flex-col gap-2 textarea-container">   
                        <Textarea
                                isInvalid={false}
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Enter your Answer Here"
                                errorMessage=""
                                minRows = {20}
                                maxRows = {30}
                                fullWidth = {true}
                                className="w-full textarea-interview"
                                onPaste = {pastePreventHandler}
                                onChange = {answerChangeHandler}
                                value = {currentQuestionAnswer}
                                />
                        <p className='text-red-600 align-center'>{answerFieldErrorMsg}</p>
                    </CardBody>
                    <div className = "flex gap-6 justify-center">
                        <Button color="primary" onPress = {textInputSubmitAnswerHandler} isDisabled = {isAnswerSubmittedForText}>Submit</Button>
                        <Button color="primary" onClick = {textInputNextQuestionHandler} isDisabled = {!isAnswerSubmittedForText}>{(currentQuestion+1 === nonDSAquestionDataForInterview.length && dsaQuestionDataForInterview.length === 0) ? "Get Feedback" : "Proceed Next"}</Button>
                        <Button color="primary" onClick = {textInputQuestionSkipHandler}>Skip</Button>
                    </div>
              </Card>
    </div>
  )
}

export default InterviewText

//<div className='align-interviewtext interviewtext-question'>
// {/* <p className='section-header'>Current Question: {currentQuestion + 1}/ {nonDSAquestionDataForInterview.length}</p>
// <p>{nonDSAquestionDataForInterview[currentQuestion]}</p>

// </div>
// <div className='align-interviewtext interviewtext-textarea'>
// <p className='section-header'>Write Your Answer Here</p>
// <textarea  className='userinput-textarea dynamic-textarea' onChange = {answerChangeHandler} onPaste = {pastePreventHandler} value = {currentQuestionAnswer}>
    
//     </textarea>
//     <p className='error-visible'>{answerFieldErrorMsg}</p>
// </div>
// <div>
// <button className =  {isAnswerSubmittedForText ? "btn disabled" : "btn btn-active"} onClick = {textInputSubmitAnswerHandler} disabled = {isAnswerSubmittedForText}>Submit Answer</button>
// <button className = {!isAnswerSubmittedForText ? "btn disabled" : "btn btn-active"} onClick = {textInputNextQuestionHandler} disabled = {!isAnswerSubmittedForText}>{(currentQuestion+1 === nonDSAquestionDataForInterview.length && dsaQuestionDataForInterview.length === 0) ? "Get Feedback" : "Next Question"}</button>
// </div> */}
