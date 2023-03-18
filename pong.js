// JS PONG Game for single player by ChatGPT and Me

// ゲームの初期化
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var ball = { x: canvas.width/2, y: canvas.height/2, dx: 5, dy: 5, radius: 10 };
var paddle = { x: canvas.width/2, y: canvas.height-20, width: 80, height: 10 };
var leftPressed = false;
var rightPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 39) {
        rightPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 39) {
        rightPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x - paddle.width/2, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    // ボールの移動
    ball.x += ball.dx;
    ball.y += ball.dy;

    // 壁に当たった場合は反射
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if(ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    else if(ball.y + ball.radius > canvas.height) {
        alert("GAME OVER");
        document.location.reload();
    }

    // パドルとの衝突判定
    if(ball.y + ball.dy > paddle.y - ball.radius &&
       ball.x > paddle.x - paddle.width/2 &&
       ball.x < paddle.x + paddle.width/2) {
        ball.dy = -ball.dy;
    }

    // パドルの移動
    if(leftPressed && paddle.x - paddle.width/2 > 0) {
        paddle.x -= 7;
    }
    else if(rightPressed && paddle.x + paddle.width/2 < canvas.width) {
        paddle.x += 7;
    }

    // ゲーム画面のクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ボールとパドルの描画
    drawBall();
    drawPaddle();

    // ゲームループの再帰呼び出し
    requestAnimationFrame(draw);
}

// ゲームル
