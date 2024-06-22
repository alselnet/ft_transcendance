import { Navbar } from "../components/Navbar.js";
import { Main } from "../utils/Main.js";
import { DashStat } from "../components/StatDash.js";
import { HistoryDash } from "../components/HistoryDash.js";
import { showCircle } from "../animation/ShowCircle.js";
import Leaderboard from "./Leaderboard.js";

export const Dashboard = () => {
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
