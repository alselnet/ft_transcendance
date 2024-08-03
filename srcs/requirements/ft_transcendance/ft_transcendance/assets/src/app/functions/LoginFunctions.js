import { getCookie } from '../utils/cookies';

const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`
const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`

let currentForm = null;

export function handleFormVisibility() {
    const isDesktop = window.innerWidth >= 768;
    const formDesktop = document.getElementById("login-form");
    const formMobile = document.getElementById("login-form-sm");

    if (isDesktop) {
        if (formMobile) {
            formMobile.classList.add('d-none');
        }
        if (formDesktop) {
            formDesktop.classList.remove('d-none');
            formDesktop.classList.add('d-md-block');
        }
        if (currentForm && currentForm !== formDesktop) {
            currentForm.removeEventListener("submit", handleFormSubmit);
        }
        if (formDesktop) {
            formDesktop.addEventListener("submit", handleFormSubmit);
            currentForm = formDesktop;
        }
    } else {
        if (formDesktop) {
            formDesktop.classList.add('d-none');
            formDesktop.classList.remove('d-md-block');
        }
        if (formMobile) {
            formMobile.classList.remove('d-none');
            formMobile.classList.add('d-md-block');
        }
        if (currentForm && currentForm !== formMobile) {
            currentForm.removeEventListener("submit", handleFormSubmit);
        }
        if (formMobile) {
            formMobile.addEventListener("submit", handleFormSubmit);
            currentForm = formMobile;
        }
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    console.log('Form submitted');

    const logData = {
        username: document.getElementById("username")?.value || document.getElementById("username-sm")?.value,
        password: document.getElementById("password")?.value || document.getElementById("password-sm")?.value,
    };

    console.log('Form data:', logData);

    fetch(`${authUrl}/signin/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(logData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error('Erreur de connexion') });
        }
        return response.json();
    })
    .then(data => {
        console.log('Réponse du backend:', data);

        return fetch(`${usersUrl}/me/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${data.access}`,
                'Content-Type': 'application/json'
            }
        });
    })
    .then(response => response.json())
    .then(userData => {
        console.log('User data:', userData);
        if (userData.tfa_token) {
            localStorage.setItem('tfa', userData.tfa_token);
        } else {
            console.error('Erreur : `tfa_token` non disponible dans les données utilisateur.');
        }
    
        const tfa = localStorage.getItem('tfa');

        console.error('TFA :', tfa)
        if (userData.two_fa_method === 'email') {
            return fetch(`${authUrl}/generate-2fa-code/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'tfa_token': tfa })
            })
            .then(() => {
                if (tfa)
                    window.location.href = `#/2fa-auth?tfa=${encodeURIComponent(tfa)}`;
                else
                    alert('Erreur tfa_token non valide');
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi du code 2FA:', error);
                alert('Erreur lors de l\'envoi du code 2FA. Veuillez réessayer.');
            });
        } else if (userData.two_fa_method === 'authenticator') {
            if (tfa)
                window.location.href = `#/qr-code?tfa=${encodeURIComponent(tfa)}`;
            else
                alert('Erreur tfa_token non valide');
        } else {
            return fetch(`${authUrl}/signin/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    username: userData.username,
                    password: logData.password
                })
            })
            .then(tokensResponse => {
                if (!tokensResponse.ok) {
                    return tokensResponse.json().then(err => { throw new Error('Erreur lors de la récupération des tokens: ' + err.message) });
                }
                return tokensResponse.json();
            })
            .then(tokens => {
                console.log('Tokens récupérés:', tokens);
                localStorage.removeItem('tfa');
                localStorage.setItem('accessToken', tokens.access);
                localStorage.setItem('refreshToken', tokens.refresh);

                window.location.href = '#/dashboard';
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Erreur lors de la récupération des tokens. Veuillez réessayer.');
            });
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Nom d utilisateur ou mot de passe incorrect');
    });
}