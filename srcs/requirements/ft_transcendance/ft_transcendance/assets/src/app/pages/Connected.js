const Connected = () => {

    let msg = document.createElement("div");  
msg.innerHTML = `<h1>Vous êtes connectés</h1>`;
document.querySelector("#section").innerHTML = "";  
document.querySelector("#section").append(msg);

return ;
};

export default Connected;
