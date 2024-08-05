import { put } from "../services/Api.js";

const usersUrl = `${window.location.protocol}//${window.location.host}/api/users`

const updateEmailSettings = () => {
    document.getElementById('submit-update-email').addEventListener('click', async () => {
        const newEmail = document.getElementById('new-data').value;
        const password = document.getElementById('password').value;

        if (newEmail && password) {
            try {
                const response = await put(`${usersUrl}/update-email/`, { email: newEmail, password: password });

                if (response.ok) {
                    const updateData = await response.json();
                    alert('Email updated successfully');
                    window.location.hash = '#/settings';
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error || 'Failed to update email'}`);
                }
            } catch (error) {
                console.error('Error updating email:', error);
                alert('An error occurred while updating the email');
            }
        } else {
            alert('Please enter both email and password');
        }
    });
}

const updatePswSettings = () => {
    document.getElementById('submit-update-password').addEventListener('click', async () => {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (currentPassword && newPassword && confirmPassword) {
            if (newPassword === confirmPassword) {
                try {
                    const response = await put(`${usersUrl}/update-password/`, {
                        current_password: currentPassword,
                        new_password: newPassword
                    });

                    if (response.ok) {
                        alert('Password updated successfully');
                        window.location.hash = '#/settings';
                    } else {
                        const errorData = await response.json();
                        alert(`Error: ${errorData.current_password || errorData.new_password || 'Failed to update password'}`);
                    }
                } catch (error) {
                    console.error('Error updating password:', error);
                    alert('An error occurred while updating the password');
                }
            } else {
                alert('New password and confirmation do not match');
            }
        } else {
            alert('Please enter all fields');
        }
    });
}

const updateUsernameSettings = () => {
    document.getElementById('submit-update-username').addEventListener('click', async () => {
        const newUsername = document.getElementById('new-data').value;
        const password = document.getElementById('password').value;

        if (newUsername && password) {
            try {
                const response = await put(`${usersUrl}/update-username/`, { username: newUsername, password: password });

                if (response.ok) {
                    const updateData = await response.json();
                    alert('Username updated successfully');
					window.location.hash = '#/settings';
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error || 'Failed to update username'}`);
                }
            } catch (error) {
                console.error('Error updating username:', error);
                alert('An error occurred while updating the username');
            }
        } else {
            alert('Please enter both username and password');
        }
    });
}

export { updateEmailSettings, updatePswSettings, updateUsernameSettings }