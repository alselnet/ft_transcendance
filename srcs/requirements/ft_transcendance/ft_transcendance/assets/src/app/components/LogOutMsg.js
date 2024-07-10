const LogOutMsg = () => {

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
    `   <div class="frame-LogOutMsg-container">
            <div class="frame-LogOutMsg">
                <p class="msg-confirmation">Êtes-vous sûr(e) de vouloir vous déconnecter ?</p>
                <div class="button-logout">
                    <a class="nav-link" href="#/">
                        <button type="button" class="btn btn-success">Oui</button>
                    </a>
                    <a>                
                        <button type="button" class="btn btn-danger" onclick="window.history.back()">Non</button>
                    </a>
                </div>
            </div>
        </div>
    `; 
    }
};

export default LogOutMsg;
