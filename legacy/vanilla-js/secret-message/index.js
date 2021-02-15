const { hash } = window.location;
// we do this to extract the hash from the url ('window.location.hash' contains the hash), so we can convert it to a legible string.

const message = atob(hash.replace('#', ''));
//now we are converting the encrypted message into a legible one.

if (message) {
	document.querySelector('#message-form').classList.add('hide');
	document.querySelector('#message-show').classList.remove('hide');

	document.querySelector('h1').innerHTML = message;
}

document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault();
	// by default, the browser will attempt to send the info from the form to a backend server. we don't have backend server, that's why we prevent that from happening. once we prevent it, when we submit, the page doesn't refresh or anything

	// we are toggling visibility here:
	document.querySelector('#message-form').classList.add('hide');
	document.querySelector('#link-form').classList.remove('hide');

	const input = document.querySelector('#message-input');
	const encrypted = btoa(input.value);

	const linkInput = document.querySelector('#link-input');
	linkInput.value = `${window.location}#${encrypted}`;
	linkInput.select();
	// the 'select' method selects the text of the input, so it's easier to copy and paste.
});

// we are converting the ASCII character codes of the message to Base64 character codes, and then we will take those codes and we will turn them to legible characters (look at the screenshots)

// 'btoa()' is the built-in function (in the browser) that we are going to use to make the conversion to Base64 encoding. 'atob()' is the opposite, converts from Base64 to legible characters.

// look at the screenshot of the parts of a URL. query string sends options to a backend server. the hash stores the info only relevant to the browser and not to the backend server.

// we want to save our encrypted string in the hash. but how to get the rest of the url (domain, path, query string)? go to the console of the application and type 'window.location' (this is an object that has properties inside of it that describe the url that we are looking at). also, if you type in the console `${window.location}`, it will give you not the object, but the current url inside of a string (look at the screenshots), so we can add the hash to that string.

// we deploy our project using a service called 'now'. we type in the terminal 'npx now', you confirm the email that you receive, and then again you type in the terminal 'npx now'. then all the files of the current project will be put together and deployed in the address that you will get in the terminal (see the screenshot)
