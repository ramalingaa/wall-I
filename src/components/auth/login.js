// components/Login.js
import { useEffect } from "react";

import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import "./login.css"
import { useNavigate, useLocation } from 'react-router';
import { Auth } from 'aws-amplify';
import { useAppDispatch } from "../../hooks/redux";
import { updateJwtToken } from "../../redux/reducer";


export function Login() {
  const { route } = useAuthenticator((context) => [context.route, ]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (route === 'authenticated') {
      async function fetchToken() {
          try {
            // Fetch the current authenticated user session
            const user = await Auth.currentAuthenticatedUser();
            // Access the JWT token from the user's session
            const jwtToken = user?.signInUserSession?.idToken?.jwtToken;
            // Do something with the JWT token (e.g., store it in state or local storage)
            const payload = jwtToken
            dispatch(updateJwtToken(payload))
          } catch (error) {
            console.error('Error fetching JWT token:', error);
          }
        
      }
      fetchToken()
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);
  return (
    <View className="auth-wrapper">
      <Authenticator></Authenticator>
    </View>
  );
}