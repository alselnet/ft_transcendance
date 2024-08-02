import { del } from "../services/Api.js";

const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`

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

    document.getElementById('submit-delete-account').addEventListener('click', async () => {
        const password = document.getElementById('delete-password').value;

        if (password) {
            if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
                try {
                    const response = await del(`${authUrl}/delete-user/`, { password });

                    if (response.ok) {
                        alert('Compte supprimé avec succès');
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        window.location.hash = '#/';
                    } else {
                        const errorData = await response.json();
                        alert(`Erreur : ${errorData.error || 'Échec de la suppression du compte'}`);
                    }
                } catch (error) {
                    console.error('Error deleting account:', error);
                    alert('Une erreur est survenue lors de la suppression du compte');
                }
            }
        } else {
            alert('Veuillez entrer votre mot de passe');
        }
    });

    document.getElementById('cancel-delete-account').addEventListener('click', () => {
        window.location.hash = '#/settings';
    });

    return section;
};

export { DeleteAccount };
