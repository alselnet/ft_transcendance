import Connected from "../pages/Connected.js";
import Home from "../pages/Home.js";
import LogIn from "../pages/LogIn.js";
import SignIn from "../pages/SignIn.js";
import Succes from "../pages/Succes.js";

export const Router = () => {
    let { hash } = location;

    switch (hash) {
        case "#/":
            return Home();
        case "#/inscription":
            return SignIn();
        case "#/connexion":
            return LogIn();
        case "#/succes":
            return Succes();
        case "#/connected":
            return Connected();
        default:
            break;
    }
};
