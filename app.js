const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const runButton = document.getElementById("runButton");
const ballRadius = 20;
const paddleWidth = 10;
const paddleHeight = 75;

let paddle1X = 0;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2X = canvas.width - paddleWidth;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let p1UpPressed = false;
let p1DownPressed = false;
let p2UpPressed = false;
let p2DownPressed = false;

if (ctx) {
  ctx.font = "italic 90px monaco";
  ctx.fillStyle = "green";
  ctx.fillText("PONG", 130, 170);
}

function drawPaddle(paddleX, paddleY) {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095ddff";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Compute "edges" of the ball
  const ballLeft = x - ballRadius;
  const ballRight = x + ballRadius;
  const ballTop = y - ballRadius;
  const ballBottom = y + ballRadius;

  //compute paddle edges
  const paddle1Left = paddle1X;
  const paddle1Right = paddle1X + paddleWidth;
  const paddle1Top = paddle1Y;
  const paddle1Bottom = paddle1Y + paddleHeight;

  const paddle2Left = paddle2X;
  const paddle2Right = paddle2X + paddleWidth;
  const paddle2Top = paddle2Y;
  const paddle2Bottom = paddle2Y + paddleHeight;

  drawBall();

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  // paddle collision (left paddle)
  if (dx < 0) {
    const willHitLeftPaddleHorizontally = ballLeft + dx <= paddle1Right;
    const overlapsLeftPaddleVertically =
      ballBottom >= paddle1Top && ballTop <= paddle1Bottom;

    if (willHitLeftPaddleHorizontally && overlapsLeftPaddleVertically) {
      dx = -dx;
      x = paddle1Right + ballRadius;
    }
  }
  // paddle collision (right paddle)
  if (dx > 0) {
    const willHitRightPaddleHorizontally = ballRight + dx >= paddle2Left;
    const overlapsRightPaddleVertically =
      ballBottom >= paddle2Top && ballTop <= paddle2Bottom;

    if (willHitRightPaddleHorizontally && overlapsRightPaddleVertically) {
      dx = -dx;
      x = paddle2Left - ballRadius;
    }
  }

  if (p1DownPressed) {
    paddle1Y = Math.min(paddle1Y + 7, canvas.height - paddleHeight);
  } else if (p1UpPressed) {
    paddle1Y = Math.max(paddle1Y - 7, 0);
  }
  if (p2DownPressed) {
    paddle2Y = Math.min(paddle2Y + 7, canvas.height - paddleHeight);
  } else if (p2UpPressed) {
    paddle2Y = Math.max(paddle2Y - 7, 0);
  }
  x += dx;
  y += dy;
  drawPaddle(paddle1X, paddle1Y);
  drawPaddle(paddle2X, paddle2Y);
}

function startGame() {
  //   drawPaddle();
  setInterval(draw, 10);
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);
  function keyDownHandler(e) {
    //Player1 Controller
    if (e.key === "w" || e.key === "W") {
      p1UpPressed = true;
    } else if (e.key === "s" || e.key === "S") {
      p1DownPressed = true;
    }
    // Player 2 Controller
    if (e.key === "ArrowDown") {
      p2DownPressed = true;
    } else if (e.key === "ArrowUp") {
      p2UpPressed = true;
    }
  }

  function keyUpHandler(e) {
    //Player1 Controller
    if (e.key === "w" || e.key === "W") {
      p1UpPressed = false;
    } else if (e.key === "s" || e.key === "S") {
      p1DownPressed = false;
    }
    // Player 2 Controller
    if (e.key === "ArrowDown") {
      p2DownPressed = false;
    } else if (e.key === "ArrowUp") {
      p2UpPressed = false;
    }
  }
}

runButton.addEventListener("click", () => {
  startGame();
  runButton.disabled = true;
});
