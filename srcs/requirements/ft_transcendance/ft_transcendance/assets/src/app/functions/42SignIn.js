const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`
const baseUrl = `${window.location.protocol}//${window.location.host}`

export function FortyTwoSignIn() {
    window.location.href = `${authUrl}/42login/`;
}

export function handleCallback() {
    const fragment = window.location.hash.substring(1);
    const urlParams = new URLSearchParams(fragment);
    const access = urlParams.get('access');
    const refresh = urlParams.get('refresh');
    const message = urlParams.get('message');

    if (access && refresh) {

        try {
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
        } catch (error) {
            console.error("Error storing tokens in local storage:", error);
        }

        if (message) {
            alert(message);
        }

        window.location.href = `${baseUrl}/#/dashboard`;
    } else {
        console.log("No tokens found in URL parameters.");
    }
}