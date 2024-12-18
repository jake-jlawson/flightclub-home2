/**
 * @context GameContext
 * @description Global context api accessible to any game that is being played
 * - Manages common game state (players, teams, points, etc.)
 * - Provides functionality for games to build on top of
 */

import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Types
 */
type GameContextType = { //game context type
    round: number;
    setGameConfig: (config: IGameConfig) => void;
};

interface IGameConfig { //interface for game config object
    maxRounds: number
}

// Create and expose context
const GameContext: React.Context<any> = createContext({});
export function useGameContext(): GameContextType {
    return useContext(GameContext);
}


/**
 * Game Context Provider
 */
export function GameContextProvider({ children }: { children: React.ReactNode }): React.ReactElement {
    
    /** STATES
     * @var {object} config - default game configuration, to be set by the game
     * @var {boolean} gameActive - whether the game is active (sets to false when game is over)
     * @var {int} round - the current round number
     * @var {array} teams - the teams playing the game
     */
    const [round, setRound] = useState<number>(1);
    const [gameActive, setGameActive] = useState<boolean>(true);
    const [config, setConfig] = useState<IGameConfig | null>(null);


    const setGameConfig = (config: IGameConfig) => {
        setConfig(config);
    };


    useEffect(() => {
        console.log(config);
    }, [config, round]);







    const contextValue: GameContextType = {
        round: round,
        setGameConfig: setGameConfig,
    };
    
    
    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
}
