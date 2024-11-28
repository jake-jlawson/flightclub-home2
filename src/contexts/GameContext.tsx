/**
 * @context GameContext
 * @description Global context api accessible to any game that is being played
 * - Manages common game state (players, teams, points, etc.)
 * - Provides functionality for games to build on top of
 */

import { createContext, useContext } from 'react';

type GameContextType = {
    // Add your game state properties here
    // For example:
    score?: number;
    players?: string[];
};

// Create and expose context
const GameContext: React.Context<any> = createContext({});
export function useGameContext(): GameContextType {
    return useContext(GameContext);
}


/**
 * Game Context Provider
 */
export function GameContextProvider({ children }: { children: React.ReactNode }): React.ReactElement {
    
    const contextValue: GameContextType = {
        score: 0,
        players: [],
    };
    
    
    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
}
