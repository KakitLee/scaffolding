// validation utilities for responding to commands
const { DIRECTION, TABLE_SIZE, COMMAND } = require('../constants');

/**
 * Assert command if it's valid
 * @param {string} command - The text command
 * @return {boolean}
 */
function assertCommandValid(command) {
  // It see if it is a place command
  try {
    if (isPlaceCommand(command)) {
      const args = parsePlaceCommand(command);
      // Place command has 3 args
      if (args.length !== 3) return false;
      // Place command direction is a enum value
      const allDirections = Object.keys(DIRECTION).map((k) => DIRECTION[k]);
      return allDirections.indexOf(args[2]) !== -1;
    } else {
      return (
        Object.keys(COMMAND)
          .filter((c) => c !== COMMAND.PLACE)
          .map((k) => COMMAND[k])
          .indexOf(command) > -1
      );
    }
  } catch (err) {
    return false;
  }
}

/**
 * Assert if the next move will be a valid move or not
 * @param {number} x - The current x position
 * @param {number} y - The current y position
 * @param {string} face - The current facing direction
 * @return {boolean}
 */
function assertWillMoveWithinBoundary(x, y, face) {
  switch (face) {
    case DIRECTION.EAST: {
      return x < TABLE_SIZE.WIDTH - 1;
    }
    case DIRECTION.NORTH: {
      return y < TABLE_SIZE.HEIGHT - 1;
    }
    case DIRECTION.SOUTH: {
      return y > 0;
    }
    case DIRECTION.WEST: {
      return x > 0;
    }
    default:
      return false;
  }
}

/**
 * Test if the command is a place command
 * @param command
 * @return {bool}
 */
function isPlaceCommand(command) {
  const placeCommandRegex = /PLACE\s+[0-4]\s*,\s*[0-4]\s*,\s*\w+/;
  return command.match(placeCommandRegex) !== null;
}

/**
 * Get place command args
 * @param {string} command - The input command
 * @return {array}
 */
function parsePlaceCommand(command) {
  return command
    .replace(COMMAND.PLACE, '')
    .replace(/\s/g, '')
    .split(',');
}

module.exports = {
  assertCommandValid,
  assertWillMoveWithinBoundary,
  isPlaceCommand,
  parsePlaceCommand,
};
