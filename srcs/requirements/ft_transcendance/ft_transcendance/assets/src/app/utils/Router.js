import { Home } from "../pages/Home.js";
import { LogIn } from "../pages/LogIn.js";
import { SignIn } from "../pages/SignIn.js";
import { Game } from "../pages/Game.js";
import { Dashboard } from "../pages/Dashboard.js";
import { Settings } from "../pages/Settings.js";
import { AboutUs } from "../pages/AboutUs.js";
import { handleCallback } from '../pages/42SignIn.js';
import { FriendProfile } from "../pages/FriendProfile.js";
import { FriendList } from "../components/FriendsList.js";
import { GameHistory } from "../components/GameHistory.js";
import { TwoFactorAuth } from "../components/2FA.js"
import { LogOutMsg } from "../components/LogOutMsg.js";
import { DeleteFriendMsg } from "../components/DeleteFriendMsg.js";
import { CharteMsg } from "../components/CharteMsg.js";


export const Router = async () => {
	const hash = window.location.hash;
	console.log('current hash: ', hash);
    const section = document.getElementById('section');

    if (window.location.hash.includes('access') && window.location.hash.includes('refresh')) {
		console.log('handling callback');
        await handleCallback();
		return ;
    }

    // switch (hash) {
    //     case "#/":
    //         Home();
    //         break;
    //     case "#/signin":
    //         SignIn();
    //         break;
    //     case "#/login":
    //         LogIn();
    //         break;
    //     case "#/game":
    //         Game();
    //         break;
	// 	case "#/dashboard":
	// 		Dashboard();
	// 		break;
    //     case "#/settings":
    //         Settings();
    //         break;
    //     case "#/aboutus":
    //         AboutUs();
    //         break;
        // case "#/friendlist":
        //     FriendList();
        //     break;
        // case "#/gamehistory":
        //     GameHistory();
        //     break;
        // case "#/2fa":
        //     TwoFactorAuth();
        //     break;
        // case "#/logout":
        //     LogOutMsg();
        //     break;
        // case hash.startsWith("#/friendprofile/"):
        //     FriendProfile();
        //     break;
        // case "#/deletefriendmsg":
        //     DeleteFriendMsg();
        //     break;
        // case "#/chartemsg":
        //     CharteMsg();
        //     break;

        // default:
        //     section.innerHTML = "<h1>Page not found</h1>";
        //     break;
    // }


    if (hash === "#/") {
        Home();
    } else if (hash === "#/signin") {
        SignIn();
    } else if (hash === "#/login") {
        LogIn();
    } else if (hash === "#/game") {
        Game();
    } else if (hash === "#/dashboard") {
        Dashboard();
    } else if (hash === "#/settings") {
        Settings();
    } else if (hash === "#/aboutus") {
        AboutUs();
    } else if (hash === "#/friendlist") {
        FriendList();
    } else if (hash === "#/gamehistory") {
        GameHistory();
    } else if (hash === "#/2fa") {
        TwoFactorAuth();
    } else if (hash === "#/logout") {
        LogOutMsg();
    } else if (hash === "#/deletefriendmsg") {
        DeleteFriendMsg();
    } else if (hash === "#/chartemsg") {
        CharteMsg();
    } else if (hash.startsWith("#/friendprofile/")) {
        FriendProfile();
    } else {
        section.innerHTML = "<h1>Page not found</h1>";
    }
};
