const LogIn = () => {

    console.log("Login component loaded");

    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
    `
        <div class="balls-login d-none d-sm-flex">
            <div class="orange-ball-login"></div>
            <div class="white-ball-login">
                <div class="login-form-login">
                    <input type="text" id="username" placeholder="Username">
                    <input type="password" id="password" placeholder="Password">
                    <button type="submit" class="button-login">se connecter</button>
                </div>
            </div>
        </div>

        <div class="balls-login balls-sm-login d-lg-none d-sm-flex">
            <div class="white-ball-sm-login">
                <div class="login-form-login">
                    <input type="text" id="username-sm" placeholder="Username">
                    <input type="password" id="password-sm" placeholder="Password">
                    <button type="submit" class="button-login">se connecter</button>
                </div>
            </div>
        </div>
    `;
    console.log("Section content:", section.innerHTML);
    } else {
        console.error("#section not found in the DOM");
    }

    // document.querySelector("#section").innerHTML = "";
    // document.querySelector("#section").append(form);

    section.addEventListener("submit", (event) => {
        event.preventDefault();

        const logData = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        };

        sendLogData(logData);

    });

};

const sendLogData = (formData) => {
    fetch('http://localhost:8000/api/signin/', {
        method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
        body: JSON.stringify(formData)
    })

    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur de connexion');
        }
        return response.json();
    })

    .then(data => {  // gérerr réponse du backend
        console.log('Réponse du backend:', data);
        window.location.href = '/home'; // renvoie vers la page connected
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Nom d utilisateur ou mot de passe incorrect');
    });
};

export default LogIn;
