import { checkAuth, get } from "../services/Api.js";
import { sendConfirmationEmail, updateAvatar, update2FA, update2FAActiveClass,
      initializeSettingsPage, searchLogin,
      updateDataSettings, } from "../functions/SettingsFunctions.js";

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`
const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`

const Settings = async () => {
   let section = document.querySelector("#section");

   const isAuthenticated = await checkAuth();
   if (!isAuthenticated) {
       throw new Error('User is not authenticated');
   }

    get(`${usersUrl}/me/`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        return response.json();
    })
    .then(userData => {
       const emailConfirmationBanner = userData.mail_confirmation_status ? '' : `
           <div class="confirm-email">
               votre adresse mail doit etre verifiee : 
               <a href="" id="resend-verification-email">renvoyer un mail de verification</a>
           </div>`;

       section.innerHTML = 
           ` 
        <div class="settings-container">
            <h1 class="settings-title">Parametres du compte</h1>
            <div class="settings-box">
            <div class="editting">
               <div class="picture-wrapper">
                   <img src="${userData.avatar}" class="settings-picture" alt="settings-pic">
                   <a href="#" class="edit-pp">modifier</a>
               </div>
               <input type="file" id="avatar-input" style="display: none;" accept="image/*">
            </div>
            <div class="all-modif">
               <div class="modif-user">
                   <div class="modif-username">
                       <p class="current-data">${userData.username}</p>
                       <button href="#/update-username" type="button" class="btn btn-light btn-modif-settings"
                           id="edit-username">modifier
                           username</button>
                   </div>
                   <div class="modif-username">
                       <p class="current-data">${userData.email}</p>
                       <button href="#/update-email" type="button" class="btn btn-light btn-modif-email"
                           id="edit-email">modifier
                           adresse
                           mail</button>
                   </div>
                   <div class="modif-username">
                       <p class="current-data">********</p>
                       <button href="#/update-password" type="button" class="btn btn-light btn-modif-psw"
                           id="edit-password">modifier
                           mot
                           de passe</button>
                   </div>
               </div>
               <div class="modif-website">
                   <div class="dropdown drop-settings">
                       <button class="btn btn-secondary dropdown-toggle set-drop" type="button"
                           id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                           methode 2fa
                       </button>
                       <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                           <li><a class="dropdown-item" id="tfa-none">aucune</a></li>
                           <li><a class="dropdown-item" id="tfa-email">mail</a></li>
                           <li><a class="dropdown-item" id="tfa-authenticator">qrcode</a></li>
                       </ul>
                   </div>

                   <div class="dropdown drop-settings">
                       <button class="btn btn-secondary dropdown-toggle set-drop" type="button"
                           id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                           couleur de l'arriere plan
                       </button>
                       <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                           <li><a class="dropdown-item" href="#/settings" data-bg-class="bg-nagoya">Nagoya</a></li>
                           <li><a class="dropdown-item" href="#/settings" data-bg-class="bg-roland">Roland</a></li>
                           <li><a class="dropdown-item" href="#/settings" data-bg-class="bg-wimbledon">Wimbledon</a></li>
                       </ul>
                   </div>

               </div>
           </div>
           <button type="button" href="#" class="btn btn-danger delete-account" id="delete-account">supprimer le compte</button>

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

           <a class="nav-link" href="#/chartemsg">
               <div class="charte-footer" id="list-stat">
                   <i class="bi bi-file-earmark-lock settings-footer-icon"></i>
                   <p class="settings-footer-text">Charte de confidentialite</p>
               </div>
           </a>
       </div>
       ${emailConfirmationBanner}

   </div>
       `;

       if (userData.fortytwo_account === true) {
		section.querySelector('.edit-pp').style.display = 'none';
	} else {
		section.querySelector('.edit-pp').addEventListener('click', (event) => {
			event.preventDefault();
			section.querySelector('#avatar-input').click();
		});

		section.querySelector('#avatar-input').addEventListener('change', (event) => {
			const file = event.target.files[0];
			if (file) {
				updateAvatar(file);
			}
		});
	}

        const loginSearchInput = section.querySelector("#login-search");
        const searchButton = section.querySelector("#search-button");

		searchButton.addEventListener('click', () => {
			searchLogin(loginSearchInput, userData.username);
		});
		
        loginSearchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                searchLogin(loginSearchInput, userData.username);
            }
        });

        updateDataSettings();
        update2FAActiveClass(userData.two_fa_method);

       if (userData.mail_confirmation_status == false)
       {
           section.querySelector('#resend-verification-email').addEventListener('click', (event) => {
               event.preventDefault();
               sendConfirmationEmail(userData.email);
           });
       }

       if (userData.fortytwo_account === true) {
            document.getElementById('edit-username').disabled = true;
            document.getElementById('edit-email').disabled = true;
            document.getElementById('edit-password').disabled = true;
        }
        
        section.querySelector('#delete-account').addEventListener('click', (event) => {
            event.preventDefault();
            if (userData.fortytwo_account === true) {
                window.location.href = '#/delete-account-42';
            }
            else {
                window.location.href = '#/delete-account';
            }
        });

       initializeSettingsPage();
   })
   .catch(error => {
       console.error('Error fetching user profile:', error);
       section.innerHTML = '<p>Failed to load user profile</p>';
   })
   
};

export { Settings };

