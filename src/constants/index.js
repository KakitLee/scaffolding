// All constants being used

/**
 * All possible commands
 * @type {{LEFT: string, MOVE: string, RIGHT: string, REPORT: string, PLACE: string}}
 */
const COMMAND = {
  LEFT: 'LEFT',
  MOVE: 'MOVE',
  PLACE: 'PLACE',
  REPORT: 'REPORT',
  RIGHT: 'RIGHT',
};

/**
 * All possible directions
 * @type {{NORTH: string, WEST: string, SOUTH: string, EAST: string}}
 */
const DIRECTION = {
  EAST: 'EAST',
  NORTH: 'NORTH',
  SOUTH: 'SOUTH',
  WEST: 'WEST',
};

/**
 * The max height/width that the toy can go
 * @type {{WIDTH: number, HEIGHT: number}}
 */
const TABLE_SIZE = {
  HEIGHT: 5,
  WIDTH: 5,
};

module.exports = {
  COMMAND,
  DIRECTION,
  TABLE_SIZE,
};
