import Cell from "./Cell.js";
import { actions, deepCopy } from "../helpers/Helper.js";

export default class Grid {
  width;
  height;
  #cells;
  #colors;

  constructor(width, height, cells, colors) {
    this.width = width;
    this.height = height;
    this.#cells = deepCopy(cells);
    this.#colors = deepCopy(colors);
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
  moveGrid(action) {
    const newGrid = new Grid(
      this.width,
      this.height,
      this.#cells,
      this.#colors
    );
    newGrid.#move(action);
    return newGrid;
  }
  restart(gird) {
    const newGrid = new Grid(
      gird.width,
      gird.height,
      gird.getCells(),
      gird.getColors()
    );
    console.log("Game restarted.");
    newGrid.draw();
    return newGrid;
  }
  getCells() {
    return this.#cells;
  }
  getColors() {
    return this.#colors;
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
    return winState.size == currentState.length;
  }
  checkMoves() {
    console.log("Up Move");
    this.moveGrid(actions.w);
    console.log("Down Move");
    this.moveGrid(actions.s);
    console.log("Left Move");
    this.moveGrid(actions.a);
    console.log("Right Move");
    this.moveGrid(actions.d);
    console.log("Current Grid");
    this.draw();
  }
  #move(action) {
    let start, end, index;
    const flag = action.name == "UP" || action.name == "LEFT";

    const handleOuterCondition = () => {
      end = flag ? this.#colors.length - 1 : 0;
      return flag ? start <= end : start >= end;
    };
    const handleInnerCondition = () =>
      flag ? index > 0 : index < this[action.onEeffected] - 1;

    const handleOuterLoop = (sign) => (start += sign);
    const handleInnerLoop = (sign) => (index += sign);

    start = flag ? 0 : this.#colors.length - 1;

    for (start; handleOuterCondition(); handleOuterLoop(flag ? +1 : -1)) {
      let color = this.#colors[start];
      for (
        index = color[action.index];
        handleInnerCondition();
        handleInnerLoop(flag ? -1 : +1)
      ) {
        let CurrentI = action.i === 0 ? color.i : index;
        let CurrentJ = action.j === 0 ? color.j : index;

        let NextI = action.i === 0 ? color.i : index + action.i;
        let NextJ = action.j === 0 ? color.j : index + action.j;

        if (this.#cells[NextI][NextJ].get() == ".") {
          this.#switchCells(
            { i: CurrentI, j: CurrentJ },
            { i: NextI, j: NextJ }
          );
          this.#colors[start] = { i: NextI, j: NextJ };
          continue;
        }
        if (
          this.#cells[NextI][NextJ].get() ==
          this.#cells[CurrentI][CurrentJ].get()
        ) {
          this.#deleteCell(CurrentI, CurrentJ);
          this.#colors.splice(start, 1);
          handleOuterLoop(flag ? -1 : +1);
          continue;
        }
        break;
      }
    }
    this.#sort();
    this.draw();
  }
  #switchCells(oldCell, newCell) {
    let tempCell = new Cell(this.#cells[oldCell.i][oldCell.j].get());
    this.#cells[oldCell.i][oldCell.j] = this.#cells[newCell.i][newCell.j];
    this.#cells[newCell.i][newCell.j] = tempCell;
  }
  #deleteCell(i, j) {
    this.#cells[i][j] = new Cell(".");
  }
  #sort() {
    this.#colors.sort((a, b) => (a.i !== b.i ? a.i - b.i : a.j - b.j));
  }
}