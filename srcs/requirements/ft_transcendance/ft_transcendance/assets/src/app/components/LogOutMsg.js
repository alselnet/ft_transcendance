import { post } from "../services/Api.js"

const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`

const LogOutUser = async () => {
    try {
        const response = await post(`${authUrl}/signout/`);

        if (!response.ok) {
            throw new Error('Failed to logout');
        }

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        window.location.href = '#/';
    } catch (error) {
        console.error('Logout error:', error);
        alert('An error occurred while logging out. Please try again.');
    }
};

const LogOutMsg = async () => {

    let msg = document.querySelector("#section");

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

    if (msg) {
        msg.innerHTML =
    `   <div class="frame-LogOutMsg-container">
            <div class="frame-LogOutMsg">
                <p class="msg-confirmation">Êtes-vous sûr(e) de vouloir vous déconnecter ?</p>
                <div class="button-logout">
                    <button type="button" class="btn btn-success" id="logout-yes">Oui</button>
                    <button type="button" class="btn btn-danger" id="logout-no">Non</button>
                </div>
            </div>
        </div>
    `;

        document.getElementById('logout-yes').addEventListener('click', LogOutUser);
        document.getElementById('logout-no').addEventListener('click', () => {
            window.history.back();
        });
    }
};

export { LogOutMsg, LogOutUser };