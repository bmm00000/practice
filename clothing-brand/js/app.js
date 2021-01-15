window.addEventListener('DOMContentLoaded', async () => {
	const category = window.document.title.toLowerCase();
	const data = await getProducts(category);
	const manufs = makeManufList(data);
	console.log(manufs);
	renderData(data);
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

const makeManufList = (array) => {
	const manufList = [];
	for (let element of array) {
		if (!manufList.includes(element.manufacturer))
			manufList.push(element.manufacturer);
	}
	return manufList;
};

const getAvailability = async (manufacturer) => {
	const res = await axios.get(
		`https://cors-anywhere.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/availability/${manufacturer}`
	);
	return res.data.response;
};

const renderData = async (products) => {
	for (let product of products) {
		const tr = document.createElement('tr');
		const td1 = document.createElement('td');
		td1.innerHTML = product.name;
		tr.append(td1);
		const availabList = await getAvailability(product.manufacturer);
		for (let prod of availabList) {
			if (prod.id.toLowerCase() === product.id) {
				const td2 = document.createElement('td');
				td2.innerHTML = prod.DATAPAYLOAD;
				tr.append(td2);
			}
		}
		document.querySelector('tbody').append(tr);
	}
};
