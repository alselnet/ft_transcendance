import { put } from "../services/Api.js";
import { removeMainComponent } from "../functions/MainFunctions.js";

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`

const UpdatePassword = async () => {

    removeMainComponent();
    let section = document.querySelector("#section");

    section.innerHTML = `
        <div class="container-update-data">
            <div class="update-data-form">
                <h1 class="title-update-data">Modifier le Mot de Passe</h1>
                <input type="password" id="current-password" placeholder="Mot de passe actuel" required>
                <input type="password" id="new-password" placeholder="Nouveau mot de passe" required>
                <input type="password" id="confirm-password" placeholder="Confirmer le nouveau mot de passe" required>
                <button class="button-update-data" id="submit-update-password">Mettre à jour</button>
                <button class="button-update-data" id="cancel-update-password">Annuler</button>
            </div>
        </div>
    `;

    document.getElementById('submit-update-password').addEventListener('click', async () => {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (currentPassword && newPassword && confirmPassword) {
            if (newPassword === confirmPassword) {
                try {
                    const response = await put(`${usersUrl}/update-password/`, {
                        current_password: currentPassword,
                        new_password: newPassword
                    });

                    if (response.ok) {
                        alert('Password updated successfully');
                        window.location.hash = '#/settings';
                    } else {
                        const errorData = await response.json();
                        alert(`Error: ${errorData.current_password || errorData.new_password || 'Failed to update password'}`);
                    }
                } catch (error) {
                    console.error('Error updating password:', error);
                    alert('An error occurred while updating the password');
                }
            } else {
                alert('New password and confirmation do not match');
            }
        } else {
            alert('Please enter all fields');
        }
    });

    document.getElementById('cancel-update-password').addEventListener('click', () => {
        window.location.hash = '#/settings';
    });

    return section;
};

export { UpdatePassword };
