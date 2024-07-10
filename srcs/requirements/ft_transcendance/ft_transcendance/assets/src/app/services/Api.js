// const fetchWithAuth = async (url, options = {}) => {
//     const token = localStorage.getItem('accessToken');
//     const csrfToken = document.cookie
//         .split('; ')
//         .find(row => row.startsWith('csrftoken='))
//         ?.split('=')[1];

//     const headers = {
//         'Content-Type': 'application/json',
//         ...options.headers,
//     };

//     if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//     }

//     if (csrfToken) {
//         headers['x-csrf-token'] = csrfToken;
//     }

//     const response = await fetch(url, {
//         ...options,
//         headers,
//     });

//     if (response.status === 401) {
//         const refreshToken = localStorage.getItem('refreshToken');
//         if (refreshToken) {
//             const refreshResponse = await fetch('st/api/auth/token/refresh/', {  // Modification de l'URL
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ refresh: refreshToken }),
//             });

//             if (refreshResponse.ok) {
//                 const refreshData = await refreshResponse.json();
//                 localStorage.setItem('accessToken', refreshData.access);
//                 headers['Authorization'] = `Bearer ${refreshData.access}`;
//                 return fetch(url, {
//                     ...options,
//                     headers,
//                 });
//             } else {
//                 localStorage.removeItem('accessToken');
//                 localStorage.removeItem('refreshToken');
//                 window.location.href = '#/login';
//             }
//         }
//     }

//     return response;
// };

// export { fetchWithAuth };

/* jeremy's function from dashboard*/

// Vérifie l'authentification de l'utilisateur
    // const checkAuthentication = () => {
    //     const token = localStorage.getItem('accessToken');
    //     if (!token) {
    //         window.location.href = '#/login'; // Redirige vers la page de login si pas de token
    //         return false;
    //     } else {
    //         const payload = JSON.parse(atob(token.split('.')[1])); // Décodage du payload du token
    //         const expiry = payload.exp * 1000; // Convertir le temps d'expiration en millisecondes
    //         if (Date.now() >= expiry) {
    //             // Si le token est expiré, supprimer et rediriger
    //             localStorage.removeItem('accessToken');
    //             localStorage.removeItem('refreshToken');
    //             window.location.href = '#/login';
    //             return false;
    //         }
    //     }
    //     return true;
    // };

    // if (!checkAuthentication()) return; // Arrêter le chargement de la page si l'utilisateur n'est pas authentifié


/* érifie si un token d'authentification est présent dans le 
localStorage. Si oui, elle envoie une requête au serveur pour 
vérifier l'authentification. Si la réponse est OK, elle retourne
true, sinon elle supprime le token et redirige l'utilisateur 
vers la page de connexion, en retournant false. Si une erreur 
survient lors de ce processus, elle affiche un message d'erreur
 dans la console et retourne également false. */
export const checkAuth = async () => {
    const token = localStorage.getItem('token'); //récupère le token d'authentification stocké dans le localStorage du navigateur sous la clé 'token'
    if (!token) { //Vérifie si le token n'existe pas (c'est-à-dire que l'utilisateur n'est pas authentifié)
        // Redirigez vers la page de connexion
        window.location.hash = '#/login'; // Redirige l'utilisateur vers la page de connexion en changeant l'URL hash
        return false; //Retourne false pour indiquer que l'utilisateur n'est pas authentifié et arrête l'exécution de la fonction
    }

    try { //Démarre un bloc d'essai pour gérer les opérations asynchrones qui pourraient échouer
        const response = await fetch('/api/check-auth', { // Effectue une requête GET asynchrone vers l'endpoint /api/check-auth sur le serveur.
            method: 'GET', //Indique que la requête est de type GET
            headers: {
                'Authorization': `Bearer ${token}`
            } //Inclut le token d'authentification dans l'en-tête de la requête pour vérifier l'authentification côté serveur
        });

        if (response.ok) { //Vérifie si la réponse de la requête est réussie (code de statut HTTP dans la plage 200-299)
            return true; //Retourne true pour indiquer que l'utilisateur est authentifié et que la vérification d'authentification est réussie.
        } else { //Gère le cas où la réponse n'est pas OK (par exemple, si le token a expiré ou est invalide).
            // Gérer l'expiration du token ou un token invalide
            localStorage.removeItem('token'); //Supprime le token d'authentification du localStorage.
            window.location.hash = '#/login'; //Redirige l'utilisateur vers la page de connexion en changeant l'URL hash.
            return false; //Retourne false pour indiquer que l'utilisateur n'est pas authentifié et que la vérification d'authentification a échoué.
        }
    } catch (error) {
        console.error('Erreur de vérification d\'authentification :', error);
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

