import React, { useEffect, useRef, useState } from 'react';
import { SpeechSegment, stateToString, useSpeechContext } from '@speechly/react-client';
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { QuestionAnswer, addFailedFeedbackAPIData, addQuestionAnswer, addQuestionAnswerFeedback, removeFailedFeedbackAPIData, resetInterviewState } from '../redux/reducer';
import NonCodeInterviewDisplay from '../components/interview/noncodeinterviewdisplay';
import CodingInterviewDisplay from '../components/interview/codinginterviewdisplay';
import * as monaco from 'monaco-editor';
import RefreshTimer from '../components/timers/refreshtimer';
import "./landingpage.css"
import { useNavigate } from 'react-router-dom';
import { Steps, Hints } from "intro.js-react";
import "intro.js/introjs.css";

import axios from 'axios';


const Interview = (props:any) => {
  const { setIsInterviewCompleted } = props

  const [speechSegments, setSpeechSegments] = useState<SpeechSegment[]>([]);
  const initialState: SpeechSynthesisVoice[] = [];
  const [tentative, setTentative] = useState<string>('');
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
  const [isQuestionCompleted, setIsQuestionCompleted] = useState<boolean>(false)
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
  const { allQuestionAnswerData, questionDataForInterview, failedFeedbackAPICallQueue } = useAppSelector((state) => state.interview)
  useEffect(() => {
    if (segment) {
     
      if (segment.isFinal) {
        const text = segment.words.map((w) => w.value).join(' ');
         setTranscribedText((prev) => prev + text)
   
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
      const voice = voiceList.filter((ele) => ele.name === "Google US English")
      setVoices(voice)
    }
  }, [voices])
  const intervalId = useRef<ReturnType<typeof setInterval> | undefined>();
  //timer function to display refresh timer
  useEffect(() => {
    if (isTimerOn && timer === 1) {
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
    if(currentQuestionIndex.current > 0 && currentQuestionIndex.current === questionDataForInterview.length){
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
    if(questionDataForInterview.length > 0){
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
      if (!questionDataForInterview[currentQuestionIndex.current].startsWith("codeDSA:")) {
        callQuestionWOCode(questionDataForInterview, currentQuestionIndex, voices, synth, handleMicPress, setIsQuestionCompleted);
      }
  
      if (currentQuestionIndex.current > 0 && questionDataForInterview[currentQuestionIndex.current].startsWith("code")) {
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
  }
  const handlerStopAnswer = async () => {
    await stop();
    setIsAnswerSubmitted(true)
    setIsQuestionCompleted(false)
  }
  
  const handleSubmitAnswerForCodingQn = () => {
     const codeAnswer = editorRef.current ? editorRef.current?.getValue() :''
     const payload: QuestionAnswer = {
      question: questionDataForInterview[currentQuestionIndex.current],
      answer: codeAnswer
    }
    setIsAnswerSubmitted(true)
    dispatch(addQuestionAnswer(payload))
  }


  const handleNextQuestion = nextQuestionActualEvent(currentQuestionIndex, setSpeechSegments, setTranscribedText, handlerStartInterview, failedFeedbackQnQueue, questionDataForInterview)
  const handleTimer = () => {
    setIsTimerOn(true)
    setTimer(10)
  }
  const handleAPIFeedbackCall = feedbackPostCall(dispatch, failedFeedbackAPICallQueue)
  //generator function is to allow timer to start at the first and to make api call once timer is started without needing to complete the function call.
  function* generator(payload:QuestionAnswer | undefined) {
    yield handleTimer()
    yield handleAPIFeedbackCall(payload)
  }

  const handleNextQuestionPress = nextQuestionClickInitializer(currentQuestionIndex, allQuestionAnswerData, generatorFunction, generator, transcribedText, dispatch, questionDataForInterview);

  //ends
  const endInterviewHandler = () => {
    dispatch(resetInterviewState())
    navigate("/")
  }
  const [onBoardingProps, setOnBoardingProps] = useState( {
    stepsEnabled: true,
    initialStep: 0,
    steps: [
      {
        element: ".question",
        intro: "Total number of questions present in the Interview"
      },
      {
        element: ".currentQuestion",
        intro: "This shows current question your are taking in interview"
      },
      {
        element: ".end-interview",
        intro: "You can end your interview by clicking End Interview"
      },
      {
        element: "#start-interview-button",
        intro: "You can Start Interview by clicking Start Interview"
      },
      {
        element: "#btn-stop-answer",
        intro: "At the end of your answer click on Submit to Submit answer. Your answer is considered till you press Submit."
      },
      {
        element: "#btn-next",
        intro: "To move to the next question click on Next question"
      },
      {
        element: ".device-status",
        intro: "Your device status should be Connected or Active, If status is Disconnected please do not proceed with interview."
      },
      {
        element: ".microphone-status",
        intro: "Your microphone status will be displayed here."
      },
      {
        element: ".current-display-question",
        intro: "Current question will be displayed here."
      }
    ],
    hintsEnabled: true,
    hints: [
      {
        element: ".hello",
        hint: "Hello hint",
        hintPosition: "middle-right",
      }
    ]
  })
const onExit = () => {
  setOnBoardingProps((prev) => ({...prev, stepsEnabled:false}))
}
  return (
    <div>
          <Steps
          enabled={onBoardingProps.stepsEnabled}
          steps={onBoardingProps.steps}
          initialStep={onBoardingProps.initialStep}
          onExit={onExit}
        />
        <Hints enabled={onBoardingProps.hintsEnabled} hints={onBoardingProps.hints} />
          <div className="interview-action-header">
            {/* <button onClick = {signOut} className='btn btn-secondary'>Signout</button> */}
            <span className = "question">Total No-Of questions: {questionDataForInterview.length}</span>
            <span className = "currentQuestion">Current question No: {currentQuestionIndex.current + 1}</span>
            <button onClick = {endInterviewHandler} className='btn btn-primary bg-red end-interview'>End Interview</button>

          </div>

     {
      isTimerOn ? <RefreshTimer timer = { timer } /> :
       <div>
      {questionDataForInterview[currentQuestionIndex.current] && !questionDataForInterview[currentQuestionIndex.current].startsWith("codeDSA") ?
        <NonCodeInterviewDisplay tentative={tentative} currentQuestionIndex={currentQuestionIndex} isInterviewStarted={isInterviewStarted} isAnswerSubmitted={isAnswerSubmitted} isTimerOn={isTimerOn} timer={timer} clientState={clientState} microphoneState={microphoneState} handlerStartInterview={handlerStartInterview} handlerStopAnswer={handlerStopAnswer} handleNextQuestionPress={handleNextQuestionPress} isQuestionCompleted = {isQuestionCompleted}></NonCodeInterviewDisplay> : 
        <CodingInterviewDisplay currentQuestionIndex={currentQuestionIndex} handleNextQuestionPress={handleNextQuestionPress} setTimeTakenToSolveCodingQn = {setTimeTakenToSolveCodingQn} editorRef = {editorRef} handleSubmitAnswer = {handleSubmitAnswerForCodingQn} setIsAnswerSubmitted = { setIsAnswerSubmitted } isAnswerSubmitted = {isAnswerSubmitted}/>}
        
      </div>

     }
      
    </div>
  );

}
export default Interview

function nextQuestionActualEvent(currentQuestionIndex: React.MutableRefObject<number>, setSpeechSegments: React.Dispatch<React.SetStateAction<SpeechSegment[]>>, setTranscribedText: React.Dispatch<React.SetStateAction<string>>, handlerStartInterview: () => void, failedFeedbackQnQueue: React.MutableRefObject<QuestionAnswer[]>, questionDataForInterview: string[]) {
  return () => {
    currentQuestionIndex.current = currentQuestionIndex.current + 1;
    if (currentQuestionIndex.current < questionDataForInterview.length) {
      setSpeechSegments(() => []);
      setTranscribedText("");
      handlerStartInterview();

    } else {
      console.log("interview is completed");
      console.log(failedFeedbackQnQueue);

    }


  };
}

function nextQuestionClickInitializer(currentQuestionIndex: React.MutableRefObject<number>, allQuestionAnswerData: QuestionAnswer[], generatorFunction: React.MutableRefObject<Generator<void | Promise<void>, void, unknown> | undefined>, generator: (payload: QuestionAnswer | undefined) => Generator<void | Promise<void>, void, unknown>, transcribedText: string, dispatch:any, questionDataForInterview:string[]) {
  return async () => {
    if (questionDataForInterview[currentQuestionIndex.current].startsWith("codeDSA")) {
      const payloadForCodingQn: QuestionAnswer | undefined = allQuestionAnswerData.find((ele) => ele.question === questionDataForInterview[currentQuestionIndex.current]);
      payloadForCodingQn && (generatorFunction.current = generator(payloadForCodingQn));

    }
    else {
      const payloadForNonCodingQn: QuestionAnswer = {
        question: questionDataForInterview[currentQuestionIndex.current],
        answer: transcribedText
      };
      dispatch(addQuestionAnswer(payloadForNonCodingQn));
      generatorFunction.current = generator(payloadForNonCodingQn);
    }


    generatorFunction?.current?.next();

  };
}

export function feedbackPostCall(dispatch:any, failedFeedbackAPICallQueue: QuestionAnswer[]) {
  return async (payload: QuestionAnswer | undefined) => {
    const apiFeedbackData = {
        question: payload?.question,
        answer: payload?.answer
      };

    const isFailedDataAlreadyAdded = failedFeedbackAPICallQueue.some((feedback: QuestionAnswer) => feedback.question === apiFeedbackData.question)

    try {
      const response = await axios.post('https://be39-49-204-102-192.ngrok-free.app/api/feedback', { user_message: apiFeedbackData });
      const assistantReply = response.data.assistant_reply;
      const ratingIndex = assistantReply.indexOf("Rating: ");
      const feedbackText = assistantReply.substring(0,ratingIndex)
      const ratingSubstring = assistantReply.substring(ratingIndex+8);
      const ratingIndexUser = ratingSubstring.indexOf("/");
      const rating = ratingSubstring.substring(0,ratingIndexUser)
      const feedbackPayload = {
        question: payload?.question,
        answer: payload?.answer,
        feedback: feedbackText,
        rating: rating
      }
      dispatch(addQuestionAnswerFeedback(feedbackPayload));
      if(isFailedDataAlreadyAdded){
        dispatch(removeFailedFeedbackAPIData(apiFeedbackData))
      }
    } catch (error) {
      
      if(!isFailedDataAlreadyAdded){
        dispatch(addFailedFeedbackAPIData(apiFeedbackData))
      }
      console.error('Error:', error);
    } finally {
    }
  };
}

function callQuestionWOCode(questionDataForInterview: string[], currentQuestionIndex: React.MutableRefObject<number>, voices: SpeechSynthesisVoice[], synth: SpeechSynthesis, handleMicPress: () => Promise<void>, setIsQuestionCompleted:any) {
  const utterThis = new SpeechSynthesisUtterance(questionDataForInterview[currentQuestionIndex.current]);
  utterThis.voice = voices[0];
  utterThis.rate = 0.9;
  utterThis.pitch = 1;
  synth.speak(utterThis);

  utterThis.onend = () => {
    handleMicPress()
    setIsQuestionCompleted(true)
  };

}
