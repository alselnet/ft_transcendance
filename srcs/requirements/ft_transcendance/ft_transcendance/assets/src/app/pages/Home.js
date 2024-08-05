import img42 from '../images/42.png';
import { FortyTwoSignIn } from "../functions/42SignIn.js";
import { animateBalls } from "../animation/HomeAnimation.js";
import { removeMainComponent } from "../functions/MainFunctions.js";

const Home = () => {

    removeMainComponent();

    let section = document.querySelector("#section");
    
    if (section) {
        section.innerHTML = `
        <div class="balls-home d-none d-md-flex">
            <div class="orange-ball-home">
                <a class="balls-inscription" href="#/signin" data-hash="signin">
                    Inscription
                </a>
            </div>
            <div class="white-ball-home">
                <a class="balls-inscription" href="#/login" data-hash="login">
                    Connexion
                </a>
            </div>
            <div class="btn-container-home">
                <button id="fortyTwoSignInBtn" class="btn-42-home">
                    <p class="co-42-home">connexion avec</p>
                    <img src="${img42}" class="img-42-home" alt="button-42">
                </button>
            </div>
        </div>

        <div class="balls-home-sm d-flex d-md-none">
            <div class="orange-ball-home-sm">
                <a class="balls-inscription" href="#/signin" data-hash="signin">
                    Inscription
                </a>
            </div>
            <div class="white-ball-home-sm">
                <a class="balls-inscription" href="#/login" data-hash="login">
                    Connexion
                </a>
            </div>
            <div class="btn-container-home">
                <button id="fortyTwoSignInBtnSm" class="btn-42-home">
                    <p class="co-42-home-sm">connexion avec</p>
                    <img src="${img42}" class="img-42-home" alt="button-42">
                </button>
            </div>
        </div>
        `;
    }

    const whiteBall = document.querySelector('.white-ball-home');
    const orangeBall = document.querySelector('.orange-ball-home');

    if (whiteBall && orangeBall) {
        animateBalls(section, whiteBall, orangeBall);
    } else {
        console.error(".white-ball-home or .orange-ball-home not found in the DOM");
    }
    
    const signInButton = document.getElementById('fortyTwoSignInBtn');
    const signInButtonSm = document.getElementById('fortyTwoSignInBtnSm');

    if (signInButton) {
        signInButton.addEventListener('click', () => {
            FortyTwoSignIn();
        });
    } else {
        console.error("#fortyTwoSignInBtn not found in the DOM");
    }

    if (signInButtonSm) {
        signInButtonSm.addEventListener('click', () => {
            FortyTwoSignIn();
        });
    } else {
        console.error("#fortyTwoSignInBtnSm not found in the DOM");
    }

};

export { Home };
