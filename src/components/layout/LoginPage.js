import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

import StyledButton from "../templates/Button";
import HorizontalContainer from "../templates/HorizontalContainer";
import VerticalContainer from "../templates/VerticalContainer";
import MessageText from "../templates/MessageText";

const Login = ({ onLogin, onLogout }) => {
  const User = useContext(UserContext);
  return (
    <VerticalContainer>
      <MessageText>hello, sign in above to get started :)</MessageText>
      {/* <HorizontalContainer>
        <StyledButton onClick={onLogin}>
          Sign In
        </StyledButton>
      </HorizontalContainer> */}
    </VerticalContainer>
  );
}

export default Login;