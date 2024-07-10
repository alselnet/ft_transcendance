const Game = () => {
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
    `   
        <div class="game-container" id="game-container">
            <canvas id="game-canvas" width="1200" height="700"></canvas>
        <div class="button-container" id="initial-buttons">
            <button class="game-button" id="local-mode">Local</button>
            <button class="game-button" id="tournoi-mode">Tournoi</button>
        </div>
        <div class="button-container" id="settings">
            <div>
                <label for="ball-speed">Ball Speed:</label>
                <select id="ball-speed">
                    <option value="15">Slow</option>
                    <option value="20">Normal</option>
                    <option value="25">Fast</option>
                </select>
            </div>
            <div>
                <label for="paddle-speed">Paddle Speed:</label>
                <select id="paddle-speed">
                    <option value="5">Slow</option>
                    <option value="7">Normal</option>
                    <option value="10">Fast</option>
                </select>
            </div>
            <div>
                <label for="background-color">Background Color:</label>
                <select id="background-color">
                    <option value="black">Black</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                </select>
            </div>
            <button class="game-button" id="start-game-btn">Start Game</button>
        </div>
        <div class="button-container" id="tournoi-buttons">
            <button class="game-button" id="three-players-btn">3 Players</button>
            <button class="game-button" id="four-players-btn">4 Players</button>
            <button class="game-button" id="five-players-btn">5 Players</button>
        </div>
    </div>
    `;

        const initialButtons = document.getElementById("initial-buttons");
        const tournoiButtons = document.getElementById("tournoi-buttons");
        const localModeButton = document.getElementById("local-mode");
        const localModeTournoi = document.getElementById("tournoi-mode");
        const settings = document.getElementById("settings");
        const startGameButton = document.getElementById("start-game-btn");
        const ballSpeed = document.getElementById("ball-speed");
        const paddleSpeed = document.getElementById("paddle-speed");
        const backgroundColor = document.getElementById("background-color");
        const canvas = document.getElementById('game-canvas');
        const context = canvas.getContext('2d');
    
        let player1Y = canvas.height / 2;
        let player2Y = canvas.height / 2;
        let ballX = canvas.width / 2;
        let ballY = canvas.height / 2;
        let scorePlayer1 = 0;
        let scorePlayer2 = 0;
        let socket = null;
        let keys = {};
        let playerNames = [];
        
        showInitialMenu();
        console.log("inside Game_menu")
    
        function hideAll() {
            initialButtons.classList.add("hidden");
            tournoiButtons.classList.add("hidden");
            settings.classList.add("hidden");
        }
    
        function showInitialMenu() {
            drawInitialGame()
            hideAll();
            settings.classList.remove("hidden");
        }
    
        function drawInitialGame() {
            context.clearRect(0, 0, canvas.width, canvas.height);
        
            // Dessiner les joueurs
            context.fillStyle = 'white';
            context.fillRect(20, canvas.height / 2, 10, 70);
            context.fillRect(canvas.width - 20, canvas.height / 2, 10, 70);
        
            // Dessiner la balle
            context.fillRect(canvas.width / 2, canvas.height / 2, 10, 10);
        
            // Afficher le score
            context.fillStyle = 'green';
            context.font = '24px Arial';
            context.fillText(`Player 1: 0`, 20, 30);
            context.fillText(`Player 2: 0`, canvas.width - 150, 30);
        }
    
        startGameButton.addEventListener("click", function() {
            console.log(backgroundColor.value);
            console.log(ballSpeed.value);
            console.log(paddleSpeed.value);
            document.getElementById('game-canvas').style.backgroundColor = backgroundColor.value;
            hideAll();
            initialButtons.classList.remove("hidden");
            
        });
    
        localModeButton.addEventListener("click", function() {
            console.log("inside local");
            hideAll();
            const roomName = "local_" + new Date().getTime();
            console.log(roomName);
            hideAll();
            connectWebSocket(roomName, ballSpeed.value, paddleSpeed.value);
        });
    
        document.getElementById('three-players-btn').addEventListener('click', () => promptPlayerNames(3));
        document.getElementById('four-players-btn').addEventListener('click', () => promptPlayerNames(4));
        document.getElementById('five-players-btn').addEventListener('click', () => promptPlayerNames(5));
    
        function promptPlayerNames(numPlayers) {
            console.log("inside prompte player name")
            playerNames = [];
            for (let i = 1; i <= numPlayers; i++) {
                const playerName = prompt(`Player ${i} name:`);
                if (playerName) {
                    playerNames.push(playerName.trim());
                } else {
                    alert("Please enter a valid name.");
                    i--;
                }
            }
            for (let j = 0; j < numPlayers; j++) {
                console.log("player name :", playerNames[j]);
            }
            runTournament(playerNames);
        }
    
        localModeTournoi.addEventListener("click", function() {
            console.log("inside tournoi");
            hideAll();
            tournoiButtons.classList.remove("hidden");
        });
    
        async function runTournament(participants) {
            let round = 1;
        
            while (participants.length > 1) {
                console.log(`Round ${round}:`);
                let nextRoundParticipants = [];
        
                // Si le nombre de participants est impair, un participant avance automatiquement
                if (participants.length % 2 !== 0) {
                    let luckyParticipant = participants.pop();
                    nextRoundParticipants.push(luckyParticipant);
                    console.log(`${luckyParticipant} advances to the next round automatically`);
                }
        
                // Faire s'affronter les participants par paires
                for (let i = 0; i < participants.length; i += 2) {
                    let player1 = participants[i];
                    let player2 = participants[i + 1];
                    const roomName = `local_match_${player1}_vs_${player2}`.replace(/[^a-zA-Z0-9_]/g, '');
                    hideAll();
                    alert(`Round: ${round}  Match: ${player1} Vs ${player2}`);
                    await connectWebSocketTournoi(roomName, player1, player2, nextRoundParticipants, ballSpeed.value, paddleSpeed.value)
                }
        
                // Préparer les participants pour le prochain round
                participants = nextRoundParticipants;
                round++;
            }
        
            alert(`Tournament Winner: ${participants[0]}`);
            hideAll();
            showInitialMenu();
        }
        
        function drawGameTournoi(player1_name, player2_name) {
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
            context.fillText(`${player1_name}: ${scorePlayer1}`, 20, 30);
            context.fillText(`${player2_name}: ${scorePlayer2}`, canvas.width - 150, 30);
        }
        
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
        
        function updateGameTournoi(state, player1_name, player2_name) {
            player1Y = state.player1_y_position;
            player2Y = state.player2_y_position;
            ballX = state.ball_x_position;
            ballY = state.ball_y_position;
            scorePlayer1 = state.score_player1;
            scorePlayer2 = state.score_player2;
            drawGameTournoi(player1_name, player2_name);
        }
        
        function updateGame(state) {
            player1Y = state.player1_y_position;
            player2Y = state.player2_y_position;
            ballX = state.ball_x_position;
            ballY = state.ball_y_position;
            scorePlayer1 = state.score_player1;
            scorePlayer2 = state.score_player2;
            drawGame();
        }
        
        function connectWebSocket(roomName, ballSpeed, paddleSpeed) {
            if (socket) {
                socket.close();
            }
        
            socket = new WebSocket(`wss://localhost/ws/pong/${roomName}/`);
        
            socket.onopen = function(event) {
                console.log('Connected to the server');
                socket.send(JSON.stringify({
                    'type': 'config',
                    'ball_speed': ballSpeed,
                    'paddle_speed': paddleSpeed,
                }));
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
                    hideAll();
                    showInitialMenu();
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
        
        function connectWebSocketTournoi(roomName, player1_name, player2_name, nextRoundParticipants, ballSpeed, paddleSpeed) {
            if (socket) {
                socket.close();
            }
        
            return new Promise((resolve, reject) => {
                socket = new WebSocket(`wss://localhost/ws/pong/${roomName}/`);
        
                socket.onopen = function(event) {
                    console.log('Connected to the server');
                    socket.send(JSON.stringify({
                        'type': 'config',
                        'ball_speed': ballSpeed,
                        'paddle_speed': paddleSpeed,
                    }));
                };
        
                socket.onmessage = function(event) {
                    const data = JSON.parse(event.data);
                    if (data.type === 'game_state') {
                        updateGameTournoi(data, player1_name, player2_name);
                    } else if (data.type === 'start_game') {
                        console.log('The game has started!');
                    } else if (data.type === 'game_over') {
                        console.log("Fin de game");
                        let winner;
                        if (data.winner == 1) {
                            winner = player1_name;
                        } else {
                            winner = player2_name
                        }
                        alert(`${player1_name} vs ${player2_name} - Winner: ${winner}`);
                        nextRoundParticipants.push(winner);
                        socket.close();
                        socket = null;
                        hideAll();
                        resolve();
                    }
                };
        
                socket.onclose = function(event) {
                    console.log('Disconnected from the server');
                };
        
                socket.onerror = function(error) {
                    console.error(`WebSocket error: ${error.message}`);
                    reject(error);
                };
        
                document.addEventListener('keydown', function(event) {
                    keys[event.code] = true;
                    handleKeys();
                });
        
                document.addEventListener('keyup', function(event) {
                    keys[event.code] = false;
                });
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
    }
};

export { Game };



































// const Game = () => {
// 
    // console.log("Game component loaded");
    // let section = document.querySelector("#section");
    // if (section) {
        // section.innerHTML = 
    // `   <div class="frame-game-container d-none d-lg-flex">
            // <div class="frame-game">
                // <h1 class="title-game">Jeu du pong</h1>
            // </div>
        // </div>
// 
        // <div class="frame-game-container d-flex d-lg-none">
            // <div class="frame-game-sm">
                // <h1 class="title-game-sm">Jeu du pong</h1>
            // </div>
        // </div>
    // `; 
    // console.log("Section content:", section.innerHTML);
    // } else {
        // console.error("#section not found in the DOM");
    // }
// 
// };
// 
// export default Game;
// 