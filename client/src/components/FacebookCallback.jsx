import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useFacebookCallbackQuery } from "../slices/apiSlice";
import Error from "../pages/Error";

const FacebookCallback = () => {
  const navigate = useNavigate(); // Use useNavigate hook
  const { data, error, isLoading } = useFacebookCallbackQuery();

  useEffect(() => {
    if (data) {
      // Handle successful login and redirect to Success component
      navigate("/success"); // Redirect to "/success" route
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}{<Error/>}</div>;

  return <div>Logging in...</div>;
};

export default FacebookCallback;
