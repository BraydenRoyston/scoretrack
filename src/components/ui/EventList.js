import styled from "styled-components";
import VerticalContainer from "../templates/VerticalContainer";
import HorizontalContainer from "../templates/HorizontalContainer";
import Button from '../templates/Button';
import Spinner from '../ui/Spinner';

const EventList = ({ eventsLoading, eventList, handleEventDelete, deleteLoading }) => {
    if (eventsLoading) {
        return(
            <GlassContainer>
                <SpinnerContainer>
                    <Spinner />
                </SpinnerContainer>
            </GlassContainer>
        );
    }
    return(
        <GlassContainer>
            {!eventsLoading ? eventList.length == 0 ? <SectionText>no events yet, add one by clicking "add a new event"!</SectionText>
            : eventList.map((gameEvent) => {
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
        </GlassContainer>
    );
}

const SpinnerContainer = styled.div`
    width: 40vw;
    height: calc(65vh + 20px);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const GameName = styled.div`
    font-weight: 600;
`

const Highlight = styled.div`
    // color: var(--accent);
    font-weight: 600;
`

const SectionText = styled.div`
    font-size: var(--fs-small);
    font-weight: 600;

    width: 35vw;
    margin: 10px;
    padding: 15px;
    border-radius: 15px;

    cursor: pointer;

    // border-bottom: ${props => props.selected ? "1px solid var(--black);" : ""}
    border: 3px solid transparent;
`

const Event = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 35vw;
    margin: 10px;
    padding: 15px;
    border-radius: 15px;

    border: 3px solid var(--black);
`

const GlassContainer = styled.div`
    overflow: scroll;

    width: 40vw;
    height: calc(65vh + 20px);
    @media (max-width: 768px) {
        width: 75vw;
    }
    margin: 10px;
    // margin-right: 0px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);

    @media (max-width: 768px) {
        display: none;
    }

    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
        display: none;  /* Safari and Chrome */
    }
`

export default EventList;