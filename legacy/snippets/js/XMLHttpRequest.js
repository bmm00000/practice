const myReq = new XMLHttpRequest();

myReq.onload = function() {
	const data = JSON.parse(this.responseText);
	console.log(data);
};
myReq.onerror = function(err) {
	console.log('Error! ', err);
};
myReq.open('GET', 'https://www.google.com');
myReq.send();

/////////////////////////////

// XHR:

function reqListener() {
	const data = JSON.parse(this.responseText);
	console.log(data);
	// (you can extract info from 'data', for example):
	// for (let element of data.array) {
	// 	console.log(element.name);
	//}
	// (you can extract from 'data' another address to make another XHR, if so, you have to use callbacks and indent the code. that's why 'fetch' was invented (XHR does not support promises))
}

var oReq = new XMLHttpRequest();
oReq.addEventListener('load', reqListener);
oReq.addEventListener('error', () => {
	console.log('Error!');
});
oReq.open('GET', 'http://www.example.org/example.txt');
oReq.send();
