/**
 * @file gameManager.tsx
 * @description Logic for storing, loading and providing games
 * - Stores relevant game information
 * - Manages loading of game data from game.json
 * - Manages fetching games in app.jsx
 */

/**Imports */
import { getGameFolderName } from "../utils/fileLoadUtils";

interface IGameData { //interface for game data in game.json
    _comment?: string;
    name: string;
    description: string;

    gradient: {
        start: string;
        end: string;
    }
}

/**
 * @class Game
 * @description Represents a game
 */
class Game {   
    public id: string; 
    public name: string;
    public description: string;
    public logo: File; //main logo
    public tile: File; //tile, to present in game selection
    
    private gradient: {start: string; end: string}; //gradient for background
    private entry_point: React.ReactElement; //entry point of the game (main react component)

    /**
     * Constructor
     */
    constructor(id: string, data: IGameData, logo: File, tile: File, entry_point: React.ReactElement) {
        this.id = id;
        this.logo = logo;
        this.tile = tile;
        this.entry_point = entry_point;

        this.loadGameData(data);
    }

    /**
     * Methods
     */
    private loadGameData(gameData: IGameData): void {
        //load game data from game.json
        this.name = gameData.name;
        this.description = gameData.description;
        this.gradient = gameData.gradient;
    }

    public showEntryPoint(): React.ReactElement {
        if (!this.entry_point) {
            // handle no entry point
            console.error("No entry point found for game", this.name);
            return (
                <h1>This game has no entry point. Make sure your game has a working [game_name].tsx file in the game folder.</h1>
            );
        } else {
            return this.entry_point;
        }
    }

    public getGradient(): string {
        if (!this.gradient) {
            console.error("No gradient found for game", this.name);
            return "linear-gradient(180deg, #ffffff 0%, #ffffff 50%)";
        } else {
            return `linear-gradient(180deg, ${this.gradient.start} 0%, ${this.gradient.end} 50%)`;
        }
    }
}


/**
 * @function loadGames
 * @description Loads all games from the games folder
 * @returns {Game[]} - Array of games
 */
function loadGames(): any {
    try {
        const loadedGames: Game[] = [];
        const gameContext = require.context("../games", true, /\.(json|tsx|png|jpg)$/);

        // Map to track game assets by folder
        const gameFolders = new Map<string, { json?: string; tsx?: string; logo?: string; tile?: string }>();

        //iterate over all game folders
        gameContext.keys().forEach((filepath) => {
            const gameFolderName = getGameFolderName(filepath);
            
            if (gameFolderName) {
                const gameId = gameFolderName;
                if (!gameFolders.has(gameId)) { // if game folder not already in map add it
                    gameFolders.set(gameId, {});
                }
            }
        });

        return loadedGames;

    } catch (error) {
        console.error("Error loading games:", error);
    }
}


export { Game, loadGames };