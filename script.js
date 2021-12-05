document.querySelector('.navigation__burger').onclick=function() {
document.querySelector('.navigation__burger').classList.toggle('active');
document.querySelector('.navigation__mobile-menu').classList.toggle('active');
document.querySelector('.navigation__desktop-menu').classList.toggle('active');
document.querySelector('body').classList.toggle('lock');
}