import { checkAuth, get } from "../services/Api.js";

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

const renderSettings = async () => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }

    const userData = await fetchUserData();
    if (!userData) {
        return;
    }

    // Clear the previous content of the settings section
    let section = document.querySelector("#settings-section");
    if (!section) {
        section = document.createElement("div");
        section.id = "settings-section";
        document.body.appendChild(section);
    } else {
        section.innerHTML = '';
    }

    section.innerHTML = 
        `
        <div class="container-s">
            <h2 class="title-settings">SETTINGS</h2>
            <div class="profile-section">
                <img class="img-settings" src="${userData.avatar}" alt="User Avatar"> 
            </div>
            <div class="info-section">
                <div class="info">
                    <label class="info-label">USERNAME :</label>
                    <span class="info-value">${userData.username}</span>
                </div>
                <div class="info">
                    <label class="info-label">EMAIL :</label>
                    <span class="info-value">${userData.email}</span>
                </div>
                <div class="info">
                    <label class="info-label">PASSWORD :</label>
                    <span class="info-value">********</span>
                </div>
            </div>
            <div class="settings-section">
            </div>
        </div>
        `;
};

// Ensure only one instance of settings page is rendered
const Settings = async () => {
    const existingSection = document.querySelector("#settings-section");
    if (existingSection) {
        existingSection.remove();
    }
    await renderSettings();
};

export { Settings };
