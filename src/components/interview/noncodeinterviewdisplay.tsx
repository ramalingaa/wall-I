import { SpeechSegment, stateToString, useSpeechContext } from '@speechly/react-client';
import { QuestionAnswerFeedback } from '../../redux/reducer';
import "./noncoding.css"
import { useAppSelector } from '../../hooks/redux';
import { questionData } from '../../pages/interview';
import "./noncoding.css"
const NonCodeInterviewDisplay = (props:any) => {
    const { allQuestionAnswerData, allQuestionAnswerFeedbackData } = useAppSelector((state) => state.counter)
    const btnStatusArray = [props.isInterviewStarted, props.currentQuestionIndex.current > 0 ? props.isAnswerSubmitted : !props.isInterviewStarted || props.isAnswerSubmitted, !props.isAnswerSubmitted]
    console.log(props.microphoneState)
    return (
      <div className="noncoding-container">
        <div className="">
          <code>
            Your Device: <span className= { stateToString(props.clientState) === 'Connected' ? "connected" : "notconnected"}>{stateToString(props.clientState)}</span>
          </code>
          <code> &middot; | &middot; </code>
          <code>
            Microphone: <span className= {props.microphoneState === "Started" ? 'connected' : 'notconnected'}>{props.microphoneState}</span>
          </code>
        </div>
        <div>
            <p className="current-qn-text">{questionData[props.currentQuestionIndex.current]}</p>
        </div>
        <div className="noncoding-button-container">
            <button onClick={props.handlerStartInterview} disabled={props.isInterviewStarted} className= {`btn ${btnStatusArray[0] ? "": " btn-active"}`}>Start the Interview</button>
            <button onClick={props.handlerStopAnswer} disabled={btnStatusArray[1]} className={`btn ${btnStatusArray[1] ? "": " btn-active"}`}>Submit answer for this question</button>
            <button onClick={props.handleNextQuestionPress} disabled={btnStatusArray[2]} className={`btn ${btnStatusArray[2] ? "": " btn-active"}`}>
              {props.currentQuestionIndex.current === questionData.length - 1 ? "Get the feedback" : "Next Question"}
            </button>
        </div>
        
      </div>
  );
  }
  export default NonCodeInterviewDisplay