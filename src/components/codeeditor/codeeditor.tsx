
import { useEffect, useRef, useState } from "react"
import "./codeeditor.css"
import SingleEditor from "./singleeditor";
import SplitPane, { Pane } from 'react-split-pane';
import './resizer.css';
import CodeQuestion from "./codequestion";
import {  useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";

const CodeEditor = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

    const { dsaQuestionDataForInterview } = useAppSelector((state) => state.interview)
    const navigate = useNavigate()
    const nextQuestionClickHandler = () => {
        if(dsaQuestionDataForInterview.length === currentQuestionIndex + 1){
            navigate("/feedback")
        } else {
            setCurrentQuestionIndex((prev) => prev + 1)
        }
    }

    return(
        <div className="editor-parent">
                <SplitPane split="vertical" minSize = "20%" defaultSize="40%" allowResize = {true}>
                    <CodeQuestion questionData = {dsaQuestionDataForInterview[currentQuestionIndex]}/>
                    <SingleEditor nextQuestionClickHandler = {nextQuestionClickHandler} currentQuestionIndex = { currentQuestionIndex}/>
                </SplitPane>

          </div>
    )
}
export default CodeEditor