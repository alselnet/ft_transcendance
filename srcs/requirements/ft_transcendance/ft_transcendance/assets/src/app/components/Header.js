export const Header = () => {
    let nav = document.createElement("nav"); //Création d'un élément de navigation (nav)

    nav.innerHTML = `
    
        <a href="#/">Home</a>
        <a href="#/inscription">Inscription</a>
        <a href="#/connexion">Connexion</a>
    ` //Définition du contenu HTML de la navigation

    return nav //lorsque cette fonction est appelée, elle renvoie un élément <nav> 
}