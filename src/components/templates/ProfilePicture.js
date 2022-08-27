import styled from "styled-components"

const ProfilePicture = styled.img`
    border-radius: 15px;
    width: 75px;
    border: 2px solid var(--black);

    @media (max-width: 768px) {
        width: 45px;
    }
`

export default ProfilePicture;