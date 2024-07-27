import { animateNumbers } from "../animation/DashboardAnimation.js";
import { get, put } from "../services/Api.js"

const DashStat = () => {
    let form = document.createElement("div");
    console.log('Creating form element');

    get('https://localhost/api/users/me/')
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
											<div class="status-pastille" style="background-color: green;></div>
											<div class="status-text">Online</div>
										</div>
									</li>
									<li class="dropdown-item" data-status="offline">
										<div class="status-dropdown">
											<div class="status-pastille" style="background-color: red;></div>
											<div class="status-text">Offline</div>
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
					<div class="right-side">
						<div class="stat-data">
							<div class="stat-rubric-stat">
								<p class="stat-text">Points concédés :</p>
								<p class="stat-number" data-target="${userData.conceded_points}">0</p>
							</div>
							<div class="stat-rubric-stat">
								<p class="stat-text">Points marqués :</p>
								<p class="stat-number" data-target="${userData.conceded_points}">0</p>
							</div>
							<div class="stat-rubric-stat">
								<p class="stat-text">Victoires parfaites :</p>
								<p class="stat-number" data-target="${userData.conceded_points}">0</p>
							</div>
						</div>
					</div>
				</div>

				<div class="footer-link">
					<a class="nav-link" href="#/friendlist">         
						<div class="footer" id="list-stat">
							<i class="bi bi-list-task footer-icon"></i>
							<p class="footer-text">Liste d'amis</p>
						</div>
					</a>
					<a class="nav-link" href="#/gamehistory">         
						<div class="footer" id="list-stat">
							<i class="bi bi-clock-history footer-icon"></i>
							<p class="footer-text">Historique des parties</p>
						</div>
					</a>
					<a class="nav-link" href="#/chartemsg">         
						<div class="footer" id="list-stat">
							<i class="bi bi-file-earmark-lock footer-icon"></i>
							<p class="footer-text">Charte de confidentialite</p>
						</div>
					</a>
					<a class="nav-link" href="#/searchuser">         
						<div class="footer" id="list-stat">
							<i class="bi bi-search footer-icon"></i>
							<p class="footer-text">Rechercher un utilisateur</p>
						</div>
					</a>
				</div>
			</div>

        `;
        console.log('Form innerHTML set');

        setTimeout(() => {
            const numbers = form.querySelectorAll('.stat-number-stat');
            numbers.forEach(number => {
                const target = +number.getAttribute('data-target');
                animateNumbers(number, target);
            });
            console.log('Animation set');
        }, 500);

        // Handle dropdown item click
        form.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                const newStatus = item.getAttribute('data-status');
                put('https://localhost/api/users/update_status/', { status: newStatus })
                .then(updateResponse => {
                    if (!updateResponse.ok) {
                        throw new Error('Failed to update user status');
                    }
                    return updateResponse.json();
                })
                .then(() => {
                    // Update the UI with the new status
                    userData.status = newStatus;
                    const statusText = form.querySelector('.status-text');
                    const statusPastille = form.querySelector('.status-pastille');
                    if (statusText && statusPastille) {
                        statusText.innerText = newStatus;
                        statusPastille.style.backgroundColor = getStatusColor(newStatus);
                    }
                })
                .catch(error => {
                    console.error('Error updating status:', error);
                });
            });
        });
        console.log('Event listeners set');
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
        form.innerHTML = '<p>Failed to load user profile</p>';
    });

    return form;
};

// Function to get appropriate status color
function getStatusColor(status) {
    switch (status) {
        case 'online':
            return 'green';
        case 'offline':
            return 'red';
        default:
            return 'grey';
    }
}

export { DashStat };
