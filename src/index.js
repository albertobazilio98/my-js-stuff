async function setup() {
  const { GameOfLife } = await import('./gameOfLife.js');
  const canvas = document.getElementById('gameOfLife');
  const startButton = document.getElementById('start');
  const stopButton = document.getElementById('stop');
  const randomizeButton = document.getElementById('randomize');
  const generation = document.getElementById('generation');

  const screenHeight = canvas.clientHeight;
  const screenWidth = canvas.clientWidth;
  const cellSize = 20;
  const cols = Math.floor(screenWidth / cellSize);
  const rows = Math.floor(screenHeight / cellSize);

  gameOfLife = new GameOfLife(cols, rows);

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
    generation.innerHTML = `${gameOfLife.genetation}`
  }

  drawNext = () => {
    gameOfLife.nextGen();
    draw();
  }

  start = () => {
    game = setInterval(drawNext, 100);
  }

  stop = () => {
    clearInterval(game);
  }

  randomize = () => {
    gameOfLife.randomizeGrid();
    draw();
  }
  draw();

  startButton.onclick = start;
  stopButton.onclick = stop;
  randomizeButton.onclick = randomize;
}