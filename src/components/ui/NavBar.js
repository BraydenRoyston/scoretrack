import { useContext } from "react";
import styled from "styled-components";
import panda from '../../assets/pandaPicture.png';
import StyledButton from "../templates/Button";
import { UserContext } from "../../App";

const NavBar = ({ onLogin, onLogout }) => {
    const User = useContext(UserContext);

    return(
        <Container>
            <Inner>
                <Title>me <Vs> vs </Vs> you</Title>
            </Inner>
            <Inner>
                <Panda src={panda}></Panda>

                {User ? User.email ? 
                    <StyledButton onClick={onLogout}>sign out</StyledButton>
                : <StyledButton onClick={onLogin}>sign in</StyledButton> : <StyledButton onClick={onLogin}>sign in</StyledButton>}
            </Inner>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 15vh;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        // flex-direction: column;
    }


    position: absolute;
    top: 0;
    left: 0;
`

const Inner = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const Panda = styled.img`
    height: 70px;
    @media (max-width: 768px) {
        display: none;
    }
`

const Title = styled.div`
    font-weight: 300;
    font-size: 75px;
    // line-height: 15vh;
    text-align: center;
    // vertical-align: middle;
    // width: 50vw;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    @media (max-width: 768px) {
        font-size: 50px;
    }
`

const Vs = styled.span`
    font-weight: 600;
    color: var(--accent);
    font-size: 75px;
    @media (max-width: 768px) {
        font-size: 50px;
    }
`


export default NavBar;