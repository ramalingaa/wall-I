// useDataCheck.js
import { useAppSelector } from '../hooks/redux';

const useDataCheck = (props) => {
  // Retrieve the specific pieces of state you want to check
  const nonDsaData = useAppSelector((state) => state.interview.nonDSAquestionDataForInterview);
  const dsaQuestionData = useAppSelector((state) => state.interview.dsaQuestionDataForInterview);
  const feedbackData = useAppSelector((state) => state.interview.allQuestionAnswerFeedbackData);

  // ...add as many as needed
  let hasRequiredData;
    if(props === "/interview-text"){
        hasRequiredData = nonDsaData.length > 0 // ...add additional checks as needed
        
    } else if (props === "/code-editor"){
        hasRequiredData = dsaQuestionData.length > 0
    }
    else if (props === "/feedback"){
        hasRequiredData = feedbackData.length > 0
    }

  // Check if all required data is present and valid

  return hasRequiredData;
};

export default useDataCheck;
