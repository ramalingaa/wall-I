// RequireAuth.js
import { useLocation, Navigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import useDataCheck from './utils/useDataCheck';

export function RequireAuth({ children }) {
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);
  const hasRequiredData = useDataCheck(location.pathname); // Your custom hook to check for data
  if (route !== 'authenticated') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } 
  //write else if condtion to check current url
  else if (location.pathname === '/interview-text' && !hasRequiredData) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  else if (location.pathname === '/code-editor' && !hasRequiredData) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  else if (location.pathname === '/feedback' && !hasRequiredData) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  
  return children;
}
