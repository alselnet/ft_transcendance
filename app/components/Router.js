import { ajax } from "../helpers/ajax.js"
import api from "../helpers/urls.js"
import { Card } from "./Cards.js";
import { ContainerCards } from "./ContainerCards.js";

export const Router = () => {

    let {hash} = location

    console.log(hash);

    if (hash == " " || hash == "#/") {
        ajax ({
            url:api.TODOS,
            callback: (data) => document.querySelector("#section").append(ContainerCards(data))
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
        })
    }else{
        console.log(api.SEARCHID+localStorage.getItem("id"));
        ajax({
            url: api.SEARCHID+localStorage.getItem("id"),
            callback: data => document.querySelector("#section").append(Card(data))
        })

    }
}