import Tmejri from '../images/Tasnim.jpg'
import { checkAuth } from "../services/Api.js";

const Settings = async () => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }
    let form = document.createElement("div");
    section.innerHTML = 
        `
        <div class="container-s">
            <h2 class="title-settings">SETTINGS</h2>
            <div class="profile-section">
                <img class="img-settings" src="${Tmejri}" alt="Tmejri"> 
                <a href="#" class="edit-link">edit</a>
            </div>
            <div class="info-section">
                <div class="info">
                    <label class="info-label">NICKNAME :</label>
                    <input type="text" class="info-input">
                    <a href="#" class="edit-link">edit</a>
                </div>
                <div class="info">
                    <label class="info-label">PASSWORD :</label>
                    <input type="password" class="info-input">
                    <a href="#" class="edit-link">edit</a>
                </div>
            </div>
            <div class="settings-section">
                <div class="item1">
                    <div class="setting">
                        <span class="setting-label">ON</span>
                        <label class="switch">
                            <input type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                        <span class="setting-description">Sound</span>
                    </div>
                    <div class="setting">
                        <span class="setting-label">OFF</span>
                        <label class="switch">
                            <input type="checkbox">
                            <span class="slider"></span>
                        </label>
                        <span class="setting-description">Dark mode</span>
                    </div>
                </div>
                <div class="item2">
                    <div class="setting">
                        <span class="setting-label">OFF</span>
                        <label class="switch">
                            <input type="checkbox">
                            <span class="slider"></span>
                        </label>
                        <span class="setting-description">Music</span>
                    </div>
                    <div class="setting">
                        <span class="setting-label">OFF</span>
                        <label class="switch">
                            <input type="checkbox">
                            <span class="slider"></span>
                        </label>
                        <span class="setting-description">Mode secret</span>
                    </div>
                </div>
            </div>
            <div class="color-theme">
                <span>Color theme</span>
                <label class="switch">
                    <input type="checkbox">
                    <span class="slider red"></span>
                </label>
            </div>
        </div>
        `; 
        return form;
};

export { Settings };