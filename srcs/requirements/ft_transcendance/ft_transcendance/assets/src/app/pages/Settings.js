import { checkAuth, get, put, post } from "../services/Api.js";

const sendConfirmationEmail = (email) => {
    console.log("Send Mail");
    post('https://localhost/api/auth/send-confirmation-email/', { email })
        .then(response => {
            if (response.ok) {
                alert('Confirmation email sent');
            } else {
                return response.json().then(errorData => {
                    alert(`Error: ${errorData.error || 'Failed to send confirmation email'}`);
                });
            }
        })
        .catch(error => {
            console.error('Error sending confirmation email:', error);
            alert('An error occurred while sending the confirmation email');
        });
};

const update2FA = (newMethod) => {
	console.log("Update 2FA Method");
    post('https://localhost/api/auth/update-2fa/', { method: newMethod })
        .then(response => {
            if (response.ok) {
                return response.json().then(updateData => {
                    alert('2FA method updated successfully');
                });
            } else {
                return response.json().then(errorData => {
                    alert(`Error: ${errorData.error || 'Failed to update 2FA method'}`);
                });
            }
        })
        .catch(error => {
            console.error('Error updating 2FA method:', error);
            alert('An error occurred while updating the 2FA method');
        });
};

const updateUsername = (newUsername) => {
    console.log("Update Username");
    put('https://localhost/api/users/update-username/', { username: newUsername })
        .then(response => {
            if (response.ok) {
                return response.json().then(updateData => {
                    document.querySelector('#username-display').textContent = updateData.username;
                    alert('Username updated successfully');
                });
            } else {
                return response.json().then(errorData => {
                    alert(`Error: ${errorData.error || 'Failed to update username'}`);
                });
            }
        })
        .catch(error => {
            console.error('Error updating username:', error);
            alert('An error occurred while updating the username');
        });
};

const updateEmail = (newEmail) => {
    console.log("Update Email");
    put('https://localhost/api/users/update-email/', { email: newEmail })
        .then(response => {
            if (response.ok) {
                return response.json().then(updateData => {
                    document.querySelector('#email-display').textContent = updateData.email;
                    alert('Email updated successfully');
                });
            } else {
                return response.json().then(errorData => {
                    alert(`Error: ${errorData.error || 'Failed to update email'}`);
                });
            }
        })
        .catch(error => {
            console.error('Error updating email:', error);
            alert('An error occurred while updating the email');
        });
};

const Settings = async () => {
    let form = document.createElement("div");

    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }

    get('https://localhost/api/users/me/')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        return response.json();
    })
    .then(userData => {
        console.log('Fetched user data:', userData);

        section.innerHTML = 
            `
            <div class="settings-container">
                <h1 class="settings-title">Parametre du compte</h1>
                <div class="settings-box">
                    <div class="editting">
                        <img src="${userData.avatar}" class="settings-picture" alt="settings-pic">
                        <p class="edit-pp">modifier</p>
                    </div>
                    <div class="modif-username">
                        <p id="username-display">${userData.username}</p>
                        <button type="button" id="edit-username" class="btn btn-light">modifier username</button>
                    </div>
                    <div class="modif-username">
                        <p id="email-display">${userData.email}</p>
                        <button type="button" id="edit-email" class="btn btn-light">modifier adresse mail</button>
                    </div>
                    <div class="modif-username">
                        <p>********</p>
                        <button type="button" class="btn btn-light">modifier mot de passe</button>
                    </div>

                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        methode 2fa
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" id="tfa-none">aucune</a></li>
                        <li><a class="dropdown-item" id="tfa-email">mail</a></li>
                        <li><a class="dropdown-item" id="tfa-authenticator">qrcode</a></li>
                        </ul>
                    </div>

                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        couleur de l'arriere plan
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Nagoya</a></li>
                        <li><a class="dropdown-item" href="#">Roland Garros</a></li>
                        <li><a class="dropdown-item" href="#">Le chenet</a></li>
                        </ul>
                    </div>
                    
                    <button type="button" class="btn btn-danger delet-account">supprimer le compte</button>

                </div>

                <div class="settings-footer">
                    
                    <div class="search-container">
                        <div class="search-barre">
                            <input type="text" id="login-search" placeholder="Entrez le nom de l'utilisateur">
                        </div>
                        <button type="button" id="search-button">
                            <i class="bi bi-search search-icon"></i>
                        </button>
                    </div>

                    <a class="nav-link" href="#/confidentalite">         
                        <div class="settings-footer" id="list-stat">
                            <i class="bi bi-file-earmark-lock settings-footer-icon"></i>
                            <p class="settings-footer-text">Charte de confidentialite</p>
                        </div>
                    </a>
                </div>

                <div class="confirm-email">
                    votre adresse mail doit etre verifiee : 
                    <a id="resend-verification-email">renvoyer un mail de verification</a>
                </div>

            </div>

        `;

		section.querySelector('#resend-verification-email').addEventListener('click', (event) => {
            event.preventDefault();
            sendConfirmationEmail(userData.email);
        });

        section.querySelector('#edit-username').addEventListener('click', (event) => {
            const newUsername = prompt(`Entrez le nouveau nom d'utilisateur :`, userData.username);
            if (newUsername && newUsername !== userData.username) {
                updateUsername(newUsername);
            }
        });

		section.querySelector('#edit-email').addEventListener('click', (event) => {
            const newEmail = prompt(`Entrez la nouvelle adresse mail :`, userData.email);
            if (newEmail && newEmail !== userData.email) {
                updateEmail(newEmail);
            }
        });

		section.querySelector('#tfa-none').addEventListener('click', () => {
            update2FA('none');
        });

        section.querySelector('#tfa-email').addEventListener('click', () => {
            update2FA('email');
        });

        section.querySelector('#tfa-authenticator').addEventListener('click', () => {
            update2FA('authenticator');
        });
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
        form.innerHTML = '<p>Failed to load user profile</p>';
    })

    return form;
};

export { Settings };