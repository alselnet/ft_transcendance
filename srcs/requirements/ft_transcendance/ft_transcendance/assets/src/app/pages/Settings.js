import { checkAuth } from "../services/Api.js"
import Jcointre from '../images/jecointr_avatar.png'

const translations = {};

function loadLanguage(lang) {
    fetch(`languages/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            translations[lang] = data;
            applyTranslations(lang);
        })
        .catch(error => console.error('Error loading language:', error));
}

function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

function changeLanguage(lang) {
    if (translations[lang]) {
        applyTranslations(lang);
    } else {
        loadLanguage(lang);
    }
}

const Settings = async () => {

    const isAuthenticated = await checkAuth();
    
    if (!isAuthenticated) {
        return;
    }

    let form = document.createElement("div");
    section.innerHTML = 
        `
        <div class="container">
            <h2 class="title-settings">SETTINGS</h2>
            <span class="close-btn-settings">&times;</span>
            <div class="profile-section">
                <img class="img-settings" src="${Jcointre}" alt="jecointr"> 
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