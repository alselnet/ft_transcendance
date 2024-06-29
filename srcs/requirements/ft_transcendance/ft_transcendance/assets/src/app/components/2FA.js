const TwoFactorAuth = () => {
    let form = document.createElement("div");
    console.log("2FA component loaded");

        section.innerHTML = 
        `
        <div class="container-2FA">
            <div class="login-form-2FA">
                <h1 class="title-2FA">ENTREZ LE CODE REÇU PAR MAIL</h1>
                <input type="text" placeholder="Tapez le code ici">
                <button class="button-2FA">renvoyer</button>
            </div>
        </div>
        `; 
        return form;
};

export default TwoFactorAuth;