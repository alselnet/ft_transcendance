import { Navbar } from "./components/Navbar.js"
import { Main } from "./components/Main.js"
import { Router } from "./components/Router.js"



// export const App = () => {
// let divRoot = document.querySelector("#root") //pour récupérer l'élément HTML qui a l'ID "root"

//     divRoot.innerHTML = "" //la fonction modifie le contenu de l'élément racine en y ajoutant un titre
//     /* la fonction appelle les fonctions Header(), Search() et 
//     Main(), qui qui renvoient des éléments DOM représentant 
//     différents composants de notre application. 
//     Ces éléments sont ensuite ajoutés à l'élément racine à 
//     l'aide des méthodes append(). */
    
//     divRoot.append(Navbar())
//     divRoot.append(Main())

//     Router() //fonction responsable de la configuration et de la
//     // gestion du routage dans notre application.
//     //Cela peut inclure la définition des routes et la gestion des changements d'URL.
// }

//2eme option
export const App = () => {
    let root = document.getElementById("root");

    if (!root) {
        console.error("#root not found in the DOM");
        return;
    }

    root.innerHTML = "";
    root.append(Navbar());
    root.append(Main());

    Router();
};

document.addEventListener("DOMContentLoaded", App);
window.addEventListener("hashchange", App);

/*
import Home from '../app/pages/Home.js';
import LogIn from '../app/pages/LogIn.js';
import SignIn from '../app/pages/SignIn.js';
import Game from '../app/pages/Game.js';
import Dashboard from '../app/pages/Dashboard.js';
import { Navbar } from '../app/components/Navbar.js';
import { Main } from '../app/components/Main.js';

export const App = () => {
    let root = document.querySelector("#root");
    if (root) {
        root.innerHTML = "";
        root.append(Navbar());
        root.append(Main());

        let section = document.querySelector("#section");
        if (section) {
            switch (location.hash) {
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
                default:
                    Home(); // default to home if hash is not recognized
            }
        }
    } else {
        console.error("#root not found in the DOM");
    }
};
*/