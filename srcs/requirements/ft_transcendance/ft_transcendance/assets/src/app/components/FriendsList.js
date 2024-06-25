const FriendList = () => {
    let div = document.createElement("div");
    console.log("Game History component loaded");

    let root = document.getElementById("root");
    if (!root) {
        console.error("#root not found in the DOM");
        return;
    }

    // Retirer Navbar de root
    let navbar = document.querySelector("#root > nav");
    if (navbar) {
        navbar.remove();
    }

        section.innerHTML = 
        `
    <div class="main-container-fl">
        <div class="friends-container">
            <h2 class="title-fl">FRIENDS LIST</h2>
            <a class="nav-link" href="#/dashboard">
                <span class="close-btn-fl">&times;</span>
            </a>
                <table class="friends-table">
                <tbody>
                    <tr>
                        <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> </td>
                        <td><span class="user-fl">jecointr</span></td>
                        <td><span class="remove-btn-fl">&times;</span></td>
                    </tr>
                    <tr>
                        <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> </td>
                        <td><span class="user-fl">jecointr</span></td>
                        <td><span class="remove-btn-fl">&times;</span></td>
                    </tr>
                    <tr>
                        <td><img src="./app/images/jecointr_avatar.png" alt="jecointr"> </td>
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

        `; 
        return div;
};

export default FriendList;