const Game = () => {

    console.log("Game component loaded");
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
    `   <div class="frame-game-container d-none d-lg-flex">
            <div class="frame-game">
                <h1 class="title-game">Jeu du pong</h1>
            </div>
        </div>

        <div class="frame-game-container d-flex d-lg-none">
            <div class="frame-game-sm">
                <h1 class="title-game-sm">Jeu du pong</h1>
            </div>
        </div>
    `; 
    console.log("Section content:", section.innerHTML);
    } else {
        console.error("#section not found in the DOM");
    }

};

export default Game;
