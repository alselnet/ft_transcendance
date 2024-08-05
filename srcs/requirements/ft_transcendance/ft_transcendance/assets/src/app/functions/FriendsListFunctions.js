import { del } from "../services/Api";

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`

export function getStatusColor(status) {
    switch (status) {
        case 'online':
            return 'green';
        case 'offline':
            return 'grey';
        case 'in-game':
            return 'orange';
        default:
            return 'grey';
    }
}

export function getStatusTooltip(status) {
    switch (status) {
        case 'online':
            return 'En ligne';
        case 'offline':
            return 'Déconnecté';
        case 'in-game':
            return 'En partie';
        default:
            return 'Unknown Status';
    }
}

export const deleteFriendList = async (username) => {
    try {
        const response = await del(`${usersUrl}/unfriend/${username}/`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to remove friend');
        }
        const data = await response.json();
        alert('Friend removed successfully');
    } catch (error) {
        console.error('Error removing friend:', error);
        alert(error.message || 'Failed to remove friend');
    }
}