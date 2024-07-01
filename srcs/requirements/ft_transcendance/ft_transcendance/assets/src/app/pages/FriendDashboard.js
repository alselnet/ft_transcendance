import { Navbar } from "../components/Navbar.js";
import { Main } from "../utils/Main.js";
import { FriendDashStat } from "../components/FriendStatDash.js";
import { FriendHistoryDash } from "../components/FriendHistoryDash.js";
import { showCircle } from "../animation/ShowCircle.js";
import Leaderboard from "./Leaderboard.js";
import { LogOut } from "../components/LogOut.js";
import FriendList from "../components/FriendsList.js";
import GameHistory from "../components/GameHistory.js";

export const FriendDashboard = () => {
  
    let divRoot = document.querySelector("#root");

    divRoot.innerHTML = "";

    divRoot.append(Navbar());
    divRoot.append(LogOut());
    divRoot.append(Main());

    let dashboardContainer = document.createElement("div");
    dashboardContainer.className = "dashboard-container";

    dashboardContainer.append(FriendDashStat());
    dashboardContainer.append(FriendHistoryDash());

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

    const friendlistLink = document.querySelector('.list-stat .nav-link');
    if (friendlistLink) {
        friendlistLink.addEventListener('click', (event) => {
            event.preventDefault();
            let section = document.createElement('div');
            section.id = 'section';
            divRoot.append(section);

            // Get the position of the friendlist link
            const rect = friendlistLink.getBoundingClientRect();
            section.style.position = 'absolute';
            section.style.left = `${rect.left}px`;
            section.style.top = `${rect.top}px`;

            FriendList();

            // After the Friend List is loaded, update the position and animation
            const friendlistElement = section.querySelector('.main-containerf');
            setTimeout(() => {
                section.style.position = 'relative';
                section.style.left = '0';
                section.style.top = '0';
                friendlistElement.classList.remove('fl-hidden');
                friendlistElement.classList.add('fl-visible');
            }, 10); // Small delay to ensure the CSS transition applies
        });
    } else {
        console.error('Friends list link not found');
    }

    const gameHistoryLink = document.querySelector('.game-history .nav-link');
    if (gameHistoryLink) {
        gameHistoryLink.addEventListener('click', (event) => {
            event.preventDefault();
            let section = document.createElement('div');
            section.id = 'section';
            divRoot.append(section);

            // Get the position of the friendlist link
            const rect = gameHistoryLink.getBoundingClientRect();
            section.style.position = 'absolute';
            section.style.left = `${rect.left}px`;
            section.style.top = `${rect.top}px`;

            GameHistory();

            // After the Friend List is loaded, update the position and animation
            const gameHistoryElement = section.querySelector('.main-container2');
            setTimeout(() => {
                section.style.position = 'relative';
                section.style.left = '0';
                section.style.top = '0';
                gameHistoryElement.classList.remove('fl-hidden');
                gameHistoryElement.classList.add('fl-visible');
            }, 10); // Small delay to ensure the CSS transition applies
        });
    } else {
        console.error('Game History link not found');
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

export default FriendDashboard;