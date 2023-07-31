import { useAppSelector } from "../../hooks/redux";
import { QuestionAnswerFeedback } from "../../redux/reducer";
import "./feedbackdisplay.css"

const FeedbackDisplay = () => {
  const { allQuestionAnswerFeedbackData } = useAppSelector((state) => state.counter)
//   const allQuestionAnswerFeedbackData = [{
//     question:"What is hoisting? Which out of let, var, and const are hoisted",
//     answer:"christie is a concept where variables are hoisted and also move to the top of the",
//     feedback:" The answer provided is not accurate and does not completely answer the question. Hoisting is a concept in JavaScript where variables and functions are moved to the top of their scope before code execution. Only 'var' of the three options given ('let', 'var', 'const') is hoisted while 'let' and 'const' are not hoisted. A better way of answering the question is: Hoisting is a concept in JavaScript where variables declared with the keyword 'var' are moved to the top of their scope before code execution. This means that 'var' variables can be used before they are declared in the code. On the other hand, 'let' and 'const' are not hoisted and can only be used after they are declared."
//   },{
//     question:"what is a callback function?",
//     answer:"in javascript called functions are used to call any actions that need to be performed after an event let's say we have an event that actually",
//     feedback:" The answer given is not accurate and is incomplete. A callback function is any function that is passed as an argument to another function and is executed after the completion of the latter function. It is used to perform actions after an event has occurred. A better way of answering the question is A callback function is a function that is passed as an argument to another function and is executed after the completion of the latter function. It is used to perform actions after an event has occurred."
//   },{
//     question:"codeDSA: write a function to find maximum and minimum of given array",
// answer:"console.log('Hello World!')",
// feedback:" This answer does not provide an appropriate solution for the question. The correct way to answer this question is to use the Math.max() and Math.min() functions of JavaScript to loop through the given array. Here is an example of the correct code: const array = [1,2,3,4,5]; let minNum = Math.min(...array); let maxNum = Math.max(...array); console.log(Max number:  + maxNum); console.log(Min number:  + minNum);"
//   }]

    return (
        <div className="feedback-container-parent">
          <div>
            <p>Yay! You have successfully completed your mock interview.</p>
          </div>
            {allQuestionAnswerFeedbackData.map((singleInstance:QuestionAnswerFeedback) => {
              return <div key={singleInstance.feedback} className="feedback-single-container">
                <p><b>Question: </b>{singleInstance.question}</p>
                <p><b>Your Answer: </b>{singleInstance.answer}</p>
                <p><b>Agent Feedback: </b>{singleInstance.feedback}</p>
              </div>;
            })}
        </div>
    )
}
export default FeedbackDisplay