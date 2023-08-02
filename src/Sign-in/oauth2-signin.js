import React from "react";
import OAuth2Login from "react-simple-oauth2-login";
import "./signin.css"
import {
  authorizationUrl,
  clientId,
  redirectUri,
  serverUrl } from "./oauth-config";


const OAuth2SignIn = () => {


  const onSuccess = (response) => console.log(response);
  const onFailure = (response) => console.error(response);

  return (
    <OAuth2Login
      authorizationUrl={authorizationUrl}
      responseType="token"
      clientId={clientId}
      redirectUri={redirectUri}
      onSuccess={onSuccess}
      onFailure={onFailure}
      buttonText="Sign in with OAuth2"
      className="oauth-button"
     
    />
  );
};
export default OAuth2SignIn;
