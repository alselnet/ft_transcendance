import { Navbar } from "../components/Navbar.js";
import { Main } from "../utils/Main.js";
import { DashStat } from "../components/StatDash.js";
import { HistoryDash } from "../components/HistoryDash.js";
import { LogOut } from "../components/LogOut.js";
import {
    setupLeaderboardAnimation,
    setupFriendListAnimation,
    setupGameHistoryAnimation,
    setupCamembertAnimation
} from "../animation/DashboardAnimation.js";

const Dashboard = () => {
    // Vérifie l'authentification de l'utilisateur
    // const checkAuthentication = () => {
    //     const token = localStorage.getItem('accessToken');
    //     if (!token) {
    //         window.location.href = '#/login'; // Redirige vers la page de login si pas de token
    //         return false;
    //     } else {
    //         const payload = JSON.parse(atob(token.split('.')[1])); // Décodage du payload du token
    //         const expiry = payload.exp * 1000; // Convertir le temps d'expiration en millisecondes
    //         if (Date.now() >= expiry) {
    //             // Si le token est expiré, supprimer et rediriger
    //             localStorage.removeItem('accessToken');
    //             localStorage.removeItem('refreshToken');
    //             window.location.href = '#/login';
    //             return false;
    //         }
    //     }
    //     return true;
    // };

    // if (!checkAuthentication()) return; // Arrêter le chargement de la page si l'utilisateur n'est pas authentifié

    let divRoot = document.querySelector("#root");

    divRoot.innerHTML = "";

    divRoot.append(Navbar());
    divRoot.append(LogOut());
    divRoot.append(Main());

    let dashboardContainer = document.createElement("div");
    dashboardContainer.className = "dashboard-container";

    dashboardContainer.append(DashStat());
    dashboardContainer.append(HistoryDash());

    divRoot.append(dashboardContainer);

    setupLeaderboardAnimation(divRoot);
    setupFriendListAnimation(divRoot);
    setupGameHistoryAnimation(divRoot);
    setupCamembertAnimation(dashboardContainer);

};

export { Dashboard };
