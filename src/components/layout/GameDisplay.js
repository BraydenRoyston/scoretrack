import { useState, useEffect, useContext } from 'react';
import { getEvents, getGame, getPlayers, createEvent, streamPlayerData, deleteEvent, streamEventData } from '../../services/firebase';
import { GameContext } from '../../App';
import styled from "styled-components";
import VerticalContainer from "../templates/VerticalContainer";
import HorizontalContainer from "../templates/HorizontalContainer";
import Button from '../templates/Button';
import TextInput from '../templates/TextInput';
import MessageText from '../templates/MessageText';
import ProfilePicture from '../templates/ProfilePicture';
import Spinner from '../ui/Spinner';

const GameDisplay = () => {
    // const [gameData, setGameData] = useState(null);
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

    const [addEventPage, setAddEventPage] = useState(false);

    const [eventName, setEventName] = useState("");
    const [eventWinner, setEventWinner] = useState("");
    const [eventWinnerId, setEventWinnerId] = useState("");
    const [eventPoints, setEventPoints] = useState("");


    const Game = useContext(GameContext);

    const handleEventSubmit = async () => {
        try {
            setAddEventLoading(true);
            await createEvent(
                Game,
                {
                    activityName: eventName,
                    winnerId: eventWinnerId,
                    winnerName: eventWinner,
                    pointValue: parseInt(eventPoints),
                    date: Date.now()
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
                // setGameData(gameResult.data());
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

    useEffect(() => {
        if (/*gameData && */playerList && playerList.length > 0) {
            if (!done) {
                setEventWinner(playerList[0].data.name);
                setEventWinnerId(playerList[0].id);
                setDone(true);
            }
        }
    }, [playerList])

    // useEffect(() => {
    //     const streamPlayers = async () => {
    //         // subscribing to datastream for live player data
    //         if (playerList) {
    //             const unsubscribe = streamPlayerData(Game,
    //                 (querySnapshot) => {
    //                     const updatedPlayers = 
    //                     querySnapshot.docs.map(docSnapshot => {
    //                         return({
    //                             data: docSnapshot.data(),
    //                             id: docSnapshot.id
    //                         });
    //                     });
    //                     setPlayerList(updatedPlayers);
    //                 },
    //                 (error) => setPlayerError(true)
    //             );
    //             return unsubscribe;
    //         }
    //     }
    //     streamPlayers();
    // }, [playerList]);

    // useEffect(() => {
    //     const streamEvents = async () => {
    //         // subscribing to datastream for live event data
    //         if (eventList) {
    //             const unsubscribe = streamEventData(Game,
    //                 (querySnapshot) => {
    //                     const updatedEvents =
    //                     querySnapshot.docs.map(docSnapshot => { 
    //                         return({
    //                             data: docSnapshot.data(), 
    //                             id: docSnapshot.id}
    //                         );
    //                     });
    //                     setEventList(updatedEvents);
    //                 },
    //                 (error) => setEventError(true)
    //             );
    //             return unsubscribe;
    //         }
    //     }
    //     streamEvents();
    // }, [eventList])

    const handleEventWinner = (e) => {
        if (!e.target.checked) {
            // console.log(playerList[0].id);
            setEventWinner(playerList[0].data.name);
            setEventWinnerId(playerList[0].id);
        } else {
            // console.log(playerList[1].id);
            setEventWinner(playerList[1].data.name);
            setEventWinnerId(playerList[1].id);
        }
    }

    return(
        <GameDisplayContainer>
            
            {!Game ? <MessageText>select a game on the left to view the score!</MessageText> :
                <VerticalContainer>
                    <ScoreBoard>
                        {playersLoading ?
                        <Spinner />
                        :
                        <HorizontalContainer>
                            {playerList.map((player, i) => {
                                return(
                                    <HorizontalContainer key={player.id}>
                                        <ScoreContainer key={player.id}>
                                            {i == 0 ?<MessageText>{player.data.name.split(" ")[0]}</MessageText> : null}
                                            {i == 1 ?<MessageText>{player.data.name.split(" ")[0]}</MessageText> : null}
                                            <ProfilePicture src={player.data.profileImageUrl} />
                                            <ScoreText>{player.data.score}</ScoreText>
                                        </ScoreContainer>
                                    </HorizontalContainer>
                                );
                            })}
                        </HorizontalContainer>
                        }
                    </ScoreBoard>

                    <TitlesContainer>
                        <SectionText 
                            onClick={() => setAddEventPage(false)}
                            selected={!addEventPage}>
                                view past events...
                        </SectionText>
                        <VerticalBarSmall />
                        <SectionText 
                            onClick={() => setAddEventPage(true)}
                            selected={addEventPage}>
                                add a new event...
                        </SectionText>
                        
                    </TitlesContainer>

                    {addEventPage ? 
                    <VerticalContainer>
                        <SectionText select={false}>event info...</SectionText>
                        <HorizontalContainer>
                            <TextInput writeCallback={(e) => setEventName(e.target.value)} placeholder={"event name..."}/>
                            <TextInput writeCallback={(e) => setEventPoints(e.target.value)} placeholder={"number of points..."}/>
                        </HorizontalContainer>
                        <VerticalContainer>
                            <SectionText select={false}>who won?</SectionText>
                            {/* <SectionText>{eventWinnerId}, {eventWinner}</SectionText> */}
                            <HorizontalContainer>
                                <NameText>{playerList[0].data.name.split(" ")[0]}</NameText>
                                <CheckBoxWrapper>
                                    <CheckBox id="checkbox" type="checkbox" onClick={handleEventWinner}/>
                                    <CheckBoxLabel htmlFor="checkbox" />
                                </CheckBoxWrapper>
                                <NameText>{playerList[1].data.name.split(" ")[0]}</NameText>
                            </HorizontalContainer>
                        </VerticalContainer>
                        <Button
                            onClick={handleEventSubmit}
                        >
                        {addEventLoading ? <Spinner /> : "create"}
                        </Button>
                    </VerticalContainer>
                    : null}

                    {!addEventPage ?
                    <EventListContainer>
                        {!eventsLoading ? eventList.map((gameEvent) => {
                            return(
                                <Event key={gameEvent.id}>
                                    <VerticalContainer style={{width: '100%'}}>
                                        <GameName>{gameEvent.data.activityName}</GameName>
                                        <HorizontalContainer>
                                            <Highlight>{gameEvent.data.pointValue} points for {gameEvent.data.winnerName.split(" ")[0]}</Highlight>
                                        </HorizontalContainer>
                                    </VerticalContainer>
                                    <Button onClick={() => handleEventDelete(gameEvent.id)}>{deleteLoading == gameEvent.id ? <Spinner /> :"delete"}</Button>
                                </Event>
                            );
                        })
                        : <Spinner />}
                    </EventListContainer>
                    : null }
                </VerticalContainer>
            }
        </GameDisplayContainer>
    );
}

const GameDisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 45vw;
    height: 100%;
`

const ScoreBoard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    > * { /* targets all children */
        margin-left: 10px;
        margin-right: 10px;
    }
`;

const GameName = styled.div`
    font-weight: 600;
`

const TitlesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin: 10px;
`

const VerticalBarSmall = styled.div`
    height: 20px;
    width: 3px;
    background: var(--black);
    margin-left: 10px;
    margin-right: 10px;
`

const NameText = styled.div`
    font-size: 20px;
    margin-left: 10px;
    margin-right: 10px;
`

const Highlight = styled.div`
    color: var(--accent);
    font-weight: 600;
`

const SectionText = styled.div`
    font-size: 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-weight: 600;

    cursor: pointer;

    border-bottom: ${props => props.selected ? "1px solid var(--black);" : ""}
`

const Event = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    padding: 15px;

    width: 35vw;
    border: 3px solid var(--black);
    border-radius: 15px;

`

const ScoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-left: 25px;
    margin-right: 25px;
`

const ScoreText = styled.div`
    font-weight: 700;
    font-size: 40px;
    color: var(--accent);
`

const CheckBoxWrapper = styled.div`
  position: relative;

//   margin-top: 7px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: var(--black);
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  margin: 0;
  &:checked + ${CheckBoxLabel} {
    background: var(--accent);
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

const EventListContainer = styled.div`
    height: 40vh;

    overflow: scroll;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

export default GameDisplay;