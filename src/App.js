import { useState, createContext, useEffect } from 'react';
import { auth, signInWithGoogle, logout } from "./services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from 'styled-components';

import CreateGame from './components/layout/CreateGame';
import GameDisplay from './components/layout/GameDisplay';
import LoginPage from './components/layout/LoginPage';
import SelectGame from './components/layout/SelectGame';
import { keyframes } from 'styled-components';
import NavBar from './components/ui/NavBar';
import HorizontalContainer from './components/templates/HorizontalContainer';

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
  );
}

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

export default App;
