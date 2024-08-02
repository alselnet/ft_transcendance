import { checkAuth, get, post} from "../services/Api.js";

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`
const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`

const sendConfirmationEmail = (email) => {
    console.log("Send Mail");
    post(`${authUrl}/send-confirmation-email/`, { email })
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

const updateAvatar = (file) => {
   const formData = new FormData();
   formData.append('avatar', file);

    fetch(`${usersUrl}/update-avatar/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(errorData => {
                throw new Error(errorData.error || 'Failed to update avatar');
            });
        }
    })
    .then(data => {
        document.querySelector('.settings-picture').src = data.avatar;
        alert('Avatar updated successfully');
        window.location.reload();
    })
    .catch(error => {
        console.error('Error updating avatar:', error);
        alert('An error occurred while updating the avatar');
    });
};

const update2FA = (newMethod) => {
	console.log("Update 2FA Method");
    post(`${authUrl}/update-2fa/`, { method: newMethod })
        .then(response => {
            if (response.ok) {
                return response.json().then(updateData => {
                    alert('2FA method updated successfully');
                    window.location.reload();
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
    
const update2FAActiveClass = (method) => {
   document.querySelectorAll('.dropdown-item').forEach(item => {
       item.classList.remove('active-2fa');
   });
   document.querySelector(`#tfa-${method}`).classList.add('active-2fa');
};

const changeBackgroundImage = (imageClass) => {
    console.log("Change Background Image");
    document.body.classList.remove('bg-nagoya', 'bg-roland', 'bg-wimbledon');
    document.body.classList.add(imageClass);
    localStorage.setItem('backgroundClass', imageClass); 
};

const applySavedBackground = () => {
    const savedBackgroundClass = localStorage.getItem('backgroundClass');
    if (savedBackgroundClass) {
        changeBackgroundImage(savedBackgroundClass);
    }
};

const setupBackgroundChangeListeners = () => {
    const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const imageClass = item.getAttribute('data-bg-class');
            if (imageClass) {
                changeBackgroundImage(imageClass);
            }
        });
    });
};

const initializeSettingsPage = () => {
    applySavedBackground();
    setupBackgroundChangeListeners();
};


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
        console.log('Fetched user data:', userData);

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
           <button type="button" href="#" class="btn btn-danger delete-account">supprimer le compte</button>

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
               <div class="chart-footer" id="list-stat">
                   <i class="bi bi-file-earmark-lock settings-footer-icon"></i>
                   <p class="settings-footer-text">Charte de confidentialite</p>
               </div>
           </a>
       </div>
       ${emailConfirmationBanner}

   </div>


       `;

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

       const loginSearchInput = section.querySelector("#login-search");
        const searchButton = section.querySelector("#search-button");

        const searchLogin = () => {
            const username = loginSearchInput.value;
            if (username) {
                if (isUserSelf(username, userData.username)) {
                    alert("Vous ne pouvez pas accéder à votre propre profil.");
                } else {
                    window.location.href = `#/friendprofile/${username}`;
                }
                loginSearchInput.value = "";
            }
        };
        searchButton.addEventListener('click', searchLogin);

        loginSearchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                searchLogin();
            }
        });
        
       section.querySelector('#edit-username').addEventListener('click', (event) => {
           window.location.hash = '#/update-username';
       });

       section.querySelector('#edit-email').addEventListener('click', (event) => {
           window.location.hash = '#/update-email';
       });

       section.querySelector('#edit-password').addEventListener('click', (event) => {
           window.location.hash = '#/update-password';
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
       
       section.querySelector('.delete-account').addEventListener('click', (event) => {
           window.location.hash = '#/delete-account';
       });
       
       update2FAActiveClass(userData.two_fa_method);

       if (userData.mail_confirmation_status == false)
       {
           section.querySelector('#resend-verification-email').addEventListener('click', (event) => {
               event.preventDefault();
               sendConfirmationEmail(userData.email);
           });
       }

       initializeSettingsPage();
   })
   .catch(error => {
       console.error('Error fetching user profile:', error);
       section.innerHTML = '<p>Failed to load user profile</p>';
   })
   
};

export { Settings };

