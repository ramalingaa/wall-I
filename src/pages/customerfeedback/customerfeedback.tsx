import React, { useState } from 'react';
import axios from 'axios';
import "./customerfeedback.css"
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { resetPrevInterviewFeedbackData } from '../../redux/reducer';


function CustomerFeedback() {
  // Define state variables to store user feedback
  const [worked, setWorked] = useState('');
  const [didntWork, setDidntWork] = useState('');
  const [didntLike, setDidntLike] = useState('');
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
        didntLike,
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
      <h2 className='align-center'>Feedback Form</h2>
      <form onSubmit={handleSubmit} className='userfeedback-parent'>
        <div className='feedback-segement'>
          <label htmlFor="worked">Things that worked :</label>
          <textarea
            id="worked"
            value={worked}
            onChange={(e) => setWorked(e.target.value)}
            required
            cols = {50}
            rows = {5}
          />
        </div>
        <div className='feedback-segement'>
          <label htmlFor="didntWork">Things that didn't work:</label>
          <textarea
            id="didntWork"
            value={didntWork}
            onChange={(e) => setDidntWork(e.target.value)}
            required
            cols = {50}
            rows = {5}
          />
        </div>
        <div className='feedback-segement'>
          <label htmlFor="didntLike">Things that can improve:</label>
          <textarea
            id="didntLike"
            value={didntLike}
            onChange={(e) => setDidntLike(e.target.value)}
            required
            cols = {50}
            rows = {5}
          />
        </div>
        <div className='feedback-segement'>
          <label htmlFor="canImprove">Anything you want share with our team😊</label>
          <textarea
            id="canImprove"
            value={canImprove}
            onChange={(e) => setCanImprove(e.target.value)}
            required
            cols = {50}
            rows = {5}
          />
        </div>
        <button type="submit" className = "btn primary">Submit Feedback</button>
      </form>
    </div>
  );
}

export default CustomerFeedback;
