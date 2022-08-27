import { useContext } from "react";
import styled from "styled-components";
import { UserContext, GameContext } from "../../App";
import ProfilePicture from "../templates/ProfilePicture";
import StyledButton from "../templates/Button";
import HorizontalContainer from "../templates/HorizontalContainer";
import VerticalContainer from "../templates/VerticalContainer";

const GamesList = ({ games, onSelect }) => {
    const User = useContext(UserContext);
    const Game = useContext(GameContext);
    return(
        <GamesContainer>
            {games.map((game) => {
                let versusId = game.data.opponentId;
                let versus = game.data.opponentName.split(' ')[0];
                let opponentPicUrl = game.data.opponentProfileImageUrl;
                let creatorPicUrl = game.data.creatorProfileImageUrl;
                if (game.data.opponentId == User.uid) {
                    versusId = game.data.creatorId;
                    versus = game.data.creatorName.split(' ')[0];
                    // picUrl = game.data.creatorProfileImageUrl;
                }
                return(
                    <GameCard key={game.id} currentGameId={Game} myGameId={game.id}>
                        <CardContainer>
                            <GameText>{game.data.name}</GameText>
                            <HorizontalContainer>
                                <VerticalContainer>
                                    <ProfilePicture src={creatorPicUrl} style={{height: "50px", width: "50px"}}/>
                                    <div>{game.data.creatorName}</div>
                                </VerticalContainer>
                                <Vs> vs </Vs>
                                <VerticalContainer>
                                    <ProfilePicture src={opponentPicUrl} style={{height: "50px", width: "50px"}}/>
                                    <div>{game.data.opponentName}</div>
                                </VerticalContainer>
                            </HorizontalContainer>
                        </CardContainer>
                        <StyledButton onClick={() => onSelect(game.id)}>select</StyledButton>
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

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: space-between;

    width: 100%;
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

    border: ${props => (props.currentGameId == props.myGameId) ? "3px solid var(--accent);" : "3px solid var(--black);"}
`

const GameText = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;

    font-weight: 700;
`

const Vs = styled.div`
    font-weight: 600;
    color: var(--accent);

    margin-left: 5px;
    margin-right: 5px;
`

export default GamesList;