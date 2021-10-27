document.querySelector('form').onsubmit = handleSubmit;

const input = document.getElementById("inp");

let errorDiv = document.getElementById("error-ms");

let load = document.querySelector(".loading-content");

input.addEventListener('focus',
	() => {
		errorDiv.innerHTML = "";
		errorDiv.style.display = "none";
		input.classList.remove("error-border");
	});

function handleSubmit(e) {
	e.preventDefault();

	load.style.visibility = "visible";

	ValidURL(input.value);
}

function ValidURL(str) {

	var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!regex.test(str)) {

		errorMessage("Please add a link")

	} else {

		getUrl();

	}
}

function errorMessage(message) {

	load.style.visibility = "hidden";

	errorDiv.style.display = "block";

	errorDiv.innerHTML = message;

	input.classList.add("error-border");

}

function getUrl() {

	fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`, {
		method: 'POST',
		headers: {},
	})
		.then(response => response.json())
		.then(data => {

			let shortLink = data.result.short_link;

			showUrl(shortLink);

			load.style.visibility = "hidden";

			document.querySelector('.shorted-output').style.visibility = "visible";

		})
		.catch(error => {

			errorMessage(error)

		});

}

function showUrl(shortLink) {

	document.querySelector('.orginal-url').innerHTML = input.value;
	document.querySelector('.shorted-url').innerHTML = shortLink;
	document.querySelector('.shorted-url').value = shortLink;
}

function copyFunction() {
	document.querySelector(".copy-btn").classList.add("copied");
	document.querySelector(".copy-btn").innerHTML = "copied!";
	var copyText = document.querySelector('.shorted-url');
	console.log(copyText)
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	// navigator.clipboard.writeText(copyText.value);
	document.execCommand("copy");


}

// copyText.forEach((link)=>{
// 	link.select();
// })
// document.execCommand('copy'); 