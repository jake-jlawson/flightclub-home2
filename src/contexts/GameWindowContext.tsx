/**
 * @context GameWindowContext
 * @description Global window context api accessible to any game that is being played
 * - Allows games to access a second window to display game screens
 */

/*Imports*/
import { createContext, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

/**
 * @type Game Window Context
 */
type GameWindowContextType = {
    openGameWindow: () => void;
    GameWindow: ({ children }: { children: React.ReactNode }) => React.ReactElement;
};

// Create and expose context
const GameWindowContext = createContext<any>({});
export function useGameWindow(): GameWindowContextType {
    return useContext(GameWindowContext);
}


/**
 * Game Window Context Provider
 */
export function GameWindowProvider({ children }: { children: React.ReactNode }): React.ReactElement {
    
    const [gameWindow, setGameWindow] = useState<Window | null>(null); // game window reference
    const [gameWindowRoot, setGameWindowRoot] = useState<HTMLElement | null>(null); // game window root element


    // Open the game window
    const openGameWindow = () => { 
        if (!gameWindow) {
            const window_url: string = `${window.location.href}/#/game-window`;
            setGameWindow(window.open(window_url, "game-window", ""));
        }
    };

    // Set the game window root element
    useEffect(() => {
        if (gameWindow) {
            const intervalId = setInterval(() => {
                const root = gameWindow.document.getElementById('game-window-root');
                if (root) {
                    setGameWindowRoot(root);
                    clearInterval(intervalId);
                }
            });
        }
    }, [gameWindow]);


    /**
     * Game Window Component
     * @param children 
     * @returns a component which renders its children in the game window
     */
    const GameWindow = (
        { children }: { children: React.ReactNode }
    ): React.ReactElement => { // game window component
        return gameWindowRoot ? ReactDOM.createPortal(children, gameWindowRoot) : <></>;
    };

    // context value
    const contextValue: GameWindowContextType = {
        openGameWindow: openGameWindow,
        GameWindow: GameWindow,
    };
    
    
    return (
        <GameWindowContext.Provider value={contextValue}>
            {children}
        </GameWindowContext.Provider>
    );
}
