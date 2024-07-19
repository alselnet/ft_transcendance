import { animateNumbers } from "../animation/DashboardAnimation.js";
import { getCookie } from '../utils/cookies';

const DashStat = () => {
    let form = document.createElement("div");
    console.log('Creating form element');

    fetch('https://localhost/api/users/me/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        return response.json();
    })
    .then(userData => {
        console.log('Fetched user data:', userData);

        form.innerHTML = `
        <div class="left-side-stat">
            <div class="id-stat">
                <div><img src="${userData.avatar}" alt="profile-pic" class="profile-picture-stat"></div>
                
                <div class="text-stat">
                    <div class="name-and-settings">
                        <div class="username-stat">${userData.username}</div>
                        <a class="nav-link" href="#/settings"><i class="bi bi-gear-fill gear-icon"></i></a>
                    </div>
                    <div class="status-stat">
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
                                        <div class="status-pastille" style="background-color: green;"></div>
                                        <div class="status-text">Online</div>
                                    </div>
                                </li>
                                <li class="dropdown-item" data-status="offline">
                                    <div class="status-dropdown">
                                        <div class="status-pastille" style="background-color: red;"></div>
                                        <div class="status-text">Offline</div>
                                    </div>
                                </li>
                            </ul>
                        </div>            
                    </div>
                </div>
            </div>

            <div class="statistics-stat">
                <div class="left-side-stat-stat">
                    <div class="stat-title-stat">Statistiques du joueur :</div>
                    <div class="camembert-stat">
					</div>
                </div>
                <div class="right-side-stat-stat">
                    <div class="stat-data-stat">
                        <div class="stat-rubric-stat">
                            <p class="stat-text-stat">Points concédés :</p>
                            <p class="stat-number-stat" data-target="${userData.conceded_points}">0</p>
                        </div>
                        <div class="stat-rubric-stat">
                            <p class="stat-text-stat">Points marqués :</p>
                            <p class="stat-number-stat" data-target="${userData.scored_points}">0</p>
                        </div>
                        <div class="stat-rubric-stat">
                            <p class="stat-text-stat">Victoires parfaites :</p>
                            <p class="stat-number-stat" data-target="${userData.perfect_wins}">0</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="friends-and-leaderboard-stat">
                <a class="nav-link" href="#/leaderboard">
                    <div class="leaderboard-stat" id="leaderboard-stat">
                        <i class="bi bi-trophy-fill trophy-icon"></i>
                        <p class="leader-text-stat">Leaderboard</p>
                    </div>
                </a>
                <a class="nav-link" href="#/friendlist">         
                    <div class="friends-list-stat" id="list-stat">
                        <i class="bi bi-list-task list-icon"></i>
                        <p class="list-text-stat">Liste d'amis</p>
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
                fetch('https://localhost/api/users/update_status/', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken'),
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify({ status: newStatus })
                })
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

document.addEventListener("DOMContentLoaded", () => {
    console.log('DOMContentLoaded event');
    const rootElement = document.getElementById('root');
    if (rootElement) {
        const dashStatElement = DashStat();
        console.log('Appending DashStat element:', dashStatElement);
        rootElement.appendChild(dashStatElement);
    } else {
        console.error('Root element not found');
    }
});

// Function to get appropriate status color
function getStatusColor(status) {
    switch (status) {
        case 'online':
            return 'green';
        case 'offline':
            return 'red';
        case 'in_game':
            return 'yellow';
        default:
            return 'grey';
    }
}

export { DashStat };
