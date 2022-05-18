export function showError(message) {
	const errorContainerElement = document.getElementById('errors');
	const errorMessageElement = document.createElement('p');
	errorMessageElement.textContent = message;
	errorContainerElement.innerHTML = '';
	// in the above line we are clearning any existing content that we may have from before.
	errorContainerElement.append(errorMessageElement);
}
