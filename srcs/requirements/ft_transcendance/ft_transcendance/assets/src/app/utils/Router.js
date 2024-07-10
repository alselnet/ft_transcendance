import { Home } from "../pages/Home.js";
import { LogIn } from "../pages/LogIn.js";
import { SignIn } from "../pages/SignIn.js";
import { Game } from "../pages/Game.js";
import { Dashboard } from "../pages/Dashboard.js";
import { Leaderboard } from "../pages/Leaderboard.js";
import { Settings } from "../pages/Settings.js";
import { AboutUs } from "../pages/AboutUs.js";
import { FriendList } from "../components/FriendsList.js";
import { GameHistory } from "../components/GameHistory.js";
import { TwoFactorAuth } from "../components/2FA.js"
import { LogOutMsg } from "../components/LogOutMsg.js";
import { FriendDashboard } from "../pages/FriendDashboard.js";
import { DeleteFriendMsg } from "../components/DeleteFriendMsg.js";
import { checkAuth } from "../services/Api.js"

export const Router = () => {
    let { hash } = location;

    let section = document.getElementById("section");

    if (!section) {
        console.error("#section not found in the DOM");
        return;
    }

    const routeAsync = async () => {
        await checkAuth();

        switch (hash) {
            case "#/":
                Home();
                break;
            case "#/signin":
                SignIn();
                break;
            case "#/login":
                LogIn();
                break;
            case "#/game":
                Game();
                break;
            case "#/dashboard":
                Dashboard();
                break;
            case "#/leaderboard":
                Leaderboard();
                break;
            case "#/settings":
                Settings();
                break;
            case "#/aboutus":
                AboutUs();
                break;
            case "#/friendlist":
                FriendList();
                break;
            case "#/gamehistory":
                GameHistory();
                break;
            case "#/2fa":
                TwoFactorAuth();
                break;
            case "#/logout":
                LogOutMsg();
                break;
            case "#/frienddashboard":
                FriendDashboard();
                break;
            case "#/deletefriendmsg":
                DeleteFriendMsg();
                break;

            default:
                section.innerHTML = "<h1>Page not found</h1>";
                break;
        }
    };
    /* Cette fonction interne est déclarée comme async pour 
    pouvoir utiliser await à l'intérieur. Cela permet d'attendre
    que checkAuth soit résolu avant de continuer avec le 
    chargement de la page spécifique. */
    routeAsync().catch(error => console.error('Error routing:', error));
};