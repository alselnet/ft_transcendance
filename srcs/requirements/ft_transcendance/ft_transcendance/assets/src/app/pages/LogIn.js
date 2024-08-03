import img42 from '../images/42.png';
import { FortyTwoSignIn } from "../functions/42SignIn.js";
import { handleFormVisibility } from '../functions/LoginFunctions.js';
import { removeMainComponent } from "../functions/MainFunctions.js";

export const LogIn = () => {

    removeMainComponent();
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = `
            <div class="balls-login d-none d-md-flex">
                <div class="orange-ball-login">
                    <a class="nav-link" href="#/">
                        <div class="arrow"><i class="bi bi-arrow-left-circle-fill"></i></div>
                    </a>
                </div>
                <div class="white-ball-login">
                    <form id="login-form" class="login-form-login">
                        <input type="text" id="username" placeholder="Username">
                        <input type="password" id="password" placeholder="Password">
                        <button type="submit" class="button-login">se connecter</button>
                    </form>
                </div>
                <div class="btn-container-home">
                    <button id="fortyTwoSignInBtn" class="btn-42-home">
                        <p class="co-42-home">connexion avec</p>
                        <img src="${img42}" class="img-42-home" alt="button-42">
                    </button>
                </div>
            </div>

            <div class="balls-login d-none d-sm-flex d-md-none">
                <a class="nav-link" href="#/">
                    <div class="arrow-sm"><i class="bi bi-arrow-left-circle-fill"></i></div>
                </a>
                <div class="white-ball-login-sm">
                    <form id="login-form-sm" class="login-form-login">
                        <input type="text" id="username-sm" placeholder="Username">
                        <input type="password" id="password-sm" placeholder="Password">
                        <button type="submit" class="button-login">se connecter</button>
                    </form>
                </div>
            </div>
        `;

        handleFormVisibility();
        window.addEventListener('resize', handleFormVisibility);

        const signInButton = document.getElementById('fortyTwoSignInBtn');
        if (signInButton) {
            signInButton.addEventListener('click', () => {
                FortyTwoSignIn();
            });
        }
    }
};

// function handleFormSubmit(event) {
//     event.preventDefault();
//     console.log('Form submitted');

//     const logData = {
//         username: document.getElementById("username")?.value || document.getElementById("username-sm")?.value,
//         password: document.getElementById("password")?.value || document.getElementById("password-sm")?.value,
//     };

//     console.log('Form data:', logData);

//     fetch(`${authUrl}/signin/`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': getCookie('csrftoken')
//         },
//         body: JSON.stringify(logData)
//     })
//     .then(response => {
//         if (!response.ok) {
//             return response.json().then(err => { throw new Error('Erreur de connexion') });
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Réponse du backend:', data);

//         return fetch(`${usersUrl}/me/`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${data.access}`,
//                 'Content-Type': 'application/json'
//             }
//         });
//     })
//     .then(response => response.json())
//     .then(userData => {
//         console.log('User data:', userData);
//         if (userData.tfa_token) {
//             localStorage.setItem('tfa', userData.tfa_token);
//         } else {
//             console.error('Erreur : `tfa_token` non disponible dans les données utilisateur.');
//         }
    
//         const tfa = localStorage.getItem('tfa');

//         console.error('TFA :', tfa)
//         if (userData.two_fa_method === 'email') {
//             return fetch(`${authUrl}/generate-2fa-code/`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ 'tfa_token': tfa })
//             })
//             .then(() => {
//                 if (tfa)
//                     window.location.href = `#/2fa-auth?tfa=${encodeURIComponent(tfa)}`;
//                 else
//                     alert('Erreur tfa_token non valide');
//             })
//             .catch(error => {
//                 console.error('Erreur lors de l\'envoi du code 2FA:', error);
//                 alert('Erreur lors de l\'envoi du code 2FA. Veuillez réessayer.');
//             });
//         } else if (userData.two_fa_method === 'authenticator') {
//             if (tfa)
//                 window.location.href = `#/qr-code?tfa=${encodeURIComponent(tfa)}`;
//             else
//                 alert('Erreur tfa_token non valide');
//         } else {
//             return fetch(`${authUrl}/signin/`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRFToken': getCookie('csrftoken')
//                 },
//                 body: JSON.stringify({
//                     username: userData.username,
//                     password: logData.password
//                 })
//             })
//             .then(tokensResponse => {
//                 if (!tokensResponse.ok) {
//                     return tokensResponse.json().then(err => { throw new Error('Erreur lors de la récupération des tokens: ' + err.message) });
//                 }
//                 return tokensResponse.json();
//             })
//             .then(tokens => {
//                 console.log('Tokens récupérés:', tokens);
//                 localStorage.removeItem('tfa');
//                 localStorage.setItem('accessToken', tokens.access);
//                 localStorage.setItem('refreshToken', tokens.refresh);

//                 window.location.href = '#/dashboard';
//             })
//             .catch(error => {
//                 console.error('Erreur:', error);
//                 alert('Erreur lors de la récupération des tokens. Veuillez réessayer.');
//             });
//         }
//     })
//     .catch(error => {
//         console.error('Erreur:', error);
//         alert('Nom d utilisateur ou mot de passe incorrect');
//     });
// }

// // const signInButton = document.getElementById('fortyTwoSignInBtn');
// // if (signInButton) {
// //     signInButton.addEventListener('click', () => {
// //         FortyTwoSignIn();
// //     });
// // }
