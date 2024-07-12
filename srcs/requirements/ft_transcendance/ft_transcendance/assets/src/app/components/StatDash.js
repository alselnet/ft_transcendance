import { animateNumbers } from "../animation/DashboardAnimation.js";

const DashStat = async () => {
    let form = document.createElement("div");

    try {
        const response = await fetch('https://localhost/api/users/me/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const userData = await response.json();

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
                                <li class="dropdown-item" data-status="in_game">
                                    <div class="status-dropdown">
                                        <div class="status-pastille" style="background-color: yellow;"></div>
                                        <div class="status-text">In Game</div>
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
                    <div class="camambert-stat"></div>
                </div>
                <div class="right-side-stat-stat">
                    <div class="stat-data-stat">
                        <div class="stat-rubric-stat">
                            <p class="stat-text-stat">Partie(s) jouée(s)</p>
                            <p class="stat-number-stat" data-target="${userData.gamesPlayed}">0</p>
                        </div>
                        <div class="stat-rubric-stat">
                            <p class="stat-text-stat">Adversaire(s) rencontré(s)</p>
                            <p class="stat-number-stat" data-target="${userData.opponentsMet}">0</p>
                        </div>
                        <div class="stat-rubric-stat">
                            <p class="stat-text-stat">Temps de jeu (s)</p>
                            <p class="stat-number-stat" data-target="${userData.playTime}">0</p>
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

        setTimeout(() => {
            const numbers = form.querySelectorAll('.stat-number-stat');
            numbers.forEach(number => {
                const target = +number.getAttribute('data-target');
                animateNumbers(number, target);
            });
        }, 500);

        // Handle dropdown item click
        form.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', async () => {
                const newStatus = item.getAttribute('data-status');
                try {
                    const updateResponse = await fetch('https://localhost/api/users/update-status', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify({ status: newStatus })
                    });

                    if (!updateResponse.ok) {
                        throw new Error('Failed to update user status');
                    }

                    // Update the UI with the new status
                    userData.status = newStatus;
                    document.querySelector('.status-text').innerText = newStatus;
                    document.querySelector('.status-pastille').style.backgroundColor = getStatusColor(newStatus);
                } catch (error) {
                    console.error('Error updating status:', error);
                }
            });
        });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        form.innerHTML = '<p>Failed to load user profile</p>';
    }

    return form;
};

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById('root').appendChild(await DashStat());
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


// import { animateNumbers } from "../animation/DashboardAnimation.js";

// const DashStat = async () => {
//     let form = document.createElement("div");

//     try {
//         const response = await fetch('https://localhost/api/users/me', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch user profile');
//         }

//         const userData = await response.json();

//         form.innerHTML = `
//         <div class="left-side-stat">
//             <div class="id-stat">
//                 <div><img src="./app/images/tmejri_avatar.png" alt="profile-pic" class="profile-picture-stat"></div>
                
//                 <div class="text-stat">
//                     <div class="name-and-settings">
//                         <div class="username-stat">${userData.username}</div>
//                         <a class="nav-link" href="#/settings"><i class="bi bi-gear-fill gear-icon"></i></a>
//                     </div>
//                     <div class="status-stat">
//                         <div class="dropdown">
//                             <button class="btn btn-secondary dropdown-toggle transparent-dropdown d-flex align-items-center" type="button"
//                                 id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
//                                 <div class="status-dropdown">
//                                     <div class="green-pastille"></div>
//                                     <div class="status-text">${userData.status}</div>
//                                 </div>
//                             </button>
//                             <ul class="dropdown-menu transparent-dropdown" aria-labelledby="dropdownMenuButton1">
//                                 <li class="dropdown-item transparent-dropdown">
//                                     <div class="status-dropdown">
//                                         <div class="green-pastille"></div>
//                                         <div class="status-text">en ligne</div>
//                                     </div>
//                                 </li>
//                                 <li class="dropdown-item transparent-dropdown">
//                                     <div class="status-dropdown">
//                                         <div class="red-pastille"></div>
//                                         <div class="status-text">hors ligne</div>
//                                     </div>
//                                 </li>
//                             </ul>
//                         </div>            
//                     </div>
//                 </div>
//             </div>

//             <div class="statistics-stat">
//                 <div class="left-side-stat-stat">
//                     <div class="stat-title-stat">Statistiques du joueur :</div>
//                     <div class="camambert-stat"></div>
//                 </div>
//                 <div class="right-side-stat-stat">
//                     <div class="stat-data-stat">
//                         <div class="stat-rubric-stat">
//                             <p class="stat-text-stat">Partie(s) jouée(s)</p>
//                             <p class="stat-number-stat" data-target="${userData.gamesPlayed}">0</p>
//                         </div>
//                         <div class="stat-rubric-stat">
//                             <p class="stat-text-stat">Adversaire(s) rencontré(s)</p>
//                             <p class="stat-number-stat" data-target="${userData.opponentsMet}">0</p>
//                         </div>
//                         <div class="stat-rubric-stat">
//                             <p class="stat-text-stat">Temps de jeu (s)</p>
//                             <p class="stat-number-stat" data-target="${userData.playTime}">0</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div class="friends-and-leaderboard-stat">
//                 <a class="nav-link" href="#/leaderboard">
//                     <div class="leaderboard-stat" id="leaderboard-stat">
//                         <i class="bi bi-trophy-fill trophy-icon"></i>
//                         <p class="leader-text-stat">Leaderboard</p>
//                     </div>
//                 </a>
//                 <a class="nav-link" href="#/friendlist">         
//                     <div class="friends-list-stat" id="list-stat">
//                         <i class="bi bi-list-task list-icon"></i>
//                         <p class="list-text-stat">Liste d'amis</p>
//                     </div>
//                 </a>
//             </div>
//         </div>
//         `;

//         setTimeout(() => {
//             const numbers = form.querySelectorAll('.stat-number-stat');
//             numbers.forEach(number => {
//                 const target = +number.getAttribute('data-target');
//                 animateNumbers(number, target);
//             });
//         }, 500);
//     } catch (error) {
//         console.error('Error fetching user profile:', error);
//         form.innerHTML = '<p>Failed to load user profile</p>';
//     }

//     return form;
// };

// document.addEventListener("DOMContentLoaded", async () => {
//     document.getElementById('root').appendChild(await DashStat());
// });

// export { DashStat };

