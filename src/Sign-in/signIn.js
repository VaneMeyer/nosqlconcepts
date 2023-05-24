import React from "react";
import "./signin.css";

const SignIn = () => {
  const handleLogin = () => {
    // open Authorization-URL from OAuth2-Provider
    window.location.href = "AUTHORIZATION_URL";
    //example: const authorizationUrl = `AUTHORIZATION_ENDPOINT?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
  };

  return (
    <div id="sign-in">
      <button onClick={handleLogin}>Login with OAuth2</button>
    </div>
  );
};

export default SignIn;
