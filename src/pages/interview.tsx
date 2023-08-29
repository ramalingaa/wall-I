import React, { useEffect, useRef, useState } from 'react';
import { SpeechSegment, stateToString, useSpeechContext } from '@speechly/react-client';
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { QuestionAnswer, addQuestionAnswer, addQuestionAnswerFeedback, resetInterviewState } from '../redux/reducer';
import NonCodeInterviewDisplay from '../components/interview/noncodeinterviewdisplay';
import CodingInterviewDisplay from '../components/interview/codinginterviewdisplay';
import * as monaco from 'monaco-editor';
import RefreshTimer from '../components/timers/refreshtimer';
import "./landingpage.css"
import { useNavigate } from 'react-router-dom';



export const questionData = [ 
'What is event loop in Javascript','What is hoisting? Which out of let, var, and const are hoisted', 'What are closures? Give examples/applications.','List some new features introduced in ES6.', 'How many data types are there in JS? ', 'Can explain Null vs undefined',  'what is a callback function?']



const Interview = (props:any) => {
  const { setIsInterviewCompleted, signOut } = props

  const [speechSegments, setSpeechSegments] = useState<SpeechSegment[]>([]);
  const initialState: SpeechSynthesisVoice[] = [];
  const [tentative, setTentative] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(initialState);
  const [transcribedText, setTranscribedText] = useState<string>("")
  const synth = window.speechSynthesis;
  const currentQuestionIndex = useRef<number>(0)
  const [isInterviewStarted, setIsInterviewStarted] = useState<boolean | undefined>(false)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean | undefined>(false)
  const [isTimerOn, setIsTimerOn] = useState<boolean | undefined>(false)
  const [timer, setTimer] = useState<number>(0)
  const [timeTakenToSolveCodingQn, setTimeTakenToSolveCodingQn] = useState<number>(0)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const failedFeedbackQnQueue = useRef<QuestionAnswer[]>([])
  const generatorFunction = useRef<Generator<void | Promise<void>, void, unknown> | undefined>()
  const navigate = useNavigate();


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
  useEffect(() => {
    if (segment) {
     
      if (segment.isFinal) {
        const text = segment.words.map((w) => w.value).join(' ');
         setTranscribedText((prev) => prev + text)
   
      }
    }
  }, [segment?.isFinal]);

  // const retryFailedApiCalls = () => {
  //   setFailedApiCalls((prevFailedApiCalls) => {
  //     // Process the failed API calls from the queue
  //     // Retry the API calls here
  //     // For example: prevFailedApiCalls.forEach(task => makeApiCall(task));
  //     return [];
  //   });
  // };
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
      const voice = voiceList.filter((ele) => ele.name === "Google US English")
      setVoices(voice)
    }
  }, [voices])
  const intervalId = useRef<ReturnType<typeof setInterval> | undefined>();
  //timer function to display refresh timer
  useEffect(() => {
    if (isTimerOn && timer === 10) {
      //API call function invocation through generator

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
  useEffect(() => {
    if(currentQuestionIndex.current === questionData.length){
      setIsInterviewCompleted(true)
    }
  }, [currentQuestionIndex.current])

  const handleMicPress = async () => {
      if (listening) {
        await stop();
      } else {
        await attachMicrophone();
        await start();
      }
    };
  const handlerStartInterview = () => {
    console.log(failedFeedbackQnQueue)
    if (currentQuestionIndex.current === 0) {
      setIsInterviewStarted(true)
    }
    //calling feedback with failed data queue
    if(failedFeedbackQnQueue.current.length > 0 && currentQuestionIndex.current !== 0){

      console.log("inside failed call")

      failedFeedbackQnQueue.current.forEach((payload) => {
        handleAPIFeedbackCall(payload)
      })

    }
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

  }
  
  const handleSubmitAnswerForCodingQn = () => {
     const codeAnswer = editorRef.current ? editorRef.current?.getValue() :''
     const payload: QuestionAnswer = {
      question: questionData[currentQuestionIndex.current],
      answer: codeAnswer
    }
    setIsAnswerSubmitted(true)
    dispatch(addQuestionAnswer(payload))
  }


  const handleNextQuestion = nextQuestionActualEvent(currentQuestionIndex, setSpeechSegments, setTranscribedText, handlerStartInterview, failedFeedbackQnQueue)
  const handleTimer = () => {
    setIsTimerOn(true)
    setTimer(10)
  }
  const handleAPIFeedbackCall = feedbackPostCall(dispatch, failedFeedbackQnQueue)
  //generator function is to allow timer to start at the first and to make api call once timer is started without needing to complete the function call.
  function* generator(payload:QuestionAnswer | undefined) {
    yield handleTimer()
    yield handleAPIFeedbackCall(payload)
  }

  const handleNextQuestionPress = nextQuestionClickInitializer(currentQuestionIndex, allQuestionAnswerData, generatorFunction, generator, transcribedText, dispatch);

  //ends
  const endInterviewHandler = () => {
    dispatch(resetInterviewState())
    navigate("/")
  }

  return (
    <div>
          <div className="interview-action-header">
            {/* <button onClick = {signOut} className='btn btn-secondary'>Signout</button> */}
            <span>Total No-Of questions: {questionData.length}</span>
            <span>Current question No: {currentQuestionIndex.current + 1}</span>
            <button onClick = {endInterviewHandler} className='btn btn-primary bg-red'>End Interview</button>

          </div>

     {
      isTimerOn ? <RefreshTimer timer = { timer } /> :
       <div>
      {questionData[currentQuestionIndex.current] && !questionData[currentQuestionIndex.current].startsWith("codeDSA") ?
        <NonCodeInterviewDisplay tentative={tentative} currentQuestionIndex={currentQuestionIndex} isInterviewStarted={isInterviewStarted} isAnswerSubmitted={isAnswerSubmitted} isTimerOn={isTimerOn} timer={timer} clientState={clientState} microphoneState={microphoneState} handlerStartInterview={handlerStartInterview} handlerStopAnswer={handlerStopAnswer} handleNextQuestionPress={handleNextQuestionPress}></NonCodeInterviewDisplay> : 
        <CodingInterviewDisplay currentQuestionIndex={currentQuestionIndex} handleNextQuestionPress={handleNextQuestionPress} setTimeTakenToSolveCodingQn = {setTimeTakenToSolveCodingQn} editorRef = {editorRef} handleSubmitAnswer = {handleSubmitAnswerForCodingQn} setIsAnswerSubmitted = { setIsAnswerSubmitted } isAnswerSubmitted = {isAnswerSubmitted}/>}
        
      </div>

     }
      
    </div>
  );

}
export default Interview

function nextQuestionActualEvent(currentQuestionIndex: React.MutableRefObject<number>, setSpeechSegments: React.Dispatch<React.SetStateAction<SpeechSegment[]>>, setTranscribedText: React.Dispatch<React.SetStateAction<string>>, handlerStartInterview: () => void, failedFeedbackQnQueue: React.MutableRefObject<QuestionAnswer[]>) {
  return () => {
    currentQuestionIndex.current = currentQuestionIndex.current + 1;
    if (currentQuestionIndex.current < questionData.length) {
      setSpeechSegments(() => []);
      setTranscribedText("");
      handlerStartInterview();

    } else {
      console.log("interview is completed");
      console.log(failedFeedbackQnQueue);

    }


  };
}

function nextQuestionClickInitializer(currentQuestionIndex: React.MutableRefObject<number>, allQuestionAnswerData: QuestionAnswer[], generatorFunction: React.MutableRefObject<Generator<void | Promise<void>, void, unknown> | undefined>, generator: (payload: QuestionAnswer | undefined) => Generator<void | Promise<void>, void, unknown>, transcribedText: string, dispatch:any) {
  return async () => {


    if (questionData[currentQuestionIndex.current].startsWith("codeDSA")) {
      const payloadForCodingQn: QuestionAnswer | undefined = allQuestionAnswerData.find((ele) => ele.question === questionData[currentQuestionIndex.current]);
      payloadForCodingQn && (generatorFunction.current = generator(payloadForCodingQn));

    }
    else {
      const payloadForNonCodingQn: QuestionAnswer = {
        question: questionData[currentQuestionIndex.current],
        answer: transcribedText
      };
      dispatch(addQuestionAnswer(payloadForNonCodingQn));
      generatorFunction.current = generator(payloadForNonCodingQn);
    }


    generatorFunction?.current?.next();

  };
}

function feedbackPostCall(dispatch:any, failedFeedbackQnQueue: React.MutableRefObject<QuestionAnswer[]>) {
  return async (payload: QuestionAnswer | undefined) => {
    try {
      const response = await fetch("https://ab8f-49-204-102-192.ngrok-free.app/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      if (response.status !== 200) {
        throw responseData.error || new Error(`Request failed with status ${response.status}`);
      }
      dispatch(addQuestionAnswerFeedback(responseData.result));
      failedFeedbackQnQueue.current = failedFeedbackQnQueue.current.filter((ele) => ele.question !== payload?.question);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      const isFailedQuestionExists = failedFeedbackQnQueue.current.some((ele) => ele.question === payload?.question);
      if (!isFailedQuestionExists) {
        console.log(payload, "inside catch");
        payload && (failedFeedbackQnQueue.current = [...failedFeedbackQnQueue.current, payload]);
      }
    }
  };
}

function callQuestionWOCode(questionData: string[], currentQuestionIndex: React.MutableRefObject<number>, voices: SpeechSynthesisVoice[], synth: SpeechSynthesis, handleMicPress: () => Promise<void>) {
  const utterThis = new SpeechSynthesisUtterance(questionData[currentQuestionIndex.current]);
  utterThis.voice = voices[0];
  utterThis.rate = 0.9;
  utterThis.pitch = 1;
  synth.speak(utterThis);

  utterThis.onend = () => handleMicPress();

}
