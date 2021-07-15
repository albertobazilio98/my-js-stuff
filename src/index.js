async function setup() {
  const { GameOfLife } = await import('./gameOfLife.js');
  const canvas = document.getElementById('gameOfLife');
  const startStopButton = document.getElementById('start');
  const randomizeButton = document.getElementById('randomize');
  const clearButton = document.getElementById('clear');
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

  let game;

  startStop = () => {
    if (game) {
      clearInterval(game);
      startStopButton.innerHTML = 'start';
      game = undefined;
    } else {
      startStopButton.innerHTML = 'stop';
      game = setInterval(drawNext, 100);
    }
  };

  randomize = () => {
    gameOfLife.randomizeGrid();
    draw();
  };

  clear = () => {
    gameOfLife.newGame();
    draw();
  }

  draw();

  startStopButton.onclick = startStop;
  randomizeButton.onclick = randomize;
  clearButton.onclick = clear;

  getCursorPosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    return[x, y];
  }

  canvas.addEventListener('mousedown', (e) => {
    gameOfLife.toggleCell(...getCursorPosition(canvas, e));
    draw();
  })
}