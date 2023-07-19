import React, { useEffect, useRef, useState } from 'react';
import { SpeechSegment, stateToString, useSpeechContext } from '@speechly/react-client';
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { QuestionAnswer, addQuestionAnswer, addQuestionAnswerFeedback } from '../redux/reducer';

const Interview = () => {
    const [speechSegments, setSpeechSegments] = useState<SpeechSegment[]>([]);
    const initialState: SpeechSynthesisVoice[] = [];
  
  interface currentQuestionAll {
    question: string;
    answer: string;
    feedback: string;
  }
    const [tentative, setTentative] = useState('');
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(initialState);
    const [transcribedText, setTranscribedText] = useState<string>("")
          const synth = window.speechSynthesis;
    const currentQuestionIndex = useRef<number>(0)
    const [isInterviewCompleted, setIsInterviewCompleted] = useState<boolean | undefined>(false)
    const [isInterviewStarted, setIsInterviewStarted] = useState<boolean | undefined>(false)
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean | undefined>(false)
    const [isTimerOn, setIsTimerOn] = useState<boolean | undefined>(false)
    const [timer, setTimer] = useState<number>(0)
    const [failedFeedbackQnIdx, setFailedFeedbackQnIdx] = useState<string[]>([])
    const {
      client,
      clientState,
      listening,
      microphoneState,
      segment,
      attachMicrophone,
      start,
      stop,
    } = useSpeechContext();
    console.log("failedFeedbackQnIdx" , failedFeedbackQnIdx)
    const dispatch = useAppDispatch()
    const { allQuestionAnswerData, allQuestionAnswerFeedbackData } = useAppSelector((state) => state.counter)
    const updateCounter = useRef(0)
    useEffect(() => {
      if (segment) {
        const text = segment.words.map((w) => w.value).join(' ');
        setTentative(text);
        if (segment.isFinal && updateCounter.current === 0) {
          setTentative('');
          setSpeechSegments((current) => {
            const finalText = [...current, segment]
            const finalTextResult = finalText.map((singleInstance) => {
              return singleInstance.words.map((word) => {
                return word.value
              }).join(" ")
            }).join("")
            const payload: QuestionAnswer = {
              question: questionData[currentQuestionIndex.current],
              answer: finalTextResult
            }
            dispatch(addQuestionAnswer(payload))
            updateCounter.current = 1
            segment.isFinal = false
            setTranscribedText(finalTextResult)
            return [...current, segment]
          });
        }
      }
    }, [segment?.isFinal]);
  
    useEffect(() => {
      if(voices.length === 0){
  
     const voiceList = synth.getVoices().sort(function (a, b) {
        const firstVoice = a.name.toUpperCase();
        const secondVoice = b.name.toUpperCase();
    
        if (firstVoice < secondVoice) {
          return -1;
        } else if (firstVoice === secondVoice) {
          return 0;
        } else {
          return +1;
        }
      });
      setVoices(voiceList)
      }
    },[voices])
  const intervalId = useRef<ReturnType<typeof setInterval> | undefined>();
  //timer function to display timer
    useEffect(() => {
      if(isTimerOn && timer === 10){
        generatorFunction?.current?.next()
        intervalId.current = setInterval(() => {
         
            setTimer((prev) => {
              if(prev === 0){
                clearInterval(intervalId.current)
                setIsTimerOn(false)
                setTimer(0)
                handleNextQuestion()
                return prev
              }
              else {
               return --prev
              }
            })
          
        }, 1000)
      }
    }, [isTimerOn])

    const handleMicPress = async () => {
      if (listening) {
        await stop();
      } else {
        await attachMicrophone();
        await start();
      }
    };
  const failedFeedbackQnLength = useRef<string[]>([])
  const questionData = ['What are Promises in Javascript', 'What is event loop in Javascript']
  const handlerStartInterview = () => {
    console.log("next question", failedFeedbackQnLength.current)
    setIsInterviewStarted(true)
    
    if(failedFeedbackQnLength.current.length > 0){
        // TODO add case where set of failed api calls are to be made after the last question.
     const dataToSendForFeedbackCall = allQuestionAnswerData.find((ele) => ele.question === failedFeedbackQnLength.current[0])
     handleAPIFeedbackCall(dataToSendForFeedbackCall)
     
    }
    if(currentQuestionIndex.current > 0){
      setIsAnswerSubmitted(false)
    }
    const utterThis = new SpeechSynthesisUtterance(questionData[currentQuestionIndex.current]);
    utterThis.voice = voices[10];
      utterThis.rate = 1;
      utterThis.pitch = 1;
      synth.speak(utterThis);
  
      utterThis.onend = () => handleMicPress()
  }
   
  const handlerStopAnswer = async() => {
    await stop();
    setIsAnswerSubmitted(true)
    updateCounter.current = 0
  }
  const handleNextQuestion = () => {
    currentQuestionIndex.current = currentQuestionIndex.current + 1
      if(currentQuestionIndex.current < questionData.length) {
        setSpeechSegments(() => [])
        setTranscribedText("")
          handlerStartInterview()
    
      }else {
        setIsInterviewCompleted(true)
          console.log("interview is completed")   
      }
    
    
  }
  const handleTimer = () => {
    setIsTimerOn(true)
    setTimer(10)
  }
  const handleAPIFeedbackCall = async(dataToSendForFeedbackCall?:QuestionAnswer) => {
    console.log("API")
    const bodyPayload = {
      question:questionData[currentQuestionIndex.current],
      answer:transcribedText
    }
    if(dataToSendForFeedbackCall?.question){
        console.log("Called for failed")
    }
    const bodyPayloadForFailedCall = {
      question: dataToSendForFeedbackCall?.question,
      answer: dataToSendForFeedbackCall?.answer
    }
    const apiFeedbackPayload = dataToSendForFeedbackCall?.question ? bodyPayloadForFailedCall : bodyPayload;
    try {
    //   const response = await fetch("https://4f44-49-206-45-133.ngrok-free.app/api/generate", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(apiFeedbackPayload),
    //   });
  
    //   const responseData = await response.json();
    //   if (response.status !== 200) {
    //     throw responseData.error || new Error(`Request failed with status ${response.status}`);
    //   }
    //   dispatch(addQuestionAnswerFeedback(responseData.result))
    //   if(dataToSendForFeedbackCall?.question){
    //     setFailedFeedbackQnIdx((prev) => {
    //         return prev.filter((ele, index) => index !== 0)
    //     })
    //   }
    throw Error
  
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      const isFailedQuestionExists = failedFeedbackQnIdx.some((ele) => ele === questionData[currentQuestionIndex.current])
      if(!isFailedQuestionExists) failedFeedbackQnLength.current = [...failedFeedbackQnLength.current, questionData[currentQuestionIndex.current]]
       
    }
  }
   function*generator(){
    yield handleTimer()
    yield handleAPIFeedbackCall()
  }
  const generatorFunction = useRef<Generator<void | Promise<void>, void, unknown> | undefined>()
    const handleNextQuestionPress = async() => {
      generatorFunction.current = generator()
      generatorFunction?.current?.next()
     
    };
   
  
    return (
      <div className="app">
        <div className="left">
          <h1 className="title">Your Interview Assistant: Wall-E</h1>
          <div className="status">
            <code>
              Client: <span>{stateToString(clientState)}</span>
            </code>
            <code> &middot; </code>
            <code>
              Microphone: <span>{microphoneState}</span>
            </code>
          </div>
          <div className="toolbar">
            <button onClick = {handlerStartInterview} disabled = {isInterviewStarted}>Start the Interview</button>
            <button onClick = {handlerStopAnswer} disabled = { (currentQuestionIndex.current>0 ? isAnswerSubmitted : (!isInterviewStarted || isAnswerSubmitted))}>Submit answer for this question</button>
            <button onClick={handleNextQuestionPress} disabled={!isAnswerSubmitted}>
              {
                currentQuestionIndex.current === (questionData.length - 1) ? "Get the feedback" : "Next Question"
              }
            </button>
          </div>
            <div className = "timer">
              {
                isTimerOn && <p>{timer}</p>
              }
            </div>
          <div>
            {
              isInterviewCompleted &&<div>
                {
                  allQuestionAnswerFeedbackData.map((singleInstance) => {
                    return (<div key = {singleInstance.feedback}>
                      <p><b>Question:</b>{singleInstance.question}</p>
                      <p><b>Your Answer:</b>{singleInstance.answer}</p>
                      <p><b>Agent Feedback:</b>{singleInstance.feedback}</p>
                    </div>)
                  })
                }
              </div>
            }
          </div>
        </div>
        <div className = "right">
            <div>
            {
              tentative && tentative
            }
          </div>
        </div>
      </div>
    );
  
}
export default Interview