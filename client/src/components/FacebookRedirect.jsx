import React, { useEffect } from "react";

const FacebookRedirect = () => {
  useEffect(() => {
    window.location.href = "http://localhost:8000/api/v1/fbusers";
  }, []);

  return <div>Redirecting to Facebook login...</div>;
};

export default FacebookRedirect;
