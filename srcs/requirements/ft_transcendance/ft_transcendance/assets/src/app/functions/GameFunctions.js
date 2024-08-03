// import * as THREE from 'three';
// import { checkAuth, post, get } from "../services/Api.js"

// const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`



//         export const  initializeGameVariables = async () => {
//             player1Y = 0;
//             player2Y = 0;
//             ballX = 0;
//             ballY = 0;
//             socket = null;
//             keys = {};
//             playerNames = [];
//             scorePlayer1 = 0;
//             scorePlayer2 = 0;
//             try {
//                 const response = await get(`${usersUrl}/me/`)
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const result = await response.json();
//                 console.log(result);
//                 Player1_name = result.username;
//                 console.log(Player1_name)
//             } catch (error) {
//                 console.error('Fetch error:', error);
//                 Player1_name = 'Unknown Player';
//             }
//             updateScores(scorePlayer1, scorePlayer2)
//         }

//         export function hideAll() {
//             initialButtons.classList.add("hidden");
//             tournoiButtons.classList.add("hidden");
//             settings.classList.add("hidden");
//         }

//         export function showInitialMenu() {
//             drawInitialGame();
//             updateScores(0, 0);
//             hideAll();
//             settings.classList.remove("hidden");
//         }

//         export function drawInitialGame() {

//             // Initialiser Three.js
//             scene = new THREE.Scene();
//             camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//             camera.position.set(0, 0, 100);
//             renderer = new THREE.WebGLRenderer({ canvas: canvas });
//             renderer.setSize(window.innerWidth, window.innerHeight);
//             renderer.setClearColor(0x4790c5);


//             // Lumière ambiante
//             const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Couleur blanche, faible intensité
//             scene.add(ambientLight);

//             // Lumière directionnelle principale
//             const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//             directionalLight.position.set(0, 500, 200); // Positionner la lumière au-dessus et devant la scène
//             scene.add(directionalLight);

//             // Lumières ponctuelles aux coins du terrain
//             const pointLight1 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
//             pointLight1.position.set(-tableWidth / 2, 50, -tableHeight / 2);
//             scene.add(pointLight1);

//             const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
//             pointLight2.position.set(tableWidth / 2, 50, -tableHeight / 2);
//             scene.add(pointLight2);

//             const pointLight3 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
//             pointLight3.position.set(-tableWidth / 2, 50, tableHeight / 2);
//             scene.add(pointLight3);

//             const pointLight4 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
//             pointLight4.position.set(tableWidth / 2, 50, tableHeight / 2);
//             scene.add(pointLight4);

//             // Lumières spot pour les effets dramatiques
//             const spotLight1 = new THREE.SpotLight(0xffffff, 0.7, 0, Math.PI / 4, 0.5, 2);
//             spotLight1.position.set(0, 300, 0);
//             spotLight1.target.position.set(0, 0, 0);
//             scene.add(spotLight1);
//             scene.add(spotLight1.target);

//             const spotLight2 = new THREE.SpotLight(0xffffff, 0.7, 0, Math.PI / 4, 0.5, 2);
//             spotLight2.position.set(0, 300, 0);
//             spotLight2.target.position.set(0, 0, tableHeight / 2);
//             scene.add(spotLight2);
//             scene.add(spotLight2.target);

//             tableWidth = 1200; // Largeur de la table en unités Three.js
//             tableHeight = 700; // Hauteur de la table en unités Three.js

//             // Ajouter les raquettes
//             const paddleWidth = 10;
//             const paddleHeight = 70;
//             const paddleDepth = 10;
//             const paddleMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
//             paddle1 = new THREE.Mesh(new THREE.BoxGeometry(paddleWidth, paddleDepth, paddleHeight), paddleMaterial);
//             paddle2 = new THREE.Mesh(new THREE.BoxGeometry(paddleWidth, paddleDepth, paddleHeight), paddleMaterial);

//             // Positionner les raquettes
//             paddle1.position.set(-tableWidth / 2 + paddleWidth, paddleDepth / 2, 0);
//             paddle2.position.set(tableWidth / 2 - paddleWidth, paddleDepth / 2, 0);
//             scene.add(paddle1);
//             scene.add(paddle2);

//             // Ajouter la balle
//             const ballRadius = 5;
//             const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
//             ball = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 32, 32), ballMaterial);
//             ball.position.set(0, ballRadius, 0);
//             scene.add(ball);

//             // Ajouter les barres de délimitation
//             const barWidth = tableWidth;
//             const barHeight = 10;
//             const barDepth = 15;
//             const barMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
//             const topBar = new THREE.Mesh(new THREE.BoxGeometry(barWidth, barDepth, barHeight), barMaterial);
//             const bottomBar = new THREE.Mesh(new THREE.BoxGeometry(barWidth, barDepth, barHeight), barMaterial);

//             topBar.position.set(0, barDepth / 2, tableHeight / 2 + barHeight / 2);
//             bottomBar.position.set(0, barDepth / 2, -tableHeight / 2 - barHeight / 2);

//             scene.add(topBar);
//             scene.add(bottomBar);

//             // Ajouter les points de la ligne du milieu
//             const pointMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
//             const pointGeometry = new THREE.BoxGeometry(10, 1, 10);
//             const points = [];
//             for (let i = -tableHeight / 2 + 20; i < tableHeight / 2; i += 40) {
//                 const point = new THREE.Mesh(pointGeometry, pointMaterial);
//                 point.position.set(0, 1, i);
//                 points.push(point);
//                 scene.add(point);
//             }

//             // Position de la caméra
//             camera.position.set(0, 600, 500);
//             camera.lookAt(new THREE.Vector3(0, 0, 0));

//             renderer.render(scene, camera);
//         }

       

//         export function promptPlayerNames(numPlayers) {
//             console.log("inside prompte player name");
//             playerNames = [];
//             for (let i = 1; i <= numPlayers; i++) {
//                 const playerName = prompt(`Player ${i} name:`);
//                 if (playerName === null) {
//                     console.log("Player input cancelled. Tournament not started.");
//                     showInitialMenu();
//                     return;
//                 } else if (playerName.trim() === "") {
//                     alert("Please enter a valid name.");
//                     i--; // Redemander le nom si la saisie est vide
//                 } else {
//                     playerNames.push(playerName.trim());
//                 }
//             }
//             for (let j = 0; j < numPlayers; j++) {
//                 console.log("player name:", playerNames[j]);
//             }
//             runTournament(playerNames);
//         }


//         export const runTournament = async (participants) => {
//             let round = 1;

//             while (participants.length > 1) {
//                 console.log(`Round ${round}:`);
//                 let nextRoundParticipants = [];

//                 // Si le nombre de participants est impair, un participant avance automatiquement
//                 if (participants.length % 2 !== 0) {
//                     let luckyParticipant = participants.pop();
//                     nextRoundParticipants.push(luckyParticipant);
//                     console.log(`${luckyParticipant} advances to the next round automatically`);
//                 }

//                 // Faire s'affronter les participants par paires
//                 for (let i = 0; i < participants.length; i += 2) {
//                     let player1 = participants[i];
//                     let player2 = participants[i + 1];
//                     const roomName = `local_match_${player1}_vs_${player2}`.replace(/[^a-zA-Z0-9_]/g, '');
//                     hideAll();
//                     alert(`Round: ${round}  Match: ${player1} Vs ${player2}`);
//                     await connectWebSocketTournoi(roomName, player1, player2, nextRoundParticipants, ballSpeed.value, paddleSpeed.value);
//                 }

//                 // Préparer les participants pour le prochain round
//                 participants = nextRoundParticipants;
//                 round++;
//             }

//             alert(`Tournament Winner: ${participants[0]}`);
//             location.reload();
//         }




//         export function connectWebSocket(roomName, ballSpeed, paddleSpeed) {
//             if (socket) {
//                 socket.close();
//             }

//             gameEnd = false

//             socket = new WebSocket(`wss://localhost/ws/pong/${roomName}/`);

//             socket.onopen = function(event) {
//                 console.log('Connected to the server');
//                 socket.send(JSON.stringify({
//                     'type': 'config',
//                     'ball_speed': ballSpeed,
//                     'paddle_speed': paddleSpeed,
//                 }));
//                 socket.send(JSON.stringify({
//                     'type': 'start_ball'
//                 }))
//             };

//             socket.onmessage = async function(event) {
//                 const data = JSON.parse(event.data);
//                 if (data.type === 'game_state') {
//                     updateGame(data);
//                 } else if (data.type === 'start_game') {
//                     console.log('The game has started!');
//                 } else if (data.type === 'game_over') {
//                     gameEnd = true
//                     console.log("Fin de game");
//                     alert(`Player ${data.winner} wins!`);
//                     let fecth_data_history = {
//                         winner_username: '',
//                         loser_username: '',
//                         winner_score: 0,
//                         loser_score: 0,
//                         perfect: false,
//                         local_game: true
//                     };
//                     console.log(data);
//                     if (data.winner == 1) {
//                         fecth_data_history.winner_username = Player1_name
//                         fecth_data_history.loser_username = "Player2"
//                         fecth_data_history.winner_score = data.score_player1
//                         fecth_data_history.loser_score = data.score_player2
//                         if (data.score_player2 == 0) {
//                             fecth_data_history.perfect = true
//                         }
//                     }
//                     else {
//                         fecth_data_history.winner_username  = "Player2"
//                         fecth_data_history.loser_username = Player1_name
//                         fecth_data_history.winner_score = data.score_player2
//                         fecth_data_history.loser_score = data.score_player1
//                         if (data.score_player1 == 0) {
//                             fecth_data_history.perfect = true
//                         }
//                     }
//                     console.log(fecth_data_history)
//                     try {
//                         const response = await post(`${usersUrl}/game-history/`, fecth_data_history);
                
//                         const result = await response.json();
                
//                         if (response.ok) {
//                             console.log('Game history updated successfully:', result);
//                         } else {
//                             console.error('Error updating game history:', result);
//                         }
//                     } catch (error) {
//                         console.error('Fetch error:', error);
//                     }

//                     closeSocketWithDelay(500)

//                     location.reload();
//                 }
//             };

//             socket.onclose = function(event) {
//                 console.log('Disconnected from the server');
//             };

//             socket.onerror = function(error) {
//                 console.error(`WebSocket error: ${error.message}`);
//             };

//             document.addEventListener('keydown', function(event) {
//                 keys[event.code] = true;
//                 handleKeys();
//             });

//             document.addEventListener('keyup', function(event) {
//                 keys[event.code] = false;
//             });
//         }

//         function closeSocketWithDelay(delay = 500) {
//             if (socket) {
//                 setTimeout(() => {
//                     socket.close();
//                     socket = null;
//                 }, delay);
//             }
//         }

//         function connectWebSocketTournoi(roomName, player1_name, player2_name, nextRoundParticipants, ballSpeed, paddleSpeed) {
//             if (socket) {
//                 socket.close();
//             }

//             gameEnd = false
//             return new Promise((resolve, reject) => {
//                 socket = new WebSocket(`wss://localhost/ws/pong/${roomName}/`);

//                 socket.onopen = function(event) {
//                     console.log('Connected to the server');
//                     socket.send(JSON.stringify({
//                         'type': 'config',
//                         'ball_speed': ballSpeed,
//                         'paddle_speed': paddleSpeed,
//                     }));
//                 };

//                 socket.onmessage = function(event) {
//                     const data = JSON.parse(event.data);
//                     if (data.type === 'game_state') {
//                         updateGameTournoi(data, player1_name, player2_name);
//                     } else if (data.type === 'start_game') {
//                         console.log('The game has started!');
//                     } else if (data.type === 'game_over') {
//                         console.log("Fin de game");
//                         gameEnd = true
//                         let winner;
//                         if (data.winner == 1) {
//                             winner = player1_name;
//                         } else {
//                             winner = player2_name;
//                         }
//                         alert(`${player1_name} vs ${player2_name} - Winner: ${winner}`);
//                         nextRoundParticipants.push(winner);
//                         socket.close();
//                         socket = null;
//                         hideAll();
//                         resolve();
//                     }
//                 };

//                 socket.onclose = function(event) {
//                     console.log('Disconnected from the server');
//                 };

//                 socket.onerror = function(error) {
//                     console.error(`WebSocket error: ${error.message}`);
//                     reject(error);
//                 };

//                 document.addEventListener('keydown', function(event) {
//                     keys[event.code] = true;
//                     handleKeys();
//                 });

//                 document.addEventListener('keyup', function(event) {
//                     keys[event.code] = false;
//                 });
//             });
//         }

//         function handleKeys() {
//             if (socket && socket.readyState === WebSocket.OPEN && gameEnd === false) {
//                 if (keys['ArrowUp']) {
//                     socket.send(JSON.stringify({ 'type': 'move', 'player': 2, 'direction': 'up' }));
//                 }
//                 if (keys['ArrowDown']) {
//                     socket.send(JSON.stringify({ 'type': 'move', 'player': 2, 'direction': 'down' }));
//                 }
//                 if (keys['KeyW']) {
//                     socket.send(JSON.stringify({ 'type': 'move', 'player': 1, 'direction': 'up' }));
//                 }
//                 if (keys['KeyS']) {
//                     socket.send(JSON.stringify({ 'type': 'move', 'player': 1, 'direction': 'down' }));
//                 }
//                 if (keys['Space']) {
//                     socket.send(JSON.stringify({ 'type': 'start_ball' }));
//                 }
//             }
//         }

//         function updateGameTournoi(state, player1_name, player2_name) {
//             player1Y = state.player1_y_position;
//             player2Y = state.player2_y_position;
//             ballX = state.ball_x_position;
//             ballY = state.ball_y_position;
//             scorePlayer1 = state.score_player1;
//             scorePlayer2 = state.score_player2;
//             updateScoresTournoi(scorePlayer1, scorePlayer2, player1_name, player2_name);
//             drawGameTournoi(player1_name, player2_name);
//         }

//         function updateGame(state) {
//             player1Y = state.player1_y_position;
//             player2Y = state.player2_y_position;
//             ballX = state.ball_x_position;
//             ballY = state.ball_y_position;
//             scorePlayer1 = state.score_player1;
//             scorePlayer2 = state.score_player2;
//             updateScores(scorePlayer1, scorePlayer2);
//             drawGame();
//         }

//         function updateScores(score1, score2) {
//             document.getElementById('score-player1').textContent = `${Player1_name}: ${score1}`;
//             document.getElementById('score-player2').textContent = `Invité: ${score2}`;
//         }

//         function updateScoresTournoi(score1, score2, player1_tournoi_name, player2_tournoi_name) {
//             document.getElementById('score-player1').textContent = `${player1_tournoi_name}: ${score1}`;
//             document.getElementById('score-player2').textContent = `${player2_tournoi_name}: ${score2}`;
//         }

//         function drawGameTournoi(player1_name, player2_name) {
//             renderer.render(scene, camera);
//             // Update paddle and ball positions
//             paddle1.position.z = player1Y;
//             paddle2.position.z = player2Y;
//             ball.position.x = ballX;
//             ball.position.z = ballY;
//             renderer.render(scene, camera);
//         }

//         function drawGame() {
//             renderer.render(scene, camera);
//             // Update paddle and ball positions
//             paddle1.position.z = player1Y;
//             paddle2.position.z = player2Y;
//             ball.position.x = ballX;
//             ball.position.z = ballY;
//             renderer.render(scene, camera);
//         }

//         function gameLoop() {
//             handleKeys();
//             requestAnimationFrame(gameLoop);
//         }

//         gameLoop();

//         function resetGameState() {
//             player1Y = 0;
//             player2Y = 0;
//             ballX = 0;
//             ballY = 0;
//             scorePlayer1 = 0;
//             scorePlayer2 = 0;
//             gameEnd = false;
//             updateScores(scorePlayer1, scorePlayer2);
//         }

//         window.addEventListener('popstate', function() {
//             console.log("fermeture de la socket")
//             if (socket) {
//                 socket.close();
//                 socket = null;
//                 resetGameState()
//             }
//         });

//         window.addEventListener('hashchange', function() {
//             if (location.hash === "#/game") {
//                 Game();
//             } else {
//                 if (socket) {
//                     socket.close();
//                     socket = null;
//                     resetGameState();
//                 }
//             }
//         });
        
//         window.addEventListener('resize', () => {
//             const width = window.innerWidth;
//             const height = window.innerHeight;
            
//             // Maj taille du canvas
//             canvas.width = width;
//             canvas.height = height;
            
//             // Maj du renderer
//             renderer.setSize(width, height);

//             // Maj paramètres de la caméra
//             camera.aspect = width / height;
//             camera.updateProjectionMatrix();
            
//             renderer.render(scene, camera);
//         });

//         // Nettoyage lorsque la page est déchargée
//         window.addEventListener('unload', () => {
//             document.removeEventListener('keydown', handleKeys);
//             document.removeEventListener('keyup', handleKeys);
//         });
        
//     }
// };  

// export { Game };