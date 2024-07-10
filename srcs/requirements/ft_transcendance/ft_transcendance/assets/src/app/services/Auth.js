document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');

    try {
        const response = await fetch('https://localhost/api/auth/signin/', {  // Modification de l'URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);

        // Récupérer le token CSRF et le stocker dans les cookies
        const csrfResponse = await fetch('https://localhost/api/auth/csrf_token/', {
            method: 'GET',
            credentials: 'include'  // Important pour inclure les cookies dans la requête
        });
        
        if (!csrfResponse.ok) {
            throw new Error('Erreur lors de la récupération du token CSRF');
        }

        const csrfData = await csrfResponse.json();
        document.cookie = `csrftoken=${csrfData.token};path=/`;

        window.location.href = '#/dashboard';
    } catch (error) {
        errorDiv.textContent = 'Invalid credentials';
    }
});
