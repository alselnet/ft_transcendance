import { del, get } from "../services/Api.js";

const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`;
const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`;

const getUserProfile = async () => {
    try {
        const response = await get(`${usersUrl}/me/`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Erreur lors de la récupération du profil');
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Une erreur est survenue lors de la récupération du profil');
        return null;
    }
};

const deleteProcess = () => {
    document.getElementById('submit-delete-account').addEventListener('click', async () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
            try {
                const profile = await getUserProfile();
                if (profile) {
                    const payload = {};
                    if (!profile.fortytwo_account) {
                        const password = document.getElementById('delete-password').value;
                        if (!password) {
                            alert('Veuillez entrer votre mot de passe');
                            return;
                        }
                        payload.password = password;
                    }

                    const response = await del(`${authUrl}/delete-user/`, payload);

                    if (response.ok) {
                        alert('Compte supprimé avec succès');
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        window.location.hash = '#/';
                    } else {
                        const errorData = await response.json();
                        alert(`Erreur : ${errorData.error || 'Échec de la suppression du compte'}`);
                    }
                }
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('Une erreur est survenue lors de la suppression du compte');
            }
        }
    });
};

export { deleteProcess };
