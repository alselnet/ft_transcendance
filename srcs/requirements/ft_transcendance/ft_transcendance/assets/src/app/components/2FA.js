
const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`

const TwoFactorsAuth = async () => {
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

    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const tfa = urlParams.get('tfa');
    if (!tfa) {
        console.error('TFA not found in URL');
        alert('TFA non trouvé. Veuillez réessayer.');
        return;
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
            const response = await fetch(`${authUrl}/validate-2fa-code/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'tfa_token': tfa, 'code': code })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur de validation du code 2FA.');
            }

            const data = await response.json();
            console.log('2FA code validated:', data);

            if (data.access && data.refresh) {
                localStorage.removeItem('tfa');
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
                window.location.href = '#/dashboard';
            } else {
                throw new Error('Tokens non valides reçus');
            }
        } catch (error) {
            console.error('Erreur de validation du code 2FA:', error);
            alert(error.message);
        }
    });

    resendButton.addEventListener('click', async () => {
        try {
            const response = await fetch(`${authUrl}/generate-2fa-code/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'tfa_token': tfa })
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

export { TwoFactorsAuth };
