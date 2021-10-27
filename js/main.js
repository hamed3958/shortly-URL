document.querySelector('form').onsubmit = handleSubmit;

const input = document.getElementById("inp");

function handleSubmit(e) {
	e.preventDefault();

	ValidURL(input.value);
}

function ValidURL(str) {

	var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!regex.test(str)) {
		document.getElementById("error-ms").style.display = "block";
		
	} else {

		getUrl();
		
	}
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
			alert("Error: We were unable to shorten your link");
			console.log(error);

		});

}
