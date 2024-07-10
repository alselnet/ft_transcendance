const Home = () => {
    console.log("Home component loaded");

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
        console.log("Section content:", section.innerHTML);

        // Fonction de timing pour le rebond
        function bounce(timeFraction) {
            for (let a = 0, b = 1; 1; a += b, b /= 2) {
                if (timeFraction >= (7 - 4 * a) / 11) {
                    return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
                }
            }
        }

        function makeEaseOut(timing) {
            return function(timeFraction) {
                return 1 - timing(1 - timeFraction);
            };
        }

        function animate({timing, draw, duration}) {
            let start = performance.now();

            requestAnimationFrame(function animate(time) {
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) timeFraction = 1;

                let progress = timing(timeFraction);

                draw(progress);

                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
            });
        }

        // Animation des balles
        const whiteBall = document.querySelector('.white-ball-home');
        const orangeBall = document.querySelector('.orange-ball-home');

        if (whiteBall && orangeBall) {

            whiteBall.style.position = 'absolute';
            orangeBall.style.position = 'absolute';

            whiteBall.style.top = '0';
            orangeBall.style.top = '0';

            const toWhite = (section.clientHeight - whiteBall.clientHeight) / 2;
            const toOrange = (section.clientHeight - orangeBall.clientHeight) / 2;

            console.log(section.clientHeight);
            console.log(whiteBall.clientHeight);

            animate({
                duration: 2000,
                timing: makeEaseOut(bounce),
                draw(progress) {
                    whiteBall.style.transform = `translateY(${toWhite * progress}px)`;
                }
            });

            setTimeout(() => {
                animate({
                    duration: 2000,
                    timing: makeEaseOut(bounce),
                    draw(progress) {
                        orangeBall.style.transform = `translateY(${toOrange * progress}px)`;
                    }
                });
            }, 1000); // Débuter l'animation de la balle orange après 1 seconde
        } else {
            console.error(".white-ball-home or .orange-ball-home not found in the DOM");
        }
    } else {
        console.error("#section not found in the DOM");
    }

};

export default Home;
