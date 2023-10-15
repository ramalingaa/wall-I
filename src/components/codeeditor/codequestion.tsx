import React from 'react'
import "./codequestion.css"
const CodeQuestion = () => {
    const exampleQuestionData = {
        question: "Given a list of integers nums and an integer target, find two numbers in the list that add up to the target and return their indices.",
        suggestions: [
          "You may assume that each input would have exactly one solution.",
          "You may not use the same element twice.",
          "You can return the answer in any order."
        ],
        example: {
          input: {
            nums: [
              2,
              7,
              11,
              15
            ],
            target: 9
          },
          output: [
            0,
            1
          ],
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        }
      }
  return (
    <div className = "code-question_parent">
        <div className='code-question_header'>Description</div>
        <div className='code-question_description'>
            <p>{exampleQuestionData.question}</p>
            <div>
                
            {
                exampleQuestionData.suggestions.map((suggestion, index) => {
                 return(<p key = {index}>{suggestion}</p>)})
            }
            </div>
            <div >
                <b>Example: </b>
                <div className="exampleQuestion_details">
                    <p>Input: <span>nums = {JSON.stringify(exampleQuestionData.example.input.nums)}</span> <span>target: {exampleQuestionData.example.input.target}</span></p>
                    <p>Output: <span>{JSON.stringify(exampleQuestionData.example.output)}</span></p>
                    <p>Explanation: <span>{exampleQuestionData.example.explanation}</span></p>
         
                </div>
            </div>


            <div>
                
                {
                    exampleQuestionData.suggestions.map((suggestion, index) => {
                     return(<p key = {index}>{suggestion}</p>)})
                }
                </div>
                <div >
                    <b>Example: </b>
                    <div className="exampleQuestion_details">
                        <p>Input: <span>nums = {JSON.stringify(exampleQuestionData.example.input.nums)}</span> <span>target: {exampleQuestionData.example.input.target}</span></p>
                        <p>Output: <span>{JSON.stringify(exampleQuestionData.example.output)}</span></p>
                        <p>Explanation: <span>{exampleQuestionData.example.explanation}</span></p>
             
                    </div>
                </div>

                <div>
                
                {
                    exampleQuestionData.suggestions.map((suggestion, index) => {
                     return(<p key = {index}>{suggestion}</p>)})
                }
                </div>
                <div >
                    <b>Example: </b>
                    <div className="exampleQuestion_details">
                        <p>Input: <span>nums = {JSON.stringify(exampleQuestionData.example.input.nums)}</span> <span>target: {exampleQuestionData.example.input.target}</span></p>
                        <p>Output: <span>{JSON.stringify(exampleQuestionData.example.output)}</span></p>
                        <p>Explanation: <span>{exampleQuestionData.example.explanation}</span></p>
             
                    </div>
                </div>
                <div>
                
                {
                    exampleQuestionData.suggestions.map((suggestion, index) => {
                     return(<p key = {index}>{suggestion}</p>)})
                }
                </div>
                <div >
                    <b>Example: </b>
                    <div className="exampleQuestion_details">
                        <p>Input: <span>nums = {JSON.stringify(exampleQuestionData.example.input.nums)}</span> <span>target: {exampleQuestionData.example.input.target}</span></p>
                        <p>Output: <span>{JSON.stringify(exampleQuestionData.example.output)}</span></p>
                        <p>Explanation: <span>{exampleQuestionData.example.explanation}</span></p>
             
                    </div>
                </div>
         </div>
            
    </div>
  )
}

export default CodeQuestion