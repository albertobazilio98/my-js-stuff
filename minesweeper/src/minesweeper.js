class Minesweeper {
  constructor(cols, rows, bombs) {
    this.newGame(cols, rows, bombs);
  }

  newGame(cols = this.cols, rows = this.rows, bombs = this.bombs) {
    this.marks = 0;
    this.status = 'ok';
    this.cols = cols;
    this.rows = rows;
    this.bombs = bombs;
    this.bombsLeft = bombs;
    this.grid = Minesweeper.createGrid(this.cols, this.rows);
    console.log(this.grid)

    for (let i = 0; i < this.bombs; i++) {
      let [j, k] = [Minesweeper.random(0, this.rows - 1), Minesweeper.random(0, this.cols - 1)];
      while (this.getCell(j, k).bomb) {
        [j, k] = [Minesweeper.random(0, this.rows - 1), Minesweeper.random(0, this.cols - 1)];
      }
      this.setCell(j, k, { bomb: 1 });
    }
  }

  static random(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  static createGrid(rows, cols) {
    let grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
      grid[i] = new Array(rows);

      for (let j = 0; j < rows; j++) {
        grid[i][j] = {
          active: 0,
          bomb: 0,
          count: null,
          marked: 0,
        };
      }
    }
    return grid;
  }

  gameOver() {
    this.status = 'game_over';
  }

  selectCell(x, y) {
    const cell = this.getCell(x, y);
    if (cell.active || cell.marked || this.status == 'game_over') return;
    if (cell.bomb) {
      this.gameOver();
      this.setCell(x, y, { active: 1, marked: 0 });
    } else {
      this.checkBlanks(x, y);
    }
  }

  toggleMark(x, y) {
    const cell = this.getCell(x, y);
    if (cell.active || this.status == 'game_over') return;
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
    this.setCell(x, y, { active: 1, count: bombs })
    if (!bombs) {
      this.checkNeighbors(x, y, (i, j, cell) => {
        if (!cell.active) {
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
    for(let i = Math.max(x - 1, 0); i < Math.min(x + 2, this.rows); i++) {
      for(let j = Math.max(y - 1, 0); j < Math.min(y + 2, this.cols); j++) {
        if (x !== i || y !== j) {
          callback(i, j, this.getCell(i, j));
        }
      }
    }
  }

  iterateGrid(callback) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        callback(i, j, this.getCell(i, j));
      }
    }
  }
} 