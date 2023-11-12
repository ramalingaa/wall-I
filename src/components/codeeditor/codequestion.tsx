import React from 'react'
import "./codequestion.css"
import { useAppSelector } from '../../hooks/redux'
const CodeQuestion = (props:any) => {
  const { questionData,currentQuestionIndex} = props
  const { question, suggestions, example } = questionData
  const { nonDSAquestionDataForInterview, dsaQuestionDataForInterview } = useAppSelector((state) => state.interview)
  let questionExample = example;
  if(typeof example === 'string'){
    questionExample = JSON.parse(example)
  }
  // from question remove DSA: and display remaining part

  const currentQuestion = question.replace("DSA: ", "")
  return (
    <div className = "code-question_parent">
        <div className='flex code-question_header'>
          <p>Description</p>
          <p>Current Question: {currentQuestionIndex + 1 + nonDSAquestionDataForInterview.length}/{nonDSAquestionDataForInterview.length + dsaQuestionDataForInterview.length}</p>
        </div>
        <div className='code-question_description'>
            <p>{currentQuestion}</p>
            <p>{suggestions}</p>
            <div>
                <b>Example: </b>
                <div className="exampleQuestion_details">
                    <p>Input: <span>{JSON.stringify(questionExample?.input)}</span></p>
                    <p>Output: <span>{JSON.stringify(questionExample?.output)}</span></p>
                    <p>Explanation: <span>{questionExample?.explanation}</span></p>
         
                </div>
            </div>
         </div>
            
    </div>
  )
}

export default CodeQuestion