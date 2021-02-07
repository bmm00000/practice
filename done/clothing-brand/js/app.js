window.addEventListener('DOMContentLoaded', async () => {
	const category = window.document.title.toLowerCase();
	const data = await getProducts(category);
	const manufs = makeManufList(data);
	renderData(data, manufs);
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

const getAvailabilities = async (manufacturer) => {
	try {
		const res = await axios.get(
			`https://cors-anywhere.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/availability/${manufacturer}`
		);
		return res.data.response;
	} catch (e) {
		console.log('Error!', e);
		const p = document.querySelector('#error-message');
		p.innerHTML = 'Our apologies, there is a problem. Check later please.';
	}
};

const renderData = async (products, manufList) => {
	for (let manuf of manufList) {
		const availabList = await getAvailabilities(manuf);
		for (let prod of availabList) {
			for (let product of products) {
				if (prod.id && product.id) {
					if (prod.id.toLowerCase() === product.id) {
						const tr = document.createElement('tr');
						const td1 = document.createElement('td');
						td1.innerHTML = product.name;
						tr.append(td1);
						const td2 = document.createElement('td');
						td2.innerHTML = prod.DATAPAYLOAD;
						tr.append(td2);
						document.querySelector('tbody').append(tr);
					}
				}
			}
		}
	}

	// for (let product of products) {
	// 	const tr = document.createElement('tr');
	// 	const td1 = document.createElement('td');
	// 	td1.innerHTML = product.name;
	// 	tr.append(td1);
	// 	const availabList = await getAvailability(product.manufacturer);
	// 	for (let prod of availabList) {
	// 		if (prod.id.toLowerCase() === product.id) {
	// 			const td2 = document.createElement('td');
	// 			td2.innerHTML = prod.DATAPAYLOAD;
	// 			tr.append(td2);
	// 		}
	// 	}
	// 	document.querySelector('tbody').append(tr);
	// }
};
