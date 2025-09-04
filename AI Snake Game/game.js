(() => {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');

  const gameContainer = document.getElementById('game-container');
  const mainMenu = document.getElementById('main-menu');
  const startBtn = document.getElementById('start-btn');
  const rankingsBtn = document.getElementById('rankings-btn');
  const toggleThemeBtn = document.getElementById('toggle-theme-btn');
  const restartBtn = document.getElementById('restart-btn');
  const backBtn = document.getElementById('back-btn');
  const scoreBoard = document.getElementById('score-board');

  const scale = 20;
  const rows = canvas.height / scale;
  const cols = canvas.width / scale;

  let snake;
  let food;
  let score;
  let direction;
  let nextDirection;
  let gameInterval;
  let speed = 100;

  class Snake {
    constructor() {
      this.body = [{x: Math.floor(cols/2), y: Math.floor(rows/2)}];
      this.growPending = 0;
    }

    draw() {
      ctx.fillStyle = '#00ff7e';
      ctx.shadowColor = '#00ffa3';
      ctx.shadowBlur = 10;
      this.body.forEach(segment => {
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
      });
      ctx.shadowBlur = 0;
    }

    update() {
      const head = {...this.body[0]};
      if (direction === 'LEFT') head.x--;
      else if (direction === 'UP') head.y--;
      else if (direction === 'RIGHT') head.x++;
      else if (direction === 'DOWN') head.y++;

      if (head.x < 0) head.x = cols - 1;
      else if (head.x >= cols) head.x = 0;
      if (head.y < 0) head.y = rows - 1;
      else if (head.y >= rows) head.y = 0;

      if (this.collides(head)) {
        gameOver();
        return;
      }

      this.body.unshift(head);

      if (this.growPending > 0) {
        this.growPending--;
      } else {
        this.body.pop();
      }
    }

    collides(point) {
      return this.body.some(segment => segment.x === point.x && segment.y === point.y);
    }

    eat() {
      this.growPending += 1;
    }
  }

  class Food {
    constructor() {
      this.position = this.randomPosition();
    }

    draw() {
      ctx.fillStyle = '#ff0052';
      ctx.shadowColor = '#ff2a5c';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      const centerX = this.position.x * scale + scale / 2;
      const centerY = this.position.y * scale + scale / 2;
      const radius = scale / 2 - 2;
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    randomPosition() {
      let pos;
      do {
        pos = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows)
        };
      } while (snake.collides(pos));
      return pos;
    }
  }

  function initGame() {
    snake = new Snake();
    food = new Food();
    score = 0;
    direction = 'RIGHT';
    nextDirection = 'RIGHT';
    updateScore();
    restartBtn.classList.add('hidden');
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, speed);
  }

  function updateScore() {
    scoreBoard.textContent = `Score: ${score}`;
  }

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();
    snake.draw();
    food.draw();

    if (snake.body[0].x === food.position.x && snake.body[0].y === food.position.y) {
      snake.eat();
      score++;
      updateScore();
      food.position = food.randomPosition();
      if (score % 5 === 0 && speed > 40) {
        speed -= 10;
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, speed);
      }
    }

    direction = nextDirection;
  }

  function gameOver() {
    clearInterval(gameInterval);
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff0052';
    ctx.font = 'bold 40px Comic Neue, cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Oops! Game Over 🐍', canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = '24px Comic Neue, cursive';
    ctx.fillText(`Your Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
    restartBtn.classList.remove('hidden');
  }

  // Event listeners
  window.addEventListener('keydown', e => {
    const key = e.key;
    if ((key === 'ArrowUp' || key === 'w') && direction !== 'DOWN') {
      nextDirection = 'UP';
    } else if ((key === 'ArrowDown' || key === 's') && direction !== 'UP') {
      nextDirection = 'DOWN';
    } else if ((key === 'ArrowLeft' || key === 'a') && direction !== 'RIGHT') {
      nextDirection = 'LEFT';
    } else if ((key === 'ArrowRight' || key === 'd') && direction !== 'LEFT') {
      nextDirection = 'RIGHT';
    }
  });

  restartBtn.addEventListener('click', () => initGame());
  startBtn.addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    initGame();
  });

  backBtn.addEventListener('click', () => {
    clearInterval(gameInterval);
    gameContainer.classList.add('hidden');
    mainMenu.classList.remove('hidden');
  });

  toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
  });

  rankingsBtn.addEventListener('click', () => {
    alert("🏆 Rankings feature coming soon!");
  });
})();
