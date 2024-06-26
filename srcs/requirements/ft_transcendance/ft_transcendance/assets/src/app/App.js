// import { LogOut } from "./components/LogOut.js";
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
    root.append(Navbar());
    root.append(Main());
    // root.append(LogOut());
    
    if (!window.location.hash) {
        window.location.href = '#/';
    } else {
        Router();
    }
};
