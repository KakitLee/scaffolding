const { COMMAND, DIRECTION, TABLE_SIZE } = require('../../constants');
const { assertCommandValid, assertWillMoveWithinBoundary, isPlaceCommand, parsePlaceCommand } = require('../utils');

describe('Model utilities functions', () => {
  it('assert command is valid', () => {
    expect(assertCommandValid('Random String')).toEqual(false);
    expect(assertCommandValid(123)).toEqual(false);
    expect(assertCommandValid(COMMAND.LEFT)).toEqual(true);
    expect(assertCommandValid(COMMAND.REPORT)).toEqual(true);
    expect(assertCommandValid(COMMAND.REPORT)).toEqual(true);
    expect(assertCommandValid(COMMAND.MOVE)).toEqual(true);
    expect(assertCommandValid(COMMAND.PLACE)).toEqual(false);
    expect(assertCommandValid(`${COMMAND.PLACE} -1, 4, ${DIRECTION.EAST}`)).toEqual(false);
    expect(assertCommandValid(`${COMMAND.PLACE} 1, 5, ${DIRECTION.EAST}`)).toEqual(false);
    expect(assertCommandValid(`${COMMAND.PLACE} 5, 1, ${DIRECTION.EAST}`)).toEqual(false);
    expect(assertCommandValid(`${COMMAND.PLACE} 2, -1, ${DIRECTION.EAST}`)).toEqual(false);
    expect(assertCommandValid(`${COMMAND.PLACE} 2, 1, N`)).toEqual(false);
    expect(assertCommandValid(`${COMMAND.PLACE} 2, 1, ${DIRECTION.EAST}, 1`)).toEqual(false);
    expect(assertCommandValid(`${COMMAND.PLACE} 2, 1, ${DIRECTION.EAST}`)).toEqual(true);
  });

  it('assert will move within boundary', () => {
    expect(assertWillMoveWithinBoundary(0, 0, DIRECTION.WEST)).toEqual(false);
    expect(assertWillMoveWithinBoundary(0, 0, DIRECTION.SOUTH)).toEqual(false);
    expect(assertWillMoveWithinBoundary(0, 0, DIRECTION.EAST)).toEqual(true);
    expect(assertWillMoveWithinBoundary(0, 0, DIRECTION.NORTH)).toEqual(true);

    expect(assertWillMoveWithinBoundary(TABLE_SIZE.WIDTH - 1, 0, DIRECTION.WEST)).toEqual(true);
    expect(assertWillMoveWithinBoundary(TABLE_SIZE.WIDTH - 1, 0, DIRECTION.SOUTH)).toEqual(false);
    expect(assertWillMoveWithinBoundary(TABLE_SIZE.WIDTH - 1, 0, DIRECTION.EAST)).toEqual(false);
    expect(assertWillMoveWithinBoundary(TABLE_SIZE.WIDTH - 1, 0, DIRECTION.NORTH)).toEqual(true);

    expect(assertWillMoveWithinBoundary(TABLE_SIZE.WIDTH - 1, TABLE_SIZE.HEIGHT - 1, DIRECTION.WEST)).toEqual(true);
    expect(assertWillMoveWithinBoundary(TABLE_SIZE.WIDTH - 1, TABLE_SIZE.HEIGHT - 1, DIRECTION.SOUTH)).toEqual(true);
    expect(assertWillMoveWithinBoundary(TABLE_SIZE.WIDTH - 1, TABLE_SIZE.HEIGHT - 1, DIRECTION.EAST)).toEqual(false);
    expect(assertWillMoveWithinBoundary(TABLE_SIZE.WIDTH - 1, TABLE_SIZE.HEIGHT - 1, DIRECTION.NORTH)).toEqual(false);

    expect(assertWillMoveWithinBoundary(0, TABLE_SIZE.HEIGHT - 1, DIRECTION.WEST)).toEqual(false);
    expect(assertWillMoveWithinBoundary(0, TABLE_SIZE.HEIGHT - 1, DIRECTION.SOUTH)).toEqual(true);
    expect(assertWillMoveWithinBoundary(0, TABLE_SIZE.HEIGHT - 1, DIRECTION.EAST)).toEqual(true);
    expect(assertWillMoveWithinBoundary(0, TABLE_SIZE.HEIGHT - 1, DIRECTION.NORTH)).toEqual(false);
  });

  it('test if an command is a place command', () => {
    expect(isPlaceCommand('abc')).toEqual(false);
    expect(isPlaceCommand(` PLACE 5, 1, ${DIRECTION.NORTH}`)).toEqual(false);
    expect(isPlaceCommand(` PLACEEE 1, 1, ${DIRECTION.NORTH}`)).toEqual(false);
    expect(isPlaceCommand(` PLACE 1, 6, ${DIRECTION.NORTH}`)).toEqual(false);
    expect(isPlaceCommand(` PLACE 1, 6, test`)).toEqual(false);
    expect(isPlaceCommand(` PLACE 2, 0, ${DIRECTION.NORTH}`)).toEqual(true);
  });

  it('parse place command', () => {
    expect(parsePlaceCommand(`  PLACE   2  , 0   , ${DIRECTION.NORTH}  `)).toEqual(['2', '0', DIRECTION.NORTH]);
    expect(parsePlaceCommand(`PLACE 2,0,${DIRECTION.NORTH}`)).toEqual(['2', '0', DIRECTION.NORTH]);
  });
});
