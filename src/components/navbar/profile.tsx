import React, { useState } from 'react';
import "./navbar.css"
import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { resetInterviewState } from '../../redux/reducer';
import { useAppDispatch } from '../../hooks/redux';



function ProfileCard() {
    const { route, signOut } = useAuthenticator((context) => [
        context.route,
        context.signOut,
      ]);
      const dispatch = useAppDispatch()
    const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
const signOutHandler = () => {
    dispatch(resetInterviewState())
    signOut()
    navigate('/login');
}
  return (
    <div className="profile-card">
      <div className={`profile ${expanded ? 'expanded' : ''}`}>
        <div className="profile-header cursor-pointer" onClick={toggleExpand}>
          <p>My Profile</p>
        </div>
        {expanded && (
          <div className="profile-details">
            <div className="user-info cursor-pointer">
              <p >About</p>
              {/* Display user profile data here */}
            </div>
            <div className="journey cursor-pointer">
              <p>My Journey</p>
              {/* Display user journey data here */}
            </div>
            <button className="btn btn-text" onClick = {signOutHandler}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
