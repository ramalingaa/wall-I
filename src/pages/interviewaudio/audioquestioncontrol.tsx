import React, { useState, useEffect } from 'react'
import {Card, CardBody, Textarea, CardHeader, Button, CardFooter} from "@nextui-org/react";

const AudioQuestionControls = ({ currentQuestion = "What is JavaScript"}) => {
    const initialState: SpeechSynthesisVoice[] = [];
    const synth = window.speechSynthesis;
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(initialState);
    const [isTextDisplayRequiredForQuestion, setIsTextDisplayRequiredForQuestion] = useState<boolean>(false)
    const [isQuestionSpokeFirstTime, setIsQuestionSpokeFirstTime] = useState<boolean>(false)
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

    const speakQuestionOut = () => {
        const utterThis = new SpeechSynthesisUtterance(currentQuestion);
        utterThis.voice = voices[0];
        utterThis.rate = 0.9;
        utterThis.pitch = 1;
        synth.speak(utterThis);
      
        utterThis.onend = () => {
            if(!isQuestionSpokeFirstTime) {
                setIsQuestionSpokeFirstTime(true)
            }
        };
    }
  return (
    <div>
        <Card className="w-full align-center pb-4 interviewtext-card-container">
            <CardHeader className="flex flex-col gap-4">
                {isTextDisplayRequiredForQuestion && <p>{currentQuestion}</p>}
                <div className="flex gap-4">
                    <Button size="sm" color="primary" onPress={speakQuestionOut}>{isQuestionSpokeFirstTime ? "Repeat" : "Listen"}</Button>
                    <Button size="sm" color="primary" onPress={() => setIsTextDisplayRequiredForQuestion(!isTextDisplayRequiredForQuestion)}>{isTextDisplayRequiredForQuestion ? "Hide Question" : "Show Question"}</Button>
                </div>
            </CardHeader>
        </Card>
    </div>
  )
}

export default AudioQuestionControls