// import { checkAuth } from "../services/Api.js"

const TwoFactorAuth = async () => {

    // const isAuthenticated = await checkAuth();
    
    // if (!isAuthenticated) {
    //     return;
    // }

	let section = document.querySelector("#section");

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
      return section;
};

export { TwoFactorAuth };