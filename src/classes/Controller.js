import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export default class Controller {
  async listener(grid) {
    const rl = readline.createInterface({ input, output });
    let key;
    key = await rl.question(
      "Enter W, A, S, D, to move\nR to restart, C to check moves or q to quit: \n"
    );

    if (key == "q" || key == "Q") {
      rl.close();
      return false;
    }

    if (key == "w" || key == "W") grid.moveUp();
    if (key == "s" || key == "S") grid.moveDown();
    if (key == "a" || key == "A") grid.moveLeft();
    if (key == "d" || key == "D") grid.moveRight();
    if (key == "r" || key == "R") grid.restart();
    if (key == "c" || key == "C") grid.checkMoves();
    rl.close();
    return true;
  }
}
