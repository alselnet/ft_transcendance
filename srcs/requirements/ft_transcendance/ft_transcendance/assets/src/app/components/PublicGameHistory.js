import { get } from "../services/Api.js";

export const PublicGameHistory = async () => {

	const path = window.location.hash.split('/');
    const username = path[path.length - 1];

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

    try {
        const response = await get(`https://localhost/api/users/${username}/game-history/`);
        if (!response.ok) {
            throw new Error('Failed to fetch game history');
        }
        const data = await response.json();
        const games = Array.isArray(data) ? data : [];
        const currentUsername = data.length > 0 ? data[0].user : '';

        const rows = games.map(game => {
            const winnerAvatar = game.winner_avatar;
            const loserAvatar = game.loser_avatar;
            const gameMode = game.local_game ? 'Locale' : 'Online';
            const result = game.winner === currentUsername ? 'Victory' : 'Defeat';
            const resultClass = game.winner === currentUsername ? 'victory2' : 'defeat2';

            return `
                <tr>
                    <td>${new Date(game.date_time).toLocaleDateString()}</td>
					<td>
						<a href="#/friendprofile/${game.winner}">
							<img src="${winnerAvatar}" alt="${game.winner}" class ="avatar"> ${game.winner}
						</a>
					</td>
					<td>
						<a href="#/friendprofile/${game.loser}">
							<img src="${loserAvatar}" alt="${game.loser}" class ="avatar"> ${game.loser}
						</a>
					</td>
                    <td class="${resultClass}">${result}</td>
                    <td>${gameMode}</td>
                    <td>${game.winner_score} - ${game.loser_score}</td>
                </tr>
            `;
        }).join('');

        let section = document.querySelector("#section");
        if (section) {
            section.innerHTML = `
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
                                    <th>Winner</th>
                                    <th>Loser</th>
                                    <th>Result</th>
                                    <th>Game Mode</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            `; 

            const gameHistoryContainer = document.querySelector('.main-container2');
            if (gameHistoryContainer) {
                setTimeout(() => {
                    gameHistoryContainer.classList.add('ga-visible');
                    gameHistoryContainer.classList.remove('ga-hidden');
                }, 10);
            }
        }
    } catch (error) {
        console.error('Error fetching game history:', error);
    }
};