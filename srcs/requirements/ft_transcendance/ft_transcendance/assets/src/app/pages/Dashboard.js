import { DashStat } from "../components/StatDash.js";
import {
    setupFriendListAnimation,
    setupGameHistoryAnimation,
} from "../animation/DashboardAnimation.js";
import { checkAuth } from "../services/Api.js";

const Dashboard = async () => {

    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }

    let section = document.querySelector("#section");

    section.innerHTML = "";
    section.append(DashStat());

        setupFriendListAnimation(section);
        setupGameHistoryAnimation(section);
    
};

export { Dashboard };