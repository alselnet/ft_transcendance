import { put } from "../services/Api.js";

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`

const UpdateEmail = async () => {
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

    document.getElementById('submit-update-email').addEventListener('click', async () => {
        const newEmail = document.getElementById('new-data').value;
        const password = document.getElementById('password').value;

        if (newEmail && password) {
            try {
                const response = await put(`${usersUrl}/update-email/`, { email: newEmail, password: password });

                if (response.ok) {
                    const updateData = await response.json();
                    alert('Email updated successfully');
					window.location.hash = '#/settings';
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error || 'Failed to update email'}`);
                }
            } catch (error) {
                console.error('Error updating email:', error);
                alert('An error occurred while updating the email');
            }
        } else {
            alert('Please enter both email and password');
        }
    });

    document.getElementById('cancel-update-email').addEventListener('click', () => {
        window.location.hash = '#/settings';
    });

    return section;
};

export { UpdateEmail };
