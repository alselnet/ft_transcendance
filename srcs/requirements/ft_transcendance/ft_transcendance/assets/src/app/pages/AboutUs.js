import { checkAuth } from "../services/Api.js"

const AboutUs = async () => {

	const isAuthenticated = await checkAuth();
    
    if (!isAuthenticated) {
        return;
    }

	let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
    `
	    <div class="main-container-aboutus">

        <h1 class="title-aboutus">Qui sommes nous ?</h1>
	    <div class="container-aboutus">
	    	<div class="row">
	    		<div id="block1" class="col-md-6 col-lg-4 mb-3">
	    			<div class="frame-aboutus">
	    				<h1 class="name-cube">Jéremy COINTRE</h1>
	    				<img class="img-us" src="./app/images/profile.png" alt="img-jeremy">
	    				<p>Développement du frontend</p>
	    			</div>
	    		</div>
	    		<div id="block2" class="col-md-6 col-lg-4 mb-3">
	    			<div class="frame-aboutus">
	    				<h1 class="name-cube">Hugo COULON</h1>
	    				<img class="img-us" src="./app/images/hugo.png" alt="img-hugo">
	    				<p>Développement du jeu</p>
	    			</div>
	    		</div>
	    		<div id="block3" class="col-md-6 col-lg-4 mb-3">
	    			<div class="frame-aboutus">
	    				<h1 class="name-cube">Tasnim MEJRI</h1>
	    				<img class="img-us" src="./app/images/Tasnim.jpg" alt="img-tasnim">
	    				<p>Développement du frontend</p>
	    			</div>
	    		</div>
	    		<div id="block4" class="col-md-6 col-lg-4 mb-3">
	    			<div class="frame-aboutus">
	    				<h1 class="name-cube">Alexandre SELNET</h1>
	    				<img class="img-us" src="./app/images/profile.png" alt="img-alex">
	    				<p>Développement du Backend</p>
	    			</div>
	    		</div>
	    		<div id="block5" class="col-md-6 col-lg-4 mb-3">
	    			<div class="frame-aboutus">
	    				<h1 class="name-cube">Jules THUYSBAERT</h1>
	    				<img class="img-us" src="./app/images/Jules.png" alt="img-jules">
	    				<p>Développement du backend</p>
	    			</div>
	    		</div>
    		</div>
	    </div>
	    </div>
    `; 
    }

};

export { AboutUs };
