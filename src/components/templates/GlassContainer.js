import styled from 'styled-components';

const GlassContainer = styled.div`
    width: 40vw;
    height: 65vh;
    @media (max-width: 768px) {
        width: 90vw;
    }
    margin: 10px;

    display: flex;
    flex-direction: column;
    justfiy-content: center;
    align-items: center;

    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
`

export default GlassContainer;