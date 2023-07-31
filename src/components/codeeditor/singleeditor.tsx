import Editor from "@monaco-editor/react"
import * as monaco from 'monaco-editor';

import { useRef } from "react"
import { LanguageData, editorData } from "./codeeditor";
import { useAppDispatch } from "../../hooks/redux";

const SingleEditor = (props:any) => {
    const { name, language, value} = props?.editorDataValue
    const { setEditorData, setConsoleError, setConsoleOutput, editorRef } = props
    // const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

    const handleEditorMount = (editor:any, monaco:any) => {
        editorRef.current = editor
    }
    const dispatch = useAppDispatch()

    const editorChangeHandler = () => {
        setEditorData((prev:editorData) => ({
            ...prev,
            [language]: editorRef?.current && editorRef?.current.getValue()
          }));
          if(language === "javascript"){
            const userCode = editorRef?.current ? editorRef?.current.getValue(): "";
            try {
                const oldConsoleLog = console.log;
            const consoleOutput:any = [];
            console.log = (...args) => {
              oldConsoleLog(...args);
              consoleOutput.push(args.map(arg => JSON.stringify(arg)).join(' '));
            };
            const codeOutputValue = new Function(userCode)
            codeOutputValue()
            setConsoleOutput(consoleOutput.join('\n'))
            setConsoleError("")
            } catch(error:any){
                const errorMessage = 'Error: ' + error?.message 
                setConsoleError(errorMessage)
              
            }
          }
    }
    return(

        <div className="editor-code">
            <Editor
                    height="100%"
                    width="100%"
                    theme="vs-dark"
                    onMount={handleEditorMount}
                    defaultLanguage={language}
                    path={name}
                    defaultValue={value}
                    onChange={editorChangeHandler}
                
                    
                    />
        </div>
    )
}
export default SingleEditor