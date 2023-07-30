
import { useEffect, useRef, useState } from "react"
import { questionData } from "../../pages/interview"
import CodeEditor from "../codeeditor/codeeditor"
import CodeEditorJS from "../codeeditor/codeeditorjs"
import "./coding.css"
import { Allotment } from "allotment"
const CodingInterviewDisplay = (props:any) => {
    const { currentQuestionIndex,  handleNextQuestionPress, setTimeTakenToSolveCodingQn, editorRef, handleSubmitAnswer, isAnswerSubmitted, setIsAnswerSubmitted} = props
    const questionToDisplay = questionData[currentQuestionIndex?.current] && questionData[currentQuestionIndex?.current].replace("code:","")
    const intervalId = useRef<NodeJS.Timer | number | undefined>(undefined)

    // useEffect(() => {
    //     intervalId.current = setInterval(() =>{
    //         setTimeTakenToSolveCodingQn((prev) => ++prev)
    //     },1000)
    //     return () => {
    //         if (intervalId.current) {
    //           clearInterval(intervalId.current as NodeJS.Timer);
    //         }
    //       };
    // }, [])
    return (
    <div className="coding-container-parent">
        <Allotment vertical = {false}  defaultSizes={[50,50]}>
            <div className="coding-container-left">
                <div className = "coding-btn-container">
                    <button onClick={handleSubmitAnswer} disabled={isAnswerSubmitted} className={`btn ${isAnswerSubmitted ? "disabled" :"btn-active" }`}>Submit Answer</button>
                        <button onClick={handleNextQuestionPress} disabled={!isAnswerSubmitted} className={`btn ${!isAnswerSubmitted ? "disabled" :"btn-active" }`}>Next Question</button>
                </div>
                <div>
                    <h3>{questionToDisplay}</h3>               
                </div>
            </div>
            <div className="coding-container-right">
                <CodeEditorJS editorRef = {editorRef}/>
            </div>
        </Allotment>       
    </div>)
}
export default CodingInterviewDisplay