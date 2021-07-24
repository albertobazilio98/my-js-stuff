class Minesweeper {
  constructor(cols, rows, bombs) {
    this.cols = cols;
    this.rows = rows;
    this.bombs = bombs;
    this.bombsLeft = bombs;
    this.marks = 0;
    this.status = 'ok';
    this.grid = Minesweeper.createGrid(this.rows, this.cols)
  }

  newGame() {
    for (let i = 0; i < this.bombs; i++) {
      let [j, k] = [Minesweeper.random(0, this.cols - 1), Minesweeper.random(0, this.rows - 1)];
      console.log(j, k)
      while (this.getCell(j, k).bomb) {
        [j, k] = [Minesweeper.random(0, this.cols - 1), Minesweeper.random(0, this.rows - 1)];
      }
      this.setCell(j, k, { bomb: 1 });
    }
  }

  static random(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  static createGrid(cols, rows) {
    let grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
      grid[i] = new Array(rows);

      for (let j = 0; j < rows; j++) {
        grid[i][j] = {
          state: 0,
          bomb: 0,
          count: null,
          marked: 0,
        };
      }
    }
    return grid;
  }

  selectCell(x, y) {
    const cell = this.getCell(x, y);
    if (cell.state || cell.marked) return;
    if (cell.bomb) {
      console.log('game over')
      this.status = 'game_over';
      this.setCell(x, y, { state: 1 });
    } else {
      this.checkBlanks(x, y);
    }
  }

  toggleMark(x, y) {
    const cell = this.getCell(x, y);
    if (cell.state) return;
    if (cell.marked) {
      this.setCell(x, y, { marked: 0 });
      this.marks--;
      if (cell.bomb) {
        this.bombsLeft++;
      }
    } else {
      this.setCell(x, y, { marked: 1 });
      this.marks++;
      if (cell.bomb) {
        this.bombsLeft--;
      }
    }
    if (this.bombsLeft === 0 && this.marks === this.bombs) {
      this.status = 'victory';
      console.log('victory');
    }
  }

  setCell(i, j, value) {
    this.grid[i][j] = { ...this.getCell(i, j), ...value };
  }

  getCell(x, y) {
    return this.grid[x][y];
  }

  checkBlanks(x, y) {
    const bombs = this.countBombs(x, y);
    this.setCell(x, y, { state: 1, count: bombs })
    if (!bombs) {
      this.checkNeighbors(x, y, (i, j, cell) => {
        if (!cell.state) {
          this.checkBlanks(i, j);
        }
      });
    }
  }

  countBombs(x, y) {
    let count = 0;
    this.checkNeighbors(x, y, (_, __, cell) => {
      count += cell.bomb;
    });
    return(count);
  }

  checkNeighbors(x, y, callback) {
    for(let i = Math.max(x - 1, 0); i < Math.min(x + 2, this.cols); i++) {
      for(let j = Math.max(y - 1, 0); j < Math.min(y + 2, this.rows); j++) {
        if (x !== i || y !== j) {
          callback(i, j, this.getCell(i, j));
        }
      }
    }
  }

  iterateGrid(callback) {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        callback(i, j, this.getCell(i, j));
      }
    }
  }
} 