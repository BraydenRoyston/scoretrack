import Button from '../templates/Button';
import styled from 'styled-components';

const AddGame = ({clickCallback}) => {
    return(
        <AddGameButton
            onClick={clickCallback}
        >Add Game</AddGameButton>
    );
}

const AddGameButton = Button;

export default AddGame;