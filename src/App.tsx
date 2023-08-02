import React, { useEffect, useRef, useState } from 'react';
import LandingPage from './pages/landingpage';
import Interview from './pages/interview';
import CodeEditor from './components/codeeditor/codeeditor';
import FeedbackDisplay from './components/feedback/feedbackdisplay';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Routes, Route, Navigate} from "react-router-dom"
import Interviewpage from './pages/interview/interviewpage';


function App(props:any) {

  const [isInterviewCompleted, setIsInterviewCompleted] = useState<boolean | undefined>(false)
  return(
    <div className = "App">
     {/* {
      isInterviewCompleted ? <FeedbackDisplay /> : <Interview setIsInterviewCompleted = { setIsInterviewCompleted} />
     } */}
     <Routes >
          <Route path = "/" element = {<LandingPage />}/>
          <Route path = "/auth" element = {<Interviewpage />}/>
     </Routes>
    </div>
  )
 }

 export default App;