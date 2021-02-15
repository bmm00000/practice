// const getJoke = async () => {
// 	try {
// 		const config = { headers: { Accept: 'text/plain' } };
// 		const data = await axios.get('https://icanhazdadjoke.com/', config);
// 		return data.data;
// 	} catch (e) {
// 		return 'No jokes available...';
// 	}
// };

// const renderJoke = async () => {
// 	const joke = await getJoke();
// 	const li = document.createElement('li');
// 	li.innerHTML = joke;
// 	document.querySelector('#list').append(li);
// };

// const button = document.querySelector('button');
// button.addEventListener('click', renderJoke);

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	deleteImgs();
	const searchTerm = searchForm.elements.query.value;
	const res = await getData(searchTerm);
	makeImges(res.data);
	searchForm.elements.query.value = '';
});

const deleteImgs = () => {
	const imgs = document.querySelectorAll('img');
	for (let img of imgs) {
		img.parentNode.removeChild(img);
	}
};

const getData = async (searchTerm) => {
	const config = { params: { q: searchTerm } };
	const res = await axios.get('http://api.tvmaze.com/search/shows', config);
	return res;
};

const makeImges = (shows) => {
	for (let result of shows) {
		if (result.show.image) {
			const imgSrc = result.show.image.medium;
			const newImg = document.createElement('img');
			newImg.src = imgSrc;
			document.body.append(newImg);
		}
	}
};
