import { Navbar } from "../components/Navbar.js";
import { Main } from "../utils/Main.js";
import { DashStat } from "../components/StatDash.js";
import { LogOut } from "../components/LogOut.js";
import {
    setupFriendListAnimation,
    setupGameHistoryAnimation,
    setupCamembertAnimation
} from "../animation/DashboardAnimation.js";

import { checkAuth } from "../services/Api.js";

export const Dashboard = () => {

    let divRoot = document.querySelector("#root");

    divRoot.innerHTML = "";

    divRoot.append(Navbar());
    divRoot.append(LogOut());
    divRoot.append(Main());

    let dashboardContainer = document.createElement("div");
    // dashboardContainer.className = "dashboard-container";

    dashboardContainer.append(DashStat());

    divRoot.append(dashboardContainer);

    setupFriendListAnimation(divRoot);
    setupGameHistoryAnimation(divRoot);
    setupCamembertAnimation(dashboardContainer);
};