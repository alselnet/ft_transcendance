import { Navbar } from "../components/Navbar.js"
import { Main } from "../utils/Main.js"
import { DashStat } from "../components/StatDash.js"
import { HistoryDash } from "../components/HistoryDash.js"


export const Dashboard = () => {

let divRoot = document.querySelector("#root")

    divRoot.innerHTML = ""

    divRoot.append(Navbar());
    divRoot.append(Main());
    
    let dashboardContainer = document.createElement("div");
    dashboardContainer.className = "dashboard-container";
    
    dashboardContainer.append(DashStat());
    dashboardContainer.append(HistoryDash());
    
    divRoot.append(dashboardContainer);
}

export default Dashboard;
