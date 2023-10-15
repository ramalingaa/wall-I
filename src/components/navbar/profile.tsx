import React, { useEffect, useRef, useState } from 'react';
import "./navbar.css"
import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { resetInterviewState } from '../../redux/reducer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';



function ProfileCard() {
    const { route, signOut } = useAuthenticator((context) => [
        context.route,
        context.signOut,
      ]);
      const dispatch = useAppDispatch()
    const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false);
    const { userDetails } = useAppSelector(state => state.interview)
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const profileCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event:MouseEvent) {
      if (profileCardRef.current && !profileCardRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    }
  

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
const signOutHandler = () => {
    dispatch(resetInterviewState())
    signOut()
    navigate('/login');
}
  return (
    <div className="profile-card" ref={profileCardRef}>
      <div className={`profile ${expanded ? 'expanded' : ''}`}>
        <div className="profile-header cursor-pointer" onClick={toggleExpand}>
          <p>My Profile</p>
        </div>
        {expanded && (
          <div className="profile-details">
            <div className="user-info cursor-pointer">
              <p >Credits: {userDetails.credit}</p>
            </div>
            <div className="journey cursor-pointer">
              {/* <p>My Journey</p> */}
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
