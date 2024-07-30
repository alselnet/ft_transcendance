import { get, del } from "../services/Api.js";

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
            <tr class="friend-row">
                <td>
                    <a href="#/friendprofile/${friend.username}">
                        <img src="${friend.avatar}" alt="${friend.username}">
                    </a>
                </td>
                <td>
                    <span class="status-circle" style="background-color: ${getStatusColor(friend.status)};" data-tooltip="${getStatusTooltip(friend.status)}"></span>
                </td>
                <td>
                    <a href="#/friendprofile/${friend.username}" class="userf">${friend.username}</a>
                </td>
                <td>
                    <span class="remove-btnf" data-username="${friend.username}">&times;</span>
                </td>
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

        const deleteButtons = document.querySelectorAll('.remove-btnf');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const username = button.getAttribute('data-username');
                await deleteFriend(username);
                FriendList();
            });
        });

    } catch (error) {
        console.error('Error fetching friend list:', error);
    }
};

function getStatusColor(status) {
    switch (status) {
        case 'online':
            return 'green';
        case 'offline':
            return 'grey';
        case 'in-game':
            return 'orange';
        default:
            return 'grey';
    }
}

function getStatusTooltip(status) {
    switch (status) {
        case 'online':
            return 'En ligne';
        case 'offline':
            return 'Déconnecté';
        case 'in-game':
            return 'En partie';
        default:
            return 'Unknown Status';
    }
}

async function deleteFriend(username) {
    const url = `https://localhost/api/users/unfriend/${username}/`;
    try {
        const response = await del(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to remove friend');
        }
        const data = await response.json();
        console.log(data);
        alert('Friend removed successfully');
    } catch (error) {
        console.error('Error removing friend:', error);
        alert(error.message || 'Failed to remove friend');
    }
}