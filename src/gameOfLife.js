export class GameOfLife {

  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.newGame();
  }
  
  newGame() {
    this.generation = 0;
    this.grid = GameOfLife.createGrid(this.cols, this.rows);
  }

  static createGrid(cols, rows) {
    let grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
      grid[i] = new Array(rows);

      for (let j = 0; j < rows; j++) {
        grid[i][j] = 0;
      }
    }
    return grid;
  }

  createCel(col, row) {
    this.grid[col][row] = 1;
  }

  randomizeGrid() {
    this.generation = 0;
    this.iterateGrid((i, j) => {
      this.grid[i][j] = Math.round(Math.random());
    })
  }

  iterateGrid(callback) {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        callback(i, j, this.grid[i][j]);
      }
    }
  }

  countNeighbors(i, j) {
    let count = 0;
    for (let k = Math.max(i - 1, 0); k < Math.min(i + 2, this.cols); k++) {
      for(let l = Math.max(j - 1, 0); l < Math.min(j + 2, this.rows); l++) {
        count += this.grid[k][l];
      }
    }
    return(count - this.grid[i][j]);
  }

  setCell(i, j, value) {
    this.grid[i][j] = value;
  }

  toggleCell(i, j) {
    this.grid[i][j] = this.grid[i][j] ? 0 : 1;
  }

  nextGen() {
    const nextGrid = GameOfLife.createGrid(this.cols, this.rowss);
    this.generation++;
    this.iterateGrid((i, j) => {
      const neighbors = this.countNeighbors(i, j);
      if (neighbors < 2 || neighbors > 3) {
        nextGrid[i][j] = 0;
      } else if (neighbors == 3) {
        nextGrid[i][j] = 1;
      } else {
        nextGrid[i][j] = this.grid[i][j];
      }
    });
    this.grid = nextGrid;
  }
};
