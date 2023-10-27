import React, { useEffect, useState } from 'react'
import { BallTriangle } from "react-loader-spinner";

const EditorConsole = (props: any) => {
  const { loader, codeExecutionData} = props
  const[consoleErrorMessage, setConsoleErrorMessage] = useState<string>("")
  useEffect(() => {
    if(codeExecutionData?.stderr && codeExecutionData?.status?.description !== "Accepted"){
      const lines = codeExecutionData?.stderr.split('\n')
      const indexOfModuleCompile = lines.findIndex((line:string) => line.includes('Module._compile'));
      if (indexOfModuleCompile !== -1) {
        setConsoleErrorMessage(lines.slice(0, indexOfModuleCompile + 1).join('\n'))
      } else {
        setConsoleErrorMessage(codeExecutionData?.stderr)
      }
    }
  }, [codeExecutionData?.stderr])
  
  return (
    <div>
        {
          !loader ? (codeExecutionData?.status?.description && (codeExecutionData?.status?.description === "Accepted" ? <p dangerouslySetInnerHTML={{ __html: codeExecutionData?.stdout.replace(/\n/g, '<br>') }}></p>
          : <p className='danger'>{consoleErrorMessage}</p>)) : <div className = "align-center">
            <BallTriangle
                height={25}
                width={25}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass="loading-balls-wrapper"
                visible={true}/>
            <p>Processing your code</p>
          </div>
        }
    </div>
  )
}

export default EditorConsole