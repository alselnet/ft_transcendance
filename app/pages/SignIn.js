const SignIn = () => {

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

        form.addEventListener("submit", (event) => {

        event.preventDefault(); // Empêche le formulaire de soumettre de manière traditionnelle
        
        //stock input dans une variable
        const username = document.getElementById("username").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const confirmPassword = document.getElementById("confirmPassword").value

        const emailValid = checkEmail(email);
        const passwordValid = checkPassword(password);
        const passwordMatch = password === confirmPassword;

        if (!emailValid) {
            alert("email non conforme");
        } else if (!passwordValid) {
            alert("mot de passe doit contenir au moins 5 caractères, une lettre, un chiffre et un caractère spécial.");
        }
        else if (!passwordMatch) {
            alert("confirmation de mot de passe incorrect")
        } else {
            alert("Inscription réussie !")
        }
        //check si nom d'utilisateur existe déjà

    });

    document.querySelector("#section").innerHTML = "";
    document.querySelector("#section").append(form);

};

//check mdp
const checkPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{5,}$/;
    return regex.test(password);
}

//check email
const checkEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.+[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export default SignIn;
