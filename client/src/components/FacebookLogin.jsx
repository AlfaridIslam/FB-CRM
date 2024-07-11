import React from "react";
import { Link } from "react-router-dom";

const FacebookLogin = () => {
  return (
    <div>
      <Link to="/auth/facebook">
        {" "}
        {/* Link to "/auth/facebook" route */}
        <button>Login with Facebook</button>
      </Link>
    </div>
  );
};

export default FacebookLogin;
