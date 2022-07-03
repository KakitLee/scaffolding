'use strict';
const Toy = require('./toy');
const { DIRECTION, COMMAND } = require('../constants');
const MSG = require('../constants/strings');
const { error, info } = require('../message');
const { assertCommandValid, isPlaceCommand, parsePlaceCommand } = require('./utils');

/**
 * A model for a game represent a the whole progress after app start
 */
class Game {
  /**
   * Class constructor
   */
  constructor() {
    this.toy = new Toy(0, 0, DIRECTION.NORTH);
    this.toyOnTable = false;
  }

  /**
   * Handle next command
   * @param {string} command - The command string
   */
  next(command) {
    if (!assertCommandValid(command)) {
      error(MSG.INVALID_COMMAND);
    } else {
      if (isPlaceCommand(command)) {
        const args = parsePlaceCommand(command);
        this.place(parseInt(args[0]), parseInt(args[1]), args[2]);
      } else {
        if (this.toyOnTable) {
          switch (command) {
            case COMMAND.LEFT: {
              this.toy.turnLeft();
              break;
            }
            case COMMAND.MOVE: {
              this.toy.move();
              break;
            }
            case COMMAND.REPORT: {
              this.toy.report();
              break;
            }
            case COMMAND.RIGHT: {
              this.toy.turnRight();
              break;
            }
            default:
              break;
          }
        } else {
          info(MSG.DISCARD_COMMAND);
        }
      }
    }
  }

  /**
   * Place a new toy and return the new toy
   * @param {number} x - The current x position
   * @param {number} y - The current y position
   * @param {string} face - The current facing direction
   * @return {Toy} toy
   */
  place(x, y, face) {
    this.toyOnTable = true;
    this.toy.update(x, y, face);
    return this.toy;
  }
}

module.exports = Game;
