import { checkAuth } from "../services/Api.js"

const Leaderboard = async () => {
    
    const isAuthenticated = await checkAuth();
    
    if (!isAuthenticated) {
        return;
    }
    
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
        <div class="container-ldb">
            <h1 class="title-ldb">Leaderboard</h1>
            <div class="frame-ldb">
                <a class="nav-link" href="#/dashboard"><span class="close-btn-ldb">&times;</span></a>
                    <div class="podium-ldb">
                        <div class="second-ldb">
                            <div class="pod-result-ldb">
                                <div class="profile-picture-ldb"><img src="./app/images/tmejri_avatar.png" alt="jcointre"></div>
                                <div class="username-ldb">Jcointre</div>
                                <div class="score-ldb">1234 pts</div>
                            </div>

                            <p class="two-ldb">2</p>
                        </div>

                        <div class="first-ldb">
                            <div class="pod-result-one-ldb">
                                <div class="profile-picture-ldb"><img src="./app/images/jecointr_avatar.png" alt="jcointre"></div>
                                <div class="username-ldb">Jcointre</div>
                                <div class="score-ldb">1234 pts</div>
                            </div>

                            <p class="one-ldb">1</p>
                        </div>

                        <div class="third-ldb">
                            <div class="pod-result-third-ldb">
                                <div class="profile-picture-ldb"><img src="./app/images/jecointr_avatar.png" alt="jcointre"></div>
                                <div class="username-ldb">Jcointre</div>
                                <div class="score-ldb">1234 pts</div>
                            </div>
                            <p class="three-ldb">3</p>
                        </div>
                    </div>

                <div class="leaderboard-list-ldb">
                    <div class="profil-ldb">
                        <div class="rank-ldb">4.</div>
                        <div class="profile-picture-ldb"><img src="./app/images/tmejri_avatar.png" alt="jcointre"></div>
                        <div class="username-ldb">Jcointre</div>
                        <div class="score-ldb">1234 pts</div>
                    </div>
                    <div class="profil-ldb">
                        <div class="rank-ldb">5.</div>
                        <div class="profile-picture-ldb"><img src="./app/images/jecointr_avatar.png" alt="jcointre"></div>
                        <div class="username-ldb">Tmejri</div>
                        <div class="score-ldb">1233 pts</div>
                    </div>
                    <div class="profil-ldb">
                        <div class="rank-ldb">6.</div>
                        <div class="profile-picture-ldb"><img src="./app/images/jecointr_avatar.png" alt="jcointre"></div>
                        <div class="username-ldb">Jcointre</div>
                        <div class="score-ldb">1232 pts</div>
                    </div>
                    <div class="profil-ldb">
                        <div class="rank-ldb">7.</div>
                        <div class="profile-picture-ldb"><img src="./app/images/tmejri_avatar.png" alt="jcointre"></div>
                        <div class="username-ldb">Tmejri</div>
                        <div class="score-ldb">1231 pts</div>
                    </div>
                </div>
            </div>
        </div>
        `;

		const leaderboardContainer = document.querySelector('.container-ldb');
		if (leaderboardContainer) {
			setTimeout(() => {
				leaderboardContainer.classList.add('animate-ldb');
			}, 0);
		}
	}
};

export { Leaderboard };
