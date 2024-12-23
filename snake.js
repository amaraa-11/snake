const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // mogoi bolon hoolnii hemjee
let score = 0;
let level = 1;
let speed = 150;

let snake;
let food;
let direction = "";
let game;

function initializeGame() {
  score = 0;
  level = 1;
  speed = 150;
  direction = "";
  snake = [{ x: 9 * box, y: 10 * box }];
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
  };
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const key = event.keyCode;
  if (key === 37 && direction !== "RIGHT") direction = "LEFT";
  if (key === 38 && direction !== "DOWN") direction = "UP";
  if (key === 39 && direction !== "LEFT") direction = "RIGHT";
  if (key === 40 && direction !== "UP") direction = "DOWN";
}

function collision(newHead, snake) {
  for (let segment of snake) {
    if (newHead.x === segment.x && newHead.y === segment.y) return true;
  }
  return false;
}

function drawGame() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let segment of snake) {
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(segment.x, segment.y, box, box);
    ctx.strokeStyle = "#333";
    ctx.strokeRect(segment.x, segment.y, box, box);
  }

  ctx.fillStyle = "#FF5722";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
    if (score % 5 === 0) {
      level++;
      speed -= 10;
      clearInterval(game);
      game = setInterval(drawGame, speed);
    }
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert(`Game over! Score: ${score}, Level: ${level} Play again?`);
    return;
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "18px Arial";
  ctx.fillText(`Score, ${score}`, 10, 20);
  ctx.fillText(`Level, ${level}`, canvas.width - 100, 20);
}

function startGame() {
  initializeGame();
  clearInterval(game);
  game = setInterval(drawGame, speed);
}
