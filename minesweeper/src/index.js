function setup() {
  // const canvas = document.getElementById('minesweeper');
  const canvas = new Canvas2d(document.getElementById('minesweeper'));

  const cellSize = 20;
  const cols = Math.floor(canvas.width / cellSize);
  const rows = Math.floor(canvas.height / cellSize);
  console.log(cols, rows)

  const minesweeper = new Minesweeper(cols, rows, 150);
  minesweeper.newGame();

  console.log(minesweeper.grid)

  const draw = () => {
    minesweeper.iterateGrid((i, j, cell) => {
      const x = i * cellSize;
      const y = j * cellSize;
      let color;
      if (cell.marked) {
        color = '#964B00';
      } else if (!cell.state) {
        color = '#C8C8C8';
      } else if (cell.bomb) {
        color = '#FF0000';
      } else {
        color = '#008000';
      }
      canvas.fill([x + 1, y + 1], [cellSize - 1, cellSize - 1], color);
      if (cell.count) {
        canvas.write(cell.count, [x + cellSize / 2, y + cellSize / 2]);
      }

      canvas.stoke([x, y], [cellSize, cellSize], "#808080")
    });
  }

  const getCursorPosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    return[x, y];
  }
  
  canvas.element.addEventListener('mousedown', (e) => {
    const coordinates = getCursorPosition(canvas.element, e);
    if (e.button === 0) {
      minesweeper.selectCell(...coordinates);
    } else {
      minesweeper.toggleMark(...coordinates);
    }
    draw();
  });

  canvas.element.addEventListener('contextmenu', event => event.preventDefault());

  draw();
}