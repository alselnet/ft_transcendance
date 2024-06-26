const GameHistory = () => {
    let section = document.createElement("div");
    console.log("Game History component loaded");

        section.innerHTML = 
        `
        <div class="main-container2">
            <h1>Match History</h1>
            <div class="history-container2">
                <span class="close-btn">&times;</span>
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
                            <td><img src="../images/jecointr_avatar.png" alt="jecointr"> jecointr</td>
                            <td>1 v 1</td>
                            <td class="defeat2s">Defeat</td>
                            <td>5 - 4</td>
                        </tr>
                        <tr>
                            <td>16/05/2024</td>
                            <td><img src="../images/jecointr_avatar.png" alt="jecointr"> jecointr</td>
                            <td>1 v 1</td>
                            <td class="victory2">Victory</td>
                            <td>15 - 14</td>
                        </tr>
                        <tr>
                            <td>20/05/2024</td>
                            <td><img src="../images/jecointr_avatar.png" alt="jecointr"> jecointr</td>
                            <td>1 v 1</td>
                            <td class="defeat2">Defeat</td>
                            <td>12 - 4</td>
                        </tr>
                        <tr>
                            <td>22/05/2024</td>
                            <td><img src="../images/jecointr_avatar.png" alt="jecointr"> jecointr</td>
                            <td>1 v 1</td>
                            <td class="victory2">Victory</td>
                            <td>25 - 10</td>
                        </tr>
                        <tr>
                            <td>27/05/2024</td>
                            <td><img src="../images/jecointr_avatar.png" alt="jecointr"> jecointr</td>
                            <td>1 v 1</td>
                            <td class="defeat2">Defeat</td>
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