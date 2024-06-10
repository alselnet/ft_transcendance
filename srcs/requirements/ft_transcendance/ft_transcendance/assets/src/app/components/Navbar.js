export const Navbar = () => {
    let nav = document.createElement("nav");

    nav.innerHTML = `
        <a href="#/">Home</a>
        <a href="#/inscription">Inscription</a>
        <a href="#/connexion">Connexion</a>
        <a href="#/jeu">Jeu</a>
        <a href="#/dashboard">Dash</a>

		<nav class="navbar-container">
		<div class="container-fluid">
			<div class="myNavbar d-none d-lg-flex">
				<a class="nav-link active" href="#/jeu"><i class="bi bi-controller" style="font-size: 4rem; color: white;"></i></a>
				<a class="nav-link" href="#/dashboard"><i class="bi bi-person-fill" style="font-size: 3rem; color: white;"></i></a>
				<a class="nav-link" href="#/"><i class="bi bi-gear-fill" style="font-size: 3rem; color: white;"></i></a>
				<a class="nav-link" href="#/"><i class="bi bi-people-fill" style="font-size: 3rem; color: white;"></i></a>
			</div>
		</div>
		</nav>
    `;

	document.addEventListener('hashchange', updateActiveLink);
    updateActiveLink(); // Initial call to set the correct active link on page load

    return nav; //lorsque cette fonction est appelée, elle renvoie un élément <nav> 
};

const updateActiveLink = () => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.classList.remove('active'); // Remove active class from all links
    });

    const hash = location.hash;
    const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
    if (activeLink) {
        activeLink.classList.add('active'); // Add active class to the current link
    }
};