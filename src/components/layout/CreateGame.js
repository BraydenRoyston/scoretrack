import styled from "styled-components";
import AddGame from "../ui/AddGame";
import TextInput from "../templates/TextInput";
import StyledButton from "../templates/Button";
import { useState, useEffect, useContext } from 'react';
import { createGame } from '../../services/firebase';
import { UserContext } from '../../App';
import HorizontalContainer from "../templates/HorizontalContainer";

const Body = ({ fetchGames }) => {
    const [gameName, setGameName] = useState("");
    const [opponent, setOpponent] = useState("");
    const User = useContext(UserContext);

    const createHandler = async (e) => {
        void(e);
        await createGame(gameName, User.email, opponent);
        await fetchGames();
        setGameName("");
    }

    return(
        <HorizontalContainer>
            <TextInput 
                writeCallback={(e) => setOpponent(e.target.value)} 
                placeholder={"opponent's email..."}
            />
            <TextInput 
                writeCallback={(e) => setGameName(e.target.value)} 
                placeholder={"game name..."}
            />
            <StyledButton onClick={createHandler}>Add Game</StyledButton>
        </HorizontalContainer>
    );
}


export default Body;