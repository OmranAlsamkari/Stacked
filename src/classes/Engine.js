import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import Grid from "./Grid.js";
import Cell from "./Cell.js";
import Controller from "./Controller.js";

export default class Engine {
  #grid;
  #controller;
  
  async initialize() {
    this.#controller = new Controller();

    const rl = readline.createInterface({ input, output });

    let width;
    let height;

    do {
      width = await rl.question("Please enter width: ");
    } while (isNaN(width) || width <= 0);
    do {
      height = await rl.question("Please enter height: ");
    } while (isNaN(height) || height <= 0);

    const cells = [];
    const colors = [];

    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        let value = await rl.question(
          `\nPlease enter cells:\nPress enter for empty cell, press # for block cell\n ${
            i + 1
          } row ${j + 1} column: `
        );
        if (value === "") value = ".";
        if (value != "." && value != "#") colors.push({ i, j });
        row[j] = new Cell(value);
      }
      cells[i] = row;
    }

    this.#grid = new Grid(width, height, cells, colors);

    this.#grid.draw();

    rl.close();
  }

  async run() {
    let flag;
    do {
      flag = await this.#controller.listener(this.#grid);
    } while (!this.#grid.isWin() && flag);
    if (!flag) console.log("You quit the game.");
    else console.log("Congrats, you finished the game!");
  }
}
