const LogOut = () => {

    console.log("LogOut component loaded");
    let icon = document.querySelector("#section");
    if (section) {
        section.innerHTML =
        `   
            <i class="bi bi-box-arrow-right"></i>
        `;
        console.log("Section content:", section.innerHTML);
    } else {
        console.error("#section not found in the DOM");
    }

    return icon;
};

export default LogOut;
