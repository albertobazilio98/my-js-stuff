function setup() {
  const canvas = document.getElementById('minesweeper');

  const screenHeight = canvas.clientHeight;
  const screenWidth = canvas.clientWidth;
  const cellSize = 20;
  const cols = Math.floor(screenWidth / cellSize);
  const rows = Math.floor(screenHeight / cellSize);

  const minesweeper = new Minesweeper(cols, rows, 150);
  minesweeper.newGame();

  var ctx = canvas.getContext('2d');
  console.log(minesweeper.grid)

  const draw = () => {
    minesweeper.iterateGrid((i, j, cell) => {
      const x = i * cellSize;
      const y = j * cellSize;
      if (cell.marked) {
        ctx.fillStyle = "#964B00";
        ctx.fillRect(x + 1, y + 1, cellSize - 1, cellSize - 1);
      } else if (!cell.state) {
        ctx.fillStyle = "#C8C8C8";
        ctx.fillRect(x + 1, y + 1, cellSize - 1, cellSize - 1);
      } else if (cell.count) {
        ctx.fillStyle = "#F5F50A";
        ctx.fillRect(x + 1, y + 1, cellSize - 1, cellSize - 1);
        ctx.fillStyle = "black";
        ctx.font = "28px";
        ctx.fillText(cell.count, x + cellSize / 2, y + cellSize / 2)
      } else if (cell.bomb) {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(x + 1, y + 1, cellSize - 1, cellSize - 1);
      } else {
        ctx.fillStyle = "#008000";
        ctx.fillRect(x + 1, y + 1, cellSize - 1, cellSize - 1);
      }
      ctx.strokeStyle = "#808080";
      ctx.strokeRect(x, y, cellSize, cellSize);
    });
  }

  const getCursorPosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    return[x, y];
  }
  
  canvas.addEventListener('mousedown', (e) => {
    const coordinates = getCursorPosition(canvas, e);
    if (e.button === 0) {
      minesweeper.selectCell(...coordinates);
    } else {
      minesweeper.toggleMark(...coordinates);
    }
    draw();
  });

  canvas.addEventListener('contextmenu', event => event.preventDefault());

  draw();
}