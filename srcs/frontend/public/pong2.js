const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

let player1Score = 0;
let player2Score = 0;

const normalHeight = 519;
const normalWidth = 1177;


// Configurazione dei margini in percentuale rispetto alla finestra
const horizontalMarginRatio = 0.04; // Margine orizzontale (10% di larghezza)
const verticalMarginRatio = 0.07;   // Margine verticale (7% di altezza)


let paddleWidth, paddleHeight, ballRadius;
let player1Paddle, player2Paddle, ball;
let lastScorer = '';


// Calcola le dimensioni interne del canvas, tenendo conto dei margini
const availableWidth = window.innerWidth * (1 - 2 * horizontalMarginRatio);
const availableHeight = window.innerHeight * (1 - 2 * verticalMarginRatio);

// Imposta le dimensioni del canvas
canvas.width = availableWidth;
canvas.height = availableHeight;
const paddleHeightRatio = (0.15 * 519) / availableHeight; // Altezza delle racchette in proporzione all'altezza del canvas
const paddleWidthRatio = 0.013; // Larghezza delle racchette in proporzione alla larghezza del canvas
const ballRadiusRatio = 0.01;  // Raggio della palla in proporzione alla larghezza del canvas

function setPaddleSpeed() {
    let speed = 5;
    if (normalHeight !== availableHeight)
        speed = (availableHeight * speed) / normalHeight;
    return speed;
}

function setBallSpeed() {
    let speed = 6;
    if (normalWidth !== availableWidth)
        speed = (availableWidth * speed) / normalWidth;
    return speed;
}

let paddleSpeed = setPaddleSpeed();
let ballSpeed = setBallSpeed();

function resetBall() {
    ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: ballRadius,
        dx: 0,  // Nessun movimento iniziale
        dy: 0
    };
    
    ballMoving = false;  // La palla è ferma
    player1Paddle.y = canvas.height / 2 - paddleHeight / 2;
    player2Paddle.y = canvas.height / 2 - paddleHeight / 2;

    // Dopo 1 secondo, fai ripartire la palla
    setTimeout(() => {
        
        // Determina la direzione della palla in base a chi ha subito il goal
        if (lastScorer === 'player')
            ball.dx = ballSpeed;
        else if (lastScorer === 'ai')
            ball.dx = -ballSpeed; 
        else
        ball.dx = ballSpeed * (Math.random() < 0.5 ? 1 : -1);  // Se non ci sono goal precedenti, direzione casuale
    ball.dy = ballSpeed * (Math.random() < 0.5 ? 1 : -1);
    ballMoving = true;  // La palla può muoversi
    
    }, 1000);  // 1000 millisecondi = 1 secondo
}

function resizeCanvas() {

    // Posiziona il canvas con i margini
    canvas.style.marginLeft = `${window.innerWidth * horizontalMarginRatio}px`;
    canvas.style.marginTop = `${window.innerHeight * verticalMarginRatio}px`;

    // Calcola le nuove dimensioni delle racchette e della palla
    paddleWidth = canvas.width * paddleWidthRatio;
    paddleHeight = canvas.height * paddleHeightRatio;
    ballRadius = canvas.width * ballRadiusRatio;

    // Aggiorna le dimensioni e velocità delle racchette e della palla
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

    resetBall();
}

// Funzione per disegnare il campo
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
    context.fillRect(canvas.width / 2, 0, 2, canvas.height);
    if (player1Score < 10)
        context.fillText(player1Score, canvas.width / 2 + 25, 50);
    else
        context.fillText(player1Score, canvas.width / 2 + 15, 50);
    context.fillText("Player02", canvas.width / 2 + 15, canvas.height - 20);
}

// Funzione per disegnare una racchetta
function drawPaddle(paddle) {
    context.fillStyle = 'white';
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Funzione per disegnare la palla
function drawBall(ball) {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
}

// Funzione per aggiornare la posizione della palla e delle racchette
function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    // Rimbalzi sui paddle
    if (ball.x - ball.radius < player2Paddle.x + player2Paddle.width + 0.005 && 
        ball.x - ball.radius > player2Paddle.x - 0.005 && 
        ball.y > player2Paddle.y - 0.005 && 
        ball.y < player2Paddle.y + player2Paddle.height + 0.005) {
        
        ball.dx = Math.abs(ball.dx);  // Assicurati che la palla vada verso destra
        ball.x = player2Paddle.x + player2Paddle.width + ball.radius;  // Sposta la palla appena fuori dal paddle
        //ballTouchedPaddle = true;

    } else if (ball.x + ball.radius >  player1Paddle.x + 0.005 && 
            ball.x + ball.radius <  player1Paddle.x +  player1Paddle.width - 0.005 && 
            ball.y >  player1Paddle.y - 0.005 && 
            ball.y <  player1Paddle.y +  player1Paddle.height + 0.005) {
        
        ball.dx = -Math.abs(ball.dx);  // Assicurati che la palla vada verso sinistra
        ball.x =  player1Paddle.x - ball.radius;  // Sposta la palla appena fuori dal paddle
        //ballTouchedPaddle = true;
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

    // Aggiorna la posizione delle paddle in base alla loro velocità (dy)
    player2Paddle.y += player2Paddle.dy;
    player1Paddle.y += player1Paddle.dy;

    // Impedisci che le paddle escano dal campo
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
        requestAnimationFrame(gameLoop);
    }
    else {
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

// Funzione per gestire l'input del giocatore
window.addEventListener('keydown', function (event) {
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

function gameLoop() {
    drawField();
    drawPaddle(player1Paddle);
    drawPaddle(player2Paddle);
    drawBall(ball);
    update();
    drawScore();
    winLose();
}

// Esegui resizeCanvas all'inizio e ogni volta che la finestra viene ridimensionata
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Chiamata iniziale per impostare le dimensioni iniziali

gameLoop(); // Iniziare il loop del gioco