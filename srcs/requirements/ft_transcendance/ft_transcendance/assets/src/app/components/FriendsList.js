/*const FriendList = () => {
    console.log("Friend List component loaded");
    
    let root = document.getElementById("root");
    if (!root) {
        console.error("#root not found in the DOM");
        return;
    }
    
    let navbar = document.querySelector(".navbar-container");
    if (navbar) {
        navbar.remove();
    }
    
    let logoutbutton = document.querySelector(".logout-container");
    if (logoutbutton) {
        logoutbutton.remove();
    }
    
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = `

        <div class="main-container-fl fl-hidden">
            <div class="friends-container">
                <h2 class="title-fl">FRIENDS LIST</h2>
                <a class="nav-link" href="#/dashboard">
                    <span class="close-btn-fl">&times;</span>
                </a>
                <table class="friends-table">
                    <tbody>
                        <tr>
                            <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"></td>
                            <td><span class="user-fl">jecointr</span></td>
                            <td><span class="remove-btn-fl">&times;</span></td>
                        </tr>
                        <tr>
                            <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"></td>
                            <td><span class="user-fl">jecointr</span></td>
                            <td><span class="remove-btn-fl">&times;</span></td>
                        </tr>
                        <tr>
                            <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"></td>
                            <td><span class="user-fl">jecointr</span></td>
                            <td><span class="remove-btn-fl">&times;</span></td>
                        </tr>
                        <tr>
                            <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"></td>
                            <td><span class="user-fl">jecointr</span></td>
                            <td><span class="remove-btn-fl">&times;</span></td>
                        </tr>
                        <tr>
                            <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"></td>
                            <td><span class="user-fl">jecointr</span></td>
                            <td><span class="remove-btn-fl">&times;</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>`;
        
        console.log("Section content:", section.innerHTML);

        const friendsListContainer = document.querySelector('.main-container-fl');
        if (friendsListContainer) {
            setTimeout(() => {
                friendsListContainer.classList.add('fl-visible');
                friendsListContainer.classList.remove('fl-hidden');
            }, 0); // Delay to ensure the DOM has updated
        }
    } else {
        console.error("#section not found in the DOM");
    }
};

export default FriendList;
*/

const FriendList = () => {
    console.log("Friend List component loaded");
    
    let root = document.getElementById("root");
    if (!root) {
        console.error("#root not found in the DOM");
        return;
    }
    
    let navbar = document.querySelector(".navbar-container");
    if (navbar) {
        navbar.remove();
    }
    
    let logoutbutton = document.querySelector(".logout-container");
    if (logoutbutton) {
        logoutbutton.remove();
    }
    
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = `

        <div class="main-containerf fl-hidden">
        <div class="friends-containerf">
            <h2 class="titlef">FRIENDS LIST</h2>
            <a class="nav-link" href="#/dashboard">
                <span class="close-btnf">&times;</span>
            </a>
            <table class="friends-tablef">
                <tbody>
                    <tr>
                        <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> </td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                    <tr>
                        <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> </td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                    <tr>
                        <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> </td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                    <tr>
                        <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"></td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                    <tr>
                        <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"></td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
        `;
        
        console.log("Section content:", section.innerHTML);

        const friendsListContainer = document.querySelector('.main-containerf');
        if (friendsListContainer) {
            setTimeout(() => {
                friendsListContainer.classList.add('fl-visible');
                friendsListContainer.classList.remove('fl-hidden');
            }, 0); // Delay to ensure the DOM has updated
        }
    } else {
        console.error("#section not found in the DOM");
    }
};

export default FriendList;
