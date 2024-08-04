import { removeMainComponent } from "../functions/MainFunctions.js";
import { updateUsernameSettings } from "../functions/UpdateDataFunctions.js";


const UpdateUsername = async () => {

    removeMainComponent();
    let section = document.querySelector("#section");

    section.innerHTML = `
    <div class="container-update-data">
        <div class="update-data-form">
            <h1 class="title-update-data">Modifier le Nom d'utilisateur</h1>
            <input type="text" id="new-data" class="input-update-data" placeholder="Nouveau nom d'utilisateur" required>
            <input type="password" id="password" class="input-update-data" placeholder="Mot de passe" required>
            <button class="button-update-data" id="submit-update-username">Mettre à jour</button>
            <button class="button-update-data" id="cancel-update-username">Annuler</button>
        </div>
    </div>
    `;
    updateUsernameSettings();

    document.getElementById('cancel-update-username').addEventListener('click', () => {
        window.location.hash = '#/settings';
    });

    return section;
};

export { UpdateUsername };
