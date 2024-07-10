import { Navbar } from "../components/Navbar.js";
import { Main } from "../utils/Main.js";
import { FriendDashStat } from "../components/FriendStatDash.js";
import { FriendHistoryDash } from "../components/FriendHistoryDash.js";
import { LogOut } from "../components/LogOut.js";
import {
    setupLeaderboardAnimation,
    setupFriendListAnimation,
    setupGameHistoryAnimation,
    setupCamembertAnimation
} from "../animation/DashboardAnimation.js";
import { checkAuth } from "../services/Api.js"

const FriendProfile = async () => {
    
    const isAuthenticated = await checkAuth();
    
    if (!isAuthenticated) {
        return;
    }
    
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

    setupLeaderboardAnimation(divRoot);
    setupFriendListAnimation(divRoot);
    setupGameHistoryAnimation(divRoot);
    setupCamembertAnimation(dashboardContainer);


};

export { FriendProfile };
