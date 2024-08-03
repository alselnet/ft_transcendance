import { FriendDashStat } from "../components/FriendStatDash.js";
import { checkAuth } from "../services/Api.js";

const FriendProfile = async () => {
    
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }

    let section = document.querySelector("#section");

    section.innerHTML = "";
    section.append(FriendDashStat());
};

export { FriendProfile };