import { post, del } from "../services/Api.js";

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`

export  function getStatusColor(status) {
    switch (status) {
        case 'online':
            return 'green';
        case 'offline':
            return 'grey';
		case 'in game':
				return 'orange';
        default:
            return 'red';
    }
}

export function addFriend(username) {

    post(`${usersUrl}/add-friend/${username}/`)
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => { throw new Error(data.detail || 'Failed to add friend'); });
        }
        return response.json();
    })
    .then(data => {
        alert('Friend added successfully');
    })
    .catch(error => {
        alert(error.message || 'Failed to add friend');
    });
}

export function deleteFriend(username) {

    del(`${usersUrl}/unfriend/${username}/`)
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => { throw new Error(data.detail || 'Failed to remove friend'); });
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert('Friend removed successfully');
    })
    .catch(error => {
        console.error('Error removing friend:', error);
        alert(error.message || 'Failed to remove friend');
    });
}