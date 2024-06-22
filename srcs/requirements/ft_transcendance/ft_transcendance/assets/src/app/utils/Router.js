/*import Home from "../pages/Home.js";
import LogIn from "../pages/LogIn.js";
import SignIn from "../pages/SignIn.js";
import Game from "../pages/Game.js";
import Dashboard from "../pages/Dashboard.js"
<<<<<<< HEAD
import Leaderboard from "../pages/Leaderboard.js";
=======
import GameHistory from "./game-history.js";
import Settings from "./settings.js";
import TwoFactorAuth from "./2FA.js";
>>>>>>> 84958df2e481de4bcac9b84e404125b24414d0c1

//définition des routes et la gestion des changements d'URL
export const Router = () => {
    let { hash } = location;

    let section = document.getElementById("section");

    if (!section) {
        console.error("#section not found in the DOM");
        return;
    }

    switch (hash) {
        case "#/":
            return Home();
        case "#/inscription":
            return SignIn();
        case "#/connexion":
            return LogIn();
        case "#/jeu":
            return Game();
        case "#/dashboard":
            return Dashboard();
        case "#/leaderboard":
            return Leaderboard();
    
        default:
            document.getElementById("section").innerHTML = "<h1>Page not found</h1>";
            break;
    }
};

*/

// -----------------------------------------------


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
