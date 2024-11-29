// Imports
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, HashRouter } from 'react-router-dom';

import './index.css';
import GameScreen from './screens/GameScreen/GameScreen';
import Killer from './games/killer/Killer';

import { Game, loadGames } from './games/gameManager';

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
    
    return (
        <div id="app">
            <HashRouter>
                <Routes>
                    <Route path="/" element={
                        <GameScreen game={<Killer />}/>
                    } />
                    <Route path="/play" element={
                        <GameScreen game={activeGame?.showEntryPoint()}/>
                    } />
                    <Route path="/game-window" element={
                        <div id="game-window-root"></div>
                    } />
                </Routes>
            </HashRouter>
        </div>
    );
}

const root = createRoot(document.body);
root.render(<App />);