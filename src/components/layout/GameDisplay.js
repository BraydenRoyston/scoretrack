import { useState, useEffect, useContext } from 'react';
import { getEvents, getGame, getPlayers, createEvent, deleteEvent } from '../../services/firebase';
import { GameContext } from '../../App';
import styled from "styled-components";
import VerticalContainer from '../templates/VerticalContainer';
import HorizontalContainer from "../templates/HorizontalContainer";
import GlassContainer from '../templates/GlassContainer';
import ScoreBoard from '../ui/ScoreBoard';
import AddEvent from '../ui/AddEvent';
import EventList from '../ui/EventList';
import StyledButton from '../templates/Button';

const GameDisplay = ({ handleBack }) => {
    const [gameData, setGameData] = useState(null);
    const [playerList, setPlayerList] = useState(null);
    const [eventList, setEventList] = useState(null);
    const [gameError, setGameError] = useState(false);
    const [playerError, setPlayerError] = useState(false);
    const [eventError, setEventError] = useState(false);
    const [playersLoading, setPlayersLoading] = useState(true);
    const [gameLoading, setGameLoading] = useState(true);
    const [eventsLoading, setEventsLoading] = useState(true);
    const [addEventLoading, setAddEventLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState("");
    const [done, setDone] = useState(false);

    const Game = useContext(GameContext);

    const handleEventSubmit = async (data) => {
        try {
            setAddEventLoading(true);
            await createEvent(
                Game,
                {
                    activityName: data.activityName,
                    winnerId: data.winnerId,
                    winnerName: data.winnerName,
                    pointValue: parseInt(data.pointValue),
                    date: data.date
                }
            )
            setAddEventLoading(false);
        } catch (e) {
            throw (e);
        }

        
        await fetchGame();
        await fetchPlayers();
        await fetchEvents();
    }

    const handleEventDelete = async (idToDelete) => {
        try {
            setDeleteLoading(idToDelete);
            await deleteEvent(Game, idToDelete);
            setDeleteLoading("");
        } catch (e) {
            console.log("Delete error");
            throw (e);
        }
        await fetchGame();
        await fetchPlayers();
        await fetchEvents();
    }

    const fetchGame = async () => {
        try {
            const gameResult = await getGame(Game);

            if (gameResult.exists) {
                setGameError(false);
                setGameData(gameResult.data());
                setGameLoading(false);
            } else {
                setGameError(true);
            }
        } catch (e) {
            throw (e);
        }
    }

    const fetchPlayers = async () => {
        try {
            const playersResult = await getPlayers(Game);
            
            if (playersResult.length > 0) {
                setPlayerError(false);
                setPlayerList(playersResult);
                setPlayersLoading(false);
            } else {
                setPlayerError(true);
            }
        } catch (e) {
            throw (e);
        }
    }

    const fetchEvents = async () => {
        try {
            const eventsResult = await getEvents(Game);

            if (eventsResult.length >= 0) {
                setEventError(false);
                setEventList(eventsResult);
                setEventsLoading(false);
            } else {
                setPlayerError(true);
            }
        } catch (e) {
            throw (e);
        }
    }

    useEffect(() => {
        const handleStartup = async () => {
            setGameLoading(true);
            await fetchGame();
            setPlayersLoading(true);
            await fetchPlayers();
            setEventsLoading(true);
            await fetchEvents();
        }
        
        if (Game) {
            handleStartup();
        }
    }, [Game]);   

    return(
        <GameDisplayContainer transitionName={"content"}>
            <GameNav style={{ justifyContent: 'space-between', width: '100%' }}>
                <BackToGames onClick={handleBack}>
                    <BackButton>{"<"}</BackButton>
                    <BackText>back to games</BackText>
                </BackToGames>
                {gameData ? <TitleText>{gameData.name}</TitleText> : null}
            </GameNav>
            <HorizontalContainer>
                <VerticalContainer>
                    <ScoreBoard playersLoading={playersLoading} playerList={playerList}/>
                    <AddEvent 
                        addEventLoading={addEventLoading} 
                        handleEventSubmit={handleEventSubmit}
                        playersLoading={playersLoading}
                        playerList={playerList}
                    />
                </VerticalContainer>
                <EventList 
                    eventsLoading={eventsLoading}
                    eventList={eventList}
                    handleEventDelete={handleEventDelete}
                    deleteLoading={deleteLoading}
                />
            </HorizontalContainer>
        </GameDisplayContainer>
    );
}

const GameDisplayContainer = styled.div`
    margin-top: 15vh;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    // width: 45vw;
    height: 100%;

    @media (max-width: 768px) {
        margin-top: 30vh;
    }

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

const GameNav = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const BackToGames = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    // &:hover button {
    //     border: 1px solid var(--accent);
    //     color: var(--accent);
    // }
    // &:hover div {
    //     color: var(--accent);
    //     border-bottom: 1px solid var(--accent);
    // }
`

const BackButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: 'Quicksand';
    font-weight: 600;
    font-size: 15px;

    width: 30px;
    height: 30px;

    background: var(--black);
    border-radius: 50%;
    padding: 15px;
    color: var(--bg);
    border: 1px solid var(--black);
    margin: 10px;

    transition: 1s ease all;
    
    // &:hover {
    //     border: 1px solid var(--accent);
    //     cursor: pointer;
    //     color: var(--accent);
    //     // font-weight: 500;
    // }
    
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 12.5px;
        padding: 10px;
    }
`

const BackText = styled.div`
    font-size: 20px;
    border-bottom: 1px solid var(--black);
    transition: 1s ease all;
`

const TitleText = styled.div`
    font-size: 20px;
`

const SectionText = styled.div`
    font-size: 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-weight: 600;

    cursor: pointer;
`

export default GameDisplay;