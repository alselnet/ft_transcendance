export const LogOut = () => {
    
    let icon = document.createElement("div");
    
    icon.classList.add('logout-container');
    icon.innerHTML = 
    ` 
        <a class="nav-link d-none d-lg-flex" href="#/logout">
            <i class="bi bi-box-arrow-right"></i>
        </a>
    `;
    
    return icon;
};
