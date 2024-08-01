const TwoFactorAuth = async () => {
    let section = document.querySelector("#section");
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
 
    section.innerHTML = 
      `
      <div class="container-2FA">
          <div class="login-form-2FA">
              <h1 class="title-2FA">ENTREZ LE CODE REÇU PAR MAIL</h1>
              <input type="text" class="input-2fa" placeholder="Tapez le code ici">
              <button class="button-2FA">renvoyer</button>
          </div>
      </div>
      `; 
      return section;
 };
 
 export { TwoFactorAuth };