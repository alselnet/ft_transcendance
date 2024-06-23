import { Navbar } from "../components/Navbar.js";
import { Main } from "../utils/Main.js";
import { DashStat } from "../components/StatDash.js";
import { HistoryDash } from "../components/HistoryDash.js";
import { showCircle } from "../animation/ShowCircle.js";
import { Leaderboard } from "./Leaderboard.js";

export const Dashboard = () => {
    // Vérifie l'authentification de l'utilisateur
    const checkAuthentication = () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            window.location.href = '#/connexion'; // Redirige vers la page de login si pas de token
            return false;
        } else {
            const payload = JSON.parse(atob(token.split('.')[1])); // Décodage du payload du token
            const expiry = payload.exp * 1000; // Convertir le temps d'expiration en millisecondes
            if (Date.now() >= expiry) {
                // Si le token est expiré, supprimer et rediriger
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '#/connexion';
                return false;
            }
        }
        return true;
    };

    if (!checkAuthentication()) return; // Arrêter le chargement de la page si l'utilisateur n'est pas authentifié
    
    let divRoot = document.querySelector("#root");

    divRoot.innerHTML = "";

    divRoot.append(Navbar());
    divRoot.append(Main());

    let dashboardContainer = document.createElement("div");
    dashboardContainer.className = "dashboard-container";

    dashboardContainer.append(DashStat());
    dashboardContainer.append(HistoryDash());

    divRoot.append(dashboardContainer);

    /* animation leaderboard opening */

    const leaderboardLink = document.querySelector('.leaderboard-stat .nav-link');
    if (leaderboardLink) {
        leaderboardLink.addEventListener('click', (event) => {
            event.preventDefault();
            let section = document.createElement('div');
            section.id = 'section';
            divRoot.append(section);

            // Get the position of the leaderboard link
            const rect = leaderboardLink.getBoundingClientRect();
            section.style.position = 'absolute';
            section.style.left = `${rect.left}px`;
            section.style.top = `${rect.top}px`;

            Leaderboard();

            // After the Leaderboard is loaded, update the position and animation
            const leaderboardElement = section.querySelector('.container-ldb');
            setTimeout(() => {
                section.style.position = 'relative';
                section.style.left = '0';
                section.style.top = '0';
                leaderboardElement.classList.remove('leaderboard-hidden');
                leaderboardElement.classList.add('leaderboard-visible');
            }, 10); // Small delay to ensure the CSS transition applies
        });
    } else {
        console.error('Leaderboard link not found');
    }




    /* animation camambert */
    const camambertStat = document.querySelector('.camambert-stat');
    if (camambertStat) {
        const { left, top } = camambertStat.getBoundingClientRect();
        const radius = 100;

        const adjustedLeft = left - dashboardContainer.getBoundingClientRect().left;
        const adjustedTop = top - dashboardContainer.getBoundingClientRect().top;

        showCircle(dashboardContainer, adjustedLeft, adjustedTop, radius, () => {
            console.log('Circle animation complete');
        });
    } else {
        console.error('camambert-stat element not found');
    }

};

export default Dashboard;
