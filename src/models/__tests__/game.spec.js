const Game = require('../game');
const { DIRECTION, COMMAND } = require('../../constants');

console.log = jest.fn();

describe('Game Model', () => {
  it('should create a game', () => {
    const game = new Game();
    expect(game.toyOnTable).toEqual(false);
    expect(game.toy.position).toEqual({ x: 0, y: 0 });
    expect(game.toy.face).toEqual(DIRECTION.NORTH);
  });

  it('should be able to place a toy', () => {
    const game = new Game();
    game.next('PLACE 2,3,EAST');

    const toy = game.toy;
    expect(game.toyOnTable).toEqual(true);
    expect(toy.face).toEqual(DIRECTION.EAST);
    expect(toy.position).toEqual({ x: 2, y: 3 });

    game.next('PLACE 4,1,SOUTH');
    expect(game.toyOnTable).toEqual(true);
    expect(toy.face).toEqual(DIRECTION.SOUTH);
    expect(toy.position).toEqual({ x: 4, y: 1 });
  });

  it('should handle commands', () => {
    const game = new Game();
    game.next('Random Command');
    const errorSpy = jest.spyOn(console, 'log');
    expect(errorSpy).toHaveBeenCalledTimes(1);

    game.next(COMMAND.LEFT);
    expect(errorSpy).toHaveBeenCalledTimes(2);

    const placeSpy = jest.spyOn(game, 'place');
    game.next('PLACE 0,0,NORTH');
    expect(placeSpy).toHaveBeenCalledTimes(1);

    const toy = game.toy;
    game.next(COMMAND.LEFT);
    expect(toy.face).toEqual(DIRECTION.WEST);
    expect(toy.position).toEqual({ x: 0, y: 0 });

    game.next(COMMAND.MOVE);
    expect(toy.face).toEqual(DIRECTION.WEST);
    expect(toy.position).toEqual({ x: 0, y: 0 });

    game.next(COMMAND.REPORT);
    expect(toy.face).toEqual(DIRECTION.WEST);
    expect(toy.position).toEqual({ x: 0, y: 0 });
    expect(errorSpy).toHaveBeenCalledTimes(3);

    game.next(COMMAND.RIGHT);
    expect(toy.face).toEqual(DIRECTION.NORTH);
    expect(toy.position).toEqual({ x: 0, y: 0 });
  });
});
