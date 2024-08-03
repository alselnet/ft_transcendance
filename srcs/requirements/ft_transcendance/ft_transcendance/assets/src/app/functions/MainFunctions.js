export function removeMainComponent() {

    let root = document.getElementById("root");
    if (!root) {
        console.error("#root not found in the DOM");
        return;
    }

    let navbar = document.querySelector(".navbar-container");
    if (navbar) {
        navbar.remove();
    }

    let logoutbutton = document.querySelector(".logout-container");
    if (logoutbutton) {
        logoutbutton.remove();
    }
}