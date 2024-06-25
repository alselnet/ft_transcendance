const SignIn = () => {

    console.log("SignIn component loaded");

    let root = document.getElementById("root");
    if (!root) {
        console.error("#root not found in the DOM");
        return;
    }

    let navbar = document.querySelector("#root > nav");
    if (navbar) {
        navbar.remove();
    }

    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
    `
    <div class="balls-signin d-none d-sm-flex">
        <div class="white-ball-signin"></div>
        <a class="nav-link" href="#/">
            <div class="arrow"><i class="bi bi-arrow-left-circle-fill"></i></div>
        </a>
        <div class="orange-ball-signin">
            <div class="login-form-signin">
                <input type="text" id="username" placeholder="nom d'utilisateur">
                <input type="email" id="email" placeholder="email">
                <input type="password" id="password" placeholder="mot de passe">
                <input type="password" id="confirmPassword" placeholder="confirmer mdp">
                <button type="submit" class="button-signin">s'inscrire</button>
            </div>
        </div>
    </div>

    <div class="balls-signin d-lg-none d-sm-flex">
        <div class="orange-ball-sm-signin">
            <div class="login-form-signin">
                <input type="text" id="username-sm" placeholder="nom d'utilisateur">
                <input type="email" id="email-sm" placeholder="email">
                <input type="password" id="password-sm" placeholder="mot de passe">
                <input type="password" id="confirmPassword-sm" placeholder="confirmer mdp">
                <button type="submit" class="button-signin">s'inscrire</button>
            </div>
        </div>
    </div>
        `;
        console.log("Section content:", section.innerHTML);
    } else {
        console.error("#section not found in the DOM");
    }

    section.addEventListener("submit", (event) => {
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
            sendFormData(formData);
        }
    });

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
    fetch('https://localhost/api/register/', {
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
		window.location.href = '#/jeu';
	})
    .catch(error => {
		alert('User creation failed.');
		console.error('Error:', error);
	});
};
