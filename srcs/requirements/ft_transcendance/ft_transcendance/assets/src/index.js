import { App } from "./app/App.js"

/* Lorsque cet événement est déclenché, la fonction App
est appelée. Cela garantit que votre application est
initialisée une fois que le DOM est prêt avec "DomContentLoaded"*/
document.addEventListener("DOMContentLoaded", App)

/* déclenche la fonction App lorsque la partie de l'URL de 
hachage (le fragment d'URL qui suit le symbole "#") change.
C'est généralement qu'une nouvelle "page" virtuelle est demandée.
=> permet à notre application de réagir aux changements d'URL
et de mettre à jour son contenu en conséquence. */
window.addEventListener("hashchange", App)
