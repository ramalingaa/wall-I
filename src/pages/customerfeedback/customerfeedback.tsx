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
  const { userDetails } = useAppSelector((state) => state.interview)
  const  navigate = useNavigate()
  const dispatch = useAppDispatch()
  // Function to handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();

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
      const response = await axios.post('https://08jpdfep8d.execute-api.ap-south-1.amazonaws.com/mockman/user-feedback', {...feedbackData});
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
  };

  return (
    <div >
      <h2 className='text-xl font-bold  align-center p-4'>Feedback Form</h2>
      <form onSubmit={handleSubmit} className='userfeedback-parent'>
        <div className='flex feedback-segement'>
          <label htmlFor="worked">Things that worked</label>
                          <Textarea
                                isInvalid={false}
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Enter your Answer Here"
                                errorMessage=""
                                minRows = {5}
                                maxRows = {10}
                                fullWidth = {true}
                                className="w-full textarea-interview"
                                onChange = {(e) => setWorked(e.target.value)}
                                value={worked}

                                />
        </div>
        <div className='flex feedback-segement'>
          <label htmlFor="didntWork">Things that didn't work</label>
           <Textarea
                                isInvalid={false}
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Enter your Answer Here"
                                errorMessage=""
                                minRows = {5}
                                maxRows = {10}
                                fullWidth = {true}
                                className="w-full textarea-interview"
                                onChange = {(e) => setDidntWork(e.target.value)}
                                value={didntWork}

                                />
        </div>

        <div className='flex feedback-segement'>
          <label htmlFor="canImprove">Anything you want share with our team😊</label>
              <Textarea
                                isInvalid={false}
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Enter your Answer Here"
                                errorMessage=""
                                minRows = {5}
                                maxRows = {10}
                                fullWidth = {true}
                                className="w-full textarea-interview"
                                onChange = {(e) => setCanImprove(e.target.value)}
                                value={canImprove}

                                />
        </div>
        <Button color="primary" type="submit" className = "mb-4">Submit Feedback</Button>
      </form>
    </div>
  );
}

export default CustomerFeedback;
