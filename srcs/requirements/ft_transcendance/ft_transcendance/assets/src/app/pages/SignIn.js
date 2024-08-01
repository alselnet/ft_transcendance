import { getCookie } from '../utils/cookies';
import { FortyTwoSignIn } from "./42SignIn.js";
import img42 from '../images/42.png';

export const SignIn = () => {
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
            <div class="balls-signin d-none d-md-flex">
                <div class="white-ball-signin"></div>
                <div class="orange-ball-signin">
                    <form id="signin-form" class="login-form-signin">
                        <input type="text" id="username" placeholder="nom d'utilisateur">
                        <input type="email" id="email" placeholder="email">
                        <input type="password" id="password" placeholder="mot de passe">
                        <input type="password" id="confirmPassword" placeholder="confirmer mdp">
                        <button type="submit" class="button-signin">s'inscrire</button>
                    </form>
                    <a class="nav-link" href="#/">
                        <div class="arrow-s"><i class="bi bi-arrow-left-circle-fill"></i></div>
                    </a>
                </div>
                <div class="btn-container-home">
                    <button id="fortyTwoSignInBtn" class="btn-42-home">
                        <p class="co-42-home">connexion avec</p>
                        <img src="${img42}" class="img-42-home" alt="button-42">
                    </button>
                </div>
            </div>

            <div class="balls-signin d-none d-sm-flex d-md-none">
                <a class="nav-link" href="#/">
                    <div class="arrow-s-sm"><i class="bi bi-arrow-left-circle-fill"></i></div>
                </a>
                <div class="orange-ball-signin-sm">
                    <form id="signin-form-sm" class="login-form-signin">
                        <input type="text" id="username-sm" placeholder="nom d'utilisateur">
                        <input type="email" id="email-sm" placeholder="email">
                        <input type="password" id="password-sm" placeholder="mot de passe">
                        <input type="password" id="confirmPassword-sm" placeholder="confirmer mdp">
                        <button type="submit" class="button-signin">s'inscrire</button>
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
    const formDesktop = document.getElementById("signin-form");
    const formMobile = document.getElementById("signin-form-sm");

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

    const formData = {
        username: document.getElementById("username")?.value || document.getElementById("username-sm")?.value,
        email: document.getElementById("email")?.value || document.getElementById("email-sm")?.value,
        password: document.getElementById("password")?.value || document.getElementById("password-sm")?.value,
        confirmPassword: document.getElementById("confirmPassword")?.value || document.getElementById("confirmPassword-sm")?.value
    };

    console.log('Form data:', formData);

    const usernameValid = checkUsername(formData.username);
    const emailValid = checkEmail(formData.email);
    const passwordValid = checkPassword(formData.password);
    const passwordMatch = formData.password === formData.confirmPassword;

    if (!usernameValid) {
        alert("Le nom d'utilisateur peut avoir maximum 8 caractères, et ne peut contenir que des lettres et des chiffres");
        console.log('Invalid username');
        return;
    }
    if (!emailValid) {
        alert("email non conforme");
        console.log('Invalid email');
        return;
    }
    if (!passwordValid) {
        alert("mot de passe doit contenir au moins 8 caractères, une lettre, un chiffre et un caractère spécial.");
        console.log('Invalid password');
        return;
    }
    if (!passwordMatch) {
        alert("confirmation de mot de passe incorrect");
        console.log('Passwords do not match');
        return;
    }

    fetch('https://localhost/api/auth/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message) });
        }
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        alert(data.message);
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        console.log('Redirecting to dashboard from signin...');
        window.location.href = '#/dashboard';
        console.log('Current hash:', window.location.hash);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('User creation failed.');
    });
}

function checkUsername(username) {
    const regex = /^[a-zA-Z0-9]{1,8}$/;
    return regex.test(username);
}

function checkPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
    return regex.test(password);
}

function checkEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.+[a-zA-Z]{2,}$/;
    return regex.test(email);
}
