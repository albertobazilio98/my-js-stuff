async function setup() {
  const { GameOfLife } = await import('./gameOfLife.js');
  const canvas = document.getElementById('gameOfLife');
  const screenHeight = canvas.clientHeight;
  const screenWidth = canvas.clientWidth;
  const cellSize = 20;
  const cols = Math.floor(screenWidth / cellSize);
  const rows = Math.floor(screenHeight / cellSize);

  gameOfLife = new GameOfLife(cols, rows);
  gameOfLife.randomizeGrid();
  // gameOfLife.setCell(1, 2, 1);
  // gameOfLife.setCell(1, 3, 1);
  // gameOfLife.setCell(1, 4, 1);


  var ctx = canvas.getContext('2d');
  ctx.width = cols * cellSize;
  ctx.height = rows * cellSize;
  
  draw = () => {
    gameOfLife.iterateGrid((i, j, cell) => {
      const x = i * cellSize;
      const y = j * cellSize;
      if (cell == 1) {
        ctx.fillStyle = "#F5F50A";
      } else {
        ctx.fillStyle = "#C8C8C8"
      }
      ctx.fillRect(x + 1, y + 1, cellSize - 1, cellSize - 1);
      ctx.strokeStyle = "#808080";
      ctx.strokeRect(x, y, cellSize, cellSize);
    })
  }

  drawNext = () => {
    gameOfLife.nextGen();
    draw();
  }

  start = () => {
    return setInterval(drawNext, 100);
  }
  
  draw();
  start();
}