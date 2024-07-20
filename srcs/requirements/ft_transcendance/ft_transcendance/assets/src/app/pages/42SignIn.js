export function FortyTwoSignIn() {
    // Redirect to the backend endpoint which handles the OAuth flow
    window.location.href = 'https://localhost/api/auth/42login/';
}

export function handleCallback() {
    // Extract tokens from the URL fragment
    const fragment = window.location.hash.substring(1);
    console.log("Fragment part of URL:", fragment);
    const urlParams = new URLSearchParams(fragment);
    const access = urlParams.get('access');
    const refresh = urlParams.get('refresh');
    const message = urlParams.get('message');

    if (access && refresh) {
        console.log("Tokens found in URL parameters:", access, refresh);

        try {
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            console.log("Tokens stored successfully in local storage.");
        } catch (error) {
            console.error("Error storing tokens in local storage:", error);
        }

        if (message) {
            alert(message);
        }

        window.location.href = 'https://localhost/#/dashboard';
    } else {
        console.log("No tokens found in URL parameters.");
    }
}