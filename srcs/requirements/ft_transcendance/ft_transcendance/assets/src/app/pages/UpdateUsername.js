import { put } from "../services/Api.js";
import { removeMainComponent } from "../functions/MainFunctions.js";

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`

const UpdateUsername = async () => {

    removeMainComponent();
    let section = document.querySelector("#section");

    section.innerHTML = `
         <div class="container-update-data">
        <div class="update-data-form">
            <h1 class="title-update-data">Modifier le Nom d'utilisateur</h1>
            <input type="text" id="new-data" calss="update-input" placeholder="Nouveau nom d'utilisateur" required>
            <input type="password" id="password" calss="update-input" placeholder="Mot de passe" required>
            <button class="button-update-data" id="submit-update-username">Mettre à jour</button>
            <button class="button-update-data" id="cancel-update-username">Annuler</button>
        </div>
    </div>
    `;

    document.getElementById('submit-update-username').addEventListener('click', async () => {
        const newUsername = document.getElementById('new-data').value;
        const password = document.getElementById('password').value;

        if (newUsername && password) {
            try {
                const response = await put(`${usersUrl}/update-username/`, { username: newUsername, password: password });

                if (response.ok) {
                    const updateData = await response.json();
                    alert('Username updated successfully');
					window.location.hash = '#/settings';
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error || 'Failed to update username'}`);
                }
            } catch (error) {
                console.error('Error updating username:', error);
                alert('An error occurred while updating the username');
            }
        } else {
            alert('Please enter both username and password');
        }
    });

    document.getElementById('cancel-update-username').addEventListener('click', () => {
        window.location.hash = '#/settings';
    });

    return section;
};

export { UpdateUsername };
