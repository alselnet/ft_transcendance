const GameHistory = () => {
    let form = document.createElement("div");
    console.log("Game History component loaded");

    let root = document.getElementById("root");
    if (!root) {
        console.error("#root not found in the DOM");
        return;
    }

    // Retirer Navbar et bouton logout
    let navbar = document.querySelector(".navbar-container");
    if (navbar) {
        navbar.remove();
    }
    
    let logoutbutton = document.querySelector(".logout-container");
    if (logoutbutton) {
        logoutbutton.remove();
    }

        section.innerHTML = 
        `
        <div class="main-container-ga">
            <h1 class="title-ga">Match History</h1>
            <div class="history-container-ga">
            <a class="nav-link" href="#/dashboard">
                <span class="close-btn-ga">&times;</span>
            </a>
                <table class="history-table-ga">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Opponent</th>
                            <th>Game Mode</th>
                            <th>Result</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>12/05/2024</td>
                            <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> jecointr</td>
                            <td>1 v 1</td>
                            <td class="defeat-ga">Defeat</td>
                            <td>5 - 4</td>
                        </tr>
                        <tr>
                            <td>16/05/2024</td>
                            <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> jecointr</td>
                            <td>1 v 1</td>
                            <td class="victory-ga">Victory</td>
                            <td>15 - 14</td>
                        </tr>
                        <tr>
                            <td>20/05/2024</td>
                            <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> jecointr</td>
                            <td>1 v 1</td>
                            <td class="defeat-ga">Defeat</td>
                            <td>12 - 4</td>
                        </tr>
                        <tr>
                            <td>22/05/2024</td>
                            <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> jecointr</td>
                            <td>1 v 1</td>
                            <td class="victory-ga">Victory</td>
                            <td>25 - 10</td>
                        </tr>
                        <tr>
                            <td>27/05/2024</td>
                            <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> jecointr</td>
                            <td>1 v 1</td>
                            <td class="defeat-ga">Defeat</td>
                            <td>12 - 10</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        `; 
        return form;
};

export default GameHistory;