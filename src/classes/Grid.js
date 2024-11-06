import Cell from "./Cell.js";

export default class Grid {
  #width;
  #height;
  #initializeCells;
  #initializeColors;
  #cells;
  #colors;

  constructor(width, height, cells, colors) {
    this.#width = width;
    this.#height = height;

    this.#initializeCells = cells.map((a) => {
      return [...a];
    });
    this.#cells = cells.map((a) => {
      return [...a];
    });

    this.#initializeColors = colors.map((a) => {
      return { ...a };
    });
    this.#colors = colors.map((a) => {
      return { ...a };
    });
  }

  draw() {
    console.log();
    this.#cells.forEach((row) => {
      let rowCells = "";
      row.forEach((cell) => {
        rowCells += cell.get() + " ";
      });
      console.log(rowCells);
    });
    console.log();
  }
  moveUp() {
    for (let k = 0; k <= this.#colors.length - 1; k++) {
      let color = this.#colors[k];
      for (let i = color.i; i > 0; i--) {
        if (this.#cells[i - 1][color.j].get() == ".") {
          this.#switchCells({ i, j: color.j }, { i: i - 1, j: color.j });
          this.#colors[k] = { i: i - 1, j: color.j };
          continue;
        }
        if (
          this.#cells[i - 1][color.j].get() == this.#cells[i][color.j].get()
        ) {
          this.#deleteCell(i, color.j);
          this.#colors.splice(k, 1);
          k--;
          continue;
        }
        break;
      }
    }
    this.#sort();
    this.draw();
  }
  moveDown() {
    for (let k = this.#colors.length - 1; k >= 0; k--) {
      let color = this.#colors[k];
      for (let i = color.i; i < this.#height - 1; i++) {
        if (this.#cells[i + 1][color.j].get() == ".") {
          this.#switchCells({ i, j: color.j }, { i: i + 1, j: color.j });
          this.#colors[k] = { i: i + 1, j: color.j };
          continue;
        }
        if (
          this.#cells[i + 1][color.j].get() == this.#cells[i][color.j].get()
        ) {
          this.#deleteCell(i, color.j);
          this.#colors.splice(k, 1);
          k++;
          continue;
        }
        break;
      }
    }
    this.#sort();
    this.draw();
  }
  moveLeft() {
    for (let k = 0; k <= this.#colors.length - 1; k++) {
      let color = this.#colors[k];
      for (let j = color.j; j > 0; j--) {
        if (this.#cells[color.i][j - 1].get() == ".") {
          this.#switchCells({ i: color.i, j }, { i: color.i, j: j - 1 });
          this.#colors[k] = { i: color.i, j: j - 1 };
          continue;
        }
        if (
          this.#cells[color.i][j - 1].get() == this.#cells[color.i][j].get()
        ) {
          this.#deleteCell(color.i, j);
          this.#colors.splice(k, 1);
          k--;
          continue;
        }
        break;
      }
    }
    this.#sort();
    this.draw();
  }
  moveRight() {
    for (let k = this.#colors.length - 1; k >= 0; k--) {
      let color = this.#colors[k];
      for (let j = color.j; j < this.#width - 1; j++) {
        if (this.#cells[color.i][j + 1].get() == ".") {
          this.#switchCells({ i: color.i, j }, { i: color.i, j: j + 1 });
          this.#colors[k] = { i: color.i, j: j + 1 };
          continue;
        }
        if (
          this.#cells[color.i][j + 1].get() == this.#cells[color.i][j].get()
        ) {
          this.#deleteCell(color.i, j);
          this.#colors.splice(k, 1);
          k++;
          continue;
        }
        break;
      }
    }
    this.#sort();
    this.draw();
  }
  restart() {
    this.#cells = this.#initializeCells.map((a) => {
      return [...a];
    });
    this.#colors = this.#initializeColors.map((a) => {
      return { ...a };
    });
    console.log("game restarted");
    this.draw();
  }
  getCells() {
    return this.#cells;
  }
  checkState(grid) {
    return grid.getCells() === this.#cells;
  }
  isWin() {
    const currentState = new Array();
    const winState = new Set();
    for (let row of this.#cells) {
      for (let cell of row) {
        let value = cell.get();
        if (value == "#" || value == ".") continue;
        currentState.push(value);
        winState.add(value);
      }
    }
    return winState.size == currentState.length ? true : false;
  }
  checkMoves() {
    const grid = new Grid(this.#width, this.#height, this.#cells, this.#colors);
    console.log("Up move");
    grid.moveUp();
    const grid2 = new Grid(
      this.#width,
      this.#height,
      this.#cells,
      this.#colors
    );
    console.log("Down move");
    grid2.moveDown();
    const grid3 = new Grid(
      this.#width,
      this.#height,
      this.#cells,
      this.#colors
    );
    console.log("Left move");
    grid3.moveLeft();
    const grid4 = new Grid(
      this.#width,
      this.#height,
      this.#cells,
      this.#colors
    );
    console.log("Right move");
    grid4.moveRight();

    console.log("Current Grid");
    this.draw();
  }
  #switchCells(oldCell, newCell) {
    let temp = new Cell(this.#cells[oldCell.i][oldCell.j].get());
    this.#cells[oldCell.i][oldCell.j] = this.#cells[newCell.i][newCell.j];
    this.#cells[newCell.i][newCell.j] = temp;
  }
  #deleteCell(i, j) {
    this.#cells[i][j] = new Cell(".");
  }
  #sort() {
    this.#colors.sort((a, b) => {
      if (a.i !== b.i) return a.i - b.i;
      return a.j - b.j;
    });
  }
}
