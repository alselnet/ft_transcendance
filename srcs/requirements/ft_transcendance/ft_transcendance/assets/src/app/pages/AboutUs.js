const AboutUs = () => {

    console.log("Game component loaded");
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
    `
        <h1>About Us</h1>
    `; 
    console.log("Section content:", section.innerHTML);
    } else {
        console.error("#section not found in the DOM");
    }

};

export default AboutUs;
