import { checkAuth, get, put } from "../services/Api.js";

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
                        <p>${userData.email}</p>
                        <button type="button" class="btn btn-light">modifier adresse mail</button>
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
                        <li><a class="dropdown-item" href="#">${userData.two_fa_method}</a></li>
                        <li><a class="dropdown-item" href="#">aucune</a></li>
                        <li><a class="dropdown-item" href="#">mail</a></li>
                        <li><a class="dropdown-item" href="#">qrcode</a></li>
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
                    <a href="">renvoyer un mail de verification</a>
                </div>

            </div>

        `;

        section.querySelector('#edit-username').addEventListener('click', (event) => {
            const newUsername = prompt(`Entrez le nouveau nom d'utilisateur :`, userData.username);
            if (newUsername && newUsername !== userData.username) {
                updateUsername(newUsername);
            }
        });
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
        form.innerHTML = '<p>Failed to load user profile</p>';
    })

    return form;
};

export { Settings };