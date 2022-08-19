import styled from "styled-components";

const TextInput = ({ writeCallback, placeholder }) => {
    return(
        <TextField onChange={writeCallback} placeholder={placeholder}></TextField>
    );
}

const TextField = styled.input`
    font-family: 'Lato';
    padding: 15px;
    margin: 10px;
    border: 1px solid var(--black);
    transition: all 1s ease;

    &:focus {
        outline: 3px solid var(--accent);
    }
`

export default TextInput;