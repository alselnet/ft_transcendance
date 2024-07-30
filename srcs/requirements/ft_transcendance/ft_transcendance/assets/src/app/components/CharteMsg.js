import { checkAuth } from "../services/Api.js";

const CharteMsg = async () => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }

    let msg = document.querySelector("#section");

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

    if (msg) {
        msg.innerHTML =
    `   <div class="charte-container">
            <div class="charte-msg">
                <h2 class="charte-title">Charte de confidentialite</h2>
                <p>Bienvenue sur notre site !

Nous respectons votre vie privée et nous engageons à protéger vos données personnelles. Cette charte de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations. 

1 - Nous collectons des informations telles que votre adresse e-mail ou votre pseudonyme. Ces informations sont recueillies lors de l'inscription et de l'utilisation régulière du site.

2 - Votre adresse mail ou votre mot de passe ne seront jamais communiqués aux autre utilisateurs ou à des organisations tierces, et nous garantissons une politique de sécurité stricte pour protéger vos informations contre tout accès non autorisé. 

3 - La page paramètres du compte vous permet d'accéder à vos données personnelles, de les modifier, ou de nous en demander la suppression immédiate. 

N.B. : Les utilisateurs inscrits grâce a leur compte sur l'intranet de l'Ecole 42 peuvent uniquement demander la suppression de leurs données, toute modification doit être effectuée directement sur votre espace à l'adresse suivante: https://profile.intra.42.fr/

Merci de votre confiance</p>
                <div>
                    <button type="button" class="btn btn-light" id="ok-button">ok</button>
                </div>
            </div>
        </div>
    `;

        document.getElementById('ok-button').addEventListener('click', () => {
            window.history.back();
        });
    }
};

export { CharteMsg };