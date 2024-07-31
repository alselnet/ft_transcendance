export const Navbar = () => {
  let nav = document.createElement("nav");
  nav.classList.add('navbar-container');
  
  nav.innerHTML = `
      <nav class="navbar-container">
        <div class="container-fluid">
          <div class="myNavbar d-none d-lg-flex">
            <a class="nav-link" href="#/game"><i class="bi bi-controller" style="font-size: 4rem; color: white;"></i></a>
            <a class="nav-link" href="#/dashboard"><i class="bi bi-person-fill" style="font-size: 4rem; color: white;"></i></a>
            <a class="nav-link" href="#/settings"><i class="bi bi-gear-fill" style="font-size: 4rem; color: white;"></i></a>
            <a class="nav-link" href="#/aboutus"><i class="bi bi-info-circle" style="font-size: 4rem; color: white;"></i></a>
          </div>
        </div>
      </nav>

      <nav class="navbar-container-sm">
         <div class="myNavbar-sm d-flex d-lg-none navSm">
          <div class="navbar">
            <div class="container-fluid">
              <a class="navbar-brand" href="#"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
              <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link" active href="#/game">Jeu</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#/dashboard">Mon profil</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#/settings">Paramètres</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#/aboutus">À propos de nous</a>
                  </li>
                     <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#/logout">Déconnexion</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

  `;

  return nav;
};

export const updateActiveLink = () => {
  console.log('Updating active link');
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
      link.classList.remove('active');
  });

  const hash = location.hash;
  const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
  if (activeLink) {
      activeLink.classList.add('active');
      console.log('Active link:', activeLink);
  }
};

