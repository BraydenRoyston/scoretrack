import { useState, createContext, useEffect } from 'react';
import { auth, signInWithGoogle, logout, createGame } from "./services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from 'styled-components';
import img from '../src/assets/nice1.jpeg';
import { getGame } from './services/firebase';
import { CSSTransition } from 'react-transition-group';
import GameDisplay from './components/layout/GameDisplay';
import LoginPage from './components/layout/LoginPage';
import NavBar from './components/ui/NavBar';
import VerticalContainer from './components/templates/VerticalContainer';
import SelectGame from './components/layout/SelectGame';


export const UserContext = createContext();
export const GameContext = createContext();
const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [game, setGame] = useState(null);
  const [currentGameId, setCurrentGameId] = useState(null);
  const [gameLoading, setGameLoading] = useState(false);
  const [gameError, setGameError] = useState(false);


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
      setGame(null);
    } else {
      setGameLoading(true);
      setCurrentGameId(gameId);
    }
  }

  const fetchGame = async () => {
      try {
          const gameResult = await getGame(currentGameId);

          if (gameResult.exists) {
              setGameError(false);
              setGame(gameResult.data());
              setGameLoading(false);
          } else {
              setGameError(true);
          }
      } catch (e) {
          throw (e);
      }
  }

  useEffect(() => {
    if (currentGameId) {
      fetchGame();
    }
  }, [currentGameId]);

  const resetGame = () => {
    setCurrentGameId(null);
    setGame(null);
  }

  return (
    <OuterContainer transitionName={"content"}>
      <AppContainer>
        <UserContext.Provider value={user}>
        <GameContext.Provider value={currentGameId}>
          <NavBar onLogin={handleLogin} onLogout={handleLogout} game={game}/>
            {user ? user.email ?
              <div>
                  <CSSTransition
                      in={game}
                      timeout={300}
                      classNames="content"
                      unmountOnExit
                  >
                    <GameDisplay handleBack={resetGame}/>
                  </CSSTransition>
                  <CSSTransition
                    in={!game}
                    timeout={300}
                    classNames="content"
                    unmountOnExit
                  >
                    <SelectGame onSelect={handleGameSelect}/>
                  </CSSTransition>
                </div>
              :
            <LoginPage onLogin={handleLogin} onLogout={handleLogout}/>
            : <LoginPage onLogin={handleLogin} onLogout={handleLogout}/>}
        </GameContext.Provider>
        </UserContext.Provider>
      </AppContainer>
      <BottomText>Version 1.5 - Created with ❤️ + ☕ by Brayden Royston, Copyright 2022</BottomText>
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
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
      flex-direction: column;
      min-height: 100vh;
      justify-content: flex-start;
  }

  position: relative;

  // background-color: var(--bg);
`

const BottomText = styled.div`
  font-size: var(--fs-extra-small);
  text-align: center;
  color: var(--accent);
`

export default App;
