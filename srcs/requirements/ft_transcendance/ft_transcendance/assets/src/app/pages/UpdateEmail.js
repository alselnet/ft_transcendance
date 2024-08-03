import { removeMainComponent } from "../functions/MainFunctions.js";
import { updateEmailSettings } from "../functions/UpdateDataFunctions.js";

const UpdateEmail = async () => {

    removeMainComponent();
    let section = document.querySelector("#section");

    section.innerHTML = `
        <div class="container-update-data">
            <div class="update-data-form">
                <h1 class="title-update-data">Modifier l'adresse mail</h1>
                <input type="text" id="new-data" placeholder="Nouvelle adresse mail" required>
                <input type="password" id="password" placeholder="Mot de passe" required>
                <button class="button-update-data" id="submit-update-email">Mettre à jour</button>
                <button class="button-update-data" id="cancel-update-email">Annuler</button>
            </div>
        </div>
    `;
    updateEmailSettings();

    document.getElementById('cancel-update-email').addEventListener('click', () => {
        window.location.hash = '#/settings';
    });

    return section;
};

export { UpdateEmail };
