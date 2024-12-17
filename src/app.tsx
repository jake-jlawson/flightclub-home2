// Imports
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, HashRouter } from 'react-router-dom';

import './index.css';
import GameScreen from './screens/GameScreen/GameScreen';
import Killer from './games/killer/Killer';

import { Game, loadGames } from './games/gameManager';
import { GameWindowProvider } from './contexts/GameWindowContext';

/**
 * Main App component
 */
function App(): React.ReactElement {
    const [games, setGames] = useState<Game[]>([]);
    const [activeGame, setActiveGame] = useState<Game | null>(null);

    //load games
    useEffect(() => {
        setGames(loadGames());
    }, []);

    useEffect(() => {
        setActiveGame(games[0]);
    }, [games]);
    
    return (
        <div id="app">
            <HashRouter>
                <Routes>
                    {/* Primary Routes */}
                    <Route path="/play" element={
                        <GameScreen game={null}/>
                    } />
                    <Route path="/" element={
                        activeGame ? 
                            (<GameWindowProvider>
                                <GameScreen game={activeGame}/> 
                            </GameWindowProvider>)
                        : null
                    } />

                    {/* Game Window */}
                    <Route path="/game-window" element={
                        <div id="game-window-root"></div>
                    } />
                </Routes>
            </HashRouter>
        </div>
    );
}

// Create a container element for the app
const container = document.createElement('div');
container.id = 'app-root';
document.body.appendChild(container);

const root = createRoot(container);
root.render(<App />);