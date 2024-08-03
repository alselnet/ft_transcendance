
const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`;

export const QRCode = () => {
    let section = document.querySelector("#section");

    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const totp = urlParams.get('totp');
    if (!totp) {
        console.error('TOTP not found in URL');
        alert('TOTP non trouvé. Veuillez réessayer.');
        return;
    }

    section.innerHTML = `
        <div class="container-qr-code">
            <h1 class="title-qr-code">Scanner le QR Code</h1>
            <div class="qr-code-container">
                <img id="qr-code" src="" alt="QR Code">
            </div>
            <button class="button-qr-code" id="proceed-to-2fa-auth">Continuer</button>
        </div>
    `;

    fetch(`${authUrl}/generate-2fa-code/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'totp_secret': totp })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.error || 'Erreur lors de la génération du QR Code') });
        }
        return response.blob();
    })
    .then(blob => {
        const qrCodeUrl = URL.createObjectURL(blob);
        document.getElementById('qr-code').src = qrCodeUrl;
    })
    .catch(error => {
        console.error('Erreur lors de la génération du QR Code:', error);
        alert(`Erreur lors de la génération du QR Code: ${error.message}`);
    });

    document.getElementById('proceed-to-2fa-auth').addEventListener('click', () => {
        window.location.href = `#/2fa-auth?totp=${encodeURIComponent(totp)}`;
    });

    return section;
};
