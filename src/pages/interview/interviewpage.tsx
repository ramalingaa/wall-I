import { useEffect, useState } from "react"
import FeedbackDisplay from "../../components/feedback/feedbackdisplay"
import Interview from "../interview";
import '@aws-amplify/ui-react/styles.css';
import { Auth } from "aws-amplify";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateJwtToken } from "../../redux/reducer";
import { useNavigate } from "react-router";
import InterviewText from "../interviewtext";


const InterviewPage = (props:any) => {
    const { questionDataForInterview } = useAppSelector((state) => state.interview)
    const [isInterviewCompleted, setIsInterviewCompleted] = useState<boolean | undefined>(false)
    const [jwtToken, setJwtToken] = useState<string>('')

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const getJwtToken = async() => {
        try {
            const jwtTokenFunction = (await Auth.currentSession()).getIdToken().getJwtToken();
            setJwtToken(jwtTokenFunction); 
            const payload =  jwtTokenFunction 
            dispatch(updateJwtToken(payload))
          } catch (error) {
            console.error('Error fetching JWT token:', error);
          }
    }
    useEffect(() => {
        getJwtToken()
        if(questionDataForInterview.length === 0){
            navigate("/select-level")
        }
    },[])
    
    return(
        <div>
            
            {
            !isInterviewCompleted ?  <InterviewText setIsInterviewCompleted = { setIsInterviewCompleted} /> : <FeedbackDisplay />
             }
        </div>
    )
}
export default InterviewPage