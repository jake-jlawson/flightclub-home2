/**
 * @game Killer
 * @description File serves the killer game
 */

// Imports
// Contexts
import { useEffect } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { useGameWindow } from '../../contexts/GameWindowContext';



export default function Killer(): React.ReactElement {
    
    // Handle game window
    const { openGameWindow, GameWindow } = useGameWindow();
    useEffect(() => {
        openGameWindow();
    }, []);
    
    
    return (
        <>
            <GameWindow>
                This is the killer game window
            </GameWindow>
            This is the killer game
        </>
    );
}



