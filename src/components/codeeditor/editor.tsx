import Editor from "@monaco-editor/react"
import * as monaco from 'monaco-editor';

import { useRef } from "react"
import { LanguageData, editorData } from "./codeeditor";

const SingleEditor = (props:any) => {
    const { name, language, value} = props?.editorDataValue
    const { setEditorData, setConsoleError } = props
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

    const handleEditorMount = (editor:any, monaco:any) => {
        editorRef.current = editor
    }
    function handleErrors(...args:any) {
        // const errorMessage = args.map((arg:any) => String(arg)).join(' ');
        
    
      }
    const editorChangeHandler = () => {
        setEditorData((prev:editorData) => ({
            ...prev,
            [language]: editorRef?.current && editorRef?.current.getValue()
          }));
          if(language === "javascript"){
            const userCode = editorRef?.current ? editorRef?.current.getValue(): "";

            try {
                const codeExecutionFunction = new Function(userCode);
                codeExecutionFunction();
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