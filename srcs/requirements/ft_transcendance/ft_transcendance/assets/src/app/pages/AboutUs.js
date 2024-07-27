import Hucoulon from '../images/hugo.png'
import Tmejri from '../images/Tasnim.jpg'
import Aselnet from '../images/Alex.png'
import Jthuysba from '../images/Jules.png'
import { checkAuth } from "../services/Api.js";

const AboutUs = async () => {

    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        throw new Error('User is not authenticated');
    }

	let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
    `
	    <div class="main-container-aboutus">

        <h1 class="title-aboutus">Qui sommes nous ?</h1>
	    <div class="container-aboutus">
	    	<div class="row">
	    		<div id="block2" class="col-md-6 col-lg-6 mb-3">
	    			<div class="frame-aboutus">
	    				<h1 class="name-cube">Hugo COULON</h1>
	    				<img class="img-us" src="${Hucoulon}" alt="img-hugo">
	    				<p>Développement du jeu</p>
	    			</div>
	    		</div>
	    		<div id="block3" class="col-md-6 col-lg-6 mb-3">
	    			<div class="frame-aboutus">
	    				<h1 class="name-cube">Tasnim MEJRI</h1>
	    				<img class="img-us" src="${Tmejri}" alt="img-tasnim">
	    				<p>Développement du frontend</p>
	    			</div>
	    		</div>
	    		<div id="block4" class="col-md-6 col-lg-6 mb-3">
	    			<div class="frame-aboutus">
	    				<h1 class="name-cube">Alexandre SELNET</h1>
	    				<img class="img-us" src="${Aselnet}" alt="img-alex">
	    				<p>Développement du Backend</p>
	    			</div>
	    		</div>
	    		<div id="block5" class="col-md-6 col-lg-6 mb-3">
	    			<div class="frame-aboutus">
	    				<h1 class="name-cube">Jules THUYSBAERT</h1>
	    				<img class="img-us" src="${Jthuysba}" alt="img-jules">
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
