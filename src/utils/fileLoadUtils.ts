/**
 * @utils fileLoadUtils
 * @description Utility functions for loading files
 */


/**
 * Retrieve the game folder name from file paths
 * @param {string} filepath - the file path to extract the game folder name from
 * @returns {string} the game folder name
 */
function getGameFolderName(filepath: string): string {
    //normalise the filepath
    const normalizedPath = filepath.replace(/\\/g, '/');

    // Split the path by '/' and extract the second-to-last element
    const parts = normalizedPath.split('/');
    console.log("parts", parts);

    //ensure we are retrieving the game folder and not other files
    if (parts.length > 2) {
        var gameFolderName = parts[1];
    } else {
        gameFolderName = null;
    }

    //ignore template
    if (gameFolderName && gameFolderName[0] == "_") {
        gameFolderName = null;
    }

    return gameFolderName;
}

export { getGameFolderName };
