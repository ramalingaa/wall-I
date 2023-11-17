import React, { useState } from 'react';
import axios from 'axios';
import "./customerfeedback.css"
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { resetPrevInterviewFeedbackData } from '../../redux/reducer';
import {Textarea, Button} from "@nextui-org/react";


function CustomerFeedback() {
  // Define state variables to store user feedback
  const [worked, setWorked] = useState('');
  const [didntWork, setDidntWork] = useState('');
  const [canImprove, setCanImprove] = useState('');
  const [errorMessage, setErrorMessage] = useState({ worked: false, didntWork: false, canImprove: false})
  const { userDetails } = useAppSelector((state) => state.interview)
  const  navigate = useNavigate()
  const dispatch = useAppDispatch()
  console.log(errorMessage)
  // Function to handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if(worked && didntWork && canImprove) {
        // Create a data object with user feedback
    const feedbackData = {
      userId: userDetails.userId,
      feedback: {
        worked,
        didntWork,
        canImprove,
      }
    };
    // Send the data to the server using Axios
    try {
      const response = await axios.post('https://uxe3u4fjf8.execute-api.ap-south-1.amazonaws.com/dev/api/userfeedback', {...feedbackData});
      if(response?.data.statusCode === 200) {
        dispatch(resetPrevInterviewFeedbackData())
        navigate("/")
      }
      // You can perform additional actions after successful submission
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting feedback.');
      // Handle the error as needed
    }
    } else {
        if(!worked && !didntWork && ! canImprove){
          setErrorMessage({ worked: true, didntWork: true, canImprove: true})
        } else if(!worked){
          setErrorMessage((prev) => ({...prev, worked: true}))
        } else if(!didntWork){
          setErrorMessage((prev) => ({...prev,didntWork: true}))
        } else if(!canImprove){
          setErrorMessage((prev) => ({...prev,canImprove: true}))
       }
  }
}
  const workedChangeHandler = (e:any) => {
    if(e.target.value){
      setWorked(e.target.value)
      setErrorMessage((prev) => ({...prev, worked: false}))
    } else {
      setErrorMessage((prev) => ({...prev, worked: true}))
    }
  }
  const didntworkChangeHandler = (e:any) => {
    if(e.target.value){
      setDidntWork(e.target.value)
      setErrorMessage((prev) => ({...prev, didntWork: false}))
    } else {
      setErrorMessage((prev) => ({...prev, didntWork: true}))
    }
  }
  const canImproveChangeHandler = (e:any) => {
    if(e.target.value){
      setCanImprove(e.target.value)
      setErrorMessage((prev) => ({...prev, canImprove: false}))
    } else {
      setErrorMessage((prev) => ({...prev, canImprove: true}))
    }
  }
  return (
    <div >
      <h2 className='text-xl font-bold  align-center p-4'>Feedback Form</h2>
      <form onSubmit={handleSubmit} className='userfeedback-parent'>
        <div className='flex feedback-segement'>
          <label htmlFor="worked">Things that worked</label>
                          <Textarea
                                isInvalid={errorMessage?.worked}
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Enter your Answer Here"
                                errorMessage={errorMessage?.worked && "Please add your comments"}
                                minRows = {5}
                                maxRows = {10}
                                fullWidth = {true}
                                className="w-full textarea-interview"
                                onChange = {workedChangeHandler}
                                value={worked}

                                />
        </div>
        <div className='flex feedback-segement'>
          <label htmlFor="didntWork">Things that didn't work</label>
           <Textarea
                                isInvalid={errorMessage?.didntWork} 
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Enter your Answer Here"
                                errorMessage={errorMessage?.didntWork && "Please add your comments"}
                                minRows = {5}
                                maxRows = {10}
                                fullWidth = {true}
                                className="w-full textarea-interview"
                                onChange = {didntworkChangeHandler}
                                value={didntWork}

                                />
        </div>

        <div className='flex feedback-segement'>
          <label htmlFor="canImprove">Anything you want share with our team😊</label>
              <Textarea
                                isInvalid={errorMessage?.canImprove}
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Enter your Answer Here"
                                errorMessage={errorMessage?.canImprove && "Please add your comments"}
                                minRows = {5}
                                maxRows = {10}
                                fullWidth = {true}
                                className="w-full textarea-interview"
                                onChange = {canImproveChangeHandler}
                                value={canImprove}

                                />
        </div>
        <Button color="primary" type="submit" className = "mb-4">Submit Feedback</Button>
      </form>
    </div>
  );
}

export default CustomerFeedback;
