import styled from "styled-components";

import MessageText from "../templates/MessageText";

const Login = () => {
  return (
    <GlassContainer>
      <MessageText>hello, sign in above to get started :)</MessageText>
    </GlassContainer>
  );
}

const GlassContainer = styled.div`
    width: 90vw;
    height: 25vh;
    @media (max-width: 768px) {
        width: 90vw;
        margin-top: 15vh;
    }
    margin: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
`

export default Login;