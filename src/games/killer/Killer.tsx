/**
 * @game Killer
 * @description File serves the killer game
 */

// Imports
// Contexts
import { useEffect } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { useGameWindow } from '../../contexts/GameWindowContext';

// Games
import { Game } from '../gameManager';

// Utils
import { angleToScore, scoreToAngle } from '../../utils/dartBoardUtils';




export default function Killer({ game }: { game: Game }): React.ReactElement {
    
    // Get context values
    const { openGameWindow, GameWindow } = useGameWindow();
    const { setGameConfig } = useGameContext();


    // Initialise the game
    useEffect(() => {
        // open the game window
        openGameWindow(); 
        
        // game config
        setGameConfig({ 
            maxRounds: 10 
        }); 
    }, []);
    
    
    return (<>
        <GameWindow>
            <div className="gameWindow" style={{ background: game.getGradient() }}>
                This is the killer game window
            </div>
        </GameWindow>

        <div className="gameControl" style={{ background: game.getGradient() }}>
            This is the control window
        </div>
    </>);
}



