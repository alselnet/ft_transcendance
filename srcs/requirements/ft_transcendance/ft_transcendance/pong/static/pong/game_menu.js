document.addEventListener("DOMContentLoaded", function() {
    const initialButtons = document.getElementById("initial-buttons");
    const tournoiButtons = document.getElementById("tournoi-buttons");
    // const onlineButtons = document.getElementById("online-buttons");
    const sessionNameInput = document.getElementById("session-name-input");
    const localModeButton = document.getElementById("local-mode");
    const localModeTournoi = document.getElementById("tournoi-mode");
    // const tournoiPlayer3 = document.getElementById("three-players-btn");
    // const tournoiPlayer4 = document.getElementById("four-players-btn");
    // const tournoiPlayer5 = document.getElementById("five-players-btn");
    const playerNamesDiv = document.getElementById('player-names');
    const playerNamesForm = document.getElementById('player-names-form');
    const submitPlayersButton = document.getElementById('submit-players-btn');
    // const onlineModeButton = document.getElementById("online-mode");
    // const createSessionButton = document.getElementById("create-session");
    // const joinSessionButton = document.getElementById("join-session");
    const submitSessionNameButton = document.getElementById("submit-session-name");
    const sessionName = document.getElementById("session-name");

    let playerNames = [];
    let currentMatchIndex = 0;
    // playerName = prompt("enter u name")

    showInitialMenu();
    console.log("inside Game_menu")

    function hideAll() {
        initialButtons.classList.add("hidden");
        tournoiButtons.classList.add("hidden");
        // onlineButtons.classList.add("hidden");
        playerNamesDiv.style.display = 'none';
        sessionNameInput.style.display = 'none';
    }

    function showInitialMenu() {
        sessionName.value = "";
        drawInitialGame()
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
        console.log("inside prompte player name")
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
        for (let j = 0; j < numPlayers; j++) {
            console.log("player name :", playerNames[j]);
        }
        startTournament(playerNames);
    }

    // function setupTournament(numPlayers) {
    //     console.log("inside setup tournament : PLayer number = ", numPlayers)
    //     hideAll();
    //     playerNamesDiv.style.display = 'flex'
    //     playerNamesForm.innerHTML = '';
    //     for (let i = 1; i <= numPlayers; i++) {
    //         const input = document.createElement('input');
    //         input.type = 'text';
    //         input.name = `player${i}`;
    //         input.placeholder = `Player ${i} Name`;
    //         input.required = true;
    //         playerNamesForm.appendChild(input);
    //     }
    //     playerNamesDiv.style.display = 'block';
    // }

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

        // currentMatch = [players[currentPlayerIndex], players[currentPlayerIndex + 1]];
        currentMatchIndex += 1;
        const roomName = "local_" + `match_${currentMatchIndex}`;
        hideAll();
        connectWebSocket(roomName);
    }

    // function proceedToNextMatch(winner) {
    //     const winnerName = winner === 1 ? currentMatch[0] : currentMatch[1];
    //     players = players.filter(player => player !== winnerName);
    //     if (players.length >= 2) {
    //         nextMatch();
    //     } else {
    //         alert(`Tournament winner is ${winnerName}!`);
    //     }
    // }
    
    window.hideAll = hideAll;
    window.showInitialMenu = showInitialMenu;
});
