const filePickerElement = document.getElementById('image');
const imagePreviewElement = document.getElementById('picked-image');

function previewImage() {
	const files = filePickerElement.files;
	if (!files || files.length === 0) {
		imagePreviewElement.style.display = 'none';
		return;
	}
	const image = files[0];
	imagePreviewElement.src = URL.createObjectURL(image);
	imagePreviewElement.style.display = 'block';
}

filePickerElement.addEventListener('change', previewImage);
