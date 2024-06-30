const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

// Variables de position
let player1Y = canvas.height / 2;
let player2Y = canvas.height / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 0;
let ballSpeedY = 0;
let scorePlayer1 = 0;
let scorePlayer2 = 0;

let socket = null;
let keys = {};
console.log("inside Game");

// Fonction pour dessiner le jeu

function drawGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner les joueurs
    context.fillStyle = 'white';
    context.fillRect(20, player1Y, 10, 70);
    context.fillRect(canvas.width - 20, player2Y, 10, 70);

    // Dessiner la balle
    context.fillRect(ballX, ballY, 10, 10);

    // Afficher le score
    context.fillStyle = 'green';
    context.font = '24px Arial';
    context.fillText(`Player 1: ${scorePlayer1}`, 20, 30);
    context.fillText(`Player 2: ${scorePlayer2}`, canvas.width - 150, 30);
}

// Mettre à jour le jeu
function updateGame(state) {
    player1Y = state.player1_y_position;
    player2Y = state.player2_y_position;
    ballX = state.ball_x_position;
    ballY = state.ball_y_position;
    scorePlayer1 = state.score_player1;
    scorePlayer2 = state.score_player2;
    drawGame();
}

function connectWebSocket(roomName) {
    if (socket) {
        socket.close();
    }

    socket = new WebSocket(`ws://${window.location.host}/api/game/${roomName}/`);

    socket.onopen = function(event) {
        console.log('Connected to the server');
    };

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        if (data.type === 'game_state') {
            updateGame(data);
        } else if (data.type === 'start_game') {
            console.log('The game has started!');
        } else if (data.type === 'game_over') {
            console.log("Fin de game");
            alert(`Player ${data.winner} wins!`);
            socket.close();
            socket = null;
            window.hideAll();
            window.showInitialMenu();
        }
    };

    socket.onclose = function(event) {
        console.log('Disconnected from the server');
    };

    socket.onerror = function(error) {
        console.error(`WebSocket error: ${error.message}`);
    };

    document.addEventListener('keydown', function(event) {
        keys[event.code] = true;
        handleKeys();
    });

    document.addEventListener('keyup', function(event) {
        keys[event.code] = false;
    });
}

function handleKeys() {
    if (socket && socket.readyState === WebSocket.OPEN) {
        if (keys['ArrowUp']) {
            socket.send(JSON.stringify({ 'type': 'move', 'player': 2, 'direction': 'up' }));
        }
        if (keys['ArrowDown']) {
            socket.send(JSON.stringify({ 'type': 'move', 'player': 2, 'direction': 'down' }));
        }
        if (keys['KeyW']) {
            socket.send(JSON.stringify({ 'type': 'move', 'player': 1, 'direction': 'up' }));
        }
        if (keys['KeyS']) {
            socket.send(JSON.stringify({ 'type': 'move', 'player': 1, 'direction': 'down' }));
        }
        if (keys['Space']) {
            socket.send(JSON.stringify({ 'type': 'start_ball' }));
        }
    }
}

function gameLoop() {
    handleKeys();
    requestAnimationFrame(gameLoop);
}

gameLoop();