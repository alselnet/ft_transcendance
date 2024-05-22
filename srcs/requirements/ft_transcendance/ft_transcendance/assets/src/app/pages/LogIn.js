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

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const logData = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        };

        sendLogData(logData);

    });

};

const sendLogData = (formData) => {
    fetch('http://localhost:8000/register/', {
        method: 'POST',
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
        window.location.href = '/connected'; // renvoie vers la page connected
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Nom d utilisateur ou mot de passe incorrect');
    });
};

export default LogIn;
