
import Editor from "@monaco-editor/react"
import { useEffect, useRef, useState } from "react"
import * as monaco from 'monaco-editor';
import "./codeeditor.css"
import SingleEditor from "./editor";
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

    const [codeOutput, setCodeOutput] = useState<string>("")
    const [consoleError, setConsoleError] = useState<string>("")
    const[isAutoRunEnabled, setIsAutoRunEnabled] = useState<boolean>(false)
    const [ isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false)
    const [editorData, setEditorData] = useState<editorData>({html:"", css:"", javascript:""})
    const [srcDoc, setSrcDoc] = useState<string>("")
    
    const [currentLang, setCurrentLang] = useState<LanguageData>({
        name: "app.js",
        language: "javascript",
        value: "console.log('Hello World!')"
    })
    //TODO: create three different components for HTML, CSS and Javasc🧾 
    //Three components data should be saved in parent component and then process it using iframe.

    const langOptionHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
        const button = e.target as HTMLButtonElement;
        const langObject = files[button.innerHTML.toLowerCase()]
        setCurrentLang(langObject)
    }
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
    const handleEditorMount = (editor:any, monaco:any) => {
        editorRef.current = editor
    }

    const editorChangeHandler = () => {
        try {
            const oldConsoleLog = console.log;
        const consoleOutput:any = [];
        console.log = (...args) => {
          oldConsoleLog(...args);
          consoleOutput.push(args.map(arg => JSON.stringify(arg)).join(' '));
        };
        const codeOutputValue =editorRef?.current ? new Function((editorRef?.current.getValue())): () => {}
        codeOutputValue()
        setCodeOutput(consoleOutput.join('\n'))
        setConsoleError("")
        } catch(error:any){
            const errorMessage = 'Error: ' + error?.message 
            //If possible implement stack trace for code editor below is the example
        //     const errorStackTrace = error.stack;
        // const errorWithStackTrace = `${errorMessage}\n${errorStackTrace}`
        setConsoleError(errorMessage)
        }
    }
    const autoRunCheckBoxHandler = (e:any) => {
        if(e.target.checked) {
            setIsAutoRunEnabled(true)
        }
        else {
            setIsAutoRunEnabled(false)
        }
    }
    useEffect(() => {
        setSrcDoc(
            `<html>
                <body>${editorData["html"]}</body>
                <style>${editorData["css"]}</style>
                <script>${editorData["javascript"]}</script>
            </html>`
        )
    },[editorData])
    return(
        <div className="editor-parent">
          <div className = "editor-main">
            <div className = "editor-header">
                    <div>
                        <button onClick = {langOptionHandler}>HTML</button>
                        <button onClick = {langOptionHandler}>CSS</button>
                        <button onClick = {langOptionHandler}>Javascript</button>
                    </div>
                    <button  className = "btn primary">Run</button>
                    <div className="autorun-checkbox">
                        <input type = "checkbox" id = "auto-run" onChange = {autoRunCheckBoxHandler}/>
                        <label  htmlFor = "auto-run">Auto Run</label>
                    </div>
            </div>
            <div className = "editor-container">
                <SingleEditor editorDataValue = {files["html"]} setEditorData = {setEditorData}/>
                <SingleEditor editorDataValue = {files["css"]} setEditorData = {setEditorData}/>
                <SingleEditor editorDataValue = {files["javascript"]} setEditorData = {setEditorData} setConsoleError = {setConsoleError}/>
            </div>
          </div>
          <div className = "output-container">
           <div className = {`border-black ${isConsoleOpen ?"resize-output-editor":"editor-code"}`}>
            <iframe 
                srcDoc={srcDoc}
                title="output"
                sandbox="allow-scripts"
                width="100%"
                height="100%"
                
                />
           </div>
            <h3 onClick = {() => setIsConsoleOpen(prev => !prev)} className="cursor-pointer">Console</h3>
            {
                isConsoleOpen && <div className = {`resize-output-editor border-black`}>
                    <div className = "console-error">{consoleError}</div>
                </div>
            }
          </div>
        </div>
    )
}
export default CodeEditor