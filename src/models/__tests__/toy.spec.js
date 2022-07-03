jest.mock('../../message');
const Toy = require('../toy');
const { DIRECTION } = require('../../constants');
const { success } = require('../../message');

describe('Toy Model', () => {
  it('should create a toy', () => {
    const toy = new Toy(0, 0, DIRECTION.NORTH);
    expect(toy.position).toEqual({ x: 0, y: 0 });
    expect(toy.face).toEqual(DIRECTION.NORTH);
  });

  it('should move', () => {
    let toy = new Toy(4, 4, 'RANDOM');
    toy.move();
    expect(toy.position).toEqual({ x: 4, y: 4 });
    expect(toy.face).toEqual('RANDOM');

    toy = new Toy(4, 4, DIRECTION.NORTH);
    toy.move();
    expect(toy.position).toEqual({ x: 4, y: 4 });
    expect(toy.face).toEqual(DIRECTION.NORTH);

    toy = new Toy(2, 2, DIRECTION.NORTH);
    toy.move();
    expect(toy.position).toEqual({ x: 2, y: 3 });
    expect(toy.face).toEqual(DIRECTION.NORTH);

    toy = new Toy(2, 2, DIRECTION.EAST);
    toy.move();
    expect(toy.position).toEqual({ x: 3, y: 2 });
    expect(toy.face).toEqual(DIRECTION.EAST);

    toy = new Toy(2, 2, DIRECTION.SOUTH);
    toy.move();
    expect(toy.position).toEqual({ x: 2, y: 1 });
    expect(toy.face).toEqual(DIRECTION.SOUTH);

    toy = new Toy(2, 2, DIRECTION.WEST);
    toy.move();
    expect(toy.position).toEqual({ x: 1, y: 2 });
    expect(toy.face).toEqual(DIRECTION.WEST);
  });

  it('should turn left', () => {
    const toy = new Toy(1, 1, DIRECTION.WEST);

    toy.turnLeft();
    expect(toy.position).toEqual({ x: 1, y: 1 });
    expect(toy.face).toEqual(DIRECTION.SOUTH);

    toy.turnLeft();
    expect(toy.position).toEqual({ x: 1, y: 1 });
    expect(toy.face).toEqual(DIRECTION.EAST);

    toy.turnLeft();
    expect(toy.position).toEqual({ x: 1, y: 1 });
    expect(toy.face).toEqual(DIRECTION.NORTH);

    toy.turnLeft();
    expect(toy.position).toEqual({ x: 1, y: 1 });
    expect(toy.face).toEqual(DIRECTION.WEST);

    toy.turnLeft();
    expect(toy.position).toEqual({ x: 1, y: 1 });
    expect(toy.face).toEqual(DIRECTION.SOUTH);
  });

  it('should turn right', () => {
    const toy = new Toy(1, 1, DIRECTION.WEST);

    toy.turnRight();
    expect(toy.position).toEqual({ x: 1, y: 1 });
    expect(toy.face).toEqual(DIRECTION.NORTH);

    toy.turnRight();
    expect(toy.position).toEqual({ x: 1, y: 1 });
    expect(toy.face).toEqual(DIRECTION.EAST);

    toy.turnRight();
    expect(toy.position).toEqual({ x: 1, y: 1 });
    expect(toy.face).toEqual(DIRECTION.SOUTH);

    toy.turnRight();
    expect(toy.position).toEqual({ x: 1, y: 1 });
    expect(toy.face).toEqual(DIRECTION.WEST);

    toy.turnRight();
    expect(toy.position).toEqual({ x: 1, y: 1 });
    expect(toy.face).toEqual(DIRECTION.NORTH);
  });

  it('should report position and face', () => {
    const toy = new Toy(1, 1, DIRECTION.WEST);
    expect(success).toHaveBeenCalledTimes(0);
    toy.report();
    expect(success).toHaveBeenCalledTimes(1);
  });

  it('should update its location and face direction', () => {
    const toy = new Toy(1, 1, DIRECTION.WEST);
    toy.update(2, 3, DIRECTION.NORTH);
    expect(toy.position).toEqual({ x: 2, y: 3 });
    expect(toy.face).toEqual(DIRECTION.NORTH);
  });

  it('model helper function directionToAngle works', () => {
    let angle = Toy.directionToAngle('RANDOM');
    expect(angle).toEqual(null);
    angle = Toy.directionToAngle(DIRECTION.WEST);
    expect(angle).toEqual(180);
    angle = Toy.directionToAngle(DIRECTION.SOUTH);
    expect(angle).toEqual(270);
    angle = Toy.directionToAngle(DIRECTION.EAST);
    expect(angle).toEqual(0);
    angle = Toy.directionToAngle(DIRECTION.NORTH);
    expect(angle).toEqual(90);
  });

  it('model helper function angleToDirection works', () => {
    let angle = Toy.angleToDirection(88);
    expect(angle).toEqual(null);
    angle = Toy.angleToDirection(0);
    expect(angle).toEqual(DIRECTION.EAST);
    angle = Toy.angleToDirection(270);
    expect(angle).toEqual(DIRECTION.SOUTH);
    angle = Toy.angleToDirection(180);
    expect(angle).toEqual(DIRECTION.WEST);
    angle = Toy.angleToDirection(90);
    expect(angle).toEqual(DIRECTION.NORTH);
  });
});
