import { Navbar } from "./components/Navbar.js"
import { Main } from "./utils/Main.js"
import { Router } from "./utils/Router.js"

export const App = () => {
    let root = document.getElementById("root");

    if (!root) {
        console.error("#root not found in the DOM");
        return;
    }

    /* la fonction appelle les fonctions Header(), Search() et 
    Main(), qui qui renvoient des éléments DOM représentant 
    différents composants de notre application. 
    Ces éléments sont ensuite ajoutés à l'élément racine à 
    l'aide des méthodes append(). */

    root.innerHTML = "";
    root.append(Navbar());
    root.append(Main());

    Router();
};

document.addEventListener("DOMContentLoaded", App);
window.addEventListener("hashchange", App);
