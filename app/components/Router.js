export const Router = () => {

    let {hash} = location;

    if (hash === " " || hash === "#/") {
        let msg = document.createElement("div");  
        msg.innerHTML = `<h1>Bienvenue sur Pong</h1>`;
        
        // Ajouter le message au conteneur principal
        document.querySelector("#section").innerHTML = "";  
        document.querySelector("#section").append(msg);

    }else if (hash === "#/inscription") {
        let form = document.createElement("form");
        form.innerHTML = `
            <h1>INSCRIPTION</h1>
            <div class="mb-3">
                <label for="username" class="form-label">Nom d'utilisateur</label>
                <input type="text" class="form-control" id="username" required>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="password" required>
            </div>
            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirmation de mot de passe</label>
                <input type="password" class="form-control" id="confirmPassword" required>
            </div>
            <button type="submit" class="btn btn-primary">S'inscrire</button>
        `;
        
        // Ajouter le formulaire au conteneur principal
        document.querySelector("#section").innerHTML = "";
        document.querySelector("#section").append(form);
    } else if (hash === "#/connexion") {
        let form = document.createElement("form");
        form.innerHTML = `
            <h1>CONNEXION</h1>
            <div class="mb-3">
                <label for="username" class="form-label">Nom d'utilisateur</label>
                <input type="text" class="form-control" id="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Se connecter</button>
        `;
        
        // Ajouter le formulaire au conteneur principal
        document.querySelector("#section").innerHTML = "";
        document.querySelector("#section").append(form);


    } 
};
