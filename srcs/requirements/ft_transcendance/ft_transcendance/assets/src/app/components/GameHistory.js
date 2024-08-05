import { get } from "../services/Api.js";
import { removeMainComponent } from "../functions/MainFunctions.js";

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`

export const GameHistory = async () => {

    removeMainComponent();
    try {
        const response = await get(`${usersUrl}/game-history/`);
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
            const resultClass = game.winner === currentUsername ? 'victory' : 'defeat';

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
                    <h1 class="title2">Historique des parties</h1>
                    <div class="history-container2">
                        <a class="nav-link" href="#/dashboard" id="game-history-button">
                            <span class="close-btn2" id="close-btn">&times;</span>
                        </a>
                        <table class="history-table2">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Vinqueur</th>
                                    <th>Perdant</th>
                                    <th>Resultat</th>
                                    <th>Mode de jeu</th>
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
                }, 100);
            }

            
        }
    } catch (error) {
        console.error('Error fetching game history:', error);
    }
};