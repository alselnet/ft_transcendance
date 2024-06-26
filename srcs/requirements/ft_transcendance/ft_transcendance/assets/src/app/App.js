import { LogOut } from "./components/LogOut.js";
import { Navbar } from "./components/Navbar.js";
import { Main } from "./utils/Main.js";
import { Router } from "./utils/Router.js";

export const App = () => {
    let root = document.getElementById("root");

    if (!root) {
        console.error("#root not found in the DOM");
        return;
    }

    root.innerHTML = "";

    const navbarSupperposition = document.createElement('div');
    navbarSupperposition.classList.add('navbar-supperposition');
    navbarSupperposition.append(Navbar());
    navbarSupperposition.append(LogOut());
    root.append(navbarSupperposition);

    root.append(Main());

    if (!window.location.hash) {
        window.location.href = '#/';
    } else {
        Router();
    }
};
