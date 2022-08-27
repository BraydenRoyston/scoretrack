import styled from 'styled-components';

const StyledButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
    
    @media (max-width: 768px) {
        font-size: 12.5px;
        padding: 10px;
    }
`

export default StyledButton;