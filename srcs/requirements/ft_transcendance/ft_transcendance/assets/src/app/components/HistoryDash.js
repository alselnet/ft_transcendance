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
			<p class="game-historic-history">voir l'historique des parties</p>
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

// document.addEventListener('DOMContentLoaded', () => {
//     const counters = document.querySelectorAll('.number-history');
//     const speed = 200; // Ajuster la vitesse selon les besoins

//     counters.forEach(counter => {
//         const updateCount = () => {
//             const target = +counter.getAttribute('data-target');
//             const count = +counter.innerText;

//             // Calculer l'incrément
//             const increment = target / speed;

//             if (count < target) {
//                 counter.innerText = Math.ceil(count + increment);
//                 setTimeout(updateCount, 10); // Ajuster le délai pour une animation plus fluide
//             } else {
//                 counter.innerText = target;
//             }
//         };

//         updateCount();
//     });
// });