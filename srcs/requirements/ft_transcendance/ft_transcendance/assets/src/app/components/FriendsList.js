import { checkAuth } from "../services/Api.js"
import Jcointre from '../images/jecointr_avatar.png'

const FriendList = async () => {

    const isAuthenticated = await checkAuth();
    
    if (!isAuthenticated) {
        return;
    }
    
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
    
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = `
        <div class="main-containerf fl-hidden">
        <div class="friends-containerf">
            <h2 class="titlef">FRIENDS LIST</h2>
            <a class="nav-link" href="#/dashboard">
                <span class="close-btnf">&times;</span>
            </a>
            <table class="friends-tablef">
                <tbody>
                    <tr>
                        <td><img src="${Jcointre}" alt="jecointr"> </td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                    <tr>
                        <td><img src="${Jcointre}" alt="jecointr"> </td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                    <tr>
                        <td><img src="${Jcointre}" alt="jecointr"> </td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                    <tr>
                        <td><img src="${Jcointre}" alt="jecointr"></td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                    <tr>
                        <td><img src="${Jcointre}" alt="jecointr"></td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
        `;
        
        const friendsListContainer = document.querySelector('.main-containerf');
        if (friendsListContainer) {
            setTimeout(() => {
                friendsListContainer.classList.add('fl-visible');
                friendsListContainer.classList.remove('fl-hidden');
            }, 0);
        }
    } 
};

export { FriendList };
