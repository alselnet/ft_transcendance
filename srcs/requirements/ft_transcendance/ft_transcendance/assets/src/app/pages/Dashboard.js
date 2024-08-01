import { DashStat } from "../components/StatDash.js";
import { checkAuth } from "../services/Api.js";

const Dashboard = async () => {

    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }

    let section = document.querySelector("#section");

    section.innerHTML = "";
    section.append(DashStat());
};

export { Dashboard };