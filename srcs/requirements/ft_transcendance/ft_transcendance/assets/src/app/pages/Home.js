const Home = () => {

    console.log("Home component loaded");
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
        `
        <div class="balls-home d-none d-sm-flex">
            <div class="orange-ball-home">
                <a href="#/inscription" data-hash="inscription">Inscription</a>
            </div>
            <div class="white-ball-home">
                <a href="#/connexion" data-hash="connexion">Connexion</a>
            </div>
            <div class="btn-container-home">
                <button onclick="window.location='https://42.fr/';" class="btn-42-home">
                    <p class="co-42-home">connexion avec</p>
                    <img src="./app/images/42.png" class="img-42-home" alt="button-42">
                </button>
            </div>
        </div>
        <div class="balls-sm-home d-lg-none d-sm-flex">
        <div class="orange-ball-sm-home">
            <a href="#/inscription" data-hash="inscription">Inscription</a>
        </div>
        <div class="white-ball-sm-home">
            <a href="#/connexion" data-hash="connexion">Connexion</a>
        </div>
        <div class="btn-container-sm-home">
            <button onclick="window.location='https://42.fr/';" class="btn-42-home">
                <p class="co-42-home">connexion avec</p>
                <img src="./app/images/42.png" class="img-42-home" alt="button-42-home">
            </button>
        </div>
    </div>   
    `;
    console.log("Section content:", section.innerHTML);
    } else {
        console.error("#section not found in the DOM");
    }

};

export default Home;


document.addEventListener('DOMContentLoaded', () => {
    // Ajout des écouteurs d'événements aux liens de navigation
    const links = document.querySelectorAll('a[data-hash]');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const hash = event.target.getAttribute('data-hash');
            location.hash = `#/${hash}`;
        });
    });

    // Initialisation du routeur
    // window.addEventListener('hashchange', Router);
    // Router();
});
