import { useAppSelector } from "../../hooks/redux";
import { QuestionAnswerFeedback } from "../../redux/reducer";
import "./feedbackdisplay.css"

const FeedbackDisplay = (props:any) => {
  const { signOut } = props
  const { allQuestionAnswerFeedbackData } = useAppSelector((state) => state.counter)


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