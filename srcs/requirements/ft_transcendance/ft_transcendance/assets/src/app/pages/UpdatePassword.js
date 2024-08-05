import { removeMainComponent } from "../functions/MainFunctions.js";
import { updatePswSettings } from "../functions/UpdateDataFunctions.js";

const UpdatePassword = async () => {
    removeMainComponent();
    
    let section = document.querySelector("#section");

    section.innerHTML = `
        <div class="container-update-data">
            <div class="update-data-form">
                <h1 class="title-update-data">Modifier le Mot de Passe</h1>
                <input type="password" id="current-password" class="input-update-data" placeholder="Mot de passe actuel" required>
                <input type="password" id="new-password" class="input-update-data" placeholder="Nouveau mot de passe" required>
                <input type="password" id="confirm-password" class="input-update-data" placeholder="Confirmation mdp" required>
                <button class="button-update-data" id="submit-update-password">Mettre à jour</button>
                <button class="button-update-data" id="cancel-update-password">Annuler</button>
            </div>
        </div>
    `;

    updatePswSettings();

    document.getElementById('cancel-update-password').addEventListener('click', () => {
        window.location.hash = '#/settings';
    });

    return section;
};

export { UpdatePassword };
