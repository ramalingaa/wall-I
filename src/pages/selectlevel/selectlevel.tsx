import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import "./selectlevel.css"
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addInterviewQuestionData, resetPrevInterviewFeedbackData } from '../../redux/reducer';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { NavigateFunction } from 'react-router-dom';
import {Button, Input, Spinner} from "@nextui-org/react";
import { expertiseLevel, noOfDSAQuestionsSet, noOfQuestionsSet, programmingLanguages } from '../../constants/constant';
import SelectComponent from '../../utils/Select';


interface ErrorState {

    outOfCredits?: string;
    jobdescription?: string

  }
  const errorMessageInitialState = {
  
    outOfCredits: '',


  }
  const selectlevelErrorMessages = {
    outOfCredits: "Your ran out of Interview Credits. Mail us at ramalinga@mockman.in to get more credits.",

}
const SelectLevel = () => {

  
    const [isLoading, setIsLoading] = useState<boolean>(false) 
    const [errorMessagesData, setErrorMessagesData] = useState<ErrorState>(errorMessageInitialState)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [jobDescription, setJobDescription] = useState<string>(""); // State to store user input

    const { jwtToken, userDetails } = useAppSelector((state) => state.interview)
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const scrollToLoader = () => {
        loaderRef?.current && loaderRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      useEffect(() =>{
        if(isLoading){
            scrollToLoader()
        }
    } ,[isLoading])
    
    const interviewLevelSubmitClickHandler = async () => {
        if (!jobDescription.trim()) {
          setErrorMessagesData(() => ({ jobdescription: "Please provide a valid job description." }));
          return;
        }
    
        setIsLoading(true);
        setErrorMessagesData(errorMessageInitialState); // Reset error messages
    
        try {
          const response = await axios.post(
            "https://9lut6mmui6.execute-api.ap-south-1.amazonaws.com/Develop/getinterviewquestionswithjd", // Replace with your API endpoint
            {
              jobDescription,
            },
            {
              headers: {
                "Content-Type": "application/json",
                
              },
            }
          );
    
          // Assuming the response contains interview configuration
          const interviewConfigData = JSON.parse(response.data.body);
          console.log("Interview Configuration: ", JSON.parse(response.data.body));
          dispatch(addInterviewQuestionData(interviewConfigData))
          navigate("/interview-text")
        } catch (error) {
          console.error("Error during API call: ", error);
          setErrorMessagesData({ outOfCredits: "You Ran out of Interview Credits" });
        } finally {
          setIsLoading(false);
        }
      };
    
   
    
    
    

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col loader-container" ref={loaderRef}>
          <Spinner />
          <p className="align-center">Please wait while we configure your MockMan</p>
        </div>
      ) : (
        <div className="flex flex-col selectlevel-container-parent">
          <div>
            <p>Have JD for the Job you are applying for? Submit here</p>
            <Input
              placeholder="Enter job description..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)} // Update state on input change
            />
          </div>
          {errorMessagesData && (
            <p className="error-visible align-center danger">{errorMessagesData.jobdescription ?? errorMessagesData.jobdescription ?? ''}</p>
          )}
          <Button
            color="primary"
            onPress={interviewLevelSubmitClickHandler}
            className="self-center"
            isDisabled = {!jobDescription}
          >
            Start Interview
          </Button>
        </div>
      )}
    </div>
  )
}

export default SelectLevel
interface getInterviewQuestionsFromAgentProps {
   
}
async function getInterviewQuestionsFromAgent(props: getInterviewQuestionsFromAgentProps) {
   
 
  }
  
  