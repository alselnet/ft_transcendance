import { get } from "../services/Api.js";
import { getStatusColor, getStatusTooltip, deleteFriendList } from "../functions/FriendsListFunctions.js";
import { removeMainComponent } from "../functions/MainFunctions.js";

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`

export const FriendList = async () => {
    
    removeMainComponent();
    try {
        const response = await get(`${usersUrl}/friendlist/`);
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
                friendsListContainer.classList.add('fl-visible');
                friendsListContainer.classList.remove('fl-hidden');
            }, 100);
        }

        const deleteButtons = document.querySelectorAll('.remove-btnf');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const username = button.getAttribute('data-username');
                await deleteFriendList(username);
                FriendList();
            });
        });

    } catch (error) {
        console.error('Error fetching friend list:', error);
    }
};

