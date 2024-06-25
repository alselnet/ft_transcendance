const Settings = () => {
    let form = document.createElement("div");

    console.log("Settings component loaded");

    section.innerHTML = 
        `
        <div class="container">
            <h2>SETTINGS</h2>
            <span class="close-btn">&times;</span>
            <div class="profile-section">
                <img src="../images/jecointr_avatar.png" alt="jecointr"> 
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

export default Settings;
