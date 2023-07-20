
import Editor from "@monaco-editor/react"
import { useRef, useState } from "react"
import * as monaco from 'monaco-editor';
import "./codeeditor.css"
interface LanguageData {
    name: string;
    language: string;
    value: string;
}
const files: { [key: string]: LanguageData } = {
    "javascript":{
        name: "app.js",
        language: "javascript",
        value: "console.log('Hello World!')"
    },
    "python": {
        name: "python.py",
        language: "python",
        value: "print('Hello world!')"
    }
}
const CodeEditor = () => {

    const [codeOutput, setCodeOutput] = useState<string>("")
    const [consoleError, setConsoleError] = useState<string>("")
    const[isAutoRunEnabled, setIsAutoRunEnabled] = useState<boolean>(false)
    const [ isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false)
    
    const [currentLang, setCurrentLang] = useState<LanguageData>({
        name: "app.js",
        language: "javascript",
        value: "console.log('Hello World!')"
    })

    const langOptionHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
        console.log("onchange", e.target.value)
        const langObject = files[e.target.value]
        setCurrentLang(langObject)
    }
    console.log(currentLang)
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
    return(
        <div className="editor-parent">
          <div className = "editor-header">
                <span>Choose your language</span>
                <select onChange = {langOptionHandler} className = "editor-select-lang">        
                    <option value="javascript">javaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="C++">C++</option>
                </select>
                <button onClick = {editorChangeHandler} className = "btn primary">Run</button>
                <div className="autorun-checkbox">
                    <input type = "checkbox" id = "auto-run" onChange = {autoRunCheckBoxHandler}/>
                    <label  htmlFor = "auto-run">Auto Run</label>
                </div>
          </div>
           <div className = "editor-container">
                <div className = {isConsoleOpen ? "code-halfview":"editor-code"}>
                    <Editor
                    height="100%"
                    width="100%"
                    theme="vs-dark"
                    onMount={handleEditorMount}
                    defaultLanguage={currentLang?.language}
                    path={currentLang?.name}
                    defaultValue={currentLang?.value}
                    onChange={isAutoRunEnabled?editorChangeHandler:() => {}}
                    />
                </div>
                <h3 onClick = {() => setIsConsoleOpen((prev) => !prev)}>Console</h3>
                {
                        isConsoleOpen &&  <div className = {isConsoleOpen ?"code-halfview ":"" }>
                        <div>
                            <div>{codeOutput}</div>
                            <div className = "console-error">{consoleError}</div>
                        </div>
                    
                </div>
                }   

           </div>
        </div>
    )
}
export default CodeEditor