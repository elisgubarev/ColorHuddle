document.querySelector('.navigation__burger').onclick=function() {
document.querySelector('.navigation__burger').classList.toggle('active');
document.querySelector('.navigation__mobile-menu').classList.toggle('active');
document.querySelector('.navigation__desktop-menu').classList.toggle('active');
document.querySelector('body').classList.toggle('lock');
}
let colorItems = document.querySelectorAll('.top-select__item');

for (let i = colorItems.length - 1; i >= 0; i--) {
	colorItems[i].onclick = function() {
		for (let i = colorItems.length - 1; i >= 0; i--) {
				colorItems[i].classList.remove('selected-color');
			}
			this.classList.add('selected-color');
		}
	
}