import { SpeechSegment, stateToString, useSpeechContext } from '@speechly/react-client';
import "./noncoding.css"
import "./noncoding.css"
import { useAppSelector } from '../../hooks/redux';
const NonCodeInterviewDisplay = (props:any) => {
  const {  nonDSAquestionDataForInterview } = useAppSelector((state) => state.interview)

    const btnStatusArray = [props.isInterviewStarted, props.currentQuestionIndex.current > 0 ? props.isAnswerSubmitted : !props.isInterviewStarted || props.isAnswerSubmitted, !props.isAnswerSubmitted]
    return (
      <div className="noncoding-container">
        <div>
          <code className="device-status">
            Your Device: <span className= { stateToString(props.clientState) === 'Connected' ? "connected" : "notconnected"}>{stateToString(props.clientState)}</span>
          </code>
          <code> &middot; | &middot; </code>
          <code className = "microphone-status">
            Microphone: <span className= {props.microphoneState === "Started" ? 'connected' : 'notconnected'}>{props.microphoneState}</span>
          </code>
        </div>
        <div>
          {props.isQuestionCompleted && <p className = "blinking-iconText"><i className="fa fa-circle danger blink"></i> Start Speaking</p>}
          <h2 className = "current-display-question">{
            nonDSAquestionDataForInterview[props.currentQuestionIndex.current]
          }
          </h2>
        </div>
        <div className="noncoding-button-container">
            <button onClick={props.handlerStartInterview} disabled={props.isInterviewStarted} className= {`btn ${btnStatusArray[0] ? "": " btn-active"}`} id="start-interview-button">Start the Interview</button>
            <button onClick={props.handlerStopAnswer} disabled={btnStatusArray[1]} className={`btn ${btnStatusArray[1] ? "": " btn-active"}`} id = "btn-stop-answer">Submit answer for this question</button>
            <button onClick={props.handleNextQuestionPress} disabled={btnStatusArray[2]} className={`btn ${btnStatusArray[2] ? "": " btn-active"}`} id = "btn-next">
              {props.currentQuestionIndex.current === nonDSAquestionDataForInterview.length - 1 ? "Get the feedback" : "Next Question"}
            </button>
        </div>     
      </div>
  );
  }
  export default NonCodeInterviewDisplay