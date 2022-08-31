import { useState, useEffect } from 'react';
import styled from "styled-components";
import VerticalContainer from "../templates/VerticalContainer";
import HorizontalContainer from "../templates/HorizontalContainer";
import Button from '../templates/Button';
import TextInput from '../templates/TextInput';
import Spinner from '../ui/Spinner';


const AddEvent = ({ addEventLoading, handleEventSubmit, playersLoading, playerList }) => {
    const [done, setDone] = useState(false);
    const [eventName, setEventName] = useState("");
    const [eventWinner, setEventWinner] = useState("");
    const [eventWinnerId, setEventWinnerId] = useState("");
    const [eventPoints, setEventPoints] = useState("");


    const handleEventWinner = (e) => {
        if (!e.target.checked) {
            setEventWinner(playerList[0].data.name);
            setEventWinnerId(playerList[0].id);
        } else {
            setEventWinner(playerList[1].data.name);
            setEventWinnerId(playerList[1].id);
        }
    }

    useEffect(() => {
        if (playerList && playerList.length > 0) {
            if (!done) {
                setEventWinner(playerList[0].data.name);
                setEventWinnerId(playerList[0].id);
                setDone(true);
            }
        }
    }, [playerList])

    const submitCallback = () => {
        handleEventSubmit({
            activityName: eventName,
            winnerId: eventWinnerId,
            winnerName: eventWinner,
            pointValue: parseInt(eventPoints),
            date: Date.now()
        })
    }
    if (!playersLoading) {
        return(
            <GlassContainer>
                <SectionText select={false}>event info...</SectionText>
                <HorizontalContainer>
                    <TextInput writeCallback={(e) => setEventName(e.target.value)} placeholder={"event name..."}/>
                    <TextInput writeCallback={(e) => setEventPoints(e.target.value)} placeholder={"number of points..."}/>
                </HorizontalContainer>
                <VerticalContainer>
                    <SectionText select={false}>who won?</SectionText>
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
                    onClick={submitCallback}
                >
                {addEventLoading ? <Spinner /> : "create"}
                </Button>
            </GlassContainer>
        );
    }
    else {
        return (
            <GlassContainer>
                <SpinnerContainer>
                    <Spinner />
                </SpinnerContainer> 
            </GlassContainer>
        );
    }
}

const SpinnerContainer = styled.div`
    width: 40vw;
    height: 40vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const GlassContainer = styled.div`
    width: 40vw;
    
    @media (min-width: 768px) {
        height: 40vh;
    }
    @media (max-width: 768px) {
        width: 75vw;
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

const NameText = styled.div`
    font-size: var(--fs-small);
    margin-left: 10px;
    margin-right: 10px;
`

const SectionText = styled.div`
    font-size: var(--fs-small);
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-weight: 600;

    cursor: pointer;

    border-bottom: ${props => props.selected ? "1px solid var(--black);" : ""}
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

export default AddEvent;