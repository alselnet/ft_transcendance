import { Home } from "../pages/Home.js";
import { LogIn } from "../pages/LogIn.js";
import { SignIn } from "../pages/SignIn.js";
import { Game } from "../pages/Game.js";
import { Dashboard } from "../pages/Dashboard.js";
import { Settings } from "../pages/Settings.js";
import { AboutUs } from "../pages/AboutUs.js";
import { handleCallback } from "../functions/42SignIn.js";
import { FriendProfile } from "../pages/FriendProfile.js";
import { FriendList } from "../components/FriendsList.js";
import { GameHistory } from "../components/GameHistory.js";
import { PublicGameHistory } from "../components/PublicGameHistory.js";
import { TwoFactorsAuth } from "../components/2FA.js"
import { TwoFactorsAuthQR } from "../components/2FA_QR.js";
import { LogOutMsg } from "../components/LogOutMsg.js";
import { CharteMsg } from "../components/CharteMsg.js";
import { UpdateUsername } from "../pages/UpdateUsername.js";
import { UpdateEmail } from "../pages/UpdateEmail.js";
import { UpdatePassword } from "../pages/UpdatePassword.js";
import { DeleteAccount } from "../pages/DeleteAccount.js";
import { DeleteAccount42 } from "../pages/DeleteAccount42.js";
import { QRCode } from "../pages/QRCode.js";
import { post } from "../services/Api.js"

const exactMatches = ['#/game', '#/dashboard', '#/settings', '#/aboutus', '#/chartemsg', '#/friendlist', '#/gamehistory'];
const prefixMatches = ['#/friendprofile', '#/publicgamehistory'];
const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`

export const Router = async () => {
	const hash = window.location.hash;
	console.log('current hash: ', hash);
    const section = document.getElementById('section');
	
	window.isInternalNavigation = true;

    const isExactMatch = exactMatches.includes(hash);
    const isPrefixMatch = prefixMatches.some(prefix => hash.startsWith(prefix));

    if (isExactMatch || isPrefixMatch){
        window.onbeforeunload = function (event) {
			post(`${authUrl}/signout/`);
        };
    } else {
        window.onbeforeunload = null;
    }

    if (window.location.hash.includes('access') && window.location.hash.includes('refresh')) {
        await handleCallback();
		return ;
    }

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
	} else if (hash.startsWith ("#/publicgamehistory")) {
		PublicGameHistory();
    } else if (hash === "#/logout") {
        LogOutMsg();
    } else if (hash === "#/chartemsg") {
        CharteMsg();
    } else if (hash === "#/update-username") {
        UpdateUsername();
    } else if (hash === "#/update-email") {
        UpdateEmail();
    } else if (hash === "#/update-password") {
        UpdatePassword();
    } else if (hash === "#/delete-account") {
        DeleteAccount();
    } else if (hash === "#/delete-account-42") {
        DeleteAccount42();
    } else if (hash.startsWith("#/qr-code")) {
        QRCode();
    } else if (hash.startsWith("#/2fa-auth")) {
        TwoFactorsAuth();
    } else if (hash.startsWith("#/qr-2fa-auth")) {
        TwoFactorsAuthQR();
    } else if (hash.startsWith("#/friendprofile/")) {
        FriendProfile();
    } else {
        section.innerHTML = "<h1>Page not found</h1>";
    }

	window.isInternalNavigation = false;
};
