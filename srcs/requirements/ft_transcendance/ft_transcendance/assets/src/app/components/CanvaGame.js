const CanvaGame = () => {

    console.log("CanvaGame component loaded");
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
    `   
    <div class="game-container">
        <h1>Pong</h1>
        <canvas class="game-canvas" width="1200" height="700">
            <div class="button-container" id="initial-buttons">
                <button class="game-button" id="local-mode">Local</button>
                <button class="game-button" id="tournoi-mode">Tournoi</button>
            </div>
            <div class="button-container" id="tournoi-buttons">
                <button class="game-button" id="three-players-btn">3 Players</button>
                <button class="game-button" id="four-players-btn">4 Players</button>
                <button class="game-button" id="five-players-btn">5 Players</button>
            </div>
            <div class="session-name-input" class="hidden">
                <input type="text" class="session-name" placeholder="Nom de la session">
                <button class="game-button" id="submit-session-name">Submit</button>
            </div>
            <div id="player-names" style="display: none;">
                <form id="player-names-form">
                </form>
                <button id="submit-players-btn">Submit</button>
            </div>
        </canvas>
    </div>
     {% load static %}

    `; 
    console.log("Section content:", section.innerHTML);
    } else {
        console.error("#section not found in the DOM");
    }

};

export default CanvaGame;




   
{/* <script src="{% static 'game/js/game_menu.js' %}"></script> */}
{/* <script src="{% static 'game/js/game.js' %}"></script> */}
