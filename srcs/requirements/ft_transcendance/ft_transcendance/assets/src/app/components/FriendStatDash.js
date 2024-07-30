import { animateNumbers, setupCamembertAnimation } from "../animation/DashboardAnimation.js";
import { get, post, del } from "../services/Api.js";

export const FriendDashStat = () => {
    console.log("enter in friendprofile component")
    let form = document.createElement("div");

    const path = window.location.hash.split('/');
    const username = path[path.length - 1];

    get(`https://localhost/api/users/${username}/`)
        .then(response => {
            return response.json();
        })
        .then(userData => {
            if (userData.detail === "No User matches the given query.") {
                throw new Error("L'utilisateur n'existe pas");
            }
            console.log('Fetched user data:', userData);

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
					<div class="right-side">
						<div class="stat-data">
							<div class="stat-rubric-stat">
								<p class="stat-text">Points marqués :</p>
								<p class="stat-number"> ${userData.scored_points}</p>
							</div>
							<div class="stat-rubric-stat">
								<p class="stat-text">Points concédés :</p>
								<p class="stat-number"> ${userData.conceded_points}</p>
							</div>
							<div class="stat-rubric-stat">
								<p class="stat-text">Victoires parfaites :</p>
								<p class="stat-number"> ${userData.perfect_wins}</p>
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
					<a class="nav-link" href="#/publicgamehistory/${username}">         
						<div class="footer-friend" id="list-stat-friend">
							<i class="bi bi-clock-history footer-friend-icon"></i>
							<p class="footer-friend-text">Historique des parties de ${username}</p>
						</div>
					</a>
				</div>
			</div>
            `;

            setTimeout(() => {
                const numbers = form.querySelectorAll('.stat-number-stat');
                numbers.forEach(number => {
                    const target = +number.getAttribute('data-target');
                    animateNumbers(number, target);
                });
            }, 500);

		    let percentage = 0;
            let color = "#63aa63";
            if (userData.played_games !== 0) {
                percentage = ((userData.played_games - userData.won_games) * 100) / userData.played_games;
            } else {
                color = "#fef86c";
            }

		    setupCamembertAnimation(form, percentage, color);

		    window.addEventListener('resize', () => {
                setupCamembertAnimation(form, percentage, color);
            });

            form.querySelector('#search-button').addEventListener('click', () => {
                const loginSearchInput = document.getElementById("login-search");
                const username = loginSearchInput.value;
                if (username) {
                    if (isUserSelf(username, userData.username)) {
                        alert("Vous ne pouvez pas accéder à votre propre profil.");
                    } else {
                        window.location.href = `#/friendprofile/${username}`;
                    }
                    loginSearchInput.value = "";
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

    const section = document.getElementById('section');
    section.innerHTML = '';
    section.appendChild(form);
    
};

function getStatusColor(status) {
    switch (status) {
        case 'online':
            return 'green';
        case 'offline':
            return 'grey';
		case 'in game':
				return 'orange';
        default:
            return 'red';
    }
}

const isUserSelf = (searchedUsername, currentUsername) => {
    return searchedUsername === currentUsername;
};

function addFriend(username) {

	const url = `https://localhost/api/users/add-friend/${username}/`;
    post(url)
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => { throw new Error(data.detail || 'Failed to add friend'); });
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert('Friend added successfully');
    })
    .catch(error => {
        console.error('Error adding friend:', error);
        alert(error.message || 'Failed to add friend');
    });
}

function deleteFriend(username) {

	const url = `https://localhost/api/users/unfriend/${username}/`;
    del(url)
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => { throw new Error(data.detail || 'Failed to remove friend'); });
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert('Friend removed successfully');
    })
    .catch(error => {
        console.error('Error removing friend:', error);
        alert(error.message || 'Failed to remove friend');
    });
}

