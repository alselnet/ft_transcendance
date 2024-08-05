import { post } from "../services/Api.js";

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`
const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`

const sendConfirmationEmail = (email) => {
    ("Send Mail");
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
        if (response.status === 413) {
            throw new Error('Le fichier est trop grand. Veuillez choisir un fichier plus petit.');
        } else if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.error || 'Échec de la mise à jour de l\'avatar');
            });
        }
        return response.json();
    })
    .then(data => {
        document.querySelector('.settings-picture').src = data.avatar;
        alert('Avatar mis à jour avec succès');
        window.location.reload();
    })
    .catch(error => {
        console.error('Erreur lors de la mise à jour de l\'avatar:', error);
        alert(`Une erreur s'est produite lors de la mise à jour de l'avatar : ${error.message}`);
    });
};

const update2FA = (newMethod) => {
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
    document.body.classList.remove('bg-nagoya', 'bg-roland', 'bg-wimbledon');
    document.body.classList.add(imageClass);
    localStorage.setItem('backgroundClass', imageClass); 
};


export const applySavedBackground = () => {
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

export const initializeSettingsPage = () => {
    applySavedBackground();
    setupBackgroundChangeListeners();
};

const searchLogin = (loginSearchInput, userDataUsername) => {
    const username = loginSearchInput.value;
    if (username) {
        if (isUserSelf(username, userDataUsername)) {
            alert("Vous ne pouvez pas accéder à votre propre profil.");
        } else {
            window.location.href = `#/friendprofile/${username}`;
        }
        loginSearchInput.value = "";
    }
};

const isUserSelf = (searchedUsername, currentUsername) => {
    return searchedUsername === currentUsername;
};

const updateDataSettings = () => {

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
    
    // section.querySelector('.delete-account').addEventListener('click', (event) => {
    //     window.location.hash = '#/delete-account';
    // });

}

export { sendConfirmationEmail, updateAvatar, 
    update2FA, update2FAActiveClass,  changeBackgroundImage,  
    setupBackgroundChangeListeners, searchLogin, updateDataSettings};
