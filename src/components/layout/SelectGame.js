import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { getGames } from "../../services/firebase";
import styled from "styled-components";
import CreateGame from './CreateGame';
import GamesList from './GamesList';
import HorizontalContainer from "../templates/HorizontalContainer";
import VerticalContainer from "../templates/VerticalContainer";
import BodyText from "../templates/BodyText";

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
        <SelectGameContainer>
            <CreateGame />
            {games != null ? 
                games.length ?
                    <GamesList games={games} onSelect={onSelect}/>
                :
                    <BodyText>looks like you have no games yet... add one above!</BodyText>
            :
                null
            }
        </SelectGameContainer>
    );
}

const SelectGameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 45vw;
`

export default SelectGame;