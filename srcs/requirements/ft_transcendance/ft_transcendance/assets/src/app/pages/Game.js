import { checkAuth } from "../services/Api.js";
import * as THREE from 'three';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

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
        if (!canvas) {
            console.error('Failed to find the canvas element with ID game-canvas');
            return;
        }
        
        let player1Y, player2Y, ballX, ballY, socket, keys, playerNames, renderer, scene, camera, paddle1, paddle2, ball, tableWidth, tableHeight, scorePlayer1, scorePlayer2;
        let scorePlayer1Text, scorePlayer2Text, font;

        initializeGameVariables();
        showInitialMenu();
        // loadFontAndStart();

        function initializeGameVariables() {
            player1Y = 0;
            player2Y = 0;
            ballX = 0;
            ballY = 0;
            socket = null;
            keys = {};
            playerNames = [];
            scorePlayer1 = 0;
            scorePlayer2 = 0;
        }

        // function loadFontAndStart() {
        //     const fontLoader = new FontLoader();
        //     fontLoader.load('../../fonts/Julius_Sans_One/helvetiker_regular.typeface.json', function (loadedFont) {
        //         font = loadedFont; // Assigner la police chargée
        //         showInitialMenu();
        //     });
        // }

        function hideAll() {
            initialButtons.classList.add("hidden");
            tournoiButtons.classList.add("hidden");
            settings.classList.add("hidden");
        }

        function showInitialMenu() {
            drawInitialGame();
            hideAll();
            settings.classList.remove("hidden");
        }

        function drawInitialGame() {
            console.log("Dans init game")
            // if (!font) {
            //     console.error("Font not loaded yet");
            //     return;
            // }

            // Initialiser Three.js
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ canvas: canvas });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000);

            // Lumière ambiante
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Couleur blanche, faible intensité
            scene.add(ambientLight);

            // Lumière directionnelle principale
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(0, 500, 200); // Positionner la lumière au-dessus et devant la scène
            scene.add(directionalLight);

            // Lumières ponctuelles aux coins du terrain
            const pointLight1 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
            pointLight1.position.set(-tableWidth / 2, 50, -tableHeight / 2);
            scene.add(pointLight1);

            const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
            pointLight2.position.set(tableWidth / 2, 50, -tableHeight / 2);
            scene.add(pointLight2);

            const pointLight3 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
            pointLight3.position.set(-tableWidth / 2, 50, tableHeight / 2);
            scene.add(pointLight3);

            const pointLight4 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
            pointLight4.position.set(tableWidth / 2, 50, tableHeight / 2);
            scene.add(pointLight4);

            // Lumières spot pour les effets dramatiques
            const spotLight1 = new THREE.SpotLight(0xffffff, 0.7, 0, Math.PI / 4, 0.5, 2);
            spotLight1.position.set(0, 300, 0);
            spotLight1.target.position.set(0, 0, 0);
            scene.add(spotLight1);
            scene.add(spotLight1.target);

            const spotLight2 = new THREE.SpotLight(0xffffff, 0.7, 0, Math.PI / 4, 0.5, 2);
            spotLight2.position.set(0, 300, 0);
            spotLight2.target.position.set(0, 0, tableHeight / 2);
            scene.add(spotLight2);
            scene.add(spotLight2.target);

            tableWidth = 1200; // Largeur de la table en unités Three.js
            tableHeight = 700; // Hauteur de la table en unités Three.js

            // Ajouter les raquettes
            const paddleWidth = 10;
            const paddleHeight = 70;
            const paddleDepth = 10;
            const paddleMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
            paddle1 = new THREE.Mesh(new THREE.BoxGeometry(paddleWidth, paddleDepth, paddleHeight), paddleMaterial);
            paddle2 = new THREE.Mesh(new THREE.BoxGeometry(paddleWidth, paddleDepth, paddleHeight), paddleMaterial);

            // Positionner les raquettes
            paddle1.position.set(-tableWidth / 2 + paddleWidth, paddleDepth / 2, 0);
            paddle2.position.set(tableWidth / 2 - paddleWidth, paddleDepth / 2, 0);
            scene.add(paddle1);
            scene.add(paddle2);

            // Ajouter la balle
            const ballRadius = 5;
            const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
            ball = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 32, 32), ballMaterial);
            ball.position.set(0, ballRadius, 0);
            scene.add(ball);

            // Ajouter les barres de délimitation
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

            // Ajouter les points de la ligne du milieu
            const pointMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
            const pointGeometry = new THREE.BoxGeometry(10, 1, 10);
            const points = [];
            for (let i = -tableHeight / 2 + 20; i < tableHeight / 2; i += 40) {
                const point = new THREE.Mesh(pointGeometry, pointMaterial);
                point.position.set(0, 1, i);
                points.push(point);
                scene.add(point);
            }

            // const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

            // const scorePlayer1Geometry = new TextGeometry('0', {
            //     font: font,
            //     size: 40,
            //     height: 5,
            // });
            // scorePlayer1Text = new THREE.Mesh(scorePlayer1Geometry, textMaterial);
            // scorePlayer1Text.position.set(-tableWidth / 4, 50, 0);
            // // scorePlayer1Text.rotation.x = -Math.PI / 4; // Incliner le texte vers la caméra
            // scene.add(scorePlayer1Text);

            // const scorePlayer2Geometry = new TextGeometry('0', {
            //     font: font,
            //     size: 40,
            //     height: 5,
            // });
            // scorePlayer2Text = new THREE.Mesh(scorePlayer2Geometry, textMaterial);
            // scorePlayer2Text.position.set(tableWidth / 4, 50, 0);
            // // scorePlayer2Text.rotation.x = -Math.PI / 4; // Incliner le texte vers la caméra
            // scene.add(scorePlayer2Text);

            // Position de la caméra
            camera.position.set(0, 600, 500);
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            renderer.render(scene, camera);
        }

        startGameButton.addEventListener("click", function() {
            document.getElementById('game-canvas').style.backgroundColor = backgroundColor.value;
            hideAll();
            initialButtons.classList.remove("hidden");
        });

        localModeButton.addEventListener("click", function() {
            console.log("inside local");
            hideAll();
            const roomName = "local_" + new Date().getTime();
            console.log(roomName);
            connectWebSocket(roomName, ballSpeed.value, paddleSpeed.value);
        });

        document.getElementById('three-players-btn').addEventListener('click', () => promptPlayerNames(3));
        document.getElementById('four-players-btn').addEventListener('click', () => promptPlayerNames(4));
        document.getElementById('five-players-btn').addEventListener('click', () => promptPlayerNames(5));

        function promptPlayerNames(numPlayers) {
            console.log("inside prompte player name");
            playerNames = [];
            for (let i = 1; i <= numPlayers; i++) {
                const playerName = prompt(`Player ${i} name:`);
                if (playerName === null) {
                    console.log("Player input cancelled. Tournament not started.");
                    showInitialMenu();
                    return;
                } else if (playerName.trim() === "") {
                    alert("Please enter a valid name.");
                    i--; // Redemander le nom si la saisie est vide
                } else {
                    playerNames.push(playerName.trim());
                }
            }
            for (let j = 0; j < numPlayers; j++) {
                console.log("player name:", playerNames[j]);
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
                    await connectWebSocketTournoi(roomName, player1, player2, nextRoundParticipants, ballSpeed.value, paddleSpeed.value);
                }

                // Préparer les participants pour le prochain round
                participants = nextRoundParticipants;
                round++;
            }

            alert(`Tournament Winner: ${participants[0]}`);
            hideAll();
            showInitialMenu();
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
                    'table_width': tableWidth,
                    'table_height': tableHeight,
                }));
                socket.send(JSON.stringify({
                    'type': 'start_ball'
                }))
            };

            socket.onmessage = function(event) {
                const data = JSON.parse(event.data);
                if (data.type === 'game_state') {
                    updateGame(data);
                    // updateScores(state.score_player1, state.score_player2)
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
                        'table_width': tableWidth,
                        'table_height': tableHeight,
                    }));
                };

                socket.onmessage = function(event) {
                    const data = JSON.parse(event.data);
                    if (data.type === 'game_state') {
                        updateGameTournoi(data, player1_name, player2_name);
                        // updateScores(state.score_player1, state.score_player2)
                    } else if (data.type === 'start_game') {
                        console.log('The game has started!');
                    } else if (data.type === 'game_over') {
                        console.log("Fin de game");
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

        function updateGameTournoi(state, player1_name, player2_name) {
            player1Y = state.player1_y_position;
            player2Y = state.player2_y_position;
            ballX = state.ball_x_position;
            ballY = state.ball_y_position;
            scorePlayer1 = state.score_player1;
            scorePlayer2 = state.score_player2;
            updateScores(scorePlayer1, scorePlayer2);
            drawGameTournoi(player1_name, player2_name);
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
            // Mettre à jour les scores
            // scene.remove(scorePlayer1Text);
            // scene.remove(scorePlayer2Text);

            // const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

            // const scorePlayer1Geometry = new TextGeometry(score1.toString(), {
            //     font: font,
            //     size: 40,
            //     height: 5,
            // });
            // scorePlayer1Text = new THREE.Mesh(scorePlayer1Geometry, textMaterial);
            // scorePlayer1Text.position.set(-tableWidth / 4, 50, 0);
            // // scorePlayer1Text.rotation.x = -Math.PI / 4;
            // scene.add(scorePlayer1Text);

            // const scorePlayer2Geometry = new TextGeometry(score2.toString(), {
            //     font: font,
            //     size: 40,
            //     height: 5,
            // });
            // scorePlayer2Text = new THREE.Mesh(scorePlayer2Geometry, textMaterial);
            // scorePlayer2Text.position.set(tableWidth / 4, 50, 0);
            // // scorePlayer2Text.rotation.x = -Math.PI / 4;
            // scene.add(scorePlayer2Text);
        }

        function drawGameTournoi(player1_name, player2_name) {
            renderer.render(scene, camera);
            // Update paddle and ball positions
            paddle1.position.z = player1Y;
            paddle2.position.z = player2Y;
            ball.position.x = ballX;
            ball.position.z = ballY;
            renderer.render(scene, camera);
        }

        function drawGame() {
            renderer.render(scene, camera);
            // Update paddle and ball positions
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