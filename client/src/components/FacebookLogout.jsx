// src/components/FacebookLogout.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { useFacebookLogoutMutation } from "../slices/apiSlice";
import { clearUser } from "../slices/authSlice";

const FacebookLogout = () => {
  const [facebookLogout] = useFacebookLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await facebookLogout().unwrap();
      dispatch(clearUser());
      // Redirect to login or home page
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to logout user:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default FacebookLogout;
