import { checkAuth } from "../services/Api.js"

const DeleteFriendMsg = async () => {

    const isAuthenticated = await checkAuth();
    
    if (!isAuthenticated) {
        return;
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
    `   <div class="frame-delete-container">
            <div class="frame-delete">
                <p class="msg-delete-confirmation">Êtes-vous sûr(e) de voirloir retirer cet utilisateur de vos amis ?</p>
                <div class="button-delete">
                    <a class="nav-link" href="#/pagenotfound">
                        <button type="button" class="btn btn-success">Oui</button>
                    </a>
                    <a class="nav-link" href="#/pagenotfound">                
                        <button type="button" class="btn btn-danger">Non</button>
                    </a>
                </div>
            </div>
        </div>
    `; 
    }
    
};

export { DeleteFriendMsg };
