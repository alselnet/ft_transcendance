import { get } from "../services/Api.js";

export const FriendList = async () => {
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
        const response = await get('https://localhost/api/users/friendlist/');
        if (!response.ok) {
            throw new Error('Failed to fetch user friendlist');
        }
        const data = await response.json();
        const friends = Array.isArray(data) ? data : [];
        
        const rows = friends.map(friend => `
            <tr>
                <td><img src="${friend.avatar}" alt="${friend.username}"></td>
                <td><span class="userf">${friend.username}</span></td>
                <td><span class="remove-btnf">&times;</span></td>
            </tr>
        `).join('');

        let section = document.querySelector("#section");
        if (section) {
            section.innerHTML = `
                <div class="main-containerf fl-hidden">
				<div class="friends-containerf">
					<h2 class="titlef">LISTE D'AMIS</h2>
					<a class="nav-link" href="#/dashboard">
						<span class="close-btnf">&times;</span>
					</a>
					<table class="friends-tablef">
						<tbody>
							${rows}
						</tbody>
					</table>
					<div class="friend-count">
						Nombre d'amis: ${friends.length}
					</div>
				</div>
                </div>
            `;
        }

        const friendsListContainer = document.querySelector('.main-containerf');
        if (friendsListContainer) {
            setTimeout(() => {
                friendsListContainer.classList.remove('fl-hidden');
                friendsListContainer.classList.add('fl-visible');
            }, 10);
        }
    } catch (error) {
		console.error('Error fetching friend list:', error);
    }
};
