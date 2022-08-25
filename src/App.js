import { useState, createContext } from 'react';
import { auth, signInWithGoogle, logout } from "./services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from 'styled-components';

import GameDisplay from './components/layout/GameDisplay';
import LoginPage from './components/layout/LoginPage';
import SelectGame from './components/layout/SelectGame';
import NavBar from './components/ui/NavBar';
import MessageText from './components/templates/MessageText';

export const UserContext = createContext();
export const GameContext = createContext();
const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [currentGameId, setCurrentGameId] = useState(null);

  const handleLogin = () => {
    signInWithGoogle();
  }
  const handleLogout = () => {
    logout();
  }

  return (
    <OuterContainer>
      <AppContainer>
        <UserContext.Provider value={user}>
        <GameContext.Provider value={currentGameId}>
          <NavBar onLogin={handleLogin} onLogout={handleLogout}/>
          <MainCard>
            {user ? user.email ? 
              <ContentContainer>
                <SelectGame onSelect={setCurrentGameId}/>
                <VerticalBar></VerticalBar>
                <GameDisplay/>
              </ContentContainer>
              : 
            <LoginPage onLogin={handleLogin} onLogout={handleLogout}/>
            : <LoginPage onLogin={handleLogin} onLogout={handleLogout}/>}
          </MainCard>
        </GameContext.Provider>
        </UserContext.Provider>
      </AppContainer>
      <BottomText>Version 1.1 - Created with ❤️ + ☕ by Brayden Royston, Copyright 2022</BottomText>
    </OuterContainer>
    
  );
}

const OuterContainer = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg);
`

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  background-color: var(--bg);
`

const MainCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 50px;
`


const VerticalBar = styled.div`
  height: 100%;
  width: 3px;
  background: var(--black);
  margin-left: 30px;
  margin-right: 30px;
`

const ContentContainer = styled.div`
  height: 60vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const BottomText = styled.div`
  font-size: 15px;
`

export default App;
