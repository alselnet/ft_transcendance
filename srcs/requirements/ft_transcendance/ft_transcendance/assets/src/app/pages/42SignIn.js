import { getCookie } from '../utils/cookies';

export function FortyTwoSignIn() {
    window.location.href = 'https://localhost/api/auth/42login/';
}

export function handleCallback() {
    const fragment = window.location.hash.substring(1);
    const urlParams = new URLSearchParams(fragment);
    const access = urlParams.get('access');
    const refresh = urlParams.get('refresh');
    const message = urlParams.get('message');

    if (access && refresh) {
        console.log("Tokens found in URL parameters:", access, refresh);
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        if (message) {
            alert(message);
        }
        console.log("Tokens stored successfully in local storage.");
        window.location.href = '#/dashboard';
    } else {
        console.log("No tokens found in URL parameters.");
    }
}
