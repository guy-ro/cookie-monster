import React, { useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "./Auth.js";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import styled from "styled-components";
import LoginFieldsCard from "./logincards/loginfieldscard/loginfieldscard.jsx";
import PasswordResetEmailCard from "./logincards/passwordresetemailcard/passwordresetemailcard.jsx";
import PasswordResetResponseCard from "./logincards/passwordresetresponsecard/passwordresetresponsecard.jsx";

import { getUserAPI } from "../requests/get";
import { updateUserAPI } from "../requests/update";

const StyledCard = styled(Card)`
  width: 350px;

  //Center
  margin: 2 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-box-shadow: -1px 1px 5px 1px #ccc;
  -moz-box-shadow: -1px 1px 5px 1px #ccc;
  box-shadow: -1px 1px 5px 1px #ccc;

  .MuiCardHeader-title {
    font-size: 3rem;
  }
  .MuiCardHeader-root {
    padding-bottom: 50px;
  }
  .MuiCardHeader-subheader {
    color: black;
  }
  .MuiInputLabel-outlined.MuiInputLabel-shrink {
    transform: translate(14px, -14px) scale(0.75);
  }
`;

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const [loginFlowState, setLoginFlowState] = useState({
    cardType: "loginFields"
  });

  const getCardContent = () => {
    switch (loginFlowState.cardType) {
      case "passwordResetEmail":
        return <PasswordResetEmailCard setLoginFlowState={setLoginFlowState} />;
      case "passwordResetResponse":
        return (
          <PasswordResetResponseCard setLoginFlowState={setLoginFlowState} />
        );
      default:
      case "loginFields":
        return (
          <LoginFieldsCard
            history={history}
            setLoginFlowState={setLoginFlowState}
          />
        );
    }
  };

  if (currentUser !== null && currentUser !== false) {
    console.log("Redirecting")
    return <Redirect to={"/applications"} />;
  }
  else if (currentUser !== false) {
    return (
      <div>
        <StyledCard>
          <CardHeader
            title="arbitrium"
            subheader={loginFlowState === "loginFields" ? "Sign-In" : null}
          />
          <CardContent>{getCardContent()}</CardContent>
          <h> ADMINS HAVE DISABLED ACCESS </h>
        </StyledCard>
      </div>
    );
  } else return null;
};

export default withRouter(Login);
