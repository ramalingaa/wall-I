import React, { useEffect, useRef, useState } from 'react';
import { SpeechSegment, stateToString, useSpeechContext } from '@speechly/react-client';

function App() {
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
  const [allInData, setAllInData] = useState<currentQuestionAll[]>([])
  const [isInterviewCompleted, setIsInterviewCompleted] = useState<Boolean>(false)

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

  useEffect(() => {
    if (segment) {
      const text = segment.words.map((w) => w.value).join(' ');
      setTentative(text);
      if (segment.isFinal) {
        setTentative('');
        setSpeechSegments((current) => {
          const finalText = [...current, segment]
          const finalTextResult = finalText.map((singleInstance) => {
            return singleInstance.words.map((word) => {
              return word.value
            }).join(" ")
          }).join("")
          setTranscribedText(finalTextResult)
          return [...current, segment]
        });
      }
    }
  }, [segment]);
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

  const handleMicPress = async () => {
    if (listening) {
      await stop();
    } else {
      await attachMicrophone();
      await start();
    }
  };

const questionData = ['What are Promises in Javascript', 'What is event loop in Javascript']
const handlerStartInterview = () => {
  const utterThis = new SpeechSynthesisUtterance(questionData[currentQuestionIndex.current]);
  utterThis.voice = voices[10];
    utterThis.rate = 1;
    utterThis.pitch = 1;
    synth.speak(utterThis);
    utterThis.onend = () => handleMicPress()
}
 
const handlerStopAnswer = async() => {
  await stop();
}
const handleNextQuestion = () => {
    
  currentQuestionIndex.current = currentQuestionIndex.current + 1

  console.log(currentQuestionIndex.current)
  if(currentQuestionIndex.current < questionData.length) {
    setSpeechSegments(() => [])
    setTranscribedText("")
    
    setTimeout(() => {
      handlerStartInterview()
    }, 5000)

    

  }else {
    setIsInterviewCompleted(true)
    setTimeout(() => {
      console.log("interview is completed")
      console.log(allInData)
          }, 5000)
   
  }
  
}
  const handleClearPress = async() => {
    try {
      const response = await fetch("http://localhost:8080/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer: transcribedText, question: questionData[currentQuestionIndex.current] }),
      });

      const responseData = await response.json();
      if (response.status !== 200) {
        throw responseData.error || new Error(`Request failed with status ${response.status}`);
      }

      console.log(responseData)
      const currentQuestionAllData = {
        question: questionData[currentQuestionIndex.current],
        answer: transcribedText,
        feedback:responseData.result
      }
      setAllInData((prev) => [...prev,currentQuestionAllData])

    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      
    }
    finally {
      handleNextQuestion()
    }
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
          <button onClick = {handlerStartInterview}>Start the Interview</button>
          <button onClick = {handlerStopAnswer}>Submit answer for this question</button>
          <button onClick={handleClearPress} disabled={!speechSegments.length && !tentative}>
            Next Question
          </button>
        </div>
      
        <div>
          {
            isInterviewCompleted &&<div>
              {
                allInData.map((singleInstance) => {
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
          {/* <div>
          {
            transcribedText && transcribedText
          }
        </div> */}
      </div>
    </div>
  );
}

export default App;
