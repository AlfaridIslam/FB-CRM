import React from "react";
import { useFacebookLoginQuery } from "../slices/apiSlice";

const FacebookLogin = () => {
  const { data, error, isLoading } = useFacebookLoginQuery();

  // Handle loading and error states (optional)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Handle successful login (optional)
  // This example redirects to "/callback" for further processing
  // You might perform other actions based on your needs

  if (data) {
    const navigate = useNavigate(); // Import useNavigate hook
    navigate("/callback");
    return null; // Prevent rendering after redirect
  }

  // Render the login button or link
  return (
    <div>
      <a href="/auth/facebook">
        <button>Login with Facebook</button>
      </a>
    </div>
  );
};

export default FacebookLogin;
