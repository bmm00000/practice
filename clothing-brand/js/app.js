window.addEventListener('DOMContentLoaded', async () => {
	const category = window.document.title.toLowerCase();
	const data = await getProducts(category);
	console.log(data);
});

const getProducts = async (category) => {
	try {
		const res = await axios.get(
			`https://cors-anywhere.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/products/${category}`
		);
		return res.data;
	} catch (e) {
		console.log('Error!', e);
		const p = document.querySelector('#error-message');
		p.innerHTML = 'Our apologies, there is a problem. Check later please.';
	}
};

const renderData = (data) => {
	for (let element of data) {
		const tr = document.createElement('tr');
		const td = document.createElement('td');
		td.innerHTML = element.name;
		tr.append(td);
		document.querySelector('tbody').append(tr);
	}
};
