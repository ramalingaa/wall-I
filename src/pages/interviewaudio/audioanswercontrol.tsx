import React, { useState, useEffect } from 'react'
import {Card, CardBody, Button, CardFooter} from "@nextui-org/react";
import { SpeechSegment, stateToString, useSpeechContext } from '@speechly/react-client';
import SampleFile from './samplefile';

const AudioAnswerControls = () => {
    const [speechSegments, setSpeechSegments] = useState<SpeechSegment[]>([]);
    const [tentative, setTentative] = useState<string>('');
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
    const speakQuestionOut = () => {
        
    }
    useEffect(() => {
        if (segment) {
          const text = segment.words.map((w) => w.value).join(' ');
          setTentative(text);
          if (segment.isFinal) {
            setTentative('');
            setSpeechSegments((current) => {
                console.log([...current, segment])
                return [...current, segment]
            });
          }
        }
      }, [segment]);
    
    const handleMicPress = async () => {
        if (listening) {
          await stop();
        } else {
          await attachMicrophone();
          await start();
        }
      };
  return (
        <Card className="w-full pb-4 interviewtext-card-container">
            <CardBody>
                {/* Here we will show either video of caricature or user video it self */}
                <SampleFile />
            </CardBody>
            <CardFooter className = "flex justify-center gap-4">
                <Button size="sm" color="primary" onPress={handleMicPress}>{listening ? 'Stop Recording' : 'Start Recording'}</Button>
                <Button size="sm" color="primary" onPress={speakQuestionOut}>Submit Answer</Button>
                <Button size="sm" color="primary" onPress={speakQuestionOut}>Skip</Button>
            </CardFooter>
        </Card>
  )
}

export default AudioAnswerControls