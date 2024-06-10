const MyProfile = () => {

    let msg = document.createElement("div");  
msg.innerHTML = `<h1>My Profile</h1>`;
document.querySelector("#section").innerHTML = "";  
document.querySelector("#section").append(msg);

return ;
};

export default MyProfile;
