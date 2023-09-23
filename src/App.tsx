import React, { useEffect, useRef, useState } from 'react';
import LandingPage from './pages/landingpage';
import { BrowserRouter as Router,Routes, Route} from "react-router-dom"
import Interviewpage from './pages/interview/interviewpage';
import About from './pages/about';
import Navbar from './components/navbar/navbar';
import SelectLevel from './pages/selectlevel/selectlevel';
import { Login } from './components/auth/login';
import { RequireAuth } from './requireauth';
import NotFound from './pages/notfound/notfound';
import FeedbackDisplay from './components/feedback/feedbackdisplay';
import Interview from './pages/interview';
import InterviewText from './pages/interviewtext';

function App() {
  return(
    <Router>
        <div className = "App">
            <Navbar />
            <Routes >
                  <Route path = "/" element = {<LandingPage />}/>
                  <Route path = "/about" element = {<About />}/>
                  {/* protected routes */}
                  <Route path="/select-level" element={<RequireAuth><SelectLevel /></RequireAuth>} />
                  <Route path="/interview" element={<RequireAuth><Interview /></RequireAuth>} />
                  <Route path="/feedback" element={<RequireAuth><FeedbackDisplay /></RequireAuth>} />
                  <Route path="/interview-text" element={<RequireAuth><InterviewText /></RequireAuth>} />
                  <Route path="/login" element={<Login />} />
                  <Route path = "*" element={<NotFound />} />
            </Routes>
        </div>
    </Router>
   
    
  )
 }

 export default App;