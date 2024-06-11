import Home from "../pages/Home.js";
import LogIn from "../pages/LogIn.js";
import SignIn from "../pages/SignIn.js";
import Game from "../pages/Game.js";
import Dashboard from "../pages/Dashboard.js"

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
        default:
            document.getElementById("section").innerHTML = "<h1>Page not found</h1>";
            break;
    }
};
