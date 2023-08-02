import { useState } from "react"
import FeedbackDisplay from "../../components/feedback/feedbackdisplay"
import Interview from "../interview";
import { withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';

import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);
const InterviewPage = () => {
    const [isInterviewCompleted, setIsInterviewCompleted] = useState<boolean | undefined>(false)

    return(
        <div>
            {
                isInterviewCompleted ? <FeedbackDisplay /> : <Interview setIsInterviewCompleted = { setIsInterviewCompleted} />
             }
        </div>
    )
}
export default withAuthenticator(InterviewPage)