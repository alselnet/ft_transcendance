
/*effectue une requête AJAX (Asynchronous JavaScript and XML)
vers une URL spécifiée et appelle une fonction de rappel avec
les données récupérées.*/

export const ajax = (props) => {
    let {url, callback} = props; /*destructuration pour extraire
    les propriétés url et callback de l'objet props passé en
    paramètre. Cela signifie que la fonction ajax s'attend à
    recevoir un objet avec deux propriétés : url (l'URL vers
    laquelle effectuer la requête) et callback (la fonction de
    rappel à appeler une fois la réponse reçue). */
    
    fetch(url) //effectue une requête HTTP vers l'URL spécifiée. fetch(url) récupère les données à partir de l'URL fournie.
        .then(response => response.json())
        .then(data => callback(data))
    /*Les méthodes .then() sont enchaînées pour traiter la
    réponse de la requête. La première méthode .then() prend
    une fonction de rappel qui reçoit la réponse du serveur.
    Cette fonction transforme la réponse en format JSON en
    appelant response.json(). */
    /* La deuxième méthode .then() prend une fonction de rappel
    qui reçoit les données au format JSON obtenues à partir de
    la réponse de la requête. Cette fonction de rappel appelle
    la fonction callback passée en paramètre avec les données
    récupérées. Cela permet d'utiliser les données dans d'autres
    parties de l'application en les passant à une fonction
    spécifiée par l'utilisateur. */
}