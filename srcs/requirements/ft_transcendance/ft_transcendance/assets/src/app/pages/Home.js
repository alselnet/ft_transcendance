const Home = () => {

            let msg = document.createElement("div");  
        msg.innerHTML = `<h1>Bienvenue sur Pong</h1>`;
        document.querySelector("#section").innerHTML = "";  
        document.querySelector("#section").append(msg);

    return ;
};

export default Home;
