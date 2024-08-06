import { get } from "../services/Api.js";
import { searchLogin } from "../functions/SettingsFunctions.js"
import { getStatusColor, addFriend, deleteFriend } from "../functions/FriendProfileFunctions.js";
import { addCamembert, setUpNumberAnimation } from "../functions/DashboardFunctions.js";

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`

const FriendDashStat = () => {
    let form = document.createElement("div");

    const path = window.location.hash.split('/');
    const username = path[path.length - 1];

    get(`${usersUrl}/${username}/`)
        .then(response => {
            return response.json();
        })
        .then(userData => {
            if (userData.detail === "No User matches the given query.") {
                throw new Error("L'utilisateur n'existe pas");
            }

            form.innerHTML = `
            <div class="stat-container">
				<div class="id">
					<div><img src="${userData.avatar}" alt="profile-pic" class="profile-picture"></div>
					
					<div class="text-stat">
						<div class="friend-name">
	                        <p class="profile-text">Profil de</p>
							<div class="friend-username-stat">${userData.username}</div>
						</div>
                        <div class="status">
                            <div class="status-pastille" style="background-color: ${getStatusColor(userData.status)}; margin-top: 0.5vh;"></div>
                            <div class="friend-status-text">${userData.status}</div>
                            <a class="nav-link" href="#" id="delete-friend-btn"><i class="bi bi-person-dash-fill person-icon delete-icon"></i></a>
                            <a class="nav-link" href="#" id="add-friend-btn"><i class="bi bi-person-plus-fill person-icon"></i></a>
                        </div>
					</div>
				</div>

				<div class="statistics-box">
										<div class="left-side">
						<div class="stat-title">Statistiques du joueur :</div>
						<div class="camembert-stat"></div>
					</div>
					<div class="middle">
            		    <div class="legend-stat">
                    		<div style="width: 1vw; height: 1vw; background-color: #63aa63; margin-right: 0.5vw; border-radius: 50%; margin-top: 0.2vw;"></div>
                    		<p style="color: white;">victoires:&nbsp;</p>
							<p style="color: green;">${userData.won_games}</p>
                		</div>
                		<div class="legend-stat">
                    		<div style="width: 1vw; height: 1vw; background-color: #b26969; margin-right: 0.5vw; border-radius: 50%; margin-top: 0.2vw;"></div>
                    		<p style="color: white;">défaites:&nbsp;</p>
							<p style="color: red;">${userData.played_games - userData.won_games}</p>
                		</div>
            		</div>
					<div class="right-side">
						<div class="stat-data">
							<div class="stat-rubric-stat">
								<p class="stat-text">Points marqués :</p>
								<p class="stat-number" data-target="${userData.scored_points}">0</p>
							</div>
							<div class="stat-rubric-stat">
								<p class="stat-text">Points concédés :</p>
								<p class="stat-number" data-target="${userData.conceded_points}">0</p>
							</div>
							<div class="stat-rubric-stat">
								<p class="stat-text">Victoires parfaites :</p>
								<p class="stat-number" data-target="${userData.perfect_wins}">0</p>
							</div>
						</div>
					</div>
				</div>

				<div class="footer-friend-link">
					<div class="search-container">
            			<div class="search-barre">
                			<input type="text" id="login-search" placeholder="Entrez le nom de l'utilisateur">
            			</div>
            			<button type="button" id="search-button">
                			<i class="bi bi-search search-icon"></i>
            			</button>
        			</div>
					<a class="nav-link" href="#/publicgamehistory/${userData.username}">         
						<div class="footer-friend" id="history-stat">
							<i class="bi bi-clock-history footer-friend-icon"></i>
							<p class="footer-friend-text">Historique des parties de ${userData.username}</p>
						</div>
					</a>
				</div>

			</div>
            `;

		    setUpNumberAnimation(form);
            addCamembert(form, userData.played_games, userData.won_games);

            const loginSearchInput = form.querySelector("#login-search");
            const searchButton = form.querySelector("#search-button");
    
            searchButton.addEventListener('click', () => {
                searchLogin(loginSearchInput, userData.username);
            });
            
            loginSearchInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    searchLogin(loginSearchInput, userData.username);
                }
            });
        
			document.getElementById('delete-friend-btn').addEventListener('click', (e) => {
                e.preventDefault();
                deleteFriend(username);
            });

            document.getElementById('add-friend-btn').addEventListener('click', (e) => {
                e.preventDefault();
                addFriend(username);
            });

            
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
            alert("L'utilisateur n'existe pas");
			window.location.href = '#/dashboard';
        });

    return form;
};

export { FriendDashStat };