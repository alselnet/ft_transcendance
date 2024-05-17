export const Header = () => {
    let nav = document.createElement("nav"); //Création d'un élément de navigation (nav)

    nav.innerHTML = `
    
        <a href="#/">Home</a>
        <a href="#/buscador">Buscador</a>
    ` //Définition du contenu HTML de la navigation

    return nav //lorsque cette fonction est appelée, elle renvoie un élément <nav> 
}