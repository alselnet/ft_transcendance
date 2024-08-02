import { getCookie } from '../utils/cookies';
import img42 from '../images/42.png';
import { FortyTwoSignIn } from "./42SignIn.js";

const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`
const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`

export const LogIn = () => {
    let root = document.getElementById("root");
    if (!root) {
        console.error("#root not found in the DOM");
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

let currentForm = null;

function handleFormVisibility() {
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
        
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);

        console.log('Redirecting to dashboard from login...');
        
        // Récupérer user data
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

        // Check 2FA
        if (userData.two_fa_method === 'email') {

            return fetch(`${authUrl}/generate-2fa-code/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                }
            })
            .then(() => {
                window.location.href = '#/2fa-auth';
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi du code 2FA:', error);
                alert('Erreur lors de l\'envoi du code 2FA. Veuillez réessayer.');
            });
        } else if (userData.two_fa_method === 'authenticator') {
            window.location.href = '#/qr-code';
        } else {
            window.location.href = '#/dashboard';
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Nom d utilisateur ou mot de passe incorrect');
    });
}

// const signInButton = document.getElementById('fortyTwoSignInBtn');
// if (signInButton) {
//     signInButton.addEventListener('click', () => {
//         FortyTwoSignIn();
//     });
// }
