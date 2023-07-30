import React, { useEffect, useRef, useState } from 'react';
import LandingPage from './pages/landingpage';
import Interview from './pages/interview';
import CodeEditor from './components/codeeditor/codeeditor';


function App() {
  const [isInterviewCompleted, setIsInterviewCompleted] = useState<boolean | undefined>(false)

  return(
    <div className = "App">
      <Interview setIsInterviewCompleted = { setIsInterviewCompleted} />
    </div>
  )
 }

export default App;
