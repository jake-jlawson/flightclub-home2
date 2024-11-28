
// Imports
import styles from './GameScreen.module.css';

// Contexts
import { GameContextProvider } from '../../contexts/GameContext';
import { GameWindowProvider } from '../../contexts/GameWindowContext';


export default function GameScreen({ game }: { game: React.ReactNode }): React.ReactElement {
    return (
        <GameContextProvider>
            <GameWindowProvider>
                {game}
            </GameWindowProvider>
        </GameContextProvider>
    );
}
