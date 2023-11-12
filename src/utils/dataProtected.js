import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DataContext = createContext(false);

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const hasData = useContext(DataContext); // Assume this context holds the data state
  const navigate = useNavigate();

useEffect(() => {
    if (!hasData) {
      navigate('/'); // Replace with the path you want to redirect to
    }
  }, [hasData, navigate]);

  return hasData ? children : null;
};