const Succes = () => {

    let msg = document.createElement("div");  
msg.innerHTML = `<h1>Inscription réussie</h1>`;
document.querySelector("#section").innerHTML = "";  
document.querySelector("#section").append(msg);

return ;
};

export default Succes;
