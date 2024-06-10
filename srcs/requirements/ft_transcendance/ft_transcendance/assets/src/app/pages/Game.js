const Game = () => {
    console.log("Game component loaded");
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
    `   <div class="frame-game">
            <h1 class="title-game">Jeu du pong</h1>
            <span class="close-btn-game">&times;</span>
        </div>
    `; }
};

export default Game;
