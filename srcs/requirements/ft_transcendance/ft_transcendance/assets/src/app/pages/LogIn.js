import { getCookie } from '../utils/cookies'
import img42 from '../images/42.png';

const LogIn = () => {
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
        section.innerHTML = 
    `
        <div class="balls-login d-none d-md-flex">
            <div class="orange-ball-login">
                <a class="nav-link" href="#/">
                    <div class="arrow"><i class="bi bi-arrow-left-circle-fill"></i></div>
                </a>
            </div>
            <div class="white-ball-login">
                <form id="login-form" class="login-form-login"> <!-- Ajout de la balise form -->
                    <input type="text" id="username" placeholder="Username">
                    <input type="password" id="password" placeholder="Password">
                    <button type="submit" class="button-login">se connecter</button>
                </form>
            </div>

            <div class="btn-container-home">
                <button onclick="window.location='https://42.fr/';" class="btn-42-home">
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
                <form id="login-form-sm" class="login-form-login"> <!-- Ajout de la balise form -->
                    <input type="text" id="username-sm" placeholder="Username">
                    <input type="password" id="password-sm" placeholder="Password">
                    <button type="submit" class="button-login">se connecter</button>
                </form>
            </div>
        </div>
    `;
    } 

    // Attacher l'événement submit au formulaire
    const form = document.getElementById("login-form") || document.getElementById("login-form-sm"); // Modifié pour attacher l'événement au formulaire
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche le formulaire de soumettre de manière traditionnelle

        // Récupérer les données du formulaire
        const logData = {
            username: document.getElementById("username").value || document.getElementById("username-sm").value,
            password: document.getElementById("password").value || document.getElementById("password-sm").value,
        };

        // Envoi des données de connexion
		const csrfToken = getCookie('csrftoken');
        fetch('https://localhost/api/auth/signin/', {  // Modification de l'URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken
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
            
            // Stocker les tokens JWT dans le localStorage
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);

            // Rediriger vers le tableau de bord
            window.location.href = '#/dashboard';
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Nom d utilisateur ou mot de passe incorrect');
        });
    });
};

export { LogIn };
