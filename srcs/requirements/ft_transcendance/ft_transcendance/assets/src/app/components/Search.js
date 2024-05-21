
export const Search = () => {
    let input = document.createElement("input"); //Création de l'élément <input>
    input.id = "buscador" //Attribution d'un identifiant à l'élément <input>
    input.style.display = "none"; //définit le style de l'élément <input> pour le masquer en utilisant input.style.display = "none". Cela signifie que l'élément <input> ne sera pas visible sur la page par défaut.

    return input
}