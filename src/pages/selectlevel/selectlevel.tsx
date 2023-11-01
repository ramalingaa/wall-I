import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import "./selectlevel.css"
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addInterviewQuestionData, resetPrevInterviewFeedbackData } from '../../redux/reducer';
import { BallTriangle  } from  'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { NavigateFunction } from 'react-router-dom';
import {Button, Spinner} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import { expertiseLevel, noOfDSAQuestionsSet, noOfQuestionsSet, programmingLanguages } from '../../constants/constant';
import SelectComponent from '../../utils/Select';


interface ErrorState {
    language: string;
    experience: string;
    noOfQuestions: string;
    outOfCredits: string;
    noOfDSAQuestions?: string

  }
  const errorMessageInitialState = {
    language: '',
    experience: '',
    noOfQuestions: '',
    outOfCredits: '',
    noOfDSAQuestions: ''

  }
const SelectLevel = () => {

    const [language, setLanguage] = useState<string>('')
    const [interviewLevel, setInterviewLevel] = useState<string>('')
    const [noOfQuestions, setNoOfQuestions] = useState<number>(0) 
    const [experience, setExperience] = useState<string>('')  
    const [isLoading, setIsLoading] = useState<boolean>(false) 
    const [errorMessagesData, setErrorMessagesData] = useState<ErrorState>(errorMessageInitialState)
    const [dsaQuestionCount, setDsaQuestionCount] = useState<number>(0)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
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
    const selectlevelErrorMessages = {
        language: "Select your programming language",
        experience: "Please Choose your experience",
        noOfQuestions: "Choose questions size for this interview",
        minQuestions: "Minimum 2 questions are required",
        maxQuestions: "Maximum 10 questions allowed",
        outOfCredits: "Your ran out of Interview Credits. Mail us at teammockman@gmail.com to get more credits",
        maxNoOfDSAQuestions: "Maximum 3 allowed",
        minNoOfDSAQuestions: "Minimum 1 required",
    }
    const interviewLevelSubmitClickHandler = () => {
        dispatch(resetPrevInterviewFeedbackData())
       if(Number(userDetails.credit) > 0){
        setErrorMessagesData((prev:ErrorState) => ({...prev, outOfCredits:''}))
        if(language && interviewLevel && noOfQuestions && !errorMessagesData.noOfDSAQuestions){
            getInterviewQuestionsFromAgent({language, interviewLevel, noOfQuestions,dsaQuestionCount, dispatch, navigate, experience, setIsLoading, jwtToken})
        }else {
            if(!language && !noOfQuestions && !interviewLevel){
                setErrorMessagesData({language:selectlevelErrorMessages.language, experience: selectlevelErrorMessages.experience, noOfQuestions:selectlevelErrorMessages.noOfQuestions, outOfCredits:''})
            }
            if (!language){
                setErrorMessagesData((prev:ErrorState) => ({...prev, language:selectlevelErrorMessages.language}))
            } 
            if (!interviewLevel){
                setErrorMessagesData((prev: ErrorState) => ({...prev, experience:selectlevelErrorMessages.experience}))
            }
            if (!noOfQuestions){
                setErrorMessagesData((prev: ErrorState) => ({...prev, noOfQuestions:selectlevelErrorMessages.noOfQuestions}))
            }
        }
       }else {
        setErrorMessagesData((prev:ErrorState) => ({...prev, outOfCredits:selectlevelErrorMessages.outOfCredits}))
       }
    }
    const languageChangeHandler = (e:any) => {
        if(e.target.value){
            setLanguage(e.target.value)
            setErrorMessagesData((prev) => ({...prev, language:''}))
        }
    }
    const interviewLevelChangeHandler = (e:any) => {
        setInterviewLevel(e.target.value)
        if(e.target.value){
            if(e.target.value === "Beginner"){
                setExperience("0-6 months of experience")
            } else if(e.target.value === "Intermediate"){
                setExperience("0.5-2 years of experience")
            }else {
                setExperience("more than 2 years of experience")
            }
            setErrorMessagesData((prev) => ({...prev, experience:''}))

        }

    }
    const noOfQuestionsChangeHandler = (e:any) => {
        if(e.target.value >1 && e.target.value < 11){
            setNoOfQuestions(e.target.value)
            setErrorMessagesData((prev) => ({...prev, noOfQuestions:''}))
        }else if(!e.target.value) {
            setNoOfQuestions(0)
            setErrorMessagesData((prev) => ({...prev, noOfQuestions:selectlevelErrorMessages.noOfQuestions}))
        } else if(e.target.value < 2){
            setErrorMessagesData((prev) => ({...prev, noOfQuestions:selectlevelErrorMessages.minQuestions}))

        } else if(e.target.value > 10){
            setErrorMessagesData((prev) => ({...prev, noOfQuestions:selectlevelErrorMessages.maxQuestions}))

        }

    }
    const noOfDSAQuestionsChangeHandler = (e:any) => {
        if(e.target.value === ''){
            setErrorMessagesData((prev) => ({...prev, noOfDSAQuestions: ''}))
        }
        else if(Number(e.target.value) <= 3 && Number(e.target.value) >0){
            setErrorMessagesData((prev) => ({...prev, noOfDSAQuestions: ''}))
            setDsaQuestionCount(e.target.value)
        } else if(Number(e.target.value) > 3){
            setErrorMessagesData((prev) => ({...prev, noOfDSAQuestions: selectlevelErrorMessages.maxNoOfDSAQuestions}))
        } else if(Number(e.target.value) < 1){
            setErrorMessagesData((prev) => ({...prev, noOfDSAQuestions: selectlevelErrorMessages.minNoOfDSAQuestions}))
        }
    }

  return (
    <div>
        { isLoading ? <div className = "flex flex-col loader-container" ref={loaderRef}>
                <Spinner />
            <p className='align-center'>Please wait while we configure your MockMan</p>
        </div> :
        <div className='flex flex-col selectlevel-container-parent'>
            <h2 className = "text-xxl font-bold align-center">Configure your Interview</h2>
            <div className='flex gap-4 lang-children-parent'>
                <div>
                    <p className='required-symbol'>Choose your programming language for Interview</p>
                </div>
                <div className = "">
                    <SelectComponent itemsData = {programmingLanguages} changeHandlerFunction = {languageChangeHandler} errorMessage={errorMessagesData?.language} placeholder="Select Programming Language"/>
                </div>
            </div>
            <div className='flex gap-4 exp-children-parent'>
                <div>
                    <p className='required-symbol'>Choose your experience level</p>
                </div>
                <div>
                    <SelectComponent itemsData = {expertiseLevel} changeHandlerFunction = {interviewLevelChangeHandler} errorMessage={errorMessagesData?.experience} placeholder = "Select Experience Level"/>

                </div>
            </div>
            <div className='flex gap-4 qns-children-parent'>
                <div>
                    <p className='required-symbol'>Choose Number of Questions</p>
                </div>
                 <div>
                    <SelectComponent itemsData = {noOfQuestionsSet} changeHandlerFunction = {noOfQuestionsChangeHandler} errorMessage={errorMessagesData?.noOfQuestions} placeholder="Choose Number of Questions"/>
                 </div>
            </div>
            <div className='flex gap-4 qns-children-parent'>
                 <div>
                    <p>Choose Number of DSA Questions</p>
                 </div>
                 <div>
                    <SelectComponent itemsData = {noOfDSAQuestionsSet} changeHandlerFunction = {noOfDSAQuestionsChangeHandler} errorMessage={errorMessagesData?.noOfDSAQuestions} placeholder="Choose Number of Questions"/>
                 </div>
            </div>
            {/* <div>
                <p>Have JD for the Job you are applying for?</p>
            </div> */}
            <p className='error-visible align-center'>{errorMessagesData.outOfCredits}</p>
            <Button color='primary' onPress = {interviewLevelSubmitClickHandler} className = "self-center">Start Interview</Button>
        </div>
        }
    </div>
  )
}

export default SelectLevel
interface getInterviewQuestionsFromAgentProps {
    language: string;
    interviewLevel: string;
    noOfQuestions: number;
    dispatch: Dispatch;
    navigate: NavigateFunction;
    experience: string;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    jwtToken: string
    dsaQuestionCount: number
}
async function getInterviewQuestionsFromAgent(props: getInterviewQuestionsFromAgentProps) {
    const { language, interviewLevel, noOfQuestions,dsaQuestionCount, dispatch, navigate, experience, setIsLoading, jwtToken } = props 
    setIsLoading(true)

    const userMessage = {
      language: language,
      interviewLevel: interviewLevel,
      noOfQuestions: noOfQuestions,
      experience: experience,
      dsaQuestionCount: String(dsaQuestionCount)
    };
    const headers = {
        'Authorization': `Bearer ${jwtToken}`, // Add 'Bearer ' before the token
        'Content-Type': 'application/json',
      }
    try {
      const response = await axios.post('https://08jpdfep8d.execute-api.ap-south-1.amazonaws.com/mockman/api/questions', { user_message: userMessage }, { headers });
      console.log(response)
      const assistantReply = JSON.parse(response.data.assistant_reply);
      const nonDSAQuestionList:any[] = []
      const DSAQuestionList:any = [];

      for (const element of assistantReply) {
        if (typeof element === "string") {
            nonDSAQuestionList.push(element);
        } else {
            DSAQuestionList.push(element);
        }
      }
     
      const payload = {
          nonDSAArray: nonDSAQuestionList,
          dsaArray: DSAQuestionList
      }
      dispatch(addInterviewQuestionData(payload));
      navigate("/interview-text")
      setIsLoading(false);

    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false)

    } finally {
        setIsLoading(false)
    }
  }
  