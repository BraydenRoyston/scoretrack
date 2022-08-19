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
    // background: white;
    width: 100vw;
    height: 15vh;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    // border-bottom: 3px solid var(--black);

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

const NullButton = styled.div`
    background: transparent;
    // border: none !important;
    // font-size:0;
    color: transparent;

    font-family: 'Quicksand';
    font-size: 15px;

    // background: black;
    border-radius: 15px;
    padding: 15px;
    color: var(--bg);
    border: 1px solid rgba(0, 0, 0, 0);
    margin: 10px;

    transition: 1s ease all;
    
    &:hover {
        border: 1px solid rgba(0, 0, 0, 0);
        cursor: pointer;
        color: var(--accent);
        // font-weight: 500;
    }
    
    // ${props => props.display ? "display: none;" : ""}
`

const Panda = styled.img`
    height: 70px;
`

const Title = styled.div`
    font-weight: 300;
    font-size: 75px;
    line-height: 15vh;
    vertical-align: middle;
    // width: 50vw;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

const Vs = styled.span`
    font-weight: 600;
    color: var(--accent);
    font-size: 75px;
`


export default NavBar;