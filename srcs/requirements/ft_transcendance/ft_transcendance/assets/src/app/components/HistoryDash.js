import { animateNumbers } from "../animation/DashboardAnimation.js";

const HistoryDash = () => {
    let form = document.createElement("div");
    
	form.innerHTML = `
	<div class="right-side-history">
		<div class="history-history">
			<div class="victory-history">
				<p class="number-history" data-target="2">0</p>
				<p class="text-history">victoire(s)</p>
			</div>
			<div class="defeat-history">
				<p class="number-history" data-target="5">0</p>
				<p class="text-history">défaite(s)</p>
			</div>
            <a class="nav-link" href="#/gamehistory">
                <div id="game-history">
					<p class="game-historic-history">voir l'historique des parties</p>
                </div>
			</a>
		</div>
	</div>
    `;
	
	setTimeout(() => {
		const numbers = form.querySelectorAll('.number-history');
        numbers.forEach(number => {
			const target = +number.getAttribute('data-target');
            animateNumbers(number, target);
        });
    }, 500);
	
	return form;
};

export { HistoryDash };
