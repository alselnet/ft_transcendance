import { animateBalls } from "../animation/HomeAnimation.js";

const Home = () => {
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
        <div class="balls-home d-none d-md-flex">
            <div class="orange-ball-home">
                <a href="#/signin" data-hash="signin">
                    <span>I</span>
                    <span>n</span>
                    <span>s</span>
                    <span>c</span>
                    <span>r</span>
                    <span>i</span>
                    <span>p</span>
                    <span>t</span>
                    <span>i</span>
                    <span>o</span>
                    <span>n</span>
                </a>
            </div>
            <div class="white-ball-home">
                <a href="#/login" data-hash="login">
                    <span>c</span>
                    <span>o</span>
                    <span>n</span>
                    <span>n</span>
                    <span>e</span>
                    <span>x</span>
                    <span>i</span>
                    <span>o</span>
                    <span>n</span>
                </a>
            </div>
            <div class="btn-container-home">
                <button onclick="window.location='https://localhost/api/auth/42login/';" class="btn-42-home">
                    <p class="co-42-home">connexion avec</p>
                    <img src="./app/images/42.png" class="img-42-home" alt="button-42">
                </button>
            </div>
        </div>

        <div class="balls-home-sm d-none d-sm-flex d-md-none">
            <div class="orange-ball-home-sm">
                <a href="#/signin" data-hash="signin">
                    <span>I</span>
                    <span>n</span>
                    <span>s</span>
                    <span>c</span>
                    <span>r</span>
                    <span>i</span>
                    <span>p</span>
                    <span>t</span>
                    <span>i</span>
                    <span>o</span>
                    <span>n</span>
                </a>
            </div>
            <div class="white-ball-home-sm">
                <a href="#/login" data-hash="login">
                    <span>c</span>
                    <span>o</span>
                    <span>n</span>
                    <span>n</span>
                    <span>e</span>
                    <span>x</span>
                    <span>i</span>
                    <span>o</span>
                    <span>n</span>
                </a>
            </div>
            <div class="btn-container-home">
                <button onclick="window.location='https://localhost/api/auth/42login/';" class="btn-42-home">
                    <p class="co-42-home">connexion avec</p>
                    <img src="./app/images/42.png" class="img-42-home" alt="button-42">
                </button>
            </div>
        </div>
    `;

    const whiteBall = document.querySelector('.white-ball-home');
    const orangeBall = document.querySelector('.orange-ball-home');

    if (whiteBall && orangeBall) {
        animateBalls(section, whiteBall, orangeBall);
    } else {
        console.error(".white-ball-home or .orange-ball-home not found in the DOM");
    }
    }

};

export { Home };
