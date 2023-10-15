// Screen
let screen;
let context;

// Player 1
let player1X = 30;
let player1Y = 210;
let player1Width = 25;
let player1Height = 90;

// Player 2
let player2X = 445;
let player2Y = 210;
let player2Width = 25;
let player2Height = 90;

// Ball
let ballX = 250;
let ballY = 250;
let ballRadius = 10;
let ballSpeedX = 0.5;
let ballSpeedY = 0.5;

window.onload = function () {
  screen = document.getElementById("screen");
  screen.width = 500;
  screen.height = 500;
  context = screen.getContext("2d");
  document.addEventListener("keydown", move);

  setInterval(draw, 1);
};

function draw() {
  context.fillStyle = "black";
  context.fillRect(0, 0, screen.width, screen.height);

  context.fillStyle = "white";
  context.fillRect(player1X, player1Y, player1Width, player1Height);

  context.fillStyle = "white";
  context.fillRect(player2X, player2Y, player2Width, player2Height);

  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "white";
  context.fill();
  context.closePath();

  // Check for collisions with players
  if (
    ballX - ballRadius < player1X + player1Width &&
    ballX + ballRadius > player1X &&
    ballY + ballRadius > player1Y &&
    ballY - ballRadius < player1Y + player1Height
  ) {
    ballSpeedX *= -1;
  }

  if (
    ballX - ballRadius < player2X + player2Width &&
    ballX + ballRadius > player2X &&
    ballY + ballRadius > player2Y &&
    ballY - ballRadius < player2Y + player2Height
  ) {
    ballSpeedX *= -1;
  }

  // Bounce off top and bottom walls
  if (ballY > screen.height - ballRadius || ballY < 0 + ballRadius) {
    ballSpeedY *= -1;
  }

  // Ball out of bounds
  if (ballX > screen.width) {
    // Reset ball position
    ballX = screen.width / 2;
    ballY = screen.height / 2;
    // Reset ball speed (or change its direction)
    ballSpeedX = -0.5;
    ballSpeedY = -0.5;
  }
  if (ballX < 0) {
    // Reset ball position
    ballX = screen.width / 2;
    ballY = screen.height / 2;
    // Reset ball speed (or change its direction)
    ballSpeedX = 0.5;
    ballSpeedY = 0.5;
  }

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  player2Y = ballY - 45;
}
w;

function move(event) {
  event.preventDefault();

  if (event.key === "w" || event.key === "W") {
    player1Y -= 5;
  } else if (event.key === "s" || event.key === "S") {
    player1Y += 5;
  }

  if (player1Y < 0) {
    player1Y = 0;
  } else if (player1Y + player1Height > screen.height) {
    player1Y = screen.height - player1Height;
  }

  draw();
}
