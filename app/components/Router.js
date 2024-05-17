import { ajax } from "../helpers/ajax.js"
import api from "../helpers/urls.js"
import { Card } from "./Cards.js";
import { ContainerCards } from "./ContainerCards.js";

export const Router = () => {

    let {hash} = location /*déstructuration pour extraire la 
    propriété hash de l'objet location. Cela récupère la partie
    de l'URL qui suit le symbole dièse (#), qui est souvent 
    utilisée pour gérer la navigation dans les SPA */

    console.log(hash);

    if (hash == " " || hash == "#/") {
        ajax ({
            url:api.TODOS,
            callback: (data) => document.querySelector("#section").append(ContainerCards(data))
    /*ajax est appelée pour effectuer une requête vers l'URL
    spécifiée dans api.TODOS. Lorsque les données sont récupérées,
    la fonction de rappel est appelée pour ajouter les données à
    la section de la page avec l'ID "section" en utilisant la
    fonction ContainerCards. */
        })
    }else if (hash == "#/buscador") {
        let inputBuscador = document.querySelector("#buscador");
        inputBuscador.style.display = "block";

        inputBuscador.addEventListener("change", (event) => {
            console.log(event.target.value);
            let nameBusqueda = event.target.value;
            ajax({
                url:api.SEARCHNAME+nameBusqueda,
                callback: data => document.querySelector("#section").append(ContainerCards(data))
            })
    /*un élément du DOM avec l'ID "buscador" est récupéré et son
    style est modifié pour être affiché (display: "block").
    Ensuite, un écouteur d'événements est ajouté à cet élément
    pour écouter les changements. Lorsque le contenu de l'élément
    change, une requête AJAX est effectuée vers l'URL spécifiée
    dans api.SEARCHNAME avec le terme de recherche récupéré.
    Lorsque les données sont récupérées, la fonction de rappel est
    appelée pour ajouter les données à la section de la page avec
    l'ID "section" en utilisant la fonction ContainerCards. */
        })
    }else{
        console.log(api.SEARCHID+localStorage.getItem("id"));
        ajax({
            url: api.SEARCHID+localStorage.getItem("id"),
            callback: data => document.querySelector("#section").append(Card(data))
        })
    /*cela suppose que le hash correspond à une ID spécifique à
    rechercher. Il utilise alors la valeur stockée dans le stockage
    local (localStorage.getItem("id")) pour créer l'URL de
    recherche spécifique. Une requête AJAX est effectuée vers
    cette URL, et lorsque les données sont récupérées, la fonction
    de rappel est appelée pour ajouter les données à la section
    de la page avec l'ID "section" en utilisant la fonction Card.*/
    }
}