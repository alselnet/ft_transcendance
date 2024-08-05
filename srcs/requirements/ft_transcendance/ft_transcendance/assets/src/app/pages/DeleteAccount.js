import { deleteProcess } from "../functions/DeleteAccountFunctions.js";
import { removeMainComponent } from "../functions/MainFunctions.js";

const DeleteAccount = async () => {
    removeMainComponent();
    let section = document.querySelector("#section");

    section.innerHTML = `
        <div class="container-delete-data">
            <div class="delete-data-form">
                <h1 class="title-delete-data">Supprimer le Compte</h1>
                <p>Veuillez entrer votre mot de passe pour confirmer la suppression du compte.</p>
                <input type="password" id="delete-password" class="input-delete-data" placeholder="Mot de passe" required>
                <button class="button-delete-data" id="submit-delete-account">Supprimer le compte</button>
                <button class="button-delete-data" id="cancel-delete-account">Annuler</button>
            </div>
        </div>
    `;

    deleteProcess();
    
    document.getElementById('cancel-delete-account').addEventListener('click', () => {
        window.location.hash = '#/settings';
    });

    return section;
};

export { DeleteAccount };
