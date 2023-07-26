import { useState } from "react"
import { LanguageData } from "./codeeditor"
import SingleEditor from "./singleeditor"
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "./codeeditor.css"


interface JSEditorData {
    javascript:string
}
const files: { [key: string]: LanguageData } = {
    "javascript":{
        name: "app.js",
        language: "javascript",
        value: "console.log('Hello World!')"
    },
    
}
const CodeEditorJS = () => {
    const [editorData, setEditorData] = useState<JSEditorData>({javascript:""})
    const [consoleError, setConsoleError] = useState<string>("")
    const[isAutoRunEnabled, setIsAutoRunEnabled] = useState<boolean>(false)
    const [consoleOutput, setConsoleOutput] = useState<string>("")
    const autoRunCheckBoxHandler = (e:any) => {
        if(e.target.checked) {
            setIsAutoRunEnabled(true)
        }
        else {
            setIsAutoRunEnabled(false)
        }
    }

    
  const customConsoleLog = (...args:any[]) => {
    // Concatenate all arguments into a single string
    const value = args.map(arg => String(arg)).join(' ');
    setConsoleOutput(value); // Update the state with the log value
    console.log(...args); // Call the original console.log() to print to the console
  };
  console.log(consoleOutput)
    const runCodeClickHandler = () => {
        try {
            const runJSCode = new Function('console',editorData['javascript'])
            const codeExecutionResult = runJSCode(customConsoleLog)
            setConsoleError("")
            setConsoleOutput(codeExecutionResult)
        }catch(e){
            // setConsoleError("")
        }

    }
    console.log(consoleOutput)
    return (
        <div>
            <div>
                <div className = "editor-header">
                        <button  className = "btn primary" onClick = {runCodeClickHandler}>Run</button>
                        <div className="autorun-checkbox">
                            <input type = "checkbox" id = "auto-run" onChange = {autoRunCheckBoxHandler}/>
                            <label  htmlFor = "auto-run">Auto Reload</label>
                        </div>
                </div>
            </div>
            <div className = "editor-parent">
                <Allotment vertical = {false} separator = {true} defaultSizes={[90,10]}>
                            <Allotment.Pane minSize = {100}>
                                <SingleEditor editorDataValue = {files["javascript"]} setEditorData = {setEditorData} setConsoleError = {setConsoleError} setConsoleOutput = {setConsoleOutput}/>
   
                            </Allotment.Pane>
                            <Allotment.Pane minSize = {50}>
                                <div className="editor-console">
                                    <p className = "console-header">Console</p>
                                    <div className = "console-error">{consoleError}</div>
                                    <div>{consoleOutput}</div>

                                </div>
                            </Allotment.Pane>
                                    
                </Allotment>
            </div>
        </div>
    )
}
export default CodeEditorJS