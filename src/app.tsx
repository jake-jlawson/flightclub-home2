import { createRoot } from 'react-dom/client';
import { Routes, Route, HashRouter } from 'react-router-dom';

import './index.css';
import GameScreen from './screens/GameScreen/GameScreen';
import Killer from './games/killer/Killer';

/**
 * Main App component
 */
function App(): React.ReactElement {
    return (
        <div id="app">
            <HashRouter>
                <Routes>
                    <Route path="/" element={<GameScreen game={<Killer />}/>} />
                    <Route path="/game-window" element={<div id="game-window-root"></div>} />
                </Routes>
            </HashRouter>
        </div>
    );
}

const root = createRoot(document.body);
root.render(<App />);