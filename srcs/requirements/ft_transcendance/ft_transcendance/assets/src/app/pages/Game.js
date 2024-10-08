import * as THREE from 'three';
import { checkAuth, post, get } from "../services/Api.js"

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`

const Game = async () => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
    `   
        <div class="game-container" id="game-container">
            <div class="score-container">
                <span id="score-player1" class="score-player">Player 1: 0</span>
                <span id="score-player2" class="score-player">Player 2: 0</span>
            </div>
            <canvas id="game-canvas" class="game-canvas"></canvas>
        <div class="button-container" id="initial-buttons">
            <button class="game-button" id="local-mode">Local</button>
            <button class="game-button" id="tournoi-mode">Tournoi</button>
        </div>
        <div class="button-container" id="settings">
            <div>
                <label for="ball-speed">Ball Speed:</label>
                <select id="ball-speed">
                <option value="20" class="value">Normal</option>
                    <option value="15" class="value">Slow</option>
                    <option value="25" class="value">Fast</option>
                </select>
            </div>
            <div>
                <label for="paddle-speed">Paddle Speed:</label>
                <select id="paddle-speed">
                <option value="7" class="value">Normal</option>
                    <option value="5" class="value">Slow</option>
                    <option value="10" class="value">Fast</option>
                </select>
            </div>
            <div>
                <label for="paddle-color">Paddle color:</label>
                <select id="paddle-color">
                    <option value="white" class="value">White</option>
                    <option value="orange" class="value">Orange</option>
                    <option value="black" class="value">Black</option>
                </select>
            </div>
            <div>
                <label for="ball-color">Ball color:</label>
                <select id="ball-color">
                    <option value="white" class="value">White</option>
                    <option value="orange" class="value">Orange</option>
                    <option value="black" class="value">Black</option>
                </select>
            </div>
            <div>
                <label for="ball-size">Ball size:</label>
                <select id="ball-size">
                    <option value="8" class="value">normal</option>
                    <option value="4" class="value">small</option>
                    <option value="30" class="value">big</option>
                </select>
            </div>
            <button class="game-button" id="start-game-btn">Start Game</button>
        </div>
        <div class="button-container" id="tournoi-buttons">
            <button class="game-button" id="three-players-btn">3 Players</button>
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
        const canvas = document.getElementById('game-canvas');
        const background_color = localStorage.getItem('backgroundClass');
        const ball_color = document.getElementById('ball-color');
        const paddle_color = document.getElementById('paddle-color');
        const ball_size = document.getElementById('ball-size');
        if (!canvas) {
            console.error('Failed to find the canvas element with ID game-canvas');
            return;
        }

        let player1Y, player2Y, ballX, ballY, socket, keys, playerNames, renderer, scene, camera, paddle1, paddle2, ball, tableWidth, tableHeight, scorePlayer1, scorePlayer2;
        let Player1_name;
        let gameEnd = false
        let paddle_color_ig
        let ball_color_ig
        let ball_size_ig
        let tournoiProgress = false
        let isInit = false
        // let olympicRings

        initializeGameVariables();
        showInitialMenu();

        async function initializeGameVariables() {
            if (isInit == true) return;
            isInit = true;
            player1Y = 0;
            player2Y = 0;
            ballX = 0;
            ballY = 0;
            socket = null;
            keys = {};
            playerNames = [];
            scorePlayer1 = 0;
            scorePlayer2 = 0;
            ball_color_ig = "black";
            paddle_color_ig = "white";
            ball_size_ig = 8
            try {
                const response = await get(`${usersUrl}/me/`)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                Player1_name = result.username;
            } catch (error) {
                console.error('Fetch error:', error);
                Player1_name = 'Unknown Player';
            }
            updateScores(scorePlayer1, scorePlayer2)
        }

        function hideAll() {
            initialButtons.classList.add("hidden");
            tournoiButtons.classList.add("hidden");
            settings.classList.add("hidden");
        }

        function showInitialMenu() {
            updateScores(0, 0);
            hideAll();
            settings.classList.remove("hidden");
        }

        // function addOlympicLogo() {
        //     const ringRadius = 50;
        //     const tubeRadius = 8;
        //     const segments = 64;
        //     const opacity = 0.8;
        //     const ringsData = [
        //         { color: 0x0081C8, position: [-80, 150, -200] },
        //         { color: 0x000000, position: [0, 150, -200] },
        //         { color: 0xEE334E, position: [80, 150, -200] },
        //         { color: 0xF4C300, position: [-40, 100, -200] },
        //         { color: 0x009F3D, position: [40, 100, -200] },
        //     ];
        
        //     const rings = [];
        //     ringsData.forEach(data => {
        //         const geometry = new THREE.TorusGeometry(ringRadius, tubeRadius, segments, segments);
        //         const material = new THREE.MeshPhongMaterial({ 
        //             color: data.color,
        //             transparent: true,
        //             opacity: opacity
        //         });
        //         const ring = new THREE.Mesh(geometry, material);
        //         ring.position.set(...data.position);
        //         scene.add(ring);
        //         rings.push(ring);
        //     });
        
        //     return rings;
        // }

        function drawInitialGame() {

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 0, 100);
            renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false });
            renderer.setSize(window.innerWidth, window.innerHeight);
            if (background_color == "bg-roland")
                renderer.setClearColor(0xa55318);
            else if(background_color == "bg-wimbledon")
                renderer.setClearColor(0x2b6e25);
            else
                renderer.setClearColor(0x4790C5);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(0, 500, 200);
            scene.add(directionalLight);

            tableWidth = 1200;
            tableHeight = 700;

            const paddleWidth = 10;
            const paddleHeight = 70;
            const paddleDepth = 10;
            const paddleMaterial = new THREE.MeshPhongMaterial({ color: paddle_color_ig });
            paddle1 = new THREE.Mesh(new THREE.BoxGeometry(paddleWidth, paddleDepth, paddleHeight), paddleMaterial);
            paddle2 = new THREE.Mesh(new THREE.BoxGeometry(paddleWidth, paddleDepth, paddleHeight), paddleMaterial);

            paddle1.position.set(-tableWidth / 2 + paddleWidth, paddleDepth / 2, 0);
            paddle2.position.set(tableWidth / 2 - paddleWidth, paddleDepth / 2, 0);
            scene.add(paddle1);
            scene.add(paddle2);

            const ballRadius = ball_size_ig;
            const ballMaterial = new THREE.MeshPhongMaterial({ color: ball_color_ig });
            ball = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 32, 32), ballMaterial);
            ball.position.set(0, ballRadius, 0);
            scene.add(ball);

            const barWidth = tableWidth;
            const barHeight = 10;
            const barDepth = 15;
            const barMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
            const topBar = new THREE.Mesh(new THREE.BoxGeometry(barWidth, barDepth, barHeight), barMaterial);
            const bottomBar = new THREE.Mesh(new THREE.BoxGeometry(barWidth, barDepth, barHeight), barMaterial);

            topBar.position.set(0, barDepth / 2, tableHeight / 2 + barHeight / 2);
            bottomBar.position.set(0, barDepth / 2, -tableHeight / 2 - barHeight / 2);

            scene.add(topBar);
            scene.add(bottomBar);

            const pointMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
            const pointGeometry = new THREE.BoxGeometry(10, 1, 10);
            const points = [];
            for (let i = -tableHeight / 2 + 20; i < tableHeight / 2; i += 40) {
                const point = new THREE.Mesh(pointGeometry, pointMaterial);
                point.position.set(0, 1, i);
                points.push(point);
                scene.add(point);
            }

            // olympicRings = addOlympicLogo();

            camera.position.set(0, 600, 500);
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            renderer.render(scene, camera);
        }

        startGameButton.addEventListener("click", function() {
            hideAll();
            ball_color_ig = ball_color.value;
            paddle_color_ig = paddle_color.value;
            ball_size_ig = ball_size.value;
            initialButtons.classList.remove("hidden");
            drawInitialGame();
        });

        localModeButton.addEventListener("click", function() {
            hideAll();
            const roomName = `room_${new Date().getTime()}_${Math.random().toString(36).substring(7)}`;
            connectWebSocket(roomName, ballSpeed.value, paddleSpeed.value);
        });

        document.getElementById('three-players-btn').addEventListener('click', () => promptPlayerNames(3));

        function promptPlayerNames(numPlayers) {
            playerNames = [];
            const maxLength = 10;
        
            for (let i = 1; i <= numPlayers; i++) {
                let playerName;
                let isUnique = false;
        
                while (!isUnique) {
                    playerName = prompt(`Player ${i} name (max ${maxLength} characters):`);
        
                    if (playerName === null) {
                        showInitialMenu();
                        return;
                    } else if (playerName.trim() === "") {
                        alert("Please enter a valid name.");
                    } else if (playerName.length > maxLength) {
                        alert(`Name too long! Please enter a name with a maximum of ${maxLength} characters.`);
                    } else if (playerNames.includes(playerName.trim())) {
                        alert("Name already taken! Please enter a unique name.");
                    } else {
                        isUnique = true;
                        playerNames.push(playerName.trim());
                    }
                }
            }
        
            for (let j = 0; j < playerNames.length; j++) {
            }
            runTournament(playerNames);
        }

        localModeTournoi.addEventListener("click", function() {
            hideAll();
            tournoiButtons.classList.remove("hidden");
        });

        async function runTournament(participants) {
            if (participants.length !== 3) {
                console.error("This function is designed for exactly 3 participants.");
                return;
            }
        
            tournoiProgress = true;
        
            const skipIndex = Math.floor(Math.random() * 3);
            const skipPlayer = participants[skipIndex];
            const remainingPlayers = participants.filter((_, index) => index !== skipIndex);
        
            let player1 = remainingPlayers[0];
            let player2 = remainingPlayers[1];
            let roomName = `room_${new Date().getTime()}_${Math.random().toString(36).substring(7)}`;
            hideAll();
            alert(`Round: 1  Match: ${player1} Vs ${player2}`);
            const winnerFirstMatch = await connectWebSocketTournoi(roomName, player1, player2, remainingPlayers, ballSpeed.value, paddleSpeed.value);
            if (!tournoiProgress) {
                location.reload();
                return;
            }
        
            roomName = `room_${new Date().getTime()}_${Math.random().toString(36).substring(7)}`;
            hideAll();
            alert(`Round: 2  Match: ${winnerFirstMatch} Vs ${skipPlayer}`);
            const finalWinner = await connectWebSocketTournoi(roomName, winnerFirstMatch, skipPlayer, [], ballSpeed.value, paddleSpeed.value);
            if (!tournoiProgress) {
                location.reload();
                return;
            }
        
            alert(`Tournament Winner: ${finalWinner}`);
            location.reload();
        }

        async function runFixedTournament(participants) {
            if (participants.length !== 3) {
                console.error("This function is designed for exactly 3 participants.");
                return;
            }
        
            let round = 1;
            tournoiProgress = true;
        
            // Tirer au sort le joueur qui saute le premier match
            const skipIndex = Math.floor(Math.random() * 3);
            const skipPlayer = participants[skipIndex];
            const remainingPlayers = participants.filter((_, index) => index !== skipIndex);
        
            // Premier match entre les deux joueurs restants
            let player1 = remainingPlayers[0];
            let player2 = remainingPlayers[1];
            let roomName = `room_${new Date().getTime()}_${Math.random().toString(36).substring(7)}`;
            hideAll();
            alert(`Round: ${round}  Match: ${player1} Vs ${player2}`);
            const winnerFirstMatch = await connectWebSocketTournoi(roomName, player1, player2, [], ballSpeed.value, paddleSpeed.value);
            if (!tournoiProgress) {
                location.reload();
                return;
            }
        
            // Le gagnant du premier match affronte le joueur qui a sauté
            roomName = `room_${new Date().getTime()}_${Math.random().toString(36).substring(7)}`;
            hideAll();
            alert(`Round: ${round + 1}  Match: ${winnerFirstMatch} Vs ${skipPlayer}`);
            const finalWinner = await connectWebSocketTournoi(roomName, winnerFirstMatch, skipPlayer, [], ballSpeed.value, paddleSpeed.value);
            if (!tournoiProgress) {
                location.reload();
                return;
            }
        
            // Déterminer le gagnant final
            alert(`Tournament Winner: ${finalWinner}`);
            location.reload();
        }


        function connectWebSocket(roomName, ballSpeed, paddleSpeed) {
            if (socket) {
                socket.close();
            }

            gameEnd = false
            socket = new WebSocket(`wss://${window.location.host}/ws/pong/${roomName}/`);

            socket.onopen = function(event) {
                socket.send(JSON.stringify({
                    'type': 'config',
                    'ball_speed': ballSpeed,
                    'paddle_speed': paddleSpeed,
                    'ball_size': ball_size_ig,
                }));
                socket.send(JSON.stringify({
                    'type': 'start_ball'
                }))
            };

            socket.onmessage = async function(event) {
                const data = JSON.parse(event.data);
                if (data.type === 'game_state') {
                    updateGame(data);
                } else if (data.type === 'game_over') {
                    gameEnd = true
                    if (scorePlayer1 == 3)
                        alert(`Player 1 wins!`);
                    else
                        alert(`Player 2 wins!`);
                    let fecth_data_history = {
                        winner_username: '',
                        loser_username: '',
                        winner_score: 0,
                        loser_score: 0,
                        perfect: false,
                        local_game: true
                    };
                    if (data.winner == 1) {
                        fecth_data_history.winner_username = Player1_name
                        fecth_data_history.loser_username = "Player2"
                        fecth_data_history.winner_score = data.score_player1
                        fecth_data_history.loser_score = data.score_player2
                        if (data.score_player2 == 0) {
                            fecth_data_history.perfect = true
                        }
                    }
                    else {
                        fecth_data_history.winner_username  = "Player2"
                        fecth_data_history.loser_username = Player1_name
                        fecth_data_history.winner_score = data.score_player2
                        fecth_data_history.loser_score = data.score_player1
                        if (data.score_player1 == 0) {
                            fecth_data_history.perfect = true
                        }
                    }
                    try {
                        const response = await post(`${usersUrl}/game-history/`, fecth_data_history);
                
                        const result = await response.json();
                
                        if (response.ok) {
                        } else {
                            console.error('Error updating game history:', result);
                        }
                    } catch (error) {
                        console.error('Fetch error:', error);
                    }

                    setTimeout(() => {
                    }, delay);
                    
                    closeSocketWithDelay(500)

                }
            };

            socket.onclose = function(event) {
                resetKeys();
                location.reload();
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

        function closeSocketWithDelay(delay = 500) {
            if (socket) {
                setTimeout(() => {
                    socket.close();
                    socket = null;
                }, delay);
            }
        }

        function connectWebSocketTournoi(roomName, player1_name, player2_name, nextRoundParticipants, ballSpeed, paddleSpeed) {
            if (socket) {
                socket.close();
            }

            gameEnd = false
            return new Promise((resolve, reject) => {
                socket = new WebSocket(`wss://${window.location.host}/ws/pong/${roomName}/`);

                socket.onopen = function(event) {
                    socket.send(JSON.stringify({
                        'type': 'config',
                        'ball_speed': ballSpeed,
                        'paddle_speed': paddleSpeed,
                        'ball_size': ball_size_ig,
                    }));
                };

                socket.onmessage = function(event) {
                    const data = JSON.parse(event.data);
                    if (data.type === 'game_state') {
                        updateGameTournoi(data, player1_name, player2_name);
                    } else if (data.type === 'game_over') {
                        gameEnd = true
                        let winner;
                        if (data.winner == 1) {
                            winner = player1_name;
                        } else {
                            winner = player2_name;
                        }
                        alert(`${player1_name} vs ${player2_name} - Winner: ${winner}`);
                        nextRoundParticipants.push(winner);
                        socket.close();
                        socket = null;
                        hideAll();
                        resolve(winner); 
                    }
                };

                socket.onclose = function(event) {
                    resetKeys();
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
                    resetKeys()
                });
            });
        }

        function handleKeys() {
            if (socket && socket.readyState === WebSocket.OPEN && gameEnd === false) {
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

        function updateGameTournoi(state, player1_name, player2_name) {
            player1Y = state.player1_y_position;
            player2Y = state.player2_y_position;
            ballX = state.ball_x_position;
            ballY = state.ball_y_position;
            scorePlayer1 = state.score_player1;
            scorePlayer2 = state.score_player2;
            updateScoresTournoi(scorePlayer1, scorePlayer2, player1_name, player2_name);
            drawGame();
        }

        function updateGame(state) {
            player1Y = state.player1_y_position;
            player2Y = state.player2_y_position;
            ballX = state.ball_x_position;
            ballY = state.ball_y_position;
            scorePlayer1 = state.score_player1;
            scorePlayer2 = state.score_player2;
            updateScores(scorePlayer1, scorePlayer2);
            drawGame();
        }

        function updateScores(score1, score2) {
            document.getElementById('score-player1').textContent = `${Player1_name}: ${score1}`;
            document.getElementById('score-player2').textContent = `Invité: ${score2}`;
        }

        function updateScoresTournoi(score1, score2, player1_tournoi_name, player2_tournoi_name) {
            document.getElementById('score-player1').textContent = `${player1_tournoi_name}: ${score1}`;
            document.getElementById('score-player2').textContent = `${player2_tournoi_name}: ${score2}`;
        }

        function drawGame() {
            renderer.render(scene, camera);
            paddle1.position.z = player1Y;
            paddle2.position.z = player2Y;
            ball.position.x = ballX;
            ball.position.z = ballY;
            renderer.render(scene, camera);
        }

        function gameLoop() {
            handleKeys();
            requestAnimationFrame(gameLoop);
        }

        gameLoop();

        function resetKeys() {
            keys = {};
        }

        function resetGameState() {
            player1Y = 0;
            player2Y = 0;
            ballX = 0;
            ballY = 0;
            scorePlayer1 = 0;
            scorePlayer2 = 0;
            gameEnd = false;
            tournoiProgress = false
            isInit = false
            updateScores(scorePlayer1, scorePlayer2);
        }

        // window.addEventListener('resize', () => {
        //     const width = window.innerWidth;
        //     const height = window.innerHeight;
            
        //     // Maj taille du canvas
        //     canvas.width = width;
        //     canvas.height = height;
            
        //     // Maj du renderer   
        //     renderer.setSize(width, height);

        //     // Maj paramètres de la caméra
        //     camera.aspect = width / height;
        //     camera.updateProjectionMatrix();
            
        //     renderer.render(scene, camera);
        // });

        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Mettre à jour la taille du canvas
            canvas.width = width;
            canvas.height = height;
            
            // Mettre à jour le style CSS du canvas
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            
            // Vérifier si renderer est défini avant d'essayer d'appeler setSize
            if (renderer) {
                // Mettre à jour le renderer
                renderer.setSize(width, height);
            }
        
            // Vérifier si camera est défini avant d'essayer de mettre à jour la matrice de projection
            if (camera) {
                // Mettre à jour les paramètres de la caméra
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        
            // Vérifier si scene et renderer sont définis avant d'essayer de rendre la scène
            if (scene && renderer) {
                renderer.render(scene, camera);
            }
        });

        function handlePopState() {
            if (socket) {
                resetGameState()
                socket.close();
            }
            cleanUpEvents();
        }

        function handleHashChange() {
            if (location.hash === "#/game") {
                Game();
            } else {
                if (socket) {
                    resetGameState();
                    socket.close();
                }
                cleanUpEvents();
            }
        }

        window.addEventListener('popstate', handlePopState);
        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('unload', cleanUpEvents);

        function cleanUpEvents() {
            document.removeEventListener('keydown', handleKeys);
            document.removeEventListener('keyup', handleKeys);
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('unload', cleanUpEvents);
        }
    }
};  

export { Game };