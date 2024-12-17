/**
 * @file gameManager.tsx
 * @description Logic for storing, loading and providing games
 * - Stores relevant game information
 * - Manages loading of game data from game.json
 * - Manages fetching games in app.jsx
 */

/**Imports */
import { createElement } from "react";
import { getGameFolderName } from "../utils/fileLoadUtils";

interface IGameData { //interface for game data in game.json
    _comment?: string;
    name: string;
    description: string;
    long_description: string;
    
    entry_point: string;

    gradient: {
        start: string;
        end: string;
    }
}

interface GameComponentProps {
    game: Game;
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
    private entry_point: React.ComponentType<GameComponentProps>; //entry point of the game (main react component)

    /**
     * Constructor
     */
    constructor(id: string, data: IGameData, logo: File, tile: File, entry_point: React.ComponentType<GameComponentProps>) {
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

    public getEntryPoint(): React.ReactElement {
        if (!this.entry_point) {
            // handle no entry point
            console.error("No entry point found for game", this.name);
            return (<>
                <h1>This game has no entry point. Make sure your game has a working [game_name].tsx file in the game folder.</h1>
            </>);
        } else {
            return <this.entry_point game={this} />;
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
    const gameContext = require.context("../games", true, /\.(json|tsx|png|jpg)$/);
    const loadedGames: Game[] = [];

    const games: { [gameName: string]: string[] } = {};

    // Iterate over all file paths in the context to get all game folders
    gameContext.keys().forEach((filepath) => {
        // Extract the game name (subfolder name)
        const parts = filepath.split('/');
        const folderName = parts[1];  // Assuming the folder is at the second level

        // Skip the "_gametemplate" folder or any non-folder entries (like files in the root of the games directory)
        if (folderName === "_gametemplate" || parts.length < 3) {
            return;  // Skip this file
        }

        // Initialize an array for each game if not already initialized
        if (!games[folderName]) {
            games[folderName] = [];
        }

        // Add the file to the corresponding game's array
        games[folderName].push(filepath);
    });

    // Load games from the games folder
    try {
        // Create game objects for each of the games and add them to the loadedGames array
        Object.entries(games).forEach(([gameName, files]) => {
            //find game.json file for each game
            const jsonFile = files.find(file => file.endsWith("game.json"));
            const gameData = jsonFile ? gameContext(jsonFile) : null;
            
            //find logo
            const logoFile = files.find(file => file.endsWith("logo.png"));
            const logo = logoFile ? gameContext(logoFile) : null;

            //find tile
            const tileFile = files.find(file => file.endsWith("tile.png"));
            const tile = tileFile ? gameContext(tileFile) : null;

            //find entry point
            let entryPointModule = null;
            if (gameData && gameData.entry_point) {
                const entryPointFile = "./" + gameName + "/" + gameData.entry_point;
                try {
                    entryPointModule = gameContext(entryPointFile);
                } catch (error) {
                    entryPointModule = null;
                }
            }
            console.log(entryPointModule.default);
            
            //create game object
            const game = new Game(gameName, gameData, logo, tile, entryPointModule.default);
            loadedGames.push(game);
        });

        return loadedGames;  // Return the grouped games (optional)
    } catch (error) {
        console.error("Error loading games:", error);
    }
}


export { Game, loadGames };