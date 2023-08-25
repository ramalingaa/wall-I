import React, { useEffect, useRef, useState } from 'react';
import LandingPage from './pages/landingpage';
import { BrowserRouter as Router,Routes, Route, Navigate} from "react-router-dom"
import Interviewpage from './pages/interview/interviewpage';
import About from './pages/about';


function App(props:any) {
  
  return(
    <Router>
        <div className = "App">
      <Routes >
            <Route path = "/" element = {<LandingPage />}/>
            <Route path = "/auth" element = {<Interviewpage />}/>
            <Route path = "/about" element = {<About />}/>
      </Routes>
      </div>
    </Router>
    
  )
 }

 export default App;