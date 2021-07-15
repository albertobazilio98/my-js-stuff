export class GameOfLife {

  constructor(cols, rows) {
    this.grid = new Array(cols);
    this.genetation = 0;

    for (let i = 0; i < cols; i++) {
      this.grid[i] = new Array(rows);

      for (let j = 0; j < rows; j++) {
        this.grid[i][j] = 0;
      }
    }
  }

  createCel(col, row) {
    this.grid[col][row] = 1;
  }

  randomizeGrid() {
    this.genetation = 0;
    this.iterateGrid((i, j) => {
      this.grid[i][j] = Math.round(Math.random());
    })
  }

  iterateGrid(callback) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        callback(i, j, this.grid[i][j]);
      }
    }
  }

  countNeighbors() {
    this.iterateGrid((i, j) => {
      for (let k = -1; k <= 1; k++) {
        for(let l = -1; l <= 1; l++) {
          
        }
      }

    })
  }
};
