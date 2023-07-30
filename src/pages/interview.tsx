import React, { useEffect, useRef, useState } from 'react';
import { SpeechSegment, stateToString, useSpeechContext } from '@speechly/react-client';
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { QuestionAnswer, addQuestionAnswer, addQuestionAnswerFeedback } from '../redux/reducer';
import NonCodeInterviewDisplay from '../components/interview/noncodeinterviewdisplay';
import CodingInterviewDisplay from '../components/interview/codinginterviewdisplay';
import * as monaco from 'monaco-editor';
import RefreshTimer from '../components/timers/refreshtimer';



export const questionData = ['codeDSA:Briefly explain Promises in Javascript', 'codeDSA:Write a program to find factorial of a given number using javascript.', 'What is event loop in javascript']



const Interview = (props:any) => {

  const [speechSegments, setSpeechSegments] = useState<SpeechSegment[]>([]);
  const initialState: SpeechSynthesisVoice[] = [];
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
  const [timeTakenToSolveCodingQn, setTimeTakenToSolveCodingQn] = useState<number>(0)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)


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
    if (voices.length === 0) {

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
  }, [voices])
  const intervalId = useRef<ReturnType<typeof setInterval> | undefined>();
  //timer function to display refresh timer
  useEffect(() => {
    if (isTimerOn && timer === 10) {
      generatorFunction?.current?.next()
      intervalId.current = setInterval(() => {

        setTimer((prev) => {
          if (prev === 0) {
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
  const handlerStartInterview = () => {
    if (currentQuestionIndex.current === 0) {
      setIsInterviewStarted(true)
    }
    // calling feedback API for failed calls
    // if (failedFeedbackQnLength.current.length > 0) {
    //   // TODO add case where set of failed api calls are to be made after the last question.
    //   const dataToSendForFeedbackCall = allQuestionAnswerData.find((ele) => ele.question === failedFeedbackQnLength.current[0])
    //   handleAPIFeedbackCall(dataToSendForFeedbackCall)

    // }
    //resetting the submitted answer state value
    if (currentQuestionIndex.current > 0) {
      setIsAnswerSubmitted(false)
    }
    if (!questionData[currentQuestionIndex.current].startsWith("codeDSA:")) {
      callQuestionWOCode(questionData, currentQuestionIndex, voices, synth, handleMicPress);
    }

    if (currentQuestionIndex.current > 0 && questionData[currentQuestionIndex.current].startsWith("code")) {
      //set the question display
      //display editor based on the question choice
      //allow user to code the problem
      //start the timer from start to end of question till submit answer
      //store the timer along with answer for answer
      //collect the answer string i.e, code in string which can be read
      //send this to feedback to Agent
      //collect feedback and store it in the data.


    }
  }
  const handlerStopAnswer = async () => {
    await stop();
    setIsAnswerSubmitted(true)
    updateCounter.current = 0
  }
  const handleSubmitAnswerForCodingQn = () => {
     const codeAnswer = editorRef.current ? editorRef.current?.getValue() :''
     const payload: QuestionAnswer = {
      question: questionData[currentQuestionIndex.current],
      answer: codeAnswer
    }
     dispatch(addQuestionAnswer(payload))
  }

  const handleNextQuestion = () => {
    currentQuestionIndex.current = currentQuestionIndex.current + 1
    if (currentQuestionIndex.current < questionData.length) {
      setSpeechSegments(() => [])
      setTranscribedText("")
      handlerStartInterview()

    } else {
      setIsInterviewCompleted(true)
      console.log("interview is completed")
    }


  }
  const handleTimer = () => {
    setIsTimerOn(true)
    setTimer(10)
  }
  const handleAPIFeedbackCall = async (dataToSendForFeedbackCall?: QuestionAnswer) => {
    console.log("API")
    const bodyPayload = allQuestionAnswerData.find(({question}) => question === questionData[currentQuestionIndex.current])
    if (dataToSendForFeedbackCall?.question) {
      console.log("Called for failed")
    }
    const bodyPayloadForFailedCall = {
      question: dataToSendForFeedbackCall?.question,
      answer: dataToSendForFeedbackCall?.answer
    }
    const apiFeedbackPayload = dataToSendForFeedbackCall?.question ? bodyPayloadForFailedCall : bodyPayload;
    console.log(apiFeedbackPayload)
    // try {
    //     const response = await fetch("http://localhost:8080/api/generate", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(apiFeedbackPayload),
    //     });

    //     const responseData = await response.json();
    //     if (response.status !== 200) {
    //       throw responseData.error || new Error(`Request failed with status ${response.status}`);
    //     }
    //     dispatch(addQuestionAnswerFeedback(responseData.result))
    //     if(dataToSendForFeedbackCall?.question){
    //       setFailedFeedbackQnIdx((prev) => {
    //           return prev.filter((ele, index) => index !== 0)
    //       })
    //     }
    // } catch (error) {
    //   // Consider implementing your own error handling logic here
    //   console.error(error);
    //   const isFailedQuestionExists = failedFeedbackQnIdx.some((ele) => ele === questionData[currentQuestionIndex.current])
    //   if (!isFailedQuestionExists) failedFeedbackQnLength.current = [...failedFeedbackQnLength.current, questionData[currentQuestionIndex.current]]

    // }
  }
  //generator function is to allow timer to start at the first and to make api call once timer is started without needing to complete the function call.
  function* generator() {
    yield handleTimer()
    yield handleAPIFeedbackCall()
  }
  const generatorFunction = useRef<Generator<void | Promise<void>, void, unknown> | undefined>()
  const handleNextQuestionPress = async () => {
    generatorFunction.current = generator()
    generatorFunction?.current?.next()

  };


  return (
    <div className="app">
     {
      isTimerOn ? <RefreshTimer timer = { timer } /> :
       <div>
      {questionData[currentQuestionIndex.current] && !questionData[currentQuestionIndex.current].startsWith("codeDSA") ?
        <NonCodeInterviewDisplay tentative={tentative} currentQuestionIndex={currentQuestionIndex} isInterviewCompleted={isInterviewCompleted} isInterviewStarted={isInterviewStarted} isAnswerSubmitted={isAnswerSubmitted} isTimerOn={isTimerOn} timer={timer} clientState={clientState} microphoneState={microphoneState} handlerStartInterview={handlerStartInterview} handlerStopAnswer={handlerStopAnswer} handleNextQuestionPress={handleNextQuestionPress}></NonCodeInterviewDisplay> : 
        <CodingInterviewDisplay currentQuestionIndex={currentQuestionIndex} handleNextQuestionPress={handleNextQuestionPress} setTimeTakenToSolveCodingQn = {setTimeTakenToSolveCodingQn} editorRef = {editorRef} handleSubmitAnswer = {handleSubmitAnswerForCodingQn} setIsAnswerSubmitted = { setIsAnswerSubmitted } isAnswerSubmitted = {isAnswerSubmitted}/>}
        
      </div>

     }
      
    </div>
  );

}
export default Interview

function callQuestionWOCode(questionData: string[], currentQuestionIndex: React.MutableRefObject<number>, voices: SpeechSynthesisVoice[], synth: SpeechSynthesis, handleMicPress: () => Promise<void>) {
  const utterThis = new SpeechSynthesisUtterance(questionData[currentQuestionIndex.current]);
  utterThis.voice = voices[10];
  utterThis.rate = 1;
  utterThis.pitch = 1;
  synth.speak(utterThis);

  utterThis.onend = () => handleMicPress();

}
