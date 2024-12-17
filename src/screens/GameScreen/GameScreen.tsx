/**
 * @screen GameScreen
 * @description App Screen for displaying a game
 */

// Imports
import { useEffect } from 'react';
import { Game } from '../../games/gameManager';
import { useGameWindow } from '../../contexts/GameWindowContext';

// Contexts
import { GameContextProvider } from '../../contexts/GameContext';


export default function GameScreen({ game }: { game: Game }): React.ReactElement {
    
    //open the game window
    const { openGameWindow } = useGameWindow();

    useEffect(() => {
        openGameWindow();
    }, []);

    return (
        <GameContextProvider>
            {game.getEntryPoint()}
        </GameContextProvider>
    );
}
