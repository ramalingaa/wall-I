
import { useEffect, useRef, useState } from "react"
import "./codeeditor.css"
import SingleEditor from "./singleeditor";
import SplitPane from 'react-split-pane';
import './resizer.css';
import CodeQuestion from "./codequestion";
import {  useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";

const CodeEditor = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

    const { dsaQuestionDataForInterview } = useAppSelector((state) => state.interview)
    const navigate = useNavigate()
    useEffect(() => {
        window.history.pushState({}, '', window.location.href);
        const handlePopState = (e:any) => {
          e.preventDefault();
          if (window.confirm('Do you want to cancel Your Interview?')) {
            navigate('/'); // Redirects to home page if confirmed
          } else {
            // The user has chosen to stay, push a new state into the history
            window.history.pushState(null, document.title, window.location.href);
          }
    
        };
        window.addEventListener('popstate', handlePopState);
    
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      }, [navigate]);
    const nextQuestionClickHandler = () => {
        if(dsaQuestionDataForInterview.length === currentQuestionIndex + 1){
            navigate("/feedback")
        } else {
            setCurrentQuestionIndex((prev) => prev + 1)
        }
    }
    return(
        <div className="editor-parent">
                {/* @ts-ignore */}
                <SplitPane split="vertical" minSize = "20%" defaultSize="40%" allowResize = {true}>
                    <CodeQuestion questionData = {dsaQuestionDataForInterview[currentQuestionIndex]} currentQuestionIndex = {currentQuestionIndex}/>
                    <SingleEditor nextQuestionClickHandler = {nextQuestionClickHandler} currentQuestionIndex = { currentQuestionIndex}/>
                </SplitPane>

          </div>
    )
}
export default CodeEditor