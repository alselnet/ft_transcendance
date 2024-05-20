import { Header } from "./components/Header.js"
import { Main } from "./components/Main.js"
import { Router } from "./components/Router.js"
import { Search } from "./components/Search.js"



export const App = () => {
let divRoot = document.querySelector("#root") //pour récupérer l'élément HTML qui a l'ID "root"

    divRoot.innerHTML = "" //la fonction modifie le contenu de l'élément racine en y ajoutant un titre
    /* la fonction appelle les fonctions Header(), Search() et 
    Main(), qui qui renvoient des éléments DOM représentant 
    différents composants de notre application. 
    Ces éléments sont ensuite ajoutés à l'élément racine à 
    l'aide des méthodes append(). */
    divRoot.append(Header())
    divRoot.append(Search())
    divRoot.append(Main())

    Router() //fonction responsable de la configuration et de la
    // gestion du routage dans notre application.
    //Cela peut inclure la définition des routes et la gestion des changements d'URL.
}
