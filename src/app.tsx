// Imports
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, HashRouter } from 'react-router-dom';

import './index.css';
import GameScreen from './screens/GameScreen/GameScreen';
import Killer from './games/killer/Killer';

/**
 * Main App component
 */
function App(): React.ReactElement {
    const [activeGame, setActiveGame] = useState<React.ReactElement | null>(null);
    
    return (
        <div id="app">
            <HashRouter>
                <Routes>
                    <Route path="/" element={<GameScreen game={<Killer />}/>} />
                    <Route path="/play" element={<GameScreen game={activeGame}/>} />
                    <Route path="/game-window" element={<div id="game-window-root"></div>} />
                </Routes>
            </HashRouter>
        </div>
    );
}

const root = createRoot(document.body);
root.render(<App />);