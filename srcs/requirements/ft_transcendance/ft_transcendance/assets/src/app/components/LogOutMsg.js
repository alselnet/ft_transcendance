import { LogOutUser } from "../functions/LogOutFunctions";
import { removeMainComponent } from "../functions/MainFunctions.js";

const LogOutMsg = async () => {
    let msg = document.querySelector("#section");

    removeMainComponent();
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

export { LogOutMsg };