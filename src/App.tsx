import React, { useEffect, useRef, useState } from 'react';
import LandingPage from './pages/landingpage';
import Interview from './pages/interview';
import CodeEditor from './components/codeeditor/codeeditor';
import FeedbackDisplay from './components/feedback/feedbackdisplay';


function App() {
  const [isInterviewCompleted, setIsInterviewCompleted] = useState<boolean | undefined>(false)

  return(
    <div className = "App">
     {
      isInterviewCompleted ? <FeedbackDisplay /> : <Interview setIsInterviewCompleted = { setIsInterviewCompleted} />
     }
    </div>
  )
 }

export default App;
