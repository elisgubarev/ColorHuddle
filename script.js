(function(){

let body = document.querySelector('body');
let menu = document.querySelector('.menu');
let menuText = document.querySelector('.menu__text');
let swatch = document.querySelector('.menu__swatch');
let website = document.querySelector('.website');
let color = '#ffffff';
let message = document.querySelector('.menu__message-hex');
let message2 = document.querySelector('.menu__message-css');
let menuInitialOffsetX = 36;
let menuOffsetX = 36;
let menuInitialOffsetY = -25 -89;
let menuOffsetY = -25 -89;
let topBar = document.querySelector('.top-select');
let firstSection = document.querySelector('.first-section');
let features = document.querySelector('.first-section');
let prevcolor = `#ffffff`
let timer;
let emojis = ['😉','🔥','✌️','🚀','💪'];
let image = document.querySelector('.hero__image-box');
let reversedX = false;
let menuWidth;
let mouseX = 0;
let mouseY = 0;
let touch = window.matchMedia('(max-width: 1024px)');


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


function getRandomInt(max) {
  	return Math.floor(Math.random() * max);
}



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

accent = document.querySelector('.accent-word');

function cancel() {
	message.classList.add('hidden');
	message2.classList.add('hidden');
	menuText.classList.remove('hidden');

	menuWidth = parseInt(window.getComputedStyle(menu,null).getPropertyValue('width'));

	if (reversedX) {
		menuOffsetX = -36 - menuWidth;

	} else {
		menuOffsetX = 36;

	}
	menu.style.transform = `translate(${mouseX + menuOffsetX}px, ${mouseY + menuOffsetY}px)`;
}

function displayColor(color) {
	if (color == 'linear-gradient(90deg, rgb(123, 91, 199) 0%, rgb(234, 56, 141) 100%)') {
		return '#7B5BC7 → #EA388D';
	}
	if (color == 'linear-gradient(90deg, rgb(63, 250, 86) 0%, rgb(228, 230, 77) 100%)') {
		return '#3FFA56 → #E4E64D';
	}
	if (color == 'linear-gradient(90deg, rgb(255, 61, 99) 0%, rgb(248, 139, 75) 100%)') {
		return '#FF3D63 → #F88B4B';
	}
	if (color == 'linear-gradient(90deg, rgb(20, 152, 235) 1.64%, rgb(150, 45, 227) 100%)') {
		return '#1498EB → #962DE3';
	}
	return color;
}

function clickEvent() {
	mouseX = event.pageX;
	mouseY = event.pageY;
	if (event.target.closest('.menu') == null) {

	if (getColor(event.target) != undefined){
		color = getColor(event.target);
	} else {
		if (window.getComputedStyle(event.target.closest('.section'), null).getPropertyValue('background-color') != 'rgba(0, 0, 0, 0)') {
			color = getProperty(event.target.closest('.section'), 'background-color');
		} else {
			color = window.getComputedStyle(event.target.closest('.section'), null).getPropertyValue('background-image');
		}
	}
}
	message.innerHTML = `Hex copied ${emojis[getRandomInt(emojis.length)]}`;
	message2.innerHTML = `CSS copied ${emojis[getRandomInt(emojis.length)]}`;


	if (event.target.closest('.navigation__burger') == null) {
		if (event.target.closest('.menu') == null) {
			menu.style.opacity = '1';
		}
	copyToClipboard(color);
	if (color == 'linear-gradient(90deg, rgb(123, 91, 199) 0%, rgb(234, 56, 141) 100%)' || 
		color == 'linear-gradient(90deg, rgb(63, 250, 86) 0%, rgb(228, 230, 77) 100%)' || 
		color == 'linear-gradient(90deg, rgb(255, 61, 99) 0%, rgb(248, 139, 75) 100%)' || 
		color == 'linear-gradient(90deg, rgb(20, 152, 235) 1.64%, rgb(150, 45, 227) 100%)'){
		message2.classList.remove('hidden');
		message.classList.add('hidden');

		if (touch.matches) {
			let tooltip = document.createElement("div");
		    document.body.appendChild(tooltip);
		    tooltip.classList="tooltip";
		    tooltip.innerHTML = `<span class="menu__message-hex">CSS copied ${emojis[getRandomInt(emojis.length)]}</span>`;
		    tooltip.style.left = `${mouseX - (parseInt(window.getComputedStyle(tooltip,null).getPropertyValue('width')))/2}px`;
		    tooltip.style.top = `${mouseY - 70}px`;
		    tooltip.style.width = '127px';
		    setTimeout(destroy, 400, tooltip);
		    
    	}

	} else {
		message.classList.remove('hidden');
		message2.classList.add('hidden');

		if (touch.matches) {
			let tooltip = document.createElement("div");
		    document.body.appendChild(tooltip);
		    tooltip.classList="tooltip";
		    tooltip.innerHTML = `<span class="menu__message-hex">Hex copied ${emojis[getRandomInt(emojis.length)]}</span>`;
		    tooltip.style.left = `${mouseX - (parseInt(window.getComputedStyle(tooltip,null).getPropertyValue('width')))/2}px`;
		    tooltip.style.top = `${mouseY - 70}px`;
		    tooltip.style.width = '129px';
		    setTimeout(destroy, 400, tooltip);
		    
    	}

	}
	
	menuText.classList.add('hidden');

	menuWidth = parseInt(window.getComputedStyle(menu,null).getPropertyValue('width'));
	if (reversedX) {
		menuOffsetX = -36 - menuWidth;

	} else {
		menuOffsetX = 36;

	}
	

	if (timer != undefined) {
		clearTimeout(timer);
	}
	timer = setTimeout(cancel, 600);
	
	
	}

	
	menu.style.transform = `translate(${mouseX + menuOffsetX}px, ${mouseY + menuOffsetY}px)`;
	event.preventDefault();
	event.stopPropagation();
}

function mouseMoveEvent() {
	mouseX = event.pageX;
	mouseY = event.pageY;
	if (event.target.closest('.menu') == null) {
		menu.style.opacity = '1';
		if (getColor(event.target) != undefined){
			color = getColor(event.target);
		} else {
			if (window.getComputedStyle(event.target.closest('.section'), null).getPropertyValue('background-color') != 'rgba(0, 0, 0, 0)') {
				color = getProperty(event.target.closest('.section'), 'background-color');
			} else {
				color = window.getComputedStyle(event.target.closest('.section'), null).getPropertyValue('background-image');
			}
		}
	} 



	if (event.target.closest('.navigation__burger') == null) {
		if (color != prevcolor) {
			menuText.innerHTML = displayColor(color);
			swatch.style.background = color;
			prevcolor = color;
		}
		
		
	} else {
		hideMenu();
	}

	menu.style.transform = `translate(${mouseX + menuOffsetX}px, ${mouseY + menuOffsetY}px)`;

	menuWidth = parseInt(window.getComputedStyle(menu,null).getPropertyValue('width'));
	if ((menuWidth + mouseX + menuInitialOffsetX) >= document.documentElement.clientWidth) {
		menuOffsetX = -36 - menuWidth;
		reversedX = true;
	} else {
		menuOffsetX = 36;
		reversedX = false;
	}


}

function hideMenu() {
	menu.style.opacity = '0';
}

function destroy(target) {
	document.body.removeChild(target);
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

})();




