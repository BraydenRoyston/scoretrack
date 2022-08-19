import styled from 'styled-components';

const StyledButton = styled.button`
    font-family: 'Quicksand';
    font-weight: 600;
    font-size: 15px;

    width: 125px;

    background: var(--black);
    border-radius: 15px;
    padding: 15px;
    color: var(--bg);
    border: 1px solid var(--black);
    margin: 10px;

    transition: 1s ease all;
    
    &:hover {
        border: 1px solid var(--accent);
        cursor: pointer;
        color: var(--accent);
        // font-weight: 500;
    }
    
    // ${props => props.display ? "display: none;" : ""}
`

export default StyledButton;