import React, { useState, useRef } from 'react'
import axios from 'axios';
import "./selectlevel.css"
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addInterviewQuestionData, resetPrevInterviewFeedbackData } from '../../redux/reducer';
import { BallTriangle  } from  'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { NavigateFunction } from 'react-router-dom';

interface ErrorState {
    language: string;
    experience: string;
    noOfQuestions: string;
    outOfCredits: string;

  }
  const errorMessageInitialState = {
    language: '',
    experience: '',
    noOfQuestions: '',
    outOfCredits: ''

  }
const SelectLevel = () => {

    const [language, setLanguage] = useState<string>('')
    const [interviewLevel, setInterviewLevel] = useState<string>('')
    const [noOfQuestions, setNoOfQuestions] = useState<number>(0) 
    const [experience, setExperience] = useState<string>('')  
    const [isLoading, setIsLoading] = useState<boolean>(false) 
    const [errorMessagesData, setErrorMessagesData] = useState<ErrorState>(errorMessageInitialState)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { jwtToken, userDetails } = useAppSelector((state) => state.interview)
    
    const selectlevelErrorMessages = {
        language: "Select your programming language",
        experience: "Please Choose your experience",
        noOfQuestions: "Choose questions size for this interview",
        minQuestions: "Minimum 2 questions are required",
        maxQuestions: "Maximum 10 questions allowed",
        outOfCredits: "Your ran out of Interview Credits. Mail us at teammockman@gmail.com to get more credits"
    }
    const interviewLevelSubmitClickHandler = () => {
        dispatch(resetPrevInterviewFeedbackData())
       if(Number(userDetails.credit) > 0){
        setErrorMessagesData((prev:ErrorState) => ({...prev, outOfCredits:''}))
        if(language && interviewLevel && noOfQuestions){
            getInterviewQuestionsFromAgent({language, interviewLevel, noOfQuestions, dispatch, navigate, experience, setIsLoading, jwtToken})
        }else {
            if(!language && !noOfQuestions && !interviewLevel){
                setErrorMessagesData({language:selectlevelErrorMessages.language, experience: selectlevelErrorMessages.experience, noOfQuestions:selectlevelErrorMessages.noOfQuestions, outOfCredits:''})
            } else if (!language){
                setErrorMessagesData((prev:ErrorState) => ({...prev, language:selectlevelErrorMessages.language}))
            }else if (!interviewLevel){
                setErrorMessagesData((prev: ErrorState) => ({...prev, experience:selectlevelErrorMessages.experience}))
            }else if (!noOfQuestions){
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
  return (
    <div>
        { isLoading ? <div className = "loader-container">
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass="loading-balls-wrapper"
                visible={true}/>
            <p>Please wait while we configure your MockMan</p>
        </div> :
        <div className='selectlevel-container-parent'>
            <h2 className = "align-center">Configure your Interview</h2>
            <b>All fields with <span className='required-symbol'>asterisk (</span> ) are required</b>
            <div className='lang-children-parent'>
                <p className='required-symbol'>Choose your programming language for Interview</p>
                <div>
                    <select onChange = {languageChangeHandler} required className='userinput-width'>
                        <option disabled = {language ? true : false} value="">Select Programming Language</option>
                        <option value = "JavaScript">JavaScript</option>
                        <option value = "Python">Python</option>
                        <option value = "Java">Java</option>
                    </select>
                    <p className='error-visible'>{errorMessagesData.language}</p>
                </div>
            </div>
            <div className='exp-children-parent'>
                <p className='required-symbol'>Choose Your Experience Level</p>
                <div>
                    <select onChange = {interviewLevelChangeHandler} required className='userinput-width'>
                        <option disabled = {interviewLevel ? true : false} value="">Select Your Expertise Level</option>
                        <option value = "Beginner">Beginner(0-6 months experience)</option>
                        <option value = "Intermediate">Intermediate(6-12 months experience)</option>
                        <option value = "Advanced">Advanced(more than 2 years of experience)</option>
                    </select>
                    <p className='error-visible'>{errorMessagesData.experience}</p>

                </div>
            </div>
            <div className='qns-children-parent'>
                 <p className='required-symbol'>Choose No Of questions for interview</p>
                 <div>
                    <input type = "number" name = "no-of-qns" onChange = {noOfQuestionsChangeHandler} className='userinput-width' placeholder='Enter question count'required min="2" max = "12"/>
                    <p className='error-visible'>{errorMessagesData.noOfQuestions}</p>
                 </div>
            </div>
            {/* <div className='qns-children-parent'>
                 <p>Do you want Programming questions as well?</p>
                 <label htmlFor='DSAQuestion'>Yes
                    <input type = "radio" name = "no-of-qns" id = "DSAQuestion"/>
                 </label>
                 <label htmlFor='DSAQuestion'>No
                    <input type = "radio" name = "no-of-qns" id = "DSAQuestion"/>
                 </label>
            </div> */}
            {/* <div>
                <p>Have JD for the Job you are applying for?</p>
            </div> */}
            <p className='error-visible align-center'>{errorMessagesData.outOfCredits}</p>

            <button onClick = {interviewLevelSubmitClickHandler} className='btn primary'>Start Interview</button>
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
}
async function getInterviewQuestionsFromAgent(props: getInterviewQuestionsFromAgentProps) {
    const { language, interviewLevel, noOfQuestions, dispatch, navigate, experience, setIsLoading, jwtToken } = props 
    setIsLoading(true)

    const userMessage = {
      language: language,
      interviewLevel: interviewLevel,
      noOfQuestions: noOfQuestions,
      experience: experience
    };
    const headers = {
        'Authorization': `Bearer ${jwtToken}`, // Add 'Bearer ' before the token
        'Content-Type': 'application/json',
      }
    try {
      const response = await axios.post('https://08jpdfep8d.execute-api.ap-south-1.amazonaws.com/mockman/api/questions', { user_message: userMessage }, { headers });
      const assistantReply = JSON.parse(response.data.assistant_reply);
      const questionsArray = assistantReply.reduce((result:any, item:any) => {
        result.push(item.question, item['follow-up question']);
        return result;
      }, []);
    //   dispatch(addInterviewQuestionData(questionsArray));
    //   navigate("/interview-text")
      console.log('Assistant Reply:', questionsArray);
      setIsLoading(false);

    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false)

    } finally {
        setIsLoading(false)
    }
  }
  