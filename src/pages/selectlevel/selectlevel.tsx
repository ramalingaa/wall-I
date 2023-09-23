import React, { useState, useRef } from 'react'
import axios from 'axios';
import "./selectlevel.css"
import { useAppDispatch } from '../../hooks/redux';
import { addInterviewQuestionData } from '../../redux/reducer';
import { BallTriangle  } from  'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { NavigateFunction } from 'react-router-dom';

interface ErrorState {
    language: boolean;
    interviewLevel: boolean;
    noOfQuestions: boolean;
  }
const SelectLevel = () => {

    const [language, setLanguage] = useState<string>('')
    const [interviewLevel, setInterviewLevel] = useState<string>('')
    const [noOfQuestions, setNoOfQuestions] = useState<number>(0) 
    const [experience, setExperience] = useState<string>('')  
    const [isLoading, setIsLoading] = useState<boolean>(false) 
    const [errorStateForInputs, setErrorStateForInputs] = useState<ErrorState>({language:false, interviewLevel:false, noOfQuestions:false})
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    

    const interviewLevelSubmitClickHandler = () => {
        if(language && interviewLevel && noOfQuestions){
            getInterviewQuestionsFromAgent({language, interviewLevel, noOfQuestions, dispatch, navigate, experience, setIsLoading})
        }else {
            if(!language && !noOfQuestions && !interviewLevel){
                setErrorStateForInputs({language:true, interviewLevel:true, noOfQuestions:true})
            } else if (!language){
                setErrorStateForInputs((prev) => ({...prev, language:true}))
            }else if (!interviewLevel){
                setErrorStateForInputs((prev) => ({...prev, interviewLevel:true}))
            }else if (!noOfQuestions){
                setErrorStateForInputs((prev) => ({...prev, noOfQuestions:true}))
            }
        }
    }
    const languageChangeHandler = (e:any) => {
        if(e.target.value){
            setLanguage(e.target.value)
            setErrorStateForInputs((prev) => ({...prev, language:false}))
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
            setErrorStateForInputs((prev) => ({...prev, interviewLevel:false}))

        }

    }
    const noOfQuestionsChangeHandler = (e:any) => {
        if(e.target.value >1 && e.target.value < 13){
            setNoOfQuestions(e.target.value)
            setErrorStateForInputs((prev) => ({...prev, noOfQuestions:false}))
        }else {
            setNoOfQuestions(0)
            setErrorStateForInputs((prev) => ({...prev, noOfQuestions:true}))

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
            <h2 className = "configure-header">Configure your Interview</h2>
            <b>All fields with <span className='required-symbol'>asterisk (</span> ) are required</b>
            <div className='lang-children-parent'>
                <p className='required-symbol'>Choose your programming language for Interview</p>
                <div>
                    <select onChange = {languageChangeHandler} required className='userinput-width'>
                        <option disabled = {language ? true : false} value="">Select Programming Language</option>
                        <option value = "JavaScript">JavaScript</option>
                        <option value = "Python">Python</option>
                    </select>
                    <p className={errorStateForInputs.language? "error-visible": "error-hidden"}>Select your programming language</p>
                </div>
            </div>
            <div className='exp-children-parent'>
                <p className='required-symbol'>Choose Your Experience Level</p>
                <div>
                    <select onChange = {interviewLevelChangeHandler} required className='userinput-width'>
                        <option disabled = {interviewLevel ? true : false} value="">Select Your Expertise Level</option>
                        <option value = "Beginner">Beginner(0-6 months experience)</option>
                        <option value = "Intermediate">Intermediate(6-2 months experience)</option>
                        <option value = "Advanced">Advanced(more than 2 years of experience)</option>
                    </select>
                    <p className={errorStateForInputs.interviewLevel? "error-visible": "error-hidden"}>Select your expertise</p>

                </div>
            </div>
            <div className='qns-children-parent'>
                 <p className='required-symbol'>Choose No Of questions for interview</p>
                 <div>
                    <input type = "number" name = "no-of-qns" onChange = {noOfQuestionsChangeHandler} className='userinput-width' placeholder='Enter question count'required min="2" max = "12"/>
                    <p className={errorStateForInputs.noOfQuestions? "error-visible": "error-hidden"}>Select Questions count </p>
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
            
            <button onClick = {interviewLevelSubmitClickHandler} className='btn primary'>Submit</button>
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
}
async function getInterviewQuestionsFromAgent(props: getInterviewQuestionsFromAgentProps) {
    const { language, interviewLevel, noOfQuestions, dispatch, navigate, experience, setIsLoading } = props 
    setIsLoading(true)

    const userMessage = {
      language: language,
      interviewLevel: interviewLevel,
      noOfQuestions: noOfQuestions,
      experience: experience
    };
    try {
      const response = await axios.post('https://c442-49-204-102-192.ngrok-free.app/api/questions', { user_message: userMessage });
      const assistantReply = response.data.assistant_reply;
  
      const interviewQuestionData = assistantReply.split(/\d+\.\s+/).filter((str: string) => str.trim() !== "");
      const payload: string[] = interviewQuestionData;
      dispatch(addInterviewQuestionData(payload));
      navigate("/interview-text")
      console.log('Assistant Reply:', assistantReply);
      setIsLoading(false);

    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false)

    } finally {
        setIsLoading(false)
    }
  }
  