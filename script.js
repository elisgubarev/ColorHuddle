let body = document.querySelector('body');
let menu = document.querySelector('.menu');
let menuText = document.querySelector('.menu__text');
let swatch = document.querySelector('.menu__swatch');
let website = document.querySelector('.website');
let color;
let message;
let menuOffsetX = 16;
let menuOffsetY = 24;
let messageOffsetX = 23;
let messageOffsetY = 20;
let topBar = document.querySelector('.top-select');
let firstSection = document.querySelector('.first-section');
let features = document.querySelector('.first-section');

//Burger menu

document.querySelector('.navigation__burger').onclick=function() {
document.querySelector('.navigation__burger').classList.toggle('active');
document.querySelector('.navigation__mobile-menu').classList.toggle('active');
document.querySelector('.navigation__desktop-menu').classList.toggle('active');
document.querySelector('body').classList.toggle('lock');
}

//Color select

let colorItems = document.querySelectorAll('.top-select__item');

for (let i = colorItems.length - 1; i >= 0; i--) {
	colorItems[i].onclick = function() {
		for (let i = colorItems.length - 1; i >= 0; i--) {
				colorItems[i].classList.remove('selected-color');
		}
		this.classList.add('selected-color');
		if (body.classList.contains('lock')){
			body.classList="style-"+(i+1)+' '+'lock';
		} else {
			body.classList="style-"+(i+1);
		}
	}	
}

//Copy color to clipboard

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;

function getProperty(target, property) {
	return rgb2hex(window.getComputedStyle(target, null).getPropertyValue(property));
}

function getColor(target) {
	if (target.tagName == 'path') {
		if (window.getComputedStyle(target, null).getPropertyValue('fill') != 'none') {
			return getProperty(target, 'fill');
		} else {
			return getProperty(target, 'stroke');
		}
	}
	if (target.tagName == 'SPAN') {
		if (window.getComputedStyle(target, null).getPropertyValue('color') != 'rgba(0, 0, 0, 0)') {
			return getProperty(target, 'color');
		} else {
			return window.getComputedStyle(target, null).getPropertyValue('background-image');
		}
	}
	if (target.classList.contains('button_primary')) {
		if (window.getComputedStyle(target, null).getPropertyValue('background-color') != 'rgba(0, 0, 0, 0)') {
			return getProperty(target, 'background-color');
		} else {
			return window.getComputedStyle(target, null).getPropertyValue('background-image');
		}
	}
	if (target.classList.contains('button_ghost')) {
		return getProperty(target, 'color');
	}
	if (target.classList.contains('button_reverse')) {
		if (window.getComputedStyle(target, null).getPropertyValue('background-color') != 'rgba(0, 0, 0, 0)') {
			return getProperty(target, 'background-color');
		} else {
			return window.getComputedStyle(target, null).getPropertyValue('background-image');
		}
	}
}

let button = document.querySelector('.button');
console.log(button);

accent = document.querySelector('.accent-word');
console.log(accent);
console.log(window.getComputedStyle(accent, null).getPropertyValue('color'));

function destroy(target) {
	website.removeChild(target);
}

function clickEvent() {
	if (getColor(event.target) != undefined){
		color = getColor(event.target);
	} else {
		if (window.getComputedStyle(event.target.closest('.section'), null).getPropertyValue('background-color') != 'rgba(0, 0, 0, 0)') {
			color = getProperty(event.target.closest('.section'), 'background-color');
		} else {
			color = window.getComputedStyle(event.target.closest('.section'), null).getPropertyValue('background-image');
		}
	}
	if (event.target.closest('.navigation__burger') == null) {
	copyToClipboard(color);
	message = document.createElement('span');
	message.innerHTML = `<span class="material-icons" style="color: #05C46B; font-size: 18px;">check_circle</span> Copied!`;
	message.classList = 'message';
	message.style.top = event.pageY - messageOffsetY + 'px';
	message.style.left = event.pageX + messageOffsetX + 'px';
	website.appendChild(message);
	setTimeout(destroy, 500, message);
	}
	menu.style.left = event.pageX + menuOffsetX + 'px';
	menu.style.top = event.pageY + menuOffsetY + 'px';
	menu.style.opacity = '1';
	event.preventDefault();
	event.stopPropagation();
}

//firstSection.style.background = 'linear-gradient(90deg, #7B5BC7 0%, #EA388D 100%);';
function mouseMoveEvent() {
	if (getColor(event.target) != undefined){
		color = getColor(event.target);
	} else {
		if (window.getComputedStyle(event.target.closest('.section'), null).getPropertyValue('background-color') != 'rgba(0, 0, 0, 0)') {
			color = getProperty(event.target.closest('.section'), 'background-color');
		} else {

			color = window.getComputedStyle(event.target.closest('.section'), null).getPropertyValue('background-image');
		}
	}
	if (event.target.closest('.navigation__burger') == null) {
		menuText.innerHTML = color;
		swatch.style.background = color;
		swatch.classList.remove('hide');
	} else {
		menuText.innerHTML = 'Click to open ☝️';
		swatch.classList.add('hide');
	}

	menu.style.opacity = '1';
	menu.style.left = event.pageX + menuOffsetX + 'px';
	menu.style.top = event.pageY + menuOffsetY + 'px';
	if (document.querySelector('.message') != undefined) {
		message.style.top = event.pageY - messageOffsetY + 'px';
		message.style.left = event.pageX + messageOffsetX + 'px';
	}

	if (website.clientWidth - event.pageX < 150) {
		menuOffsetX = -120;
		messageOffsetX = -113;
	} else {
		menuOffsetX = 16;
		messageOffsetX = 23;
	}

	if (website.clientHeight - event.pageY < 100) {
		menuOffsetY = -50;
		messageOffsetY = 93;
	} else {
		menuOffsetY = 24;
		messageOffsetY = 20;
	}
}

function hideMenu() {
	menu.style.opacity = '0';
}



website.addEventListener('click', clickEvent);
website.addEventListener('mousemove', mouseMoveEvent);
document.addEventListener('scroll', hideMenu);
website.addEventListener('mouseleave', hideMenu);

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}






