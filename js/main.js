document.querySelector('form').onsubmit = handleSubmit;

const input = document.getElementById("inp");

let errorDiv = document.getElementById("error-ms");

input.addEventListener('focus',
	() => {
		errorDiv.innerHTML = "";
		errorDiv.style.display = "none";
	});

function handleSubmit(e) {
	e.preventDefault();

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

	errorDiv.style.display = "block";

	errorDiv.innerHTML = message;

}

function getUrl() {

	fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`, {
		method: 'POST',
		headers: {},
	})
		.then(response => response.json())
		.then(data => {

			let shortLink = data.result.short_link;

			console.log(shortLink)

		})
		.catch(error => {

			errorMessage(error)

		});

}
