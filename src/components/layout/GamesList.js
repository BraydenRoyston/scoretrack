import { useContext } from "react";
import styled from "styled-components";
import { UserContext, GameContext } from "../../App";
import ProfilePicture from "../templates/ProfilePicture";
import StyledButton from "../templates/Button";

const GamesList = ({ games, onSelect }) => {
    const User = useContext(UserContext);
    const Game = useContext(GameContext);
    return(
        <GamesContainer>
            {games.map((game) => {
                let versusId = game.data.opponentId;
                let versus = game.data.opponentName.split(' ')[0];
                let picUrl = game.data.opponentProfileImageUrl;
                if (game.data.opponentId == User.uid) {
                    versusId = game.data.creatorId;
                    versus = game.data.creatorName.split(' ')[0];
                    picUrl = game.data.creatorProfileImageUrl;
                }
                return(
                    <GameCard key={game.id} currentGameId={Game}>
                        <ProfilePicture src={picUrl} />
                        <GameText>"{game.data.name}" <Vs> vs </Vs> {versus}</GameText>
                        <StyledButton onClick={() => onSelect(game.id)}>Select this game</StyledButton>
                    </GameCard>
                );
            })}
        </GamesContainer>
    );
}

const GamesContainer = styled.div`
    height: 50vh;

    overflow: scroll;
`

const GameCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 35vw;

    
    padding: 15px;
    border-radius: 15px;

    transition: 1s ease all;

    &:hover {
        border: 3px solid var(--accent);
    }

    border: ${props => props.currentGameId != props.key ? "3px solid var(--accent);" : "3px solid var(--black);"}
`

const GameText = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;

    font-weight: 500;
`

const Vs = styled.div`
    font-weight: 600;
    color: var(--accent);

    margin-left: 5px;
    margin-right: 5px;
`

export default GamesList;