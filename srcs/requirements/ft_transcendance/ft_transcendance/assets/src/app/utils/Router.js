import { Home } from "../pages/Home.js";
import { LogIn } from "../pages/LogIn.js";
import { SignIn } from "../pages/SignIn.js";
import { Game } from "../pages/Game.js";
import { Dashboard } from "../pages/Dashboard.js";
import { Leaderboard } from "../pages/Leaderboard.js";
import { Settings } from "../pages/Settings.js";
import { AboutUs } from "../pages/AboutUs.js";
import { handleCallback } from '../pages/42SignIn.js';
import { FriendProfile } from "../pages/FriendProfile.js";
import { FriendList } from "../components/FriendsList.js";
import { GameHistory } from "../components/GameHistory.js";
import { TwoFactorAuth } from "../components/2FA.js"
import { LogOutMsg } from "../components/LogOutMsg.js";
import { DeleteFriendMsg } from "../components/DeleteFriendMsg.js";

export const Router = () => {
    const hash = window.location.hash;
    const section = document.getElementById('section');

    if (window.location.hash.includes('access') && window.location.hash.includes('refresh')) {
        handleCallback();
    }

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
        case "#/friendprofile":
            FriendProfile();
            break;
        case "#/deletefriendmsg":
            DeleteFriendMsg();
            break;

        default:
            section.innerHTML = "<h1>Page not found</h1>";
            break;
    }
};
