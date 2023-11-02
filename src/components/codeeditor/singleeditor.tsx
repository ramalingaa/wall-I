import Editor, { Monaco } from "@monaco-editor/react"
import * as monaco from 'monaco-editor';

import React, { useEffect, useRef, useState } from "react"
import axios from 'axios';
import "./singleeditor.css"
import EditorConsole from "./editorconsole";
import SplitPane from 'react-split-pane';
import './resizer.css';
import { feedbackPostCall } from "../../pages/interviewaudio/interview";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import SelectComponent from "../../utils/Select";
import { programmingLanguageDataForCodeEditor } from "../../constants/constant";
import { Button } from "@nextui-org/react";
const sampleErrorObject = {
  "stdout": null,
  "time": "0.096",
  "memory": 3620,
  "stderr": "Traceback (most recent call last):\n  File \"script.py\", line 1, in \u003cmodule\u003e\n    prin(\"writing from console\")\nNameError: name 'prin' is not defined\n",
  "token": "3e41b3ed-fb86-47bd-be47-3174e4f82df7",
  "compile_output": null,
  "message": "Exited with error status 1",
  "status": {
      "id": 11,
      "description": "Runtime Error (NZEC)"
  }
}
const SingleEditor = (props: any) => {
  const { nextQuestionClickHandler, currentQuestionIndex } = props;
  const [editorData, setEditorData] = useState<string | undefined>("")
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false)
  const [codeExecutionData, setCodeExecutionData] = useState({
    stdout: "",
    time: "",
    memory: 796,
    stderr: "",
    token: "",
    compile_output: null,
    message: null,
    status: {
      id: 3,
      description: ""
    }
  })
  const [languageId, setLanguageId] = useState<string>("")
  const [codingLanguage, setCodingLanguage] = useState<string>("")
  const [loader, setLoader] = useState<boolean>(false)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { failedFeedbackAPICallQueue , jwtToken, dsaQuestionDataForInterview, nonDSAquestionDataForInterview } = useAppSelector((state) => state.interview)
  const apiFeedbackCall = feedbackPostCall(dispatch, failedFeedbackAPICallQueue, jwtToken)

  const handleEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor
  }
  const options = {
    readOnly: false,
    minimap: { enabled: false },
  };
  const editorChangeHandler = () => {
    editorRef?.current && setEditorData(editorRef?.current.getValue())
  }
  //azure hoisted url http://20.127.216.50:2358/submissions
  //aws ec2 instance url http://43.205.237.158:2358/submissions
  const baseURL = "http://43.205.237.158:2358//submissions";
  const requestBody = {
    source_code: editorData,
    language_id: languageId,
    number_of_runs: null,
    stdin: "",
    expected_output: null,
    cpu_time_limit: null,
    cpu_extra_time: null,
    wall_time_limit: null,
    memory_limit: null,
    stack_limit: null,
    max_processes_and_or_threads: null,
    enable_per_process_and_thread_time_limit: null,
    enable_per_process_and_thread_memory_limit: null,
    max_file_size: null,
    enable_network: null

  }
  const codeExecutionAPICall = async (response: any) => {
    const responseFinal = await axios.get(baseURL + "/" + response.data.token)
    return responseFinal
  }
  const runCodeHandler = async () => {
    if (languageId && editorData) {
      //add loader true at the beginning and false once API request is done
      setLoader(true);
      setIsConsoleOpen(true);
      try {
        const response = await axios.post(baseURL, requestBody);
        if (response.data.token) {
          setTimeout(async () => {
            let responseFinal = await codeExecutionAPICall(response);
            while (
              responseFinal.data.status.description === "In Queue" ||
              responseFinal.data.status.description === "Processing"
            ) {
              await new Promise((resolve) => setTimeout(resolve, 3000));
              responseFinal = await codeExecutionAPICall(response);
            }
            setCodeExecutionData(responseFinal.data);
            // Add loader false once API request is done
            setLoader(false);
          }, 3000);
        }
        console.log(response.data.token);
      } catch (error) {
        console.error("API call failed:", error);
        // Add loader false if API request fails
        setLoader(false);
      }
    } else {
      alert("Please select a language and Write your code")
    }

  };
  useEffect(() => {
    //implement failed API calls here
    if(failedFeedbackAPICallQueue.length > 0){
        failedFeedbackAPICallQueue.forEach((payload) => apiFeedbackCall(payload))

    }


},[currentQuestionIndex])
  const handleToggleConsole = (e: any) => {
    e.preventDefault()
    setIsConsoleOpen(prev => !prev)
  }
  const languageChangeHandler = (e: any) => {
    if (e.target.value) {
      setLanguageId(e.target.value)
      const language = programmingLanguageDataForCodeEditor.find((item) => item.value === e.target.value)
      language && setCodingLanguage(language?.label)
    }
  }

  const questionSubmitHandler = () => {
    if(editorData && codingLanguage){
      setIsAnswerSubmitted(true)
      const payload = {
        question:dsaQuestionDataForInterview[currentQuestionIndex].question,
        answer: editorData,
        suggestions: dsaQuestionDataForInterview[currentQuestionIndex].suggestions,
        language: codingLanguage
    }
    try {

        apiFeedbackCall(payload)
    }catch (e){
        console.log(e)
    }
    } else {
      alert("Please select  language and Write your code")
    }
  }

  return (
    <div className="single-editor">
      <div className="single-editor__header">
        <SelectComponent itemsData={programmingLanguageDataForCodeEditor} changeHandlerFunction={languageChangeHandler} placeholder="Select Language" errorMessage = "" size = "sm" arialabel="Select ProgrammingLanguage"/>
      </div>
      <div className="single-editor__editor">
        {/* @ts-ignore */}
        <SplitPane split="horizontal" minSize={isConsoleOpen ? "30%" : "100%"} defaultSize={isConsoleOpen ? "70%" : "100%"} allowResize={isConsoleOpen} maxSize="0">
          <Editor
            height="100%"
            language="python"
            width="100%"
            theme="light"
            onMount={handleEditorMount}
            defaultLanguage="python"
            defaultValue=""
            onChange={editorChangeHandler}
            value={editorData}
            options={options}
          />
          {isConsoleOpen &&
            <div className="single-editor__console">
              <EditorConsole codeExecutionData={codeExecutionData} loader = {loader}/>
            </div>}

        </SplitPane>
      </div>
      <div className="single-editor__consoleBtn">
        <button onClick={handleToggleConsole} className="console-btn cursor-pointer flex">Console <span className="console-btn__icon">^</span></button>
        <div className="single-editor__run">
          <Button color = "primary" variant="bordered" isDisabled = {isAnswerSubmitted} onPress={runCodeHandler}>Run</Button>
          <Button color = "primary" isDisabled = {isAnswerSubmitted} onPress = {questionSubmitHandler}>Submit</Button>
          <Button color = "primary" isDisabled = {!isAnswerSubmitted} onPress = {nextQuestionClickHandler}>{(currentQuestionIndex+1 === dsaQuestionDataForInterview.length) ? "Get Feedback" : "Proceed Next"}</Button>
        </div>
      </div>

    </div>
  )
}
export default SingleEditor