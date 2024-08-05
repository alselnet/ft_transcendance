import { FortyTwoSignIn } from '../functions/42SignIn.js';
import img42 from '../images/42.png';
import { handleFormVisibility } from '../functions/SignInFunctions.js';
import { removeMainComponent } from "../functions/MainFunctions.js";


export const SignIn = () => {

    removeMainComponent();
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = `
            <div class="balls-signin d-none d-md-flex">
                <div class="white-ball-signin"></div>
                <div class="orange-ball-signin">
                    <form id="signin-form" class="login-form-signin">
                        <input type="text" id="username" class="login-input-signin" placeholder="Nom d'utilisateur">
                        <input type="email" id="email" class="login-input-signin" placeholder="Adresse mail">
                        <input type="password" id="password" class="login-input-signin" placeholder="Mot de passe">
                        <input type="password" id="confirmPassword" class="login-input-signin" placeholder="Confirmer mdp">
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

            <div class="balls-signin d-flex d-md-none">
                <a class="nav-link" href="#/">
                    <div class="arrow-s-sm"><i class="bi bi-arrow-left-circle-fill"></i></div>
                </a>
                <div class="orange-ball-signin-sm">
                    <form id="signin-form-sm" class="login-form-signin">
                        <input type="text" id="username-sm" class="login-input-signin" placeholder="Nom d'utilisateur">
                        <input type="email" id="email-sm" class="login-input-signin" placeholder="Email">
                        <input type="password" id="password-sm" class="login-input-signin" placeholder="Mot de passe">
                        <input type="password" id="confirmPassword-sm" class="login-input-signin" placeholder="Confirmer mdp">
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

