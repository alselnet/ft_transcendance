import { get } from "../services/Api.js"
import { getStatusColor } from "../functions/FriendProfileFunctions.js"
import { searchLogin } from "../functions/SettingsFunctions.js"
import { addCamembert, modifyStatus, setUpNumberAnimation } from "../functions/DashboardFunctions.js";

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`

const DashStat = () => {
    let form = document.createElement("div");
    console.log('Creating form element');

    get(`${usersUrl}/me/`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        return response.json();
    })
    .then(userData => {
        console.log('Fetched user data:', userData);

        form.innerHTML = `
			<div class="stat-container">
				<div class="id">
					<div><img src="${userData.avatar}" alt="profile-pic" class="profile-picture"></div>
					
					<div class="text-stat">
						<div class="name-and-settings">
							<div class="username-stat">${userData.username}</div>
							<a class="nav-link" href="#/settings"><i class="bi bi-gear-fill gear-icon"></i></a>
						</div>
						<div class="status">
							<div class="dropdown">
								<button class="btn btn-secondary dropdown-toggle transparent-dropdown d-flex align-items-center" type="button"
									id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
									<div class="status-dropdown">
										<div class="status-pastille" style="background-color: ${getStatusColor(userData.status)};"></div>
										<div class="status-text">${userData.status}</div>
									</div>
								</button>
								<ul class="dropdown-menu transparent-dropdown" aria-labelledby="dropdownMenuButton1">
									<li class="dropdown-item" data-status="online">
										<div class="status-dropdown">
											<div class="status-pastille" style="background-color: green; margin-right: 0.3vw"></div>
											<div class="status-text">En ligne</div>
										</div>
									</li>
									<li class="dropdown-item" data-status="offline">
										<div class="status-dropdown">
											<div class="status-pastille" style="background-color: grey; margin-right: 0.3vw"></div>
											<div class="status-text">Invisible</div>
										</div>
									</li>
								</ul>
							</div>            
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
								<p class="stat-text">Points marqués</p>
								<p class="stat-number" data-target="${userData.scored_points}">0</p>
							</div>
							<div class="stat-rubric-stat">
								<p class="stat-text">Points concédés</p>
								<p class="stat-number" data-target="${userData.conceded_points}">0</p>

							</div>
							<div class="stat-rubric-stat">
								<p class="stat-text">Victoires parfaites</p>
								<p class="stat-number" data-target="${userData.perfect_wins}">0</p>
							</div>
						</div>
					</div>
				</div>

				<div class="footer-link">
					<div class="search-container">
            			<div class="search-barre">
                			<input type="text" id="login-search" placeholder="Entrez le nom de l'utilisateur">
            			</div>
            			<button type="button" id="search-button">
                			<i class="bi bi-search search-icon"></i>
            			</button>
        			</div>
					<a class="nav-link" href="#/friendlist">         
						<div class="footer" id="list-stat">
							<i class="bi bi-list-task footer-icon"></i>
							<p class="footer-text">Liste d'amis</p>
						</div>
					</a>
					<a class="nav-link" href="#/gamehistory">         
						<div class="footer" id="history-stat">
							<i class="bi bi-clock-history footer-icon"></i>
							<p class="footer-text">Historique des parties</p>
						</div>
					</a>
				</div>
			</div>
        `;
        console.log('Form innerHTML set');

		setUpNumberAnimation(form);
		modifyStatus(form, userData.status);
        console.log('Event listeners set');

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

		addCamembert(form, userData.played_games, userData.won_games);

    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
        form.innerHTML = '<p>Failed to load user profile</p>';
    });


    return form;
};

export { DashStat };
