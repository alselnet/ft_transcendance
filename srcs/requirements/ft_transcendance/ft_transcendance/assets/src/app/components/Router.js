import Home from "../pages/Home.js";
import LogIn from "../pages/LogIn.js";
import SignIn from "../pages/SignIn.js";

export const Router = () => {
    let { hash } = location;

    switch (hash) {
        case "#/":
            return Home();
        case "#/inscription":
            return SignIn();
        case "#/connexion":
            return LogIn();

        default:
            break;
    }
};
