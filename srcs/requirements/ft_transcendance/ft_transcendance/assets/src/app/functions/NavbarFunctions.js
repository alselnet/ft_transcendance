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
  