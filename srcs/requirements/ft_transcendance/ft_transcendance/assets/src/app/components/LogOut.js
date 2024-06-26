export const LogOut = () => {
    
    let icon = document.createElement("div");
    
    icon.classList.add('logout-container');
    icon.innerHTML = 
    ` 
        <a class="nav-link" href="#/logout">
            <i class="bi bi-box-arrow-right"></i>
        </a>
    `;
    
    return icon;
};
