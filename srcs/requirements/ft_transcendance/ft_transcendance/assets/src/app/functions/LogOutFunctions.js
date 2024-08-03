import { post } from "../services/Api.js"

const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`

export const LogOutUser = async () => {
    try {
        const response = await post(`${authUrl}/signout/`);

        if (!response.ok) {
            throw new Error('Failed to logout');
        }

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        window.location.href = '#/';
    } catch (error) {
        console.error('Logout error:', error);
        alert('An error occurred while logging out. Please try again.');
    }
};