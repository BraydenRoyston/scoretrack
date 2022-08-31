import { useContext } from "react";
import styled from "styled-components";
import panda from '../../assets/pandaPicture.png';
import StyledButton from "../templates/Button";
import { UserContext } from "../../App";
import HorizontalContainer from "../templates/HorizontalContainer";
import { CSSTransition } from "react-transition-group";

const NavBar = ({ onLogin, onLogout, game }) => {
    const User = useContext(UserContext);


    return(
        <Container>
                <CSSTransition
                    in={game}
                    timeout={300}
                    classNames="names"
                    unmountOnExit
                >
                    <Inner transitionName={"names"}>
                        <Title>{game ? game.creatorName.split(' ')[0].toLowerCase() : 'none'}</Title>
                        <Vs> vs </Vs>
                        <Title>{game ? game.opponentName.split(' ')[0].toLowerCase() : 'none'}</Title>
                    </Inner>
                </CSSTransition>
                <CSSTransition
                    in={!game}
                    timeout={300}
                    classNames="names"
                    unmountOnExit
                >
                    <Inner transitionName={"names"}>
                        <Title>me</Title>
                        <Vs> vs </Vs>
                        <Title>you</Title>
                    </Inner>
                </CSSTransition>
                <Panda src={panda}></Panda>
            <Inner>
                {User ? User.email ? 
                    <HorizontalContainer>
                        <Message>{User ? "hi, " + User.displayName.split(' ')[0].toLowerCase() : ""}</Message>
                        <StyledButton onClick={onLogout}>sign out</StyledButton>
                    </HorizontalContainer>
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

const Message = styled.div`
    @media (max-width: 768px) {
        display: none;
    }
`

const Inner = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &.${props => props.transitionName}-enter {
        opacity: 0;
        transform: scale(0.9);
    }
    &.${props => props.transitionName}-enter-active {
        opacity: 1;
        transform: translateX(0);
        transition: opacity 300ms, transform 300ms;
    }
    &.${props => props.transitionName}-exit {
        position: absolute;
        opacity: 1;
    }
    &.${props => props.transitionName}-exit-active {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 0ms, transform 0ms;
    }
`

const Panda = styled.img`
    height: 70px;
    @media (max-width: 768px) {
        display: none;
    }
`

const Title = styled.div`
    font-weight: 300;
    font-size: var(--fs-large);
    // line-height: 15vh;
    text-align: center;
    // vertical-align: middle;
    // width: 50vw;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    @media (max-width: 768px) {
        font-size: var(--fs-large);
    }
`

const Vs = styled.span`
    font-weight: 600;
    color: var(--accent);
    font-size: var(--fs-large);
    @media (max-width: 768px) {
        font-size: var(--fs-large);
    }
`


export default NavBar;