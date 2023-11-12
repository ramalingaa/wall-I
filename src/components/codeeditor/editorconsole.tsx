import { Spinner } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'

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
      <p className = "console-header">Console</p>
        {
          !loader ? (codeExecutionData?.status?.description && (codeExecutionData?.status?.description === "Accepted" ? <p dangerouslySetInnerHTML={{ __html: codeExecutionData?.stdout.replace(/\n/g, '<br>') }}></p>
          : <p className='danger'>{consoleErrorMessage}</p>)) : <div className = "align-center">
            <div className = "flex flex-col console-loader-container">
                <Spinner />
            <p className='align-center'>Processing your code</p>
        </div>
          </div>
        }
    </div>
  )
}

export default EditorConsole