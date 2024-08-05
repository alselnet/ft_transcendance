import { getCookie } from '../utils/cookies';

const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`

const TwoFactorsAuthQR = async () => {
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
              <h1 class="title-2FA">ENTREZ LE CODE REÇU SUR L'APPLICATION</h1>
              <input type="text" id="two-fa-code" class="input-2fa" placeholder="Tapez le code ici">
              <button id="verify-2fa-code" class="button-2FA">Confirmer</button>
              <button id="back-to-qr-code" class="button-2FA">Retourner au QR Code</button>
          </div>
      </div>
      `; 

    const verifyButton = document.getElementById('verify-2fa-code');
    const backToQRCode = document.getElementById('back-to-qr-code');

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

    backToQRCode.addEventListener('click', () => {
        window.location.href = `#/qr-code?tfa=${tfa}`;
    });

    return section;
};

export { TwoFactorsAuthQR };
