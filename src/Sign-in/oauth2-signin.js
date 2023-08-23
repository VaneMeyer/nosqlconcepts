import React from "react";
import OAuth2Login from "react-simple-oauth2-login";
import "./signin.css";
import {
  authorizationUrl,
  clientId,
  redirectUri,
  serverUrl,
} from "./oauth-config";

const OAuth2SignIn = () => {
  const onSuccess = async (response) => {
    console.log(response);
    const { access_token } = response;

    try {
      const backendResponse = await fetch("/oauth/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          access_token,
        }),
      });

      if (backendResponse.ok) {
        const user = await backendResponse.json();
        console.log("Nutzerdaten von Server erhalten:", user);
      } else {
        console.error("Fehler beim Senden des Tokens an den Server");
      }
    } catch (error) {
      console.error("Fehler bei der Serveranfrage:", error);
    }
  };
  const onFailure = (response) => {
    console.error(response);
    alert("Login failed. Please try again.");
  };

  return (
    <OAuth2Login
      provider="google"
      authorizationUrl={authorizationUrl}
      responseType="token"
      clientId={clientId}
      redirectUri={redirectUri}
      serverUrl={serverUrl}
      onSuccess={onSuccess}
      onFailure={onFailure}
      buttonText="Sign in with OAuth2"
      className="oauth-button"
      scope="profile"
      isCrossOrigin={true}
    />
  );
};
export default OAuth2SignIn;
