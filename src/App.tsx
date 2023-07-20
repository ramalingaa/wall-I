import React, { useEffect, useRef, useState } from 'react';
import LandingPage from './pages/landingpage';
import Interview from './pages/interview';
import CodeEditor from './components/codeeditor/codeeditor';


function App() {
  return(
    <div>
      {/* <Interview /> */}
      <CodeEditor />
    </div>
  )
 }

export default App;
