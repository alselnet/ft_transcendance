export const checkAuth = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Vérifier si le token d'accès existe
    if (!accessToken) {
        window.location.hash = '#/';
        return false;
    }

    // Vérifier l'expiration du token d'accès
    const isTokenExpired = (token) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp < Date.now() / 1000;
    };

    if (!isTokenExpired(accessToken)) {
        // Le token d'accès n'est pas expiré
        return true;
    }

    // Le token d'accès est expiré, tenter de rafraîchir
    if (!refreshToken) {
        window.location.hash = '#/';
        return false;
    }

    try {
        const response = await fetch('https://localhost/api/auth/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refreshToken })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.access);
            return true;
        } else {
            // La tentative de rafraîchissement a échoué
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.hash = '#/';
            return false;
        }
    } catch (error) {
        console.error('Erreur de vérification d\'authentification :', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.hash = '#/';
        return false;
    }
};
    

/* effectuer des requêtes sécurisées vers des API en ajoutant 
automatiquement un en-tête d'autorisation avec un token JWT 
valide. Elle gère également les cas où l'utilisateur n'est 
pas authentifié en redirigeant vers la page de connexion 
(#/login) et en rejetant la promesse avec un message approprié*/
export function authFetch(url, options = {}) {
    const token = localStorage.getItem('jwtToken'); //Récupération du token JWT depuis le stockage local (localStorage)

    /* vérification si le token JWT est présent. Si le token 
    n'est pas trouvé (c'est-à-dire que l'utilisateur n'est pas 
    authentifié), le code redirige l'utilisateur vers la page 
    d'accueil (#/) et rejette la promesse avec un message 
    indiquant que l'utilisateur n'est pas authentifié. */
    if (!token) {
        window.location.href = "#/";
        return Promise.reject('User not authenticated');
    }

    /*  Si le token JWT est présent, il est ajouté comme en-tête
    d'autorisation (Authorization: Bearer ${token}) dans les 
    options de la requête HTTP (options.headers). Cette 
    technique permet de sécuriser les appels API en vérifiant 
    l'identité de l'utilisateur. */
    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
    };

    return fetch(url, options) //Effectue une requête HTTP à l'URL spécifiée (url) avec les options spécifiées (options), utilisant la fonction JavaScript fetch.
    /* Gère la réponse de la requête HTTP (fetch). Si la 
    réponse a un statut 401 (non autorisé), cela signifie 
    généralement que le token JWT a expiré ou n'est pas 
    valide. Dans ce cas, l'utilisateur est redirigé vers 
    la page de connexion (#/login) et la promesse est 
    rejetée avec un message indiquant que l'accès est non 
    autorisé (Unauthorized). Sinon, la réponse est convertie
     en JSON et renvoyée. */
    .then(response => {
        if (response.status === 401) {
            window.location.href = "#/login";
            return Promise.reject('Unauthorized');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
