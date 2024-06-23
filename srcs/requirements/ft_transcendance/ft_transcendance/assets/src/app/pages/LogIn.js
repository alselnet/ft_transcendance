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

    section.addEventListener("submit", (event) => {
        event.preventDefault();

        const logData = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        };

        sendLogData(logData);

    });

};

// Ajoute le stockage des tokens JWT et CSRF dans le localStorage et redirige après une connexion réussie
const sendLogData = async (formData) => {
    try {
        const response = await fetch('https://localhost/api/signin/', {  // Modification de l'URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Erreur de connexion');
        }

        const data = await response.json();
        console.log('Réponse du backend:', data);
        
        // Stocker les tokens JWT dans le localStorage
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);

        // Récupérer le token CSRF et le stocker dans les cookies
        const csrfResponse = await fetch('https://localhost/api/csrf_token', {
            method: 'GET',
            credentials: 'include'  // Important pour inclure les cookies dans la requête
        });
        
        if (!csrfResponse.ok) {
            throw new Error('Erreur lors de la récupération du token CSRF');
        }

        const csrfData = await csrfResponse.json();
        document.cookie = `csrftoken=${csrfData.token};path=/`;

        // Rediriger vers le tableau de bord
        window.location.href = '#/dashboard';
    } catch (error) {
        console.error('Erreur:', error);
        alert('Nom d utilisateur ou mot de passe incorrect');
    }
};

export default LogIn;
