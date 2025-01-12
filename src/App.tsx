import React, { useEffect, useRef, useState } from 'react';
import LandingPage from './pages/landingpage/landingpage';
import { BrowserRouter as Router,Routes, Route} from "react-router-dom"
import About from './pages/about/about';
import NavbarComponent from './components/navbar/navbar';
import SelectLevel from './pages/selectlevel/selectlevel';
import { Login } from './components/auth/login';
import { RequireAuth } from './requireauth';
import NotFound from './pages/notfound/notfound';
import FeedbackDisplay from './components/feedback/feedbackdisplay';
import Interview from './pages/interviewaudio/interview';
import InterviewText from './pages/interviewtext/interviewtext';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import axios from 'axios'
import { updateJwtToken, updateUserDetails } from './redux/reducer';
import CustomerFeedback from './pages/customerfeedback/customerfeedback';
import SingleEditor from './components/codeeditor/singleeditor';
import CodeEditor from './components/codeeditor/codeeditor';
import Footer from './components/footer/footer';
import ContactUS from './pages/contact us/contactus';
import InterviewQuestions from './SampleInterviewq';
function App() {
  const { route, user } = useAuthenticator((context) => [context.route, context.user]);
  const { userDetails, jwtToken } = useAppSelector((state) => state.interview)
  const jwtTokenFetched = user?.getSignInUserSession()?.getIdToken().getJwtToken()
  const dispatch = useAppDispatch()
  const headers = {
    'Authorization': `Bearer ${jwtToken || jwtTokenFetched}`, // Add 'Bearer ' before the token
    'Content-Type': 'application/json',
  }
  // async function getUserDetails() {
    
  //   const apiFeedbackData = {
  //     user_id: user?.attributes?.sub
  //   }
  
  //     try {
  //       const response = await axios.post('https://uxe3u4fjf8.execute-api.ap-south-1.amazonaws.com/dev/api/getuserdetails', { ...apiFeedbackData }, { headers });
  //       dispatch(updateUserDetails(response.data))
  //     } catch (error) {
  //       console.error('Error:', error);
  //     } 
  //   };
  // useEffect(() => {
  //   if(route === "authenticated"){
  //       if(!userDetails?.userId && user?.attributes?.sub){
  //           getUserDetails()
  //       }
  //       if(!jwtToken){
  //         dispatch(updateJwtToken(jwtTokenFetched))
  //       }
  //   }
 
  // },[route])
  return(
    <Router>
        <div className = "App">
            <NavbarComponent />
            <Routes >
                  <Route path = "/" element = {<LandingPage />}/>
                  <Route path = "/about" element = {<About />}/>
                  <Route path = "/contact" element = {<ContactUS />}/>
                  {/* protected routes */}
                  <Route path="/select-level" element={<RequireAuth><SelectLevel /></RequireAuth>} />
                  {/* <Route path="/interview" element={<RequireAuth><Interview /></RequireAuth>} /> */}
                  <Route path="/feedback" element={<RequireAuth><FeedbackDisplay /></RequireAuth>} />
                  {/* <Route path="/interview-text" element={<RequireAuth><InterviewQuestions /></RequireAuth>} /> */}
                  <Route path="/code-editor" element={<RequireAuth><CodeEditor /></RequireAuth>} />
                  <Route path="/user-feedback" element={<RequireAuth><CustomerFeedback /></RequireAuth>} />
                  <Route path="/login" element={<Login />} />
                  <Route path = "*" element={<NotFound />} />
                  <Route path="/interview-text" element={<InterviewQuestions />} />

            </Routes>
            <Footer />

        </div>
    </Router>
   
    
  )
 }

 export default App;