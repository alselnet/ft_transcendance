const LogOutMsg = () => {

    let msg = document.querySelector("#section");

    let root = document.getElementById("root");
    if (!root) {
        console.error("#root not found in the DOM");
        return;
    }

    // Retirer Navbar et bouton logout
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
                <a class="nav-link" href="#/dashboard"><span class="close-btn-ldb">&times;</span></a>
                <p class="msg-confirmation">Êtes-vous sûr(e) de vouloir vous déconnecter ?</p>
                <div class="button-logout">
                    <a class="nav-link" href="#/">
                        <button type="button" class="btn btn-success">Oui</button>
                    </a>
                    <a class="nav-link" href="#/dashboard">                
                        <button type="button" class="btn btn-danger">Non</button>
                    </a>
                </div>
            </div>
        </div>
    `; 
    console.log("Section content:", section.innerHTML);
    } else {
        console.error("#section not found in the DOM");
    }
};

export default LogOutMsg;
