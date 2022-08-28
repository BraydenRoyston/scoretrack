import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { getGames } from "../../services/firebase";
import styled from "styled-components";
import CreateGame from './CreateGame';
import GamesList from './GamesList';
import HorizontalContainer from "../templates/HorizontalContainer";
import VerticalContainer from "../templates/VerticalContainer";
import BodyText from "../templates/BodyText";
import AddGame from "../ui/AddGame";
import TextInput from "../templates/TextInput";
import StyledButton from "../templates/Button";
import { createGame } from '../../services/firebase';
import Spinner from "../ui/Spinner";

const SelectGame = ({ onSelect, currentGameId }) => {
    const User = useContext(UserContext);
    const [games, setGames] = useState(null);

    const fetchGames = async () => {
        try {
            const gamesData = await getGames(User.uid);
            setGames(gamesData);
        } catch (e) {
            throw (e);
        }
    }

    useEffect(() => {
        if (User) {
            if (User.uid) {
                fetchGames();
            }
        }
    }, [User])

    return(
        <SelectContainer transitionName={'content'}>
            <TitleText>add or select a game below</TitleText>
            <GlassContainer>
                <CreateGame fetchGames={fetchGames}/>
                {games != null ? 
                    games.length ?
                        <GamesList games={games} onSelect={onSelect}/>
                    :
                        <BodyText>looks like you have no games yet... add one above!</BodyText>
                :
                    <SpinnerContainer>
                        <Spinner />
                    </SpinnerContainer>
                }
            </GlassContainer>
        </SelectContainer>
        
    );
}

const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
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

const TitleText = styled.div`
    font-size: 20px;
`

const SpinnerContainer = styled.div`
    height: 50vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const GlassContainer = styled.div`
    margin-top: 15vh;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;


    width: 40vw;
    @media (max-width: 768px) {
        width: 90vw;
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

export default SelectGame;