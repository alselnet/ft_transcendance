import Tmejri from '../images/Tasnim.jpg'
import { checkAuth } from "../services/Api.js";

const Settings = async () => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }
    let form = document.createElement("div");
    section.innerHTML = 
        `
        <div class="settings-container">
            <h1 class="settings-title">Parametre du compte</h1>
            <div class="settings-box">
                <div class="editting">
                    <img src="${Tmejri}" class="settings-picture" alt="settings-pic">
                    <p class="edit-pp">modifier</p>
                </div>
                <div class="modif-username">
                    <p>username</p>
                    <button type="button" class="btn btn-light">modifier username</button>
                </div>
                <div class="modif-username">
                    <p>email</p>
                    <button type="button" class="btn btn-light">modifier adresse mail</button>
                </div>
                <div class="modif-username">
                    <p>********</p>
                    <button type="button" class="btn btn-light">modifier mot de passe</button>
                </div>

                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    methode 2fa
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#">aucune</a></li>
                    <li><a class="dropdown-item" href="#">mail</a></li>
                    <li><a class="dropdown-item" href="#">sms</a></li>
                    </ul>
                </div>

                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    couleur de l'arriere plan
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#">Nagoya</a></li>
                    <li><a class="dropdown-item" href="#">Roland Garros</a></li>
                    <li><a class="dropdown-item" href="#">Le chenet</a></li>
                    </ul>
                </div>
                
                <button type="button" class="btn btn-danger delet-account">supprimer le compte</button>

            </div>

            <div class="settings-footer">
                
                <div class="search-container">
                    <div class="search-barre">
                        <input type="text" id="login-search" placeholder="Entrez le nom de l'utilisateur">
                    </div>
                    <button type="button" id="search-button">
                        <i class="bi bi-search search-icon"></i>
                    </button>
                </div>

                <a class="nav-link" href="#/confidentalite">         
                    <div class="settings-footer" id="list-stat">
                        <i class="bi bi-file-earmark-lock settings-footer-icon"></i>
                        <p class="settings-footer-text">Charte de confidentialite</p>
                    </div>
                </a>
            </div>

            <div class="confirm-email">
                votre adresse mail doit etre verifiee : 
                <a href="">renvoyer un mail de verification</a>
            </div>

        </div>


        `; 
        return form;
};

export { Settings };