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


  var ctx = canvas.getContext('2d');
  ctx.width = cols * cellSize;
  ctx.height = rows * cellSize;

  draw();
  
  function draw() {
    gameOfLife.iterateGrid((i, j, cell) => {
      const x = i * cellSize;
      const y = j * cellSize;
      if (cell == 1) {
        ctx.fillStyle = "#f5f50a";
      } else {
        ctx.fillStyle = "#C8C8C8"
      }
      ctx.fillRect(x + 1, y + 1, cellSize - 1, cellSize - 1);
      ctx.strokeStyle = "#808080";
      ctx.strokeRect(x, y, cellSize, cellSize);
    })
  }

}