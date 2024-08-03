import { deleteProcess } from "../functions/DeleteAccountFunctions.js";

const DeleteAccount = async () => {
    let section = document.querySelector("#section");

    section.innerHTML = `
        <div class="container-update-data">
            <div class="update-data-form">
                <h1 class="title-update-data">Supprimer le Compte</h1>
                <p>Veuillez entrer votre mot de passe pour confirmer la suppression du compte.</p>
                <input type="password" id="delete-password" placeholder="Mot de passe" required>
                <button class="button-update-data" id="submit-delete-account">Supprimer le compte</button>
                <button class="button-update-data" id="cancel-delete-account">Annuler</button>
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
