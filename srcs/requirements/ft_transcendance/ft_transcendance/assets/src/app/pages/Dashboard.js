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
