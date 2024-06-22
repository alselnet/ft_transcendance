import Home from "../pages/Home.js";
import LogIn from "../pages/LogIn.js";
import SignIn from "../pages/SignIn.js";
import Game from "../pages/Game.js";
import Dashboard from "../pages/Dashboard.js";
import Leaderboard from "../pages/Leaderboard.js";

export const Router = () => {
    let { hash } = location;

    let section = document.getElementById("section");

    if (!section) {
        console.error("#section not found in the DOM");
        return;
    }

    switch (hash) {
        case "#/":
            Home();
            break;
        case "#/inscription":
            SignIn();
            break;
        case "#/connexion":
            LogIn();
            break;
        case "#/jeu":
            Game();
            break;
        case "#/dashboard":
            Dashboard();
            break;
        case "#/leaderboard":
            Leaderboard();
            break;
        default:
            section.innerHTML = "<h1>Page not found</h1>";
            break;
    }
};
