/**
 * @utils dartBoardUtils
 * @description Utility functions for the dart board
 */

// Consts
const DART_BOARD_SEGMENTS: number = 20;
const DART_BOARD_SEGMENT_SIZE: number = 360 / DART_BOARD_SEGMENTS;
const SCORES_ORDER: string[] = ["6", "13", "4", "18", "1", "20", "5", "12", "9", "14", "11", "8", "16", "7", "19", "3", "17", "2", "15", "10"];


/**
 * Convert an angle to a dart score
 * @param {number} angle - the angle to convert
 * @returns {string} the score
 */
function angleToScore(angle: number): string {
    // normalise the angle to 0-360
    angle = angle % 360;

    // get the index of the score
    const index: number = Math.round(angle / DART_BOARD_SEGMENT_SIZE);
    return SCORES_ORDER[index];
}


/**
 * Convert a dart score to an angle
 * @param {string} score - the score to convert
 * @returns {number} the angle
 */
function scoreToAngle(score: string): number {
    // get the index of the score
    const segmentIndex: number = SCORES_ORDER.indexOf(score);

    // check that score has been found and if so return
    if (segmentIndex != -1) {
        return segmentIndex * DART_BOARD_SEGMENT_SIZE;
    }

    // if score not found throw error
    throw new Error(`Invalid score: ${score}`);
}

export { angleToScore, scoreToAngle };
