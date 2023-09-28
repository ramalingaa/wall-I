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
import { useAuthenticator, View } from '@aws-amplify/ui-react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import axios from 'axios'
import { updateUserDetails } from './redux/reducer';
function App() {
  const { route } = useAuthenticator((context) => [context.route, ]);
  const { userDetails, userId } = useAppSelector((state) => state.interview)
  const dispatch = useAppDispatch()
  async function getUserDetails() {
    const apiFeedbackData = {
      user_id: userId
    }
    const headers =  {
      'Content-Type': 'application/json', // Set the content type you're sending
      'Access-Control-Allow-Origin': '*', // Allow requests from all origins (for development/testing)
      // Add other headers as needed
    }
      try {
        const response = await axios.post('https://tlc5ruhgyb.execute-api.ap-south-1.amazonaws.com/mockman/getuserdetails', { ...apiFeedbackData }, { headers });
        console.log(response.data);
        dispatch(updateUserDetails(response.data))
      } catch (error) {
        console.error('Error:', error);
      } finally {
      }
    };
  useEffect(() => {
    if(route === "authenticated" && !userDetails.userId){
        getUserDetails()
    }
  },[route])
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