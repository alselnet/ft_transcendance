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

        //stock chaque input dans une variable elles mêmes stockées dans un object 'formData'
        const formData = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirmPassword").value
        };

        const emailValid = checkEmail(formData.email);
        const passwordValid = checkPassword(formData.password);
        const passwordMatch = formData.password === formData.confirmPassword;

        if (!emailValid) {
            alert("email non conforme");
        } else if (!passwordValid) {
            alert("mot de passe doit contenir au moins 5 caractères, une lettre, un chiffre et un caractère spécial.");
        }
        else if (!passwordMatch) {
            alert("confirmation de mot de passe incorrect")
        } else {
            // alert("Inscription réussie !")
            sendFormData(formData);
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


/*Pour transformer les inputs de l'incription en données JSON il faut
-extraire les valeurs des champs du formulaire
-organiser ces valeurs dans un objet javaScript
-convertir cet objet en JSON avec JSON.stringify
-envoyer les données JSON avec 'fetch' (= méthode pour envoyer une requête HTTP au serveur)


Pas besoin de créer un fichier JSON. A partir de cet objet
converti on envoie une chaine JSON au serveur backend
qui la reçoit et la traite.

Le serveur décode les données JSON et effectue les opérations
necéssaire (stockage base de données, traitement, validation,...*/

const sendFormData = (formData) => {
    fetch('http://localhost:8000/register/', {
        method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
        body: JSON.stringify(formData)
    })
    .then(response => {
		if (!response.ok) {
			return response.json().then(err => { throw new Error(err) });
		}
		return response.json();
	})
    .then(data => {
		alert('User created successfully.');
		window.location.href = '/succes/';
	})
    .catch(error => {
		alert('User creation failed.');
		console.error('Error:', error);
	});
};
