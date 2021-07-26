function setup() {
  const canvas = new Canvas2d(document.getElementById('minesweeper'));
  const bomb = document.getElementById('bombImage')
  const flag = document.getElementById('flagImage')

  const cellSize = 20;
  const cols = Math.floor(canvas.width / cellSize);
  const rows = Math.floor(canvas.height / cellSize);

  const minesweeper = new Minesweeper(cols, rows, 250);
  minesweeper.newGame();

  const draw = (state) => {
    console.log(state)
    canvas.fill([0, 0], [canvas.width, canvas.height], '#808080');
    minesweeper.iterateGrid((i, j, cell) => {
      const x = i * cellSize;
      const y = j * cellSize;

      if (cell.active) {
        canvas.fill([x + 1, y + 1], [cellSize - 4, cellSize - 4], '#A9A9A9');
        if (cell.count) {
          canvas.write(cell.count, [x + cellSize / 2 - 1, y + cellSize / 2 - 1]);
        }
        if (minesweeper.status == 'game_over' && cell.bomb) {
          canvas.placeImage(bomb, [x + 4, y + 4], [cellSize - 8, cellSize - 8]);
        }
      } else {
        canvas.fill([x, y], [cellSize - 3, cellSize - 3], '#D3D3D3');
        if (cell.marked) {
          canvas.placeImage(flag, [x + 3, y + 3], [cellSize - 7, cellSize - 7]);
        } else if (minesweeper.status == 'game_over' && cell.bomb) {
          canvas.placeImage(bomb, [x + 3, y + 3], [cellSize - 7, cellSize - 7]);
        }
      }
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