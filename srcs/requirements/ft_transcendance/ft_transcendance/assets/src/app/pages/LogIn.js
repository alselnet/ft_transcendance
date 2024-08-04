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
                        <input type="text" id="username" class="login-input" placeholder="Username">
                        <input type="password" id="password" class="login-input" placeholder="Password">
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

            <div class="balls-login d-flex d-md-none">
                <a class="nav-link" href="#/">
                    <div class="arrow-sm"><i class="bi bi-arrow-left-circle-fill"></i></div>
                </a>
                <div class="white-ball-login-sm">
                    <form id="login-form-sm" class="login-form-login">
                        <input type="text" id="username-sm" class="login-input" placeholder="Username">
                        <input type="password" id="password-sm" class="login-input" placeholder="Password">
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

