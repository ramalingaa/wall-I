
import Editor from "@monaco-editor/react"
import { useEffect, useRef, useState } from "react"
import * as monaco from 'monaco-editor';
import "./codeeditor.css"
import SingleEditor from "./singleeditor";
import EditorConsole from "./editorconsole";
import SplitPane, { Pane } from 'react-split-pane';
import './resizer.css';
import EditorHeader from "./editorheader";
import CodeQuestion from "./codequestion";

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
    
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

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
   
    
    return(
        <div className="editor-parent">
                <SplitPane split="vertical" minSize = "20%" defaultSize="40%" allowResize = {true}>
                    <CodeQuestion />
                    <SingleEditor />
                </SplitPane>
          </div>
    )
}
export default CodeEditor