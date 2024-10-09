const navbarToggler = () => {
    const hamburger = document.querySelector('.hamburger_button');
    const closeBtn = document.querySelector('.nav_close_button');
    const navbar = document.querySelector('.lower_navbar');

    hamburger.addEventListener('click' , () => {
        navbar.classList.add('mobile_nav_view');
    });

    closeBtn.addEventListener('click' , () => {
        navbar.classList.remove('mobile_nav_view');
    })
}

document.addEventListener('DOMContentLoaded' , navbarToggler)