const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

let animationId

let player1Score = 0;
let player2Score = 0;
let running = false;
let ended = false;

const normalHeight = 519;
const normalWidth = 1177;
const baseBallSpeed = 6;


// Configurazione dei margini in percentuale rispetto alla finestra
const horizontalMarginRatio = 0.04; // Margine orizzontale (10% di larghezza)
const verticalMarginRatio = 0.07;   // Margine verticale (7% di altezza)


let paddleWidth, paddleHeight, ballRadius;
let player1Paddle, player2Paddle, ball;
let lastScorer = '';


function setPaddleSpeed() {
    let speed = 5;
    const availableHeight = window.innerHeight * (1 - 2 * verticalMarginRatio);
    if (normalHeight !== availableHeight)
        speed = (availableHeight * speed) / normalHeight;
    return speed;
}

let nowBallSpeed = 0;
let maxSpeed;
let minSpeed;

function setBallSpeed() {
    const availableWidth = window.innerWidth * (1 - 2 * horizontalMarginRatio);

    // Calcola la velocità di base in base alla larghezza disponibile
    const speed = availableWidth * 0.007;

    // Imposta velocità massima e minima come frazioni della larghezza del canvas
    const speedFactorMax = 0.014; // Frazione per la velocità massima
    const speedFactorMin = 0.007; // Frazione per la velocità minima

    // Calcola la velocità massima e minima in base alla larghezza del canvas
    maxSpeed = availableWidth * speedFactorMax;
    minSpeed = availableWidth * speedFactorMin;

    console.log(`Max Speed: ${maxSpeed}, Min Speed: ${minSpeed}, Base Speed: ${speed}`); //debug

    return speed;
}

let TimeoutId = null;

function resetBall() {
    if (TimeoutId !== null) {
        clearTimeout(TimeoutId);
    }

    ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: ballRadius,
        dx: 0,  
        dy: 0
    };
    
    ballMoving = false; 
    player1Paddle.y = canvas.height / 2 - paddleHeight / 2;
    player2Paddle.y = canvas.height / 2 - paddleHeight / 2;
    
    TimeoutId = setTimeout(() => {
        if (lastScorer === 'player')
            ball.dx = nowBallSpeed;
        else if (lastScorer === 'ai')
            ball.dx = -nowBallSpeed;
        else
            ball.dx = nowBallSpeed * (Math.random() < 0.5 ? 1 : -1);

        ball.dy = nowBallSpeed * (Math.random() < 0.5 ? 1 : -1);
        ballMoving = true;  
    }, 1000);
}


function resizeCanvas() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    const aspectRatio = 19 / 10;

    const windowWidth = window.innerWidth * (1 - 2 * horizontalMarginRatio);
    const windowHeight = window.innerHeight - 110; 

    let canvasWidth = windowWidth;
    let canvasHeight = windowWidth / aspectRatio;

    if (canvasHeight > windowHeight) {
        canvasHeight = windowHeight;
        canvasWidth = windowHeight * aspectRatio;

        if (canvasWidth > windowWidth) {
            canvasWidth = windowWidth;
            canvasHeight = windowWidth / aspectRatio; 
        }
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    canvas.style.marginLeft = `${(window.innerWidth - canvasWidth) / 2}px`;
    canvas.style.marginTop = `0px`;

    paddleWidth = canvas.width * 0.013;
    paddleHeight = canvas.height * 0.15;
    ballRadius = canvas.width * 0.008;

    player2Paddle = {
        x: 10,
        y: canvas.height / 2 - paddleHeight / 2,
        width: paddleWidth,
        height: paddleHeight,
        dy: 0
    };

    player1Paddle = {
        x: canvas.width - paddleWidth - 10,
        y: canvas.height / 2 - paddleHeight / 2,
        width: paddleWidth,
        height: paddleHeight,
        dy: 0
    };

    nowBallSpeed = setBallSpeed();
    resetBall();
}



function drawField() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScore() {
    context.fillStyle = 'white';
    context.font = '30px Arial';
    if (player2Score < 10)
        context.fillText(player2Score, canvas.width / 2 - 35, 50);
    else
        context.fillText(player2Score, canvas.width / 2 - 45, 50);
    context.fillText("Player01", canvas.width / 2 - 130, canvas.height - 20);
    context.fillRect(canvas.width / 2 - 1, 0, 2, canvas.height);
    if (player1Score < 10)
        context.fillText(player1Score, canvas.width / 2 + 25, 50);
    else
        context.fillText(player1Score, canvas.width / 2 + 15, 50);
    context.fillText("Player02", canvas.width / 2 + 15, canvas.height - 20);
}

function drawPaddle(paddle) {
    context.fillStyle = 'white';
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall(ball) {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;  
        ball.y = canvas.height - ball.radius;  
    }
    
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy; 
        ball.y = ball.radius; 
    }

    if (ball.x - ball.radius < player2Paddle.x + player2Paddle.width + 0.005 && 
        ball.x - ball.radius > player2Paddle.x - 0.005 && 
        ball.y > player2Paddle.y - 0.005 && 
        ball.y < player2Paddle.y + player2Paddle.height + 0.005) {
        
        let impactPoint = ball.y - (player2Paddle.y + player2Paddle.height / 2);
        let normalizedImpact = impactPoint / (player2Paddle.height / 2);

        let bounceAngle = normalizedImpact * (Math.PI / 4);  
        let speed = maxSpeed - (Math.abs(normalizedImpact) * (maxSpeed - minSpeed));  
        ball.dx = speed * Math.cos(bounceAngle);
        ball.dy = speed * Math.sin(bounceAngle);

        ball.dx = Math.abs(ball.dx);
    }
    //paddle destro
    else if (ball.x + ball.radius >  player1Paddle.x + 0.005 && 
            ball.x + ball.radius <  player1Paddle.x +  player1Paddle.width - 0.005 && 
            ball.y >  player1Paddle.y - 0.005 && 
            ball.y <  player1Paddle.y +  player1Paddle.height + 0.005) {

                let impactPoint = ball.y - (player1Paddle.y + player1Paddle.height / 2);
                let normalizedImpact = impactPoint / (player1Paddle.height / 2);
        
                let bounceAngle = normalizedImpact * (Math.PI / 4); 
                let speed = maxSpeed - (Math.abs(normalizedImpact) * (maxSpeed - minSpeed)); 
                ball.dx = speed * Math.cos(bounceAngle);
                ball.dy = speed * Math.sin(bounceAngle);
        
                ball.dx = -Math.abs(ball.dx);
    }

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        if (ball.x - ball.radius < 0) {
            player1Score++;
            lastScorer = 'ai';
        } else {
            player2Score++;
            lastScorer = 'player';
        }
        resetBall();
    }

    player2Paddle.y += player2Paddle.dy;
    player1Paddle.y += player1Paddle.dy;

    if (player2Paddle.y < 0) {
        player2Paddle.y = 0;
    } else if (player2Paddle.y + player2Paddle.height > canvas.height) {
        player2Paddle.y = canvas.height - player2Paddle.height;
    }

    if (player1Paddle.y < 0) {
        player1Paddle.y = 0;
    } else if (player1Paddle.y + player1Paddle.height > canvas.height) {
        player1Paddle.y = canvas.height - player1Paddle.height;
    }
}


function winLose() {
    if (player1Score < 11 && player2Score < 11) {
        return;
    }
    else {
        running = false;
        ended = true;
        if (player2Score > player1Score) {
            context.fillStyle = 'white';
            context.font = '50px Arial';
            context.fillText('You won!', (canvas.width / 2) / 2 - 100, canvas.height / 2);
            context.fillText('You lost!', (canvas.width / 2) + (canvas.width / 2) / 2 - 100, canvas.height / 2);
        }
        else {
            context.fillStyle = 'white';
            context.font = '50px Arial';
            context.fillText('You won!', (canvas.width / 2) + (canvas.width / 2) / 2 - 100, canvas.height / 2);
            context.fillText('You lost!', (canvas.width / 2) / 2 - 100, canvas.height / 2);
        }
    }
}

window.addEventListener('keydown', function (event) {
    const paddleSpeed = setPaddleSpeed();
    switch (event.key) {
        case 'w':
            player2Paddle.dy = -paddleSpeed;
            break;
        case 's':
            player2Paddle.dy = paddleSpeed;
            break;
        case 'ArrowUp':
            player1Paddle.dy = -paddleSpeed;
            break;
        case 'ArrowDown':
            player1Paddle.dy = paddleSpeed;
            break;
    }
});

window.addEventListener('keyup', function (event) {
    switch (event.key) {
        case 'w':
        case 's':
            player2Paddle.dy = 0;
            break;
        case 'ArrowUp':
        case 'ArrowDown':
            player1Paddle.dy = 0;
            break;
    }
});

function drawFrame() {
    drawField();
    drawPaddle(player1Paddle);
    drawPaddle(player2Paddle);
    drawBall(ball);
    drawScore();
}

function gameLoop() {
    drawFrame();
    winLose();
    if (!running || ended)
        return;
    update();
    animationId = requestAnimationFrame(gameLoop);
}

window.pongGame = {
    pause: function() {
        running = false;
        if (animationId) {
            cancelAnimationFrame(animationId);  
        }
    },
    play: function() {
        if (running || ended)
            return;
        running = true;
        gameLoop();
    },
    reset: function() {
        running = false;
        ended = false;
        player1Score = 0;
        player2Score = 0;
        lastScorer = '';
        resetBall();
        drawFrame();
        if (animationId) {
            cancelAnimationFrame(animationId);  
        }
    },
    clear: function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
};


window.addEventListener('resize', function() {
    resizeCanvas(); 
    gameLoop();
});

resizeCanvas(); 
drawFrame();