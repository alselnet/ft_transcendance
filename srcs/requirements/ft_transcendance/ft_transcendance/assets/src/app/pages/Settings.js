import { checkAuth, get, put } from "../services/Api.js";

const fetchUserData = async () => {
    try {
        const response = await get('https://localhost/api/users/me/');
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

const updateUserData = async (field, value) => {
    try {
        const response = await put(`https://localhost/api/users/update-${field}/`, {
            [field]: value
        });
        if (!response.ok) {
            throw new Error(`Failed to update ${field}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error updating ${field}:`, error);
        return null;
    }
};

const Settings = async () => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }

    const userData = await fetchUserData();
    if (!userData) {
        return;
    }

    let section = document.querySelector("#settings-section");
    if (!section) {
        section = document.createElement("div");
        section.id = "settings-section";
        document.body.appendChild(section);
    } else {
        section.innerHTML = '';
    }

    section.innerHTML = `
        <div class="container-s">
            <h2 class="title-settings">SETTINGS</h2>
            <div class="profile-section">
                <img class="img-settings" src="${userData.avatar}" alt="User Avatar"> 
            </div>
            <div class="info-section">
                <div class="info">
                    <label class="info-label">USERNAME :</label>
                    <span class="info-value username-value">${userData.username}</span>
                    <form id="username-form">
                        <input type="text" id="username-input" value="${userData.username}">
                        <button type="submit">Update</button>
                    </form>
                </div>
                <div class="info">
                    <label class="info-label">EMAIL :</label>
                    <span class="info-value email-value">${userData.email}</span>
                    <form id="email-form">
                        <input type="email" id="email-input" value="${userData.email}">
                        <button type="submit">Update</button>
                    </form>
                </div>
                <div class="info">
                    <label class="info-label">PASSWORD :</label>
                    <span class="info-value">********</span>
                </div>
            </div>
        </div>
    `;

    const usernameForm = document.querySelector("#username-form");
    usernameForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newUsername = document.querySelector("#username-input").value;
        const updatedData = await updateUserData('username', newUsername);
        if (updatedData) {
            document.querySelector(".username-value").innerText = updatedData.username;
        }
    });

    const emailForm = document.querySelector("#email-form");
    emailForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newEmail = document.querySelector("#email-input").value;
        const updatedData = await updateUserData('email', newEmail);
        if (updatedData) {
            document.querySelector(".email-value").innerText = updatedData.email;
        }
    });
};

export { Settings };
