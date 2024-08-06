import { deleteProcess42 } from "../functions/Delete42AccountFunctions.js";
import { removeMainComponent } from "../functions/MainFunctions.js";

const DeleteAccount42 = async () => {
    removeMainComponent();
    let section = document.querySelector("#section");

    section.innerHTML = `
        <div class="container-update-data">
            <div class="update-data-form">
                <h1 class="title-update-data">Supprimer le Compte</h1>
                <p>Confirmer la suppression du compte.</p>
                <button class="button-update-data" id="submit-delete-account">Supprimer le compte</button>
                <button class="button-update-data" id="cancel-delete-account">Annuler</button>
            </div>
        </div>
    `;
    deleteProcess42();
    document.getElementById('cancel-delete-account').addEventListener('click', () => {
        window.location.hash = '#/settings';
    });

    return section;
};

export { DeleteAccount42 };
