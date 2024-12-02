const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

let animationId;
let TimeoutId = null;  // Variabile globale per l'ID del timeout

let player1Score = 0;
let player2Score = 0;
let running = false;
let ended = false;

// Configurazione dei margini in percentuale rispetto alla finestra
const horizontalMarginRatio = 0.04; // Margine orizzontale (4% di larghezza)
const verticalMarginRatio = 0.07;   // Margine verticale (7% di altezza)

let paddleWidth, paddleHeight, ballRadius;
let player1Paddle, player2Paddle, ball;
let lastScorer = '';
let nowBallSpeed = 0;
let paddleSpeed = 0;
let maxSpeed;
let minSpeed;

function setPaddleSpeed() {
	const availableHeight = canvas.height;
	const speed = availableHeight * 0.0086;

	return speed;
}

function setBallSpeed() {
	const availableWidth = canvas.width;
	const speed = availableWidth * 0.007;
	const speedFactorMax = 0.014;
	const speedFactorMin = 0.007;
	maxSpeed = availableWidth * speedFactorMax;
	minSpeed = availableWidth * speedFactorMin;

	return speed;
}

function resetBall() {
	// Se esiste un timeout precedente, annullalo
	if (TimeoutId !== null) {
		clearTimeout(TimeoutId);
	}
	// Imposta la palla nella posizione iniziale senza movimento
	ball = {
		x: canvas.width / 2,
		y: canvas.height / 2,
		radius: ballRadius,
		dx: 0,  // Nessun movimento iniziale
		dy: 0
	};
	//console.log(`ballRadius: ${ballRadius}`); //debug
	ballMoving = false;
	player1Paddle.y = canvas.height / 2 - paddleHeight / 2;
	player2Paddle.y = canvas.height / 2 - paddleHeight / 2;
		
	// Imposta un nuovo timeout per far ripartire la palla dopo 1 secondo
	TimeoutId = setTimeout(() => {
		if (lastScorer === 'player1')
			ball.dx = nowBallSpeed;
		else if (lastScorer === 'player2')
			ball.dx = -nowBallSpeed;
		else
			ball.dx = nowBallSpeed * (Math.random() < 0.5 ? 1 : -1);  // Direzione casuale se non ci sono goal precedenti
		ball.dy = nowBallSpeed * (Math.random() < 0.5 ? 1 : -1);
		ballMoving = true;
	}, 1000);  // 1000 millisecondi = 1 secondo
}


function resizeCanvas() {
	if (animationId) {
		cancelAnimationFrame(animationId);  // Ferma l'animazione corrente
	}
	// Imposta un rapporto fisso
	const aspectRatio = 19 / 10;
	// Calcola le dimensioni del canvas in base alla finestra del browser
	const windowWidth = window.innerWidth * (1 - 2 * horizontalMarginRatio);
	const windowHeight = window.innerHeight - 110; // Sottrai l'altezza del footer

	let canvasWidth = windowWidth;
	let canvasHeight = windowWidth / aspectRatio;
	// Se l'altezza calcolata è maggiore dello spazio disponibile, ridimensiona in base all'altezza
	if (canvasHeight > windowHeight) {
		canvasHeight = windowHeight;
		canvasWidth = windowHeight * aspectRatio;

		// Controlla se la nuova larghezza è maggiore della larghezza disponibile
		if (canvasWidth > windowWidth) {
			canvasWidth = windowWidth;
			canvasHeight = windowWidth / aspectRatio; // Mantieni il rapporto fisso
		}
	}
	if (canvasWidth >= 414)
		canvas.width = canvasWidth;
	else
		canvas.width = 414;
	if (canvasHeight >= 217)
		canvas.height = canvasHeight;
	else
		canvas.height = 217;
	canvas.style.marginLeft = `${(window.innerWidth - canvasWidth) / 2}px`;
	canvas.style.marginTop = `0px`;

	// Calcola le nuove dimensioni delle racchette e della palla
	paddleWidth = canvas.width * 0.013;
	paddleHeight = canvas.height * 0.15;
	ballRadius = canvas.width * 0.008;
	// Aggiorna le dimensioni e le posizioni delle paddle
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
	// Aggiorna le velocità
	paddleSpeed = setPaddleSpeed();
	nowBallSpeed = setBallSpeed();
	resetBall();
}

function drawNames() {
	let playerFontSize = canvas.width * 0.03; // Dimensione del font come 3% della larghezza del canvas
	if (playerFontSize > 27) // Limita la dimensione dei nomi a un massimo di 27px
		playerFontSize = 27;
	context.fillStyle = 'white';
	context.font = `${playerFontSize}px Arial`;

	const playerNameOffset = canvas.height * 0.015;  // Offset verticale per i nomi
	const player1Name = "Player01";
	const player2Name = "Player02";
	const player1TextWidth = context.measureText(player1Name).width;
	// Distanza simmetrica dal centro per i nomi
	const playerNameDistanceFromCenter = canvas.width * 0.05;
	// Disegna il nome del giocatore 1 a sinistra
	context.fillText(player1Name, canvas.width / 2 - playerNameDistanceFromCenter - player1TextWidth, canvas.height - playerNameOffset);
	// Disegna il nome del giocatore 2 a destra
	context.fillText(player2Name, canvas.width / 2 + playerNameDistanceFromCenter, canvas.height - playerNameOffset);
}

// Funzione per disegnare il campo, nomi e linea centrale
function drawField() {
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'white';
	// Disegna una linea al centro
	context.fillRect(canvas.width / 2 - 1, 0, 2, canvas.height);
	drawNames();
}

// Funzione per disegnare il punteggio
function drawScore() {
	const fontSize = canvas.width * 0.03;
	context.fillStyle = 'white';
	context.font = `${fontSize}px Arial`;
	const scoreOffset = canvas.width * 0.06;  // Offset uguale per entrambi i punteggi rispetto al centro

	// Calcola la larghezza del punteggio di ciascun giocatore
	const player1ScoreWidth = context.measureText(player1Score).width;
	const player2ScoreWidth = context.measureText(player2Score).width;
	context.fillText(player1Score, canvas.width / 2 - scoreOffset - player1ScoreWidth / 2, fontSize + 10);
	context.fillText(player2Score, canvas.width / 2 + scoreOffset - player2ScoreWidth / 2, fontSize + 10);
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

// Funzione per calcolare l'impatto della palla sulla racchetta
function calcBallImpact(paddleHeight, paddleY) {
	let impactPoint = ball.y - (paddleY + paddleHeight / 2);
	let normalizedImpact = impactPoint / (paddleHeight / 2);
	let bounceAngle = normalizedImpact * (Math.PI / 4); // 45 gradi di angolo di rimbalzo massimo
	let speed = maxSpeed - (Math.abs(normalizedImpact) * (maxSpeed - minSpeed)); // Velocità basata sull'impatto

	ball.dx = speed * Math.cos(bounceAngle);
	ball.dy = speed * Math.sin(bounceAngle);
}

// Funzione per aggiornare la posizione della palla e delle paddle
function update() {
	// Aggiorna la posizione della palla
	ball.x += ball.dx;
	ball.y += ball.dy;
	// Aggiorna la posizione delle paddle
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

	// Rimbalzi sui muri
	if (ball.y + ball.radius > canvas.height) {
		ball.dy = -ball.dy;
		ball.y = canvas.height - ball.radius;
	}
	if (ball.y - ball.radius < 0) {
		ball.dy = -ball.dy;
		ball.y = ball.radius;
	}
	// Collisione con la racchetta sinistra (player1)
	if (ball.x - ball.radius < player2Paddle.x + player2Paddle.width && 
		ball.x + ball.radius > player2Paddle.x && 
		ball.y + ball.radius > player2Paddle.y && 
		ball.y - ball.radius < player2Paddle.y + player2Paddle.height) {
		
		calcBallImpact(player2Paddle.height, player2Paddle.y);
		// Assicurati che la palla vada verso destra
		ball.dx = Math.abs(ball.dx);
	}
	// Collisione con la racchetta destra (player2)
	if (ball.x + ball.radius > player1Paddle.x && 
		ball.x - ball.radius < player1Paddle.x + player1Paddle.width &&
		ball.y + ball.radius > player1Paddle.y && 
		ball.y - ball.radius < player1Paddle.y + player1Paddle.height) {

		calcBallImpact(player1Paddle.height, player1Paddle.y);
		// Assicurati che la palla vada verso sinistra
		ball.dx = -Math.abs(ball.dx);
	}
	// Verifica se la pallina esce dal campo (goal a sinistra o a destra)
	if (ball.x < 0 || ball.x > canvas.width) {
		if (ball.x < 0) {
			player2Score++;
			lastScorer = 'player2';
		} else {
			player1Score++;
			lastScorer = 'player1';
		}
		resetBall();
	}
}

// Funzione per stampare chi ha vinto o perso
function winLose() {
	// Controlla se qualcuno ha raggiunto il punteggio vincente (11)
	if (player1Score < 11 && player2Score < 11) {
		return;
	} else {
		running = false;
		ended = true;
		const fontSize = canvas.width * 0.05; // Dimensione del font come 5% della larghezza del canvas
		context.fillStyle = 'white';
		context.font = `${fontSize}px Arial`;

		if (player2Score < player1Score) {
			// "You won!" per Player1
			context.fillText('You won!', (canvas.width / 2) / 2 - fontSize * 2, canvas.height / 2);
			// "You lost!" per Player2
			context.fillText('You lost!', (canvas.width / 2) + (canvas.width / 2) / 2 - fontSize * 2, canvas.height / 2);
		} else {
			// "You won!" per Player2
			context.fillText('You won!', (canvas.width / 2) + (canvas.width / 2) / 2 - fontSize * 2, canvas.height / 2);
			// "You lost!" per Player1
			context.fillText('You lost!', (canvas.width / 2) / 2 - fontSize * 2, canvas.height / 2);
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
// Ferma la paddle quando il tasto viene rilasciato
window.addEventListener('keyup', function (event) {
	switch (event.key) {
		case 'w':
		case 's':
			// Se il tasto che hai rilasciato è "w" o "s", ferma il paddle
			if (event.key === 'w' && player2Paddle.dy < 0) {
				player2Paddle.dy = 0;
			}
			if (event.key === 's' && player2Paddle.dy > 0) {
				player2Paddle.dy = 0;
			}
			break;
		case 'ArrowUp':
		case 'ArrowDown':
			// Se il tasto che hai rilasciato è "ArrowUp" o "ArrowDown", ferma il paddle
			if (event.key === 'ArrowUp' && player1Paddle.dy < 0) {
				player1Paddle.dy = 0;
			}
			if (event.key === 'ArrowDown' && player1Paddle.dy > 0) {
				player1Paddle.dy = 0;
			}
			break;
	}
});

// Funzione per disegnare il campo, le paddle e la palla
function drawFrame() {
	drawField();
	drawPaddle(player1Paddle);
	drawPaddle(player2Paddle);
	drawBall(ball);
	drawScore();
}

// Funzione per aggiornare il gioco e disegnare
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
			cancelAnimationFrame(animationId);  // Ferma l'animazione corrente
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
			cancelAnimationFrame(animationId);  // Ferma l'animazione precedente
		}
	},
	clear: function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
};

window.addEventListener('resize', function() {
    resizeCanvas(); // Aggiorna il canvas
    if (isMobileDevice()) {
        enableTouchControls(); // Riassegna i controlli touch
    }
    gameLoop(); // Continua il gioco se è in esecuzione
});


// Inizializza il canvas
resizeCanvas(); // Chiamata iniziale per impostare le dimensioni iniziali

// Funzione per rilevare dispositivi mobili
function isMobileDevice() {
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
}

// Rileva il dispositivo mobile e abilita i controlli touch
if (isMobileDevice()) {
    enableTouchControls(); // Abilita i controlli touch
}

// Funzione per gestire i controlli touch
function enableTouchControls() {
    let touchStartY = 0;
    let touchEndY = 0;

    const leftTouchZone = document.createElement('div');
    const rightTouchZone = document.createElement('div');

    // Stile delle aree touch
    [leftTouchZone, rightTouchZone].forEach(zone => {
        zone.style.position = 'absolute';
        zone.style.top = '0';
        zone.style.width = '50%';
        zone.style.height = '100%';
        zone.style.zIndex = '100'; // Sopra il canvas
        zone.style.opacity = '0'; // Invisibile
        document.body.appendChild(zone);
    });

    leftTouchZone.style.left = '0'; 
    rightTouchZone.style.right = '0'; 

    // Paddle sinistra (Player 2)
    leftTouchZone.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; });
    leftTouchZone.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
        const deltaY = touchEndY - touchStartY;
        player2Paddle.dy = deltaY > 0 ? paddleSpeed : -paddleSpeed;
        touchStartY = touchEndY;
    });
    leftTouchZone.addEventListener('touchend', () => { player2Paddle.dy = 0; });

    // Paddle destra (Player 1)
    rightTouchZone.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; });
    rightTouchZone.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
        const deltaY = touchEndY - touchStartY;
        player1Paddle.dy = deltaY > 0 ? paddleSpeed : -paddleSpeed;
        touchStartY = touchEndY;
    });
    rightTouchZone.addEventListener('touchend', () => { player1Paddle.dy = 0; });
}

drawFrame();
