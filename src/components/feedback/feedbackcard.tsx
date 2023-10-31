import React from 'react'
import {Card, CardBody, Divider, CardHeader} from "@nextui-org/react";
import { CodeBlock, dracula } from "react-code-blocks";

const FeedbackCard = (props:any) => {
    const { samples, index } = props
    const answerSegment = (rating: number) => {
        if(rating >= 7){
          return "text-green-700"
        }else if (rating < 7 && rating > 3) {
          return "text-yellow-700"
        } else if (rating < 3 && rating >=0) {
          return "danger"
        }
      }
  return (
    <Card className="max-w-[600px] align-center">
                    <CardHeader className="feedback-header">
                            <p>{index+1}. Question: {samples?.question}</p>
                            <p className = "rating-text">Rating: <span className={`rating-border ${answerSegment(samples?.rating)} font-extrabold`}>{samples?.rating}</span></p>  
                    </CardHeader>
                    <CardBody className = "flex flex-col gap-2">   
                      <div className="flex">
                          <div className = "border-right flex flex-col width-100">
                            <p className="font-semibold pb-2">Your Answer</p>
                            <Divider/>
                            <p className = "pt-2">{samples?.answer}</p>
                          </div>
                          <div className="flex flex-col pl-4 width-100">
                            <p className="font-semibold pb-2">Agent Feedback</p>
                            <Divider className = "divider-margin-negative"/>
                            <p className = "pt-2">{samples?.feedback}</p>
                              {samples?.suggestedcode && <CodeBlock
                                text={samples?.suggestedcode}
                                language={"Javascript"}
                                showLineNumbers={true}
                                theme={dracula}
                              />}
                          </div>
                      </div>
                      
                      
                    </CardBody>
              </Card>
  )
}

export default FeedbackCard