const GameHistory = () => {
    console.log("Game History component loaded");

    let root = document.getElementById("root");
    if (!root) {
        console.error("#root not found in the DOM");
        return;
    }

    let navbar = document.querySelector(".navbar-container");
    if (navbar) {
        navbar.remove();
    }
    
    let logoutbutton = document.querySelector(".logout-container");
    if (logoutbutton) {
        logoutbutton.remove();
    }

    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
        `
          <div class="main-container2 ga-hidden">
            <h1 class="title2">Match History</h1>
            <div class="history-container2">
                <a class="nav-link" href="#/dashboard">
                    <span class="close-btn2">&times;</span>
                </a>
                <table class="history-table2">
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
                            <td class="defeat2s">Defeat</td>
                            <td>5 - 4</td>
                        </tr>
                        <tr>
                            <td>16/05/2024</td>
                            <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> jecointr</td>
                            <td>1 v 1</td>
                            <td class="victory2">Victory</td>
                            <td>15 - 14</td>
                        </tr>
                        <tr>
                            <td>20/05/2024</td>
                            <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> jecointr</td>
                            <td>1 v 1</td>
                            <td class="defeat2">Defeat</td>
                            <td>12 - 4</td>
                        </tr>
                        <tr>
                            <td>22/05/2024</td>
                            <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> jecointr</td>
                            <td>1 v 1</td>
                            <td class="victory2">Victory</td>
                            <td>25 - 10</td>
                        </tr>
                        <tr>
                            <td>27/05/2024</td>
                            <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> jecointr</td>
                            <td>1 v 1</td>
                            <td class="defeat2">Defeat</td>
                            <td>12 - 10</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        `; 

        console.log("Section content:", section.innerHTML);

        const gameHistoryContainer = document.querySelector('.main-container2');
        if (gameHistoryContainer) {
            setTimeout(() => {
                gameHistoryContainer.classList.add('ga-visible');
                gameHistoryContainer.classList.remove('ga-hidden');
            }, 0); // Delay to ensure the DOM has updated
        }
    } else {
        console.error("#section not found in the DOM");
    }

};

export default GameHistory;