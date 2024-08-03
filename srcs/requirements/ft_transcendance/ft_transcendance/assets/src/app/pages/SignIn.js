import { FortyTwoSignIn } from '../functions/42SignIn.js';
import img42 from '../images/42.png';
import { handleFormVisibility } from '../functions/SignInFunctions.js';

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

