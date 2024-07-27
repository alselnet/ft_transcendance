import { animateNumbers } from "../animation/DashboardAnimation.js";

const FriendDashStat = () => {
    let form = document.createElement("div");
    form.innerHTML = `
    <div class="left-side-stat">
        <div class="id-stat">
            <div><img src="./app/images/tmejri_avatar.png" alt="profile-pic" class="profile-picture-stat"></div>
            <div class="text-stat">
                <div class="name-and-settings">
                    <div class="username-stat">Tmejri</div>
                    <a class="nav-link" href="#/deletefriendmsg"><i class="bi bi-person-dash gear-icon"></i></a>
                </div>
                <div class="status-stat">
                    <div class="pastille-stat"></div>
                    <div class="status-text-stat">en ligne</div>
                </div>
            </div>
        </div>
 
        <div class="statistics-stat">
            <div class="left-side-stat-stat">
                <div class="stat-title-stat">Statistiques du joueur :</div>
                <div class="camembert-stat"></div>
            </div>
            <div class="right-side-stat-stat">
                <div class="stat-data-stat">
                    <div class="stat-rubric-stat">
                        <p class="stat-text-stat">Partie(s) jouée(s)</p>
                        <p class="stat-number-stat" data-target="7">0</p>
                    </div>
                    <div class="stat-rubric-stat">
                        <p class="stat-text-stat">Adversaire(s) rencontré(s)</p>
                        <p class="stat-number-stat" data-target="6">0</p>
                    </div>
                    <div class="stat-rubric-stat">
                        <p class="stat-text-stat">Temps de jeu (s)</p>
                        <p class="stat-number-stat" data-target="124">0</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-link">
            <a class="nav-link" href="#/friendlist">         
                <div class="friends-list-stat" id="list-stat">
                    <i class="bi bi-list-task list-icon"></i>
                    <p class="list-text-stat">Liste d'amis</p>
                </div>
            </a>
        </div>
    </div>
    `;

    setTimeout(() => {
        const numbers = form.querySelectorAll('.stat-number-stat');
        numbers.forEach(number => {
            const target = +number.getAttribute('data-target');
            animateNumbers(number, target);
        });
    }, 500);

    return form;
};

export { FriendDashStat };
