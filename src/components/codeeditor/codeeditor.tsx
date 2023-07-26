
import Editor from "@monaco-editor/react"
import { useEffect, useRef, useState } from "react"
import * as monaco from 'monaco-editor';
import "./codeeditor.css"
import SingleEditor from "./singleeditor";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
export interface LanguageData {
    name: string;
    language: string;
    value: string;
}
export interface editorData {
    "html": string;
    "css": string;
    "javascript": string
}
const files: { [key: string]: LanguageData } = {
    "javascript":{
        name: "app.js",
        language: "javascript",
        value: "console.log('Hello World!')"
    },
    "html": {
        name: "index.html",
        language: "html",
        value: "<div></div>"
    },
    "css": {
        name: "styles.css",
        language: "css",
        value: "body{}"
    }
}
const CodeEditor = () => {

    const [consoleError, setConsoleError] = useState<string>("")
    const[isAutoRunEnabled, setIsAutoRunEnabled] = useState<boolean>(false)
    const [editorData, setEditorData] = useState<editorData>({html:"", css:"", javascript:""})
    const [srcDoc, setSrcDoc] = useState<string>("")
    

    const autoRunCheckBoxHandler = (e:any) => {
        if(e.target.checked) {
            setIsAutoRunEnabled(true)
        }
        else {
            setIsAutoRunEnabled(false)
        }
    }
    useEffect(() => {
        if(isAutoRunEnabled){
            setSrcDoc(
                `<html>
                    <body>${editorData["html"]}</body>
                    <style>${editorData["css"]}</style>
                    <script>${editorData["javascript"]}</script>
                </html>`
            )
        }
    },[editorData])
    const runCodeClickHandler = () => {
        setSrcDoc(
            `<html>
                <body>${editorData["html"]}</body>
                <style>${editorData["css"]}</style>
                <script>${editorData["javascript"]}</script>
            </html>`
        )
    }
    return(
        <div className="editor-parent">
            
          <div className = "editor-main">
          <div className = "editor-header">
                    <button  className = "btn primary" onClick = {runCodeClickHandler}>Run</button>
                    <div className="autorun-checkbox">
                        <input type = "checkbox" id = "auto-run" onChange = {autoRunCheckBoxHandler}/>
                        <label  htmlFor = "auto-run">Auto Reload</label>
                    </div>
            </div>
           <Allotment vertical = {false}>
                <div className = "editor-container">
                        <Allotment vertical = {true} separator = {true}>
                            <Allotment.Pane >
                                <SingleEditor editorDataValue = {files["html"]} setEditorData = {setEditorData}/>

                            </Allotment.Pane>
                            <Allotment.Pane>
                                <SingleEditor editorDataValue = {files["css"]} setEditorData = {setEditorData}/>

                            </Allotment.Pane>
                            <Allotment.Pane>
                                <SingleEditor editorDataValue = {files["javascript"]} setEditorData = {setEditorData} setConsoleError = {setConsoleError}/>

                            </Allotment.Pane>
                        </Allotment>
                    </div>
                    <Allotment vertical = {true} separator = {true} defaultSizes={[90,10]}>
                        <Allotment.Pane minSize = {100}>
                                <p className = "console-header">Preview</p>
                                <iframe 
                                    srcDoc={srcDoc}
                                    title="output"
                                    sandbox="allow-scripts"
                                    width="100%"
                                    height="100%"
                                    />
                        </Allotment.Pane>
                        <Allotment.Pane minSize = {50}>
                            <div className="editor-console">
                                <p className = "console-header">Console</p>
                                <div className = "console-error">{consoleError}</div>
                            </div>
                        </Allotment.Pane>
                                
                    </Allotment>
           </Allotment>
          </div>

          
        </div>
    )
}
export default CodeEditor