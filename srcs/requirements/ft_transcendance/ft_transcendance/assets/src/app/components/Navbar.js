export const Navbar = () => {
  let nav = document.createElement("nav");
  nav.classList.add('navbar-container');
  
  nav.innerHTML = `
      <nav class="navbar-container">
        <div class="container-fluid">
          <div class="myNavbar d-none d-lg-flex">
            <a class="nav-link" href="#/game"><i class="bi bi-controller navbar-icon"></i></a>
            <a class="nav-link" href="#/dashboard"><i class="bi bi-person-fill navbar-icon"></i></a>
            <a class="nav-link" href="#/settings"><i class="bi bi-gear-fill navbar-icon"></i></a>
            <a class="nav-link" href="#/aboutus"><i class="bi bi-info-circle navbar-icon"></i></a>
          </div>
        </div>
      </nav>

      <nav class="navbar-container-media">
         <div class="myNavbar-sm d-none d-lg-flex">
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


