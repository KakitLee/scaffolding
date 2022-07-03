'use strict';
const { DIRECTION } = require('../constants');
const { assertWillMoveWithinBoundary } = require('./utils');
const { success } = require('../message');

/**
 * A model for Toy
 */
class Toy {
  /**
   * Class constructor
   * @param {number} x - The current x position
   * @param {number} y - The current y position
   * @param {string} face - The current facing direction
   */
  constructor(x, y, face) {
    this.position = {
      x,
      y,
    };
    this.face = face;
  }

  /**
   * Moving the toy
   */
  move() {
    if (!assertWillMoveWithinBoundary(this.position.x, this.position.y, this.face)) {
      return;
    }
    switch (this.face) {
      case DIRECTION.EAST: {
        this.position.x += 1;
        break;
      }
      case DIRECTION.NORTH: {
        this.position.y += 1;
        break;
      }
      case DIRECTION.SOUTH: {
        this.position.y -= 1;
        break;
      }
      case DIRECTION.WEST: {
        this.position.x -= 1;
        break;
      }
      default:
        return;
    }
  }

  /**
   * Handle toy turn left
   */
  turnLeft() {
    const angle = Toy.directionToAngle(this.face);
    if (angle !== null) {
      this.face = Toy.angleToDirection((angle + 90) % 360);
    }
  }

  /**
   * Handle toy turn right
   */
  turnRight() {
    const angle = Toy.directionToAngle(this.face);
    if (angle !== null) {
      this.face = Toy.angleToDirection((angle + 360 - 90) % 360);
    }
  }

  /**
   * Console the current position & face of the toy
   */
  report() {
    const { position, face } = this;
    success(`${position.x},${position.y},${face}`);
  }

  /**
   * Update the model directly
   * @param {number} x - The current x position
   * @param {number} y - The current y position
   * @param {string} face - The current facing direction
   */
  update(x, y, face) {
    this.position = {
      x,
      y,
    };
    this.face = face;
  }

  /**
   * Helper function convert between direction in string to degree
   * @param {string} direction - The direction
   * @return {null|number}
   */
  static directionToAngle(direction) {
    switch (direction) {
      case DIRECTION.EAST: {
        return 0;
      }
      case DIRECTION.NORTH: {
        return 90;
      }
      case DIRECTION.SOUTH: {
        return 270;
      }
      case DIRECTION.WEST: {
        return 180;
      }
      default:
        return null;
    }
  }

  /**
   * Helper function convert between direction in degree to string
   * @param {number} angle - The direction
   * @return {null|number}
   */
  static angleToDirection(angle) {
    switch (angle) {
      case 0: {
        return DIRECTION.EAST;
      }
      case 90: {
        return DIRECTION.NORTH;
      }
      case 180: {
        return DIRECTION.WEST;
      }
      case 270: {
        return DIRECTION.SOUTH;
      }
      default:
        return null;
    }
  }
}

module.exports = Toy;
