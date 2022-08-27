import { useState, createContext } from 'react';
import { auth, signInWithGoogle, logout, createGame } from "./services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from 'styled-components';
import img from '../src/assets/nice1.jpeg';

import GameDisplay from './components/layout/GameDisplay';
import LoginPage from './components/layout/LoginPage';
import NavBar from './components/ui/NavBar';
import VerticalContainer from './components/templates/VerticalContainer';
import SelectGame from './components/layout/SelectGame';

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

  const handleGameSelect = (gameId) => {
    console.log(gameId);
    if (gameId == currentGameId) {
      setCurrentGameId(null);
    } else {
      setCurrentGameId(gameId);
    }
  }

  const resetGame = () => {
    setCurrentGameId(null);
  }

  return (
    <OuterContainer>
      <AppContainer>
        <UserContext.Provider value={user}>
        <GameContext.Provider value={currentGameId}>
          <NavBar onLogin={handleLogin} onLogout={handleLogout}/>
            {user ? user.email ?
                currentGameId ?
                  <GameDisplay handleBack={resetGame}/>
                : 
                  <SelectGame onSelect={handleGameSelect}/>
              : 
            <LoginPage onLogin={handleLogin} onLogout={handleLogout}/>
            : <LoginPage onLogin={handleLogin} onLogout={handleLogout}/>}
        </GameContext.Provider>
        </UserContext.Provider>
      </AppContainer>
      <BottomText>Version 1.1 - Created with ❤️ + ☕ by Brayden Royston, Copyright 2022</BottomText>
    </OuterContainer>
    
  );
}

const OuterContainer = styled.div`
  @media (min-width: 768px) {
    height: 100vh;
  }
  @media (max-width: 768px) {
    min-height: 100vh;
  }

  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url(${img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  // justify-content: flex-start;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
      flex-direction: column;
      min-height: 100vh;
  }

  position: relative;

  // background-color: var(--bg);
`

const BottomText = styled.div`
  font-size: 15px;
  text-align: center;
  color: var(--accent);
`

export default App;
