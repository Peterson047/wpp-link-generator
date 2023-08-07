let scClear = document.querySelector('#sc-clear');
let scInput = document.querySelector('#sc-input');
let scVal = '';

let eby = document.querySelector('#by');
let ebd = document.querySelector('#bd');
let ego = document.querySelector('#go');
let cur;
let defaultId = '#' + config.engine;

let nav = document.querySelector('#nav');
let cship = document.querySelector('.container-ship');
let title = document.querySelector('#title');

let urlRegexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;

init();

function init() {
	scInput.focus();
	scClear.style = 'opacity: 1;'

	let curId = localStorage.getItem('curId')
	cur = curId ? document.querySelector(curId) : document.querySelector(defaultId);

	cur.className = 'activated';

	initNav();
	initColor();
}

function initNav() {
	let _str = '';

	Object.entries(config.nav).forEach(item => {
		_str += `<a href=${item[1]}>${item[0]}</a>`
	})

	nav.innerHTML = _str;
}

function search(e) {
	if (e && e.keyCode !== 13) return;

	if (urlRegexp.test(scVal)) {
		scVal = (scVal.indexOf('http') === 0) ? scVal : ('https://' + scVal)

		window.open(scVal);
		clearVal();
		return;
	}

	let _eg;

	if (cur.id === 'by') {
		_eg = 'https://cn.bing.com/search?q='
	} else if (cur.id === 'bd') {
		_eg = 'https://baidu.com/s?wd='
	} else if (cur.id === 'go') {
		_eg = 'https://google.com/search?q='
	}

	window.open(_eg + scVal)
	// clearVal();	// 事实证明，需要重新选择引擎的频率挺高的
}

function select(e) {
	let _id = '#' + e.target.id;
	if (_id === '#engine') return;

	cur = document.querySelector(_id);
	localStorage.setItem('curId', _id)

	eby.className = '';
	ebd.className = '';
	ego.className = '';


	cur.className = 'activated';
	if (scVal) search();
}

function clearVal() {
	if (!scInput.value) return;
	scInput.value = '';
	reactive();
}

function reactive() {
	scVal = scInput.value.trim();
	scClear.style = scVal ? 'opacity: 1' : 'opacity: 0';
	scInput.focus();
}


function initColor() {
	if (localStorage.getItem('dark') === 'on') {
		cship.className = 'container-ship container-ship--dark';
	}
}

function toggleColor() {
	if (cship.className.indexOf('dark') > -1) {
		cship.className = 'container-ship';
		setDarkOfLocalStorage('off');

	} else {
		cship.className = 'container-ship container-ship--dark';
		setDarkOfLocalStorage('on');
	}
}

function getDarkOfLocalStorage() {
	return localStorage.getItem('dark');
}

function setDarkOfLocalStorage(flag) {
	localStorage.setItem('dark', flag);
}

function delDarkOfLocalStorage() {
	localStorage.removeItem('dark');
}
//input e generate

function search(event) {
	if (event.keyCode === 13) { // 13 is the Enter key code
		openWhatsApp();
	}
}

function reactive() {
	// If you want to do something when the input text changes, you can add code here
}

function clearVal() {
	document.getElementById("sc-input").value = "";
}

function openWhatsApp() {
	var inputValue = document.getElementById("sc-input").value;
	if (inputValue) {
		// Remove all non-numeric characters from the input value
		var phone = inputValue.replace(/\D/g, "");
		if (phone === "") {
			// If the input value has no numeric characters, show an error message
			alert("Por favor, insira apenas números válidos.");
			return;
		}
		var url = "https://api.whatsapp.com/send?l=pt_br&phone=" + phone;
		window.open(url, "_blank");
	}
}

const inputField = document.getElementById('sc-input');
const placeholderText = 'Digite ou cole um número';

inputField.addEventListener('click', () => {
	if (inputField.value === placeholderText) {
		inputField.value = '';
	}
});

