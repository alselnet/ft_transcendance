import { getCookie } from '../utils/cookies';

export const isTokenExpired = (token) => {
	const payload = JSON.parse(atob(token.split('.')[1]));
	return payload.exp < Date.now() / 1000;
};

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken'),
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
});

export const checkAuth = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Verify if access token exists
    if (!accessToken) {
        window.location.hash = '#/';
        return false;
    }

    if (!isTokenExpired(accessToken)) {
        // Access token is not expired
        return true;
    }
	
    // Access token is expired and no refresh token in local storage
    if (!refreshToken) {
		window.location.hash = '#/';
        return false;
    }
	
	console.log('Refreshing token');
	const response = await fetch('https://localhost/api/auth/token/refresh/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': getCookie('csrftoken')
		},
		body: JSON.stringify({ refresh: refreshToken })
	});

	if (!response.ok) {
		console.log('Failed to fetch access token from server');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		window.location.hash = '#/';
		return false;
	}
	const data = await response.json();
	localStorage.setItem('accessToken', data.access);
		return true;

};

export const get = async (url, options = {}) => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }
    options.method = 'GET';
    options.headers = { ...getHeaders(), ...options.headers };
    return fetch(url, options);
};

// export const post = async (url, data, options = {}) => {
//     const isAuthenticated = await checkAuth();
//     if (!isAuthenticated) {
//         throw new Error('User is not authenticated');
//     }
//     options.method = 'POST';
//     options.headers = { ...getHeaders(), ...options.headers };
//     options.body = JSON.stringify(data);
//     return fetch(url, options);
// };

export const post = async (url, data, options = {}) => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }
    options.method = 'POST';
    options.headers = { ...getHeaders(), ...options.headers };

    if (!(data instanceof FormData)) {
        options.body = JSON.stringify(data);
    } else {
        options.body = data;
    }

    return fetch(url, options);
};

export const put = async (url, data, options = {}) => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }
    options.method = 'PUT';
    options.headers = { ...getHeaders(), ...options.headers };
    options.body = JSON.stringify(data);
    return fetch(url, options);
};

export const del = async (url, options = {}) => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }
    options.method = 'DELETE';
    options.headers = { ...getHeaders(), ...options.headers };
    return fetch(url, options);
};