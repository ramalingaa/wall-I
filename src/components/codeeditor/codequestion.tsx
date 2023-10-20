import React from 'react'
import "./codequestion.css"
const CodeQuestion = (questionData:any) => {
  const { question, suggestions, example } = questionData.questionData
  return (
    <div className = "code-question_parent">
        <div className='code-question_header'>Description</div>
        <div className='code-question_description'>
            <p>{question}</p>
            <p>{suggestions}</p>
            <div>
                <b>Example: </b>
                <div className="exampleQuestion_details">
                    <p>Input: <span>{JSON.stringify(example?.input)}</span></p>
                    <p>Output: <span>{JSON.stringify(example?.output)}</span></p>
                    <p>Explanation: <span>{example?.explanation}</span></p>
         
                </div>
            </div>
         </div>
            
    </div>
  )
}

export default CodeQuestion