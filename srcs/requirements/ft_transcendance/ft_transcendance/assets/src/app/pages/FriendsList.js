const FriendsList = () => {
    let section = document.querySelector("#section");
    console.log("Friends List component loaded");

        section.innerHTML = 
        `
        <div class="main-containerf">
        <div class="friends-containerf">
            <h2>FRIENDS LIST</h2>
            <span class="close-btnf">&times;</span>
            <table class="friends-tablef">
                <tbody>
                    <tr>
                        <td><img src="../images/jecointr_avatar.png" alt="jecointr"> </td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                    <tr>
                        <td><img src="../images/jecointr_avatar.png" alt="jecointr"> </td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                    <tr>
                        <td><img src="../images/jecointr_avatar.png" alt="jecointr"> </td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                    <tr>
                        <td><img src="../images/jecointr_avatar.png" alt="jecointr"></td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                    <tr>
                        <td><img src="../images/jecointr_avatar.png" alt="jecointr"></td>
                        <td><span class="userf">jecointr</span></td>
                        <td><span class="remove-btnf">&times;</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
        `; 
        return form;
};

export default FriendsList;