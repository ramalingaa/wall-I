import { useEffect, useState } from "react"
import FeedbackDisplay from "../../components/feedback/feedbackdisplay"
import Interview from "../interview";
import '@aws-amplify/ui-react/styles.css';
import { Auth } from "aws-amplify";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateJwtToken } from "../../redux/reducer";


const InterviewPage = (props:any) => {
    const { signOut, user } = props
    const dispatch = useAppDispatch()

    const [isInterviewCompleted, setIsInterviewCompleted] = useState<boolean | undefined>(false)
    const [jwtToken, setJwtToken] = useState<string>('')
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
    },[])
    
    return(
        <div>
            
            {
            isInterviewCompleted ? <FeedbackDisplay signOut = {signOut} /> : <Interview setIsInterviewCompleted = { setIsInterviewCompleted} signOut = {signOut}/>
             }
        </div>
    )
}
export default InterviewPage