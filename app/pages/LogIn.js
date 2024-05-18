const LogIn = () => {

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
    document.querySelector("#section").innerHTML = "";
    document.querySelector("#section").append(form);


    return ;
};

export default LogIn;
