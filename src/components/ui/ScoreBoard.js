import styled from "styled-components";
import HorizontalContainer from "../templates/HorizontalContainer";
import MessageText from '../templates/MessageText';
import ProfilePicture from '../templates/ProfilePicture';
import Spinner from '../ui/Spinner';

const ScoreBoard = ({ playersLoading, playerList }) => {
    return(
        <GlassContainer>
            {playersLoading ?
            <Spinner />
            :
            <ScoreContainer>
                {playerList.map((player, i) => {
                    return(
                            <PlayerContainer key={player.id}>
                                {i == 0 ?<NameText>{player.data.name.split(" ")[0]}</NameText> : null}
                                {i == 1 ?<NameText>{player.data.name.split(" ")[0]}</NameText> : null}
                                <ProfilePicture src={player.data.profileImageUrl} />
                                <ScoreText>{player.data.score}</ScoreText>
                            </PlayerContainer>
                    );
                })}
            </ScoreContainer>
            }
        </GlassContainer>
    );
}

const GlassContainer = styled.div`
    width: 40vw;
    height: 25vh;
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

const ScoreContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const PlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-left: 25px;
    margin-right: 25px;
`

const NameText = styled.div`
    font-size: 40px;
    font-weight: 600;
    @media (max-width: 768px) {
        font-size: 25px;
    }
`

const ScoreText = styled.div`
    font-weight: 700;
    font-size: 40px;
    // color: var(--accent);
`

export default ScoreBoard;