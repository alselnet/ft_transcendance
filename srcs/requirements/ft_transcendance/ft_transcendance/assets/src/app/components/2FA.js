import { getCookie } from '../utils/cookies';

const TwoFactorAuth = async () => {
    let section = document.querySelector("#section");
    if (!section) {
        console.error("#section not found in the DOM");
        return;
    }

    let navbar = document.querySelector(".navbar-container");
    if (navbar) {
        navbar.remove();
    }

    let logoutbutton = document.querySelector(".logout-container");
    if (logoutbutton) {
        logoutbutton.remove();
    }

    section.innerHTML = 
      `
      <div class="container-2FA">
          <div class="login-form-2FA">
              <h1 class="title-2FA">ENTREZ LE CODE REÇU PAR MAIL</h1>
              <input type="text" id="two-fa-code" class="input-2fa" placeholder="Tapez le code ici">
              <button id="verify-2fa-code" class="button-2FA">Confirmer</button>
              <button id="resend-2fa-code" class="button-2FA">Renvoyer</button>
          </div>
      </div>
      `; 

    const verifyButton = document.getElementById('verify-2fa-code');
    const resendButton = document.getElementById('resend-2fa-code');

    verifyButton.addEventListener('click', async () => {
        const code = document.getElementById('two-fa-code').value;

        if (!code) {
            alert('Veuillez entrer le code 2FA.');
            return;
        }

        try {
            const response = await fetch('https://localhost/api/auth/validate-2fa-code/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({ code })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur de validation du code 2FA.');
            }

            const data = await response.json();
            console.log('2FA code validated:', data);
            window.location.href = '#/dashboard';  // Redirige vers le tableau de bord après validation
        } catch (error) {
            console.error('Erreur de validation du code 2FA:', error);
            alert(error.message);
        }
    });

    resendButton.addEventListener('click', async () => {
        try {
            const response = await fetch('https://localhost/api/auth/generate-2fa-code/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur de réenvoi du code 2FA.');
            }

            alert('Le code 2FA a été renvoyé.');
        } catch (error) {
            console.error('Erreur de réenvoi du code 2FA:', error);
            alert(error.message);
        }
    });

    return section;
};

export { TwoFactorAuth };
