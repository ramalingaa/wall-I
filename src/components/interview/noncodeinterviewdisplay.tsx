import { SpeechSegment, stateToString, useSpeechContext } from '@speechly/react-client';
import { QuestionAnswerFeedback } from '../../redux/reducer';
import { useAppSelector } from '../../hooks/redux';
import { questionData } from '../../pages/interview';

const NonCodeInterviewDisplay = (props:any) => {
    const { allQuestionAnswerData, allQuestionAnswerFeedbackData } = useAppSelector((state) => state.counter)

    return (<div>
      <div className="left">
        <h1 className="title">Your Interview Assistant: Wall-E</h1>
        <div className="status">
          <code>
            Client: <span>{stateToString(props.clientState)}</span>
          </code>
          <code> &middot; </code>
          <code>
            Microphone: <span>{props.microphoneState}</span>
          </code>
        </div>
        <div className="toolbar">
          <button onClick={props.handlerStartInterview} disabled={props.isInterviewStarted}>Start the Interview</button>
          <button onClick={props.handlerStopAnswer} disabled={props.currentQuestionIndex.current > 0 ? props.isAnswerSubmitted : !props.isInterviewStarted || props.isAnswerSubmitted}>Submit answer for this question</button>
          <button onClick={props.handleNextQuestionPress} disabled={!props.isAnswerSubmitted}>
            {props.currentQuestionIndex.current === questionData.length - 1 ? "Get the feedback" : "Next Question"}
          </button>
        </div>
        <div className="timer">
          {props.isTimerOn && <p>{props.timer}</p>}
        </div>
        <div>
          {props.isInterviewCompleted && <div>
            {allQuestionAnswerFeedbackData.map((singleInstance:QuestionAnswerFeedback) => {
              return <div key={singleInstance.feedback}>
                <p><b>Question:</b>{singleInstance.question}</p>
                <p><b>Your Answer:</b>{singleInstance.answer}</p>
                <p><b>Agent Feedback:</b>{singleInstance.feedback}</p>
              </div>;
            })}
          </div>}
        </div>
      </div>
      <div className="right">
        <div>
          {props.tentative && props.tentative}
        </div>
      </div>
    </div>);
  }
  export default NonCodeInterviewDisplay