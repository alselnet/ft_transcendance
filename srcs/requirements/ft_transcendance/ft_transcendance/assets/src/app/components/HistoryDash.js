const HistoryDash = () => {
    let form = document.createElement("div");
    
	form.innerHTML = `
    <div class="container-fluid">
		<div class="right-side-history">
			<div class="history-history">
				<div class="victory-history">
					<p class="number-history">5</p>
					<p class="text-history">victoire(s)</p>
				</div>
				<div class="defeat-history">
					<p class="number-history">2</p>
					<p class="text-history">défaite(s)</p>
				</div>
				<p class="game-historic-history">voir l'historique des parties</p>
			</div>
		</div>
	</div>

    `;
    return form;
};

export { HistoryDash };
