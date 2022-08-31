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
                let opponentPicUrl = game.data.opponentProfileImageUrl;
                let opponentName = game.data.opponentName;
                let creatorPicUrl = game.data.creatorProfileImageUrl;
                let creatorName = game.data.creatorName;
                if (game.data.opponentId == User.uid) {

                    let tempUrl = opponentPicUrl
                    let tempName = opponentName
                    opponentPicUrl = creatorPicUrl
                    opponentName = creatorName
                    creatorPicUrl = tempUrl
                    creatorName = tempName
                    // picUrl = game.data.creatorProfileImageUrl;
                }
                return(
                    <GameCard key={game.id} currentGameId={Game} myGameId={game.id}>
                        <CardContainer>
                            <GameText>{game.data.name}</GameText>
                            <BigDisplay>
                                <HorizontalContainer>
                                    <VerticalContainer>
                                        <ProfilePicture src={creatorPicUrl} style={{height: "50px", width: "50px"}}/>
                                        <div>{creatorName}</div>
                                    </VerticalContainer>
                                    <Vs> vs </Vs>
                                    <VerticalContainer>
                                        <ProfilePicture src={opponentPicUrl} style={{height: "50px", width: "50px"}}/>
                                        <div>{opponentName}</div>
                                    </VerticalContainer>
                                </HorizontalContainer>
                            </BigDisplay>
                            <LittleDisplay>
                                <VerticalContainer>
                                    <ProfilePicture src={opponentPicUrl} style={{height: "50px", width: "50px"}}/>
                                    <div>{opponentName}</div>
                                </VerticalContainer>
                            </LittleDisplay>
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

const BigDisplay = styled.div`
    @media (max-width: 768px) {
        display: none;
    }
`

const LittleDisplay = styled.div`
    @media (min-width: 768px) {
        display: none;
    }
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
    @media (max-width: 768px) {
        width: 75vw;
    }


    
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