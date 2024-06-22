const animateNumbers = (element, target) => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 10);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            clearInterval(timer);
            start = target;
        }
        element.textContent = Math.floor(start);
    }, 10);
};

const DashStat = () => {
    let form = document.createElement("div");
    form.innerHTML = `
    <div class="left-side-stat">
        <div class="id-stat">
            <div><img src="./app/images/tmejri_avatar.png" alt="profile-pic" class="profile-picture-stat"></div>
            <div class="text-stat">
                <div class="username-stat">Tmejri</div>
                <div class="status-stat">
                    <div class="pastille-stat"></div>
                    <div class="status-text-stat">en ligne</div>
                    <div class="icon-settings-stat"><i class="bi bi-gear-fill-stat" style="font-size: 1.5rem; color: white;"></i></div>
                </div>
            </div>
        </div>
 
        <div class="statistics-stat">
            <div class="left-side-stat-stat">
                <div class="stat-title-stat">Statistiques du joueur :</div>
                <div class="camambert-stat"></div>
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
        <div class="friends-and-leaderboard-stat">
            <a class="nav-link" href="#/leaderboard">
                <div class="leaderboard-stat" id="leaderboard-stat">
                    <i class="bi bi-trophy-fill trophy-icon"></i>
                    <p class="leader-text-stat">Leaderboard</p>
                </div>
            </a>
            <div class="friends-list-stat">
                <i class="bi bi-list-task" style="font-size: 3rem; color: white;"></i>
                <p class="list-text-stat">Liste d'amis</p>
            </div>
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

export { DashStat };
