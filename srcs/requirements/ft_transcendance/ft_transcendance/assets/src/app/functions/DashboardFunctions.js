import { animateNumbers, setupCamembertAnimation } from "../animation/DashboardAnimation.js";
import { put } from "../services/Api.js"
import { getStatusColor } from "../functions/FriendProfileFunctions.js"

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`

const setUpNumberAnimation = (form) => {

    setTimeout(() => {
        const numbers = form.querySelectorAll('.stat-number');
        numbers.forEach(number => {
            const target = +number.getAttribute('data-target');
            animateNumbers(number, target);
        });
    }, 500);

}

const modifyStatus = (form, userDataSatus) => {
    form.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const newStatus = item.getAttribute('data-status');
            put(`${usersUrl}/update-status/`, { status: newStatus })
            .then(updateResponse => {
                if (!updateResponse.ok) {
                    throw new Error('Failed to update user status');
                }
                return updateResponse.json();
            })
            .then(() => {
                userDataSatus = newStatus;
                const statusText = form.querySelector('.status-text');
                const statusPastille = form.querySelector('.status-pastille');
                if (statusText && statusPastille) {
                    statusText.innerText = newStatus;
                    statusPastille.style.backgroundColor = getStatusColor(newStatus);
                }
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
        });
    });
}

const addCamembert = (form, played, won) => {

    let percentage = 0;
    let color = "#b26969";
    let message = '';
    if (played !== 0) {
        percentage = ((played - won) * 99.9999) / played;
    } else {
        message = "aucune partie jouée";
    }

    setupCamembertAnimation(form, percentage, color, message);
    window.addEventListener('resize', () => {
        setupCamembertAnimation(form, percentage, color, message);
    });
}

export { addCamembert, modifyStatus, setUpNumberAnimation }