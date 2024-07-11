// src/pages/Home.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../slices/apiSlice";
import { clearUser } from "../slices/authSlice";

const Home = () => {
  const userState = useSelector((state) => state.auth.user);
  const user = userState?.data?.user || {}; // Safely access user object

  console.log(userState); // For debugging

  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(clearUser());
      window.location.href = "/login"; // Redirect to login page after logout
    } catch (error) {
      console.error("Failed to logout user:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="jumbotron text-center text-primary">
        <h1 className="text-4xl font-bold mb-4">
          <span className="fa fa-lock mr-2"></span> Social Authentication
        </h1>
        <p>Welcome {user?.username || "Guest"}</p>
        <p className="text-lg mb-6">Login or Register with:</p>

        {user.username ? (
          <>
            <a
              href="/auth/facebook"
              className="btn bg-yellow-500 text-white px-4 py-2 rounded-full inline-flex items-center"
            >
              <span className="fa fa-facebook mr-2"></span> Sign Up with
              Facebook
            </a>
            <br />
            <br />
            <button
              onClick={handleLogout}
              className="btn bg-red-500 text-white px-4 py-2 rounded-full inline-flex items-center"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <a
              href="/login"
              className="btn bg-blue-500 text-white px-4 py-2 rounded-full inline-flex items-center"
            >
              Login
            </a>
            <a
              href="/register"
              className="btn bg-green-500 text-white px-4 py-2 rounded-full inline-flex items-center"
            >
              Register
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
