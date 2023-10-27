import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import InterviewText from '../interviewtext'

const InterviewLandingPage = () => {
    const { nonDSAquestionDataForInterview } = useAppSelector((state) => state.interview)
    const [currentQuestion, setCurrentQuestion] = useState(0)


  return (
    <div>

        <InterviewText currentQuestion = {currentQuestion} setCurrentQuestion = { setCurrentQuestion }/>
    </div>
  )
}

export default InterviewLandingPage