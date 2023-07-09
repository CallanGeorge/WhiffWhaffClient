import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Amplify } from "aws-amplify";
import Modal from "./components/Modal";

const awsconfig = {
  Auth: {
    oauth: {
      domain: process.env.REACT_APP_AWS_DOMAIN,
      redirectSignIn: process.env.REACT_APP_AWS_REDIRECT_SIGNIN,
      redirectSignOut: process.env.REACT_APP_AWS_REDIRECT_SIGNOUT,
      responseType: process.env.REACT_APP_AWS_RESPONSE_TYPE,
      scope: ["email", "openid", "profile"],
    },
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
  },
};

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <Modal />
    <App />
  </>
);
