const Game = () => {
    console.log("CanvaGame component loaded");
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
    `   
        <div class="game-container" id="game-container">
            <canvas class="game-canvas" id="game-canvas"></canvas>
            <div class="button-container initial-buttons" id="initial-buttons">
                <button class="game-button" id="local-mode">Local</button>
                <button class="game-button" id="tournoi-mode">Tournoi</button>
            </div>
            <div class="button-container tournoi-buttons" id="tournoi-buttons">
                <button class="game-button" id="three-players-btn">3 Players</button>
                <button class="game-button" id="four-players-btn">4 Players</button>
                <button class="game-button" id="five-players-btn">5 Players</button>
            </div>
            <div class="session-name-input hidden" id="session-name-input">
                <input type="text" class="session-name" id="session-name" placeholder="Nom de la session">
                <button class="game-button submit-btn" id="submit-session-name">Submit</button>
            </div>
            <div id="player-names" style="display: none;">
                <form id="player-names-form"></form>
                <button id="submit-players-btn">Submit</button>
            </div>
        </div>
    `;

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

        // Menu Functions
        const initialButtons = document.getElementById("initial-buttons");
        const tournoiButtons = document.getElementById("tournoi-buttons");
        const sessionNameInput = document.getElementById("session-name-input");
        const localModeButton = document.getElementById("local-mode");
        const localModeTournoi = document.getElementById("tournoi-mode");
        const playerNamesDiv = document.getElementById('player-names');
        const playerNamesForm = document.getElementById('player-names-form');
        const submitPlayersButton = document.getElementById('submit-players-btn');
        const submitSessionNameButton = document.getElementById("submit-session-name");
        const sessionName = document.getElementById("session-name");

        let playerNames = [];
        let currentMatchIndex = 0;

        function hideAll() {
            initialButtons.classList.add("hidden");
            tournoiButtons.classList.add("hidden");
            playerNamesDiv.style.display = 'none';
            sessionNameInput.style.display = 'none';
        }

        function showInitialMenu() {
            sessionName.value = "";
            drawInitialGame();
            hideAll();
            initialButtons.classList.remove("hidden");
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

        localModeButton.addEventListener("click", function() {
            console.log("inside local");
            hideAll();
            sessionNameInput.style.display = 'flex';
            submitSessionNameButton.onclick = function() {
                const roomName = "local_" + sessionName.value;
                console.log("inside input");
                if (roomName) {
                    hideAll();
                    connectWebSocket(roomName);
                }
            };
        });

        document.getElementById('three-players-btn').addEventListener('click', () => promptPlayerNames(3));
        document.getElementById('four-players-btn').addEventListener('click', () => promptPlayerNames(4));
        document.getElementById('five-players-btn').addEventListener('click', () => promptPlayerNames(5));

        submitPlayersButton.addEventListener('click', function() {
            players = [];
            const formData = new FormData(playerNamesForm);
            for (let [name, value] of formData.entries()) {
                players.push(value);
            }
            if (players.length < 2) {
                alert('Please enter names for all players.');
                return;
            }
            hideAll();
            startTournament();
        });

        function promptPlayerNames(numPlayers) {
            console.log("inside prompte player name");
            playerNames = [];
            for (let i = 1; i <= numPlayers; i++) {
                const playerName = prompt(`Player ${i} name:`);
                if (playerName) {
                    playerNames.push(playerName.trim());
                } else {
                    alert("Please enter a valid name.");
                    i--; // Repeat the prompt for this player
                }
            }
            startTournament(playerNames);
        }

        localModeTournoi.addEventListener("click", function() {
            console.log("inside tournoi");
            hideAll();
            tournoiButtons.classList.remove("hidden");
        });

        function startTournament(players) {
            if (players.length <= 1) {
                alert(`Tournament Over! Winner: ${players[0]}`);
                showInitialMenu();
                return;
            }
            currentMatchIndex = 0;
            nextMatch(currentMatchIndex);
        }

        function nextMatch(currentMatchIndex) {
            if (playerNames.length <= 1) {
                alert(`Tournament is Over! Winner: ${playerNames[0]}`);
                showInitialMenu();
                return;
            }

            const player1 = playerNames[currentMatchIndex];
            const player2 = playerNames[(currentMatchIndex + 1) % playerNames.length];

            alert(`Next Match: ${player1} vs ${player2}`);
            currentMatchIndex += 1;
            const roomName = "local_" + `match_${currentMatchIndex}`;
            hideAll();
            connectWebSocket(roomName);
        }

        window.hideAll = hideAll;
        window.showInitialMenu = showInitialMenu;
    } else {
        console.error("#section not found in the DOM");
    }
};

export default Game;



































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