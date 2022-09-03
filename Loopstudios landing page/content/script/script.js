const navbar = document.querySelector('.navbar');
const toggler = document.querySelector('.navbar-toggler');
const hamburger = document.querySelector('.fa-bars');
const close = document.querySelector('.fa-xmark');

toggler.addEventListener('click', () => {
    navbar.classList.toggle('navbar-bg');
    hamburger.classList.toggle('d-block');
    close.classList.toggle('d-none');
})
