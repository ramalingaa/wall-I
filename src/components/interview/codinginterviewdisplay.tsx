
import { questionData } from "../../pages/interview"
import CodeEditor from "../codeeditor/codeeditor"
import CodeEditorJS from "../codeeditor/codeeditorjs"
import "./coding.css"
const CodingInterviewDisplay = (props:any) => {
    const { currentQuestionIndex,  handleNextQuestionPress} = props
    const questionToDisplay = questionData[currentQuestionIndex?.current].replace("code:","")
    return (<div>
        <div className="noncode-qcontainer">
            <h3>{questionToDisplay}</h3>
            <button onClick={handleNextQuestionPress}>Next Question</button>
        </div>
        <CodeEditorJS />
    </div>)
}
export default CodingInterviewDisplay