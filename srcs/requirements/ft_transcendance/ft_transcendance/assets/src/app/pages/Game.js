const Game = () => {

    console.log("Game component loaded");
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
    `   <div class="frame-game">
            <h1 class="title-game">Jeu du pong</h1>
        </div>
    `; 
    console.log("Section content:", section.innerHTML);
    } else {
        console.error("#section not found in the DOM");
    }

};

export default Game;
