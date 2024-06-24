const FriendList = () => {

    console.log("FriendList component loaded");
    let section = document.querySelector("#section");
    if (section) {
        section.innerHTML = 
    `   
        <h1>Friend List</h1>
    `; 
    console.log("Section content:", section.innerHTML);
    } else {
        console.error("#section not found in the DOM");
    }

};

export default FriendList;
