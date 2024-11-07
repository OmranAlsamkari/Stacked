import Grid from "./Grid.js";
import Cell from "./Cell.js";
import Controller from "./Controller.js";
import { actions } from "../helpers/Helper.js";

export default class Engine {
  #grid;
  #initializeGrid;
  #controller;

  async initialize() {
    this.#controller = new Controller();

    let width, height;

    do {
      width = await this.#controller.listener("Please enter width: ");
    } while (isNaN(width) || width <= 0);
    do {
      height = await this.#controller.listener("Please enter height: ");
    } while (isNaN(height) || height <= 0);

    const cells = [];
    const colors = [];

    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        let value = await this.#controller.listener(
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
    this.#initializeGrid = new Grid(width, height, cells, colors);

    this.#grid.draw();
  }

  async run() {
    let key;
    while (!this.#grid.isWin()) {
      key = await this.#controller.listener(
        "Enter W, A, S, D, to move\nR to restart, C to check moves or q to quit: \n"
      );
      if (key == "q") break;
      this.#chageState(key);
    }
    if (this.#grid.isWin()) console.log("Congrats, you finished the game!");
    else console.log("You quit the game.");
  }

  #chageState(key) {
    if (key == "c") this.#grid.checkMoves();
    else if (key == "r") this.#grid = this.#grid.restart(this.#initializeGrid);
    else this.#grid = this.#grid.moveGrid(actions[key]);
  }
}
