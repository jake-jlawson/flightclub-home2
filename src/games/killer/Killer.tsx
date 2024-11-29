/**
 * @game Killer
 * @description File serves the killer game
 */

// Imports
// Contexts
import { useEffect } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { useGameWindow } from '../../contexts/GameWindowContext';

// Utils
import { angleToScore, scoreToAngle } from '../../utils/dartBoardUtils';




export default function Killer(): React.ReactElement {
    
    // Get context values
    const { openGameWindow, GameWindow } = useGameWindow();

    const { setGameConfig } = useGameContext();


    // Initialise the game
    useEffect(() => {
        openGameWindow(); // open the game window
        
        // game config
        setGameConfig({ 
            maxRounds: 10 
        }); 

        console.log(angleToScore(190));
        console.log(scoreToAngle("18"));
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



