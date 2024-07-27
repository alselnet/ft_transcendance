import { Navbar } from "../components/Navbar.js";
import { Main } from "../utils/Main.js";
import { FriendDashStat } from "../components/FriendStatDash.js";
import { LogOut } from "../components/LogOut.js";
import {
    setupFriendListAnimation,
    setupGameHistoryAnimation,
    setupCamembertAnimation
} from "../animation/DashboardAnimation.js";
import { checkAuth } from "../services/Api.js";

const FriendProfile = async () => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }
    let divRoot = document.querySelector("#root");

    divRoot.innerHTML = "";

    divRoot.append(Navbar());
    divRoot.append(LogOut());
    divRoot.append(Main());

    let dashboardContainer = document.createElement("div");
    dashboardContainer.className = "dashboard-container";

    dashboardContainer.append(FriendDashStat());
    // dashboardContainer.append(FriendHistoryDash());


    divRoot.append(dashboardContainer);

    setupFriendListAnimation(divRoot);
    setupGameHistoryAnimation(divRoot);
    setupCamembertAnimation(dashboardContainer);

};

export { FriendProfile };
